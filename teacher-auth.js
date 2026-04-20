const AUTH_MODE_LOGIN = "login";
const AUTH_MODE_REGISTER = "register";

let authMode = AUTH_MODE_LOGIN;

function resolveTeacherApiBase() {
    const configuredBase = String(window.TEACHER_API_BASE || "").trim();
    if (configuredBase) {
        return configuredBase.replace(/\/$/, "");
    }

    const host = String(window.location.hostname || "").toLowerCase();
    const isNetlifyHost = host.endsWith("netlify.app") || host.endsWith("netlify.live");
    const isLocalHost = host === "localhost" || host === "127.0.0.1";

    if (isNetlifyHost) {
        return "";
    }

    if (isLocalHost) {
        // Default local fallback: call the deployed site functions when running from XAMPP or file preview.
        return "https://word-harbor.netlify.app";
    }

    return "";
}

const TEACHER_API_BASE = resolveTeacherApiBase();

function buildFunctionUrl(path) {
    if (!TEACHER_API_BASE) {
        return path;
    }

    return `${TEACHER_API_BASE}${path}`;
}

const teacherNameField = document.getElementById("teacherNameField");
const teacherNameInput = document.getElementById("teacherName");
const teacherEmailInput = document.getElementById("teacherEmail");
const teacherPasswordInput = document.getElementById("teacherPassword");
const toggleTeacherPasswordBtn = document.getElementById("toggleTeacherPassword");
const loginBtn = document.getElementById("loginBtn");
const createAccountBtn = document.getElementById("createAccountBtn");
const authForm = document.getElementById("teacherAuthForm");
const authStatus = document.getElementById("authStatus");
const teacherAuthView = document.getElementById("teacherAuthView");
const teacherResultsView = document.getElementById("teacherResultsView");
const sessionCard = document.getElementById("teacherSessionCard");
const sessionTeacherName = document.getElementById("sessionTeacherName");
const sessionTeacherEmail = document.getElementById("sessionTeacherEmail");
const logoutBtn = document.getElementById("logoutBtn");
const teacherResultsSection = document.getElementById("teacherResultsSection");
const teacherResultsStatus = document.getElementById("teacherResultsStatus");
const teacherResultsBody = document.getElementById("teacherResultsBody");
const refreshTeacherResultsBtn = document.getElementById("refreshTeacherResultsBtn");

function showAuthView() {
    if (teacherAuthView) {
        teacherAuthView.style.display = "block";
    }

    if (teacherResultsView) {
        teacherResultsView.style.display = "none";
    }
}

function showResultsView() {
    if (teacherAuthView) {
        teacherAuthView.style.display = "none";
    }

    if (teacherResultsView) {
        teacherResultsView.style.display = "block";
    }
}

function toggleTeacherPasswordVisibility() {
    if (!teacherPasswordInput || !toggleTeacherPasswordBtn) return;

    const nextType = teacherPasswordInput.type === "password" ? "text" : "password";
    const isVisible = nextType === "text";

    teacherPasswordInput.type = nextType;
    toggleTeacherPasswordBtn.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
    toggleTeacherPasswordBtn.setAttribute("title", isVisible ? "Hide password" : "Show password");
    toggleTeacherPasswordBtn.classList.toggle("is-visible", isVisible);
}

function setAuthMode(mode) {
    authMode = mode;

    const isLogin = mode === AUTH_MODE_LOGIN;
    teacherNameField.style.display = isLogin ? "none" : "block";

    if (loginBtn) {
        loginBtn.classList.toggle("btn-secondary", !isLogin);
    }

    if (createAccountBtn) {
        createAccountBtn.classList.toggle("btn-secondary", isLogin);
    }
}

function showStatus(message, type) {
    authStatus.innerText = message;
    authStatus.className = `auth-status show ${type}`;
}

function clearStatus() {
    authStatus.innerText = "";
    authStatus.className = "auth-status";
}

function getStoredSession() {
    try {
        const raw = localStorage.getItem("teacherAuthSession");
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
}

function setStoredSession(session) {
    localStorage.setItem("teacherAuthSession", JSON.stringify(session));
}

function clearStoredSession() {
    localStorage.removeItem("teacherAuthSession");
}

function showResultsStatus(message, type) {
    if (!teacherResultsStatus) return;
    teacherResultsStatus.innerText = message;
    teacherResultsStatus.className = `auth-status show ${type}`;
}

function clearResultsStatus() {
    if (!teacherResultsStatus) return;
    teacherResultsStatus.innerText = "";
    teacherResultsStatus.className = "auth-status";
}

function formatDateTime(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
}

function renderTeacherResults(items) {
    if (!teacherResultsBody) return;

    if (!Array.isArray(items) || !items.length) {
        teacherResultsBody.innerHTML = `<tr><td colspan="6">No results yet.</td></tr>`;
        return;
    }

    teacherResultsBody.innerHTML = items
        .map((item) => {
            const fluencyText = `${item.fluencyWordsRead}/${item.fluencyTotalWords} • WPM ${item.wpm} • ${item.accuracyPercent}%`;
            const compText = `${item.comprehensionScore}/${item.comprehensionTotal}`;

            return `
                <tr>
                    <td>${formatDateTime(item.completedAt || item.createdAt)}</td>
                    <td>${item.studentName || "-"}</td>
                    <td>${item.level || "-"}</td>
                    <td>${item.passageTitle || "-"}</td>
                    <td>${fluencyText}</td>
                    <td>${compText}</td>
                </tr>
            `;
        })
        .join("");
}

async function loadTeacherResults() {
    const session = getStoredSession();
    const token = session?.token;
    if (!token) {
        renderTeacherResults([]);
        return;
    }

    clearResultsStatus();

    try {
        const response = await fetch(buildFunctionUrl("/.netlify/functions/teacher-results-list?limit=200"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
            const errorMessage = String(result?.error || "Failed to load teacher results");
            const details = String(result?.details || "").trim();
            throw new Error(details ? `${errorMessage}: ${details}` : errorMessage);
        }

        renderTeacherResults(result.items || []);
        showResultsStatus("Results loaded.", "success");
    } catch (error) {
        renderTeacherResults([]);
        showResultsStatus(String(error?.message || error || "Failed to load teacher results"), "error");
    }
}

function renderSessionCard(session) {
    if (!session || !session.teacher) {
        showAuthView();
        sessionCard.classList.remove("show");
        sessionTeacherName.innerText = "-";
        sessionTeacherEmail.innerText = "-";
        clearResultsStatus();
        return;
    }

    sessionTeacherName.innerText = session.teacher.fullName || "Teacher";
    sessionTeacherEmail.innerText = session.teacher.email || "-";
    sessionCard.classList.add("show");
    showResultsView();

    if (teacherResultsSection) {
        teacherResultsSection.style.display = "block";
    }

    loadTeacherResults();
}

async function requestJson(url, payload) {
    let response;

    try {
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (networkError) {
        const host = String(window.location.hostname || "").toLowerCase();
        const isLocalHost = host === "localhost" || host === "127.0.0.1";

        throw new Error(
            isLocalHost
                ? "Could not reach auth server. If testing locally, deploy latest changes to Netlify or run with Netlify Dev."
                : "Network request failed while contacting auth server."
        );
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
        const coreMessage = result?.error || `Request failed with status ${response.status}`;
        const detailsMessage = String(result?.details || "").trim();
        const message = detailsMessage
            ? `${coreMessage}: ${detailsMessage}`
            : coreMessage;
        throw new Error(message);
    }

    return result;
}

async function registerTeacher(fullName, email, password) {
    return requestJson(buildFunctionUrl("/.netlify/functions/teacher-register"), {
        fullName,
        email,
        password
    });
}

async function loginTeacher(email, password) {
    return requestJson(buildFunctionUrl("/.netlify/functions/teacher-login"), {
        email,
        password
    });
}

async function handleSubmit(event) {
    event.preventDefault();
    await processAuth(AUTH_MODE_LOGIN);
}

async function processAuth(mode) {
    setAuthMode(mode);
    clearStatus();

    const fullName = teacherNameInput.value.trim();
    const email = teacherEmailInput.value.trim().toLowerCase();
    const password = teacherPasswordInput.value;

    if (!email || !password) {
        showStatus("Email and password are required.", "error");
        return;
    }

    if (mode === AUTH_MODE_REGISTER) {
        if (!fullName) {
            showStatus("Teacher name is required for account creation.", "error");
            return;
        }

        if (password.length < 8) {
            showStatus("Use a password with at least 8 characters.", "error");
            return;
        }
    }

    if (loginBtn) loginBtn.disabled = true;
    if (createAccountBtn) createAccountBtn.disabled = true;
    showStatus("Processing request...", "info");

    try {
        if (mode === AUTH_MODE_REGISTER) {
            await registerTeacher(fullName, email, password);
            showStatus("Teacher account created. You can now login.", "success");
            setAuthMode(AUTH_MODE_LOGIN);
            teacherPasswordInput.value = "";
            return;
        }

        const result = await loginTeacher(email, password);
        setStoredSession({
            token: result.token,
            teacher: result.teacher,
            issuedAt: Date.now()
        });

        renderSessionCard(getStoredSession());
        showStatus("Login successful.", "success");
        teacherPasswordInput.value = "";
    } catch (error) {
        showStatus(String(error?.message || error || "Request failed"), "error");
    } finally {
        if (loginBtn) loginBtn.disabled = false;
        if (createAccountBtn) createAccountBtn.disabled = false;
    }
}

function handleLogout() {
    clearStoredSession();
    renderSessionCard(null);
    renderTeacherResults([]);
    showStatus("Logged out.", "info");
}

authForm.addEventListener("submit", handleSubmit);
if (createAccountBtn) {
    createAccountBtn.addEventListener("click", () => {
        if (authMode !== AUTH_MODE_REGISTER) {
            setAuthMode(AUTH_MODE_REGISTER);
            clearStatus();
            showStatus("Create account mode enabled. Fill Teacher Name then click Create Account again.", "info");
            teacherNameInput.focus();
            return;
        }

        processAuth(AUTH_MODE_REGISTER);
    });
}
if (toggleTeacherPasswordBtn) {
    toggleTeacherPasswordBtn.addEventListener("click", toggleTeacherPasswordVisibility);
}
logoutBtn.addEventListener("click", handleLogout);
if (refreshTeacherResultsBtn) {
    refreshTeacherResultsBtn.addEventListener("click", loadTeacherResults);
}

setAuthMode(AUTH_MODE_LOGIN);
renderSessionCard(getStoredSession());
