const AUTH_MODE_LOGIN = "login";
const AUTH_MODE_REGISTER = "register";

let authMode = AUTH_MODE_LOGIN;

// DOM Elements
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
const MAX_TEACHER_ACCOUNTS = 15;

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Firebase Auth State Observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const session = {
            teacher: {
                fullName: user.displayName || "Teacher",
                email: user.email
            }
        };
        renderSessionCard(session);
    } else {
        // User is signed out
        renderSessionCard(null);
    }
});

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
    if (loginBtn) loginBtn.classList.toggle("btn-secondary", !isLogin);
    if (createAccountBtn) createAccountBtn.classList.toggle("btn-secondary", isLogin);
}

function showStatus(message, type) {
    authStatus.innerText = message;
    authStatus.className = `auth-status show ${type}`;
}

function clearStatus() {
    authStatus.innerText = "";
    authStatus.className = "auth-status";
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
    const date = (value instanceof firebase.firestore.Timestamp) ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
}

function renderTeacherResults(items) {
    if (!teacherResultsBody) return;

    if (!Array.isArray(items) || !items.length) {
        teacherResultsBody.innerHTML = `<tr><td colspan="7">No results yet.</td></tr>`;
        return;
    }

    teacherResultsBody.innerHTML = items
        .map((item) => {
            const fluencyText = `${item.fluencyWordsRead}/${item.fluencyTotalWords} • WPM ${item.wpm} • ${item.accuracyPercent}%`;
            const compText = `${item.comprehensionScore}/${item.comprehensionTotal}`;

            return `
                <tr>
                    <td>
                        <button type="button" class="btn-start teacher-delete-btn" data-attempt-id="${escapeHtml(item.id)}">
                            Delete
                        </button>
                    </td>
                    <td>${formatDateTime(item.completedAt || item.createdAt)}</td>
                    <td>${escapeHtml(item.studentName || "-")}</td>
                    <td>${escapeHtml(item.level || "-")}</td>
                    <td>${escapeHtml(item.passageTitle || "-")}</td>
                    <td>${fluencyText}</td>
                    <td>${compText}</td>
                </tr>
            `;
        })
        .join("");
}

async function deleteTeacherResult(attemptId) {
    const user = firebase.auth().currentUser;
    if (!user) {
        showResultsStatus("You must be logged in to delete results.", "error");
        return;
    }

    const confirmed = window.confirm("Delete this student result permanently?");
    if (!confirmed) return;

    showResultsStatus("Deleting result...", "info");

    try {
        const db = firebase.firestore();
        await db.collection("attempts").doc(attemptId).delete();
        showResultsStatus("Result deleted.", "success");
        await loadTeacherResults();
    } catch (error) {
        console.error("Firestore delete error:", error);
        showResultsStatus(String(error?.message || error || "Failed to delete result"), "error");
    }
}

async function loadTeacherResults() {
    const user = firebase.auth().currentUser;
    if (!user) {
        renderTeacherResults([]);
        return;
    }

    clearResultsStatus();

    try {
        const db = firebase.firestore();
        const snapshot = await db.collection("attempts")
            .orderBy("createdAt", "desc")
            .limit(200)
            .get();

        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        renderTeacherResults(items);
        showResultsStatus("Results loaded from Firestore.", "success");
    } catch (error) {
        console.error("Firestore Error:", error);
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

if (teacherResultsBody) {
    teacherResultsBody.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-attempt-id]");
        if (!button) return;
        deleteTeacherResult(button.dataset.attemptId);
    });
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
            const db = firebase.firestore();
            const teacherSnapshot = await db.collection("teachers").get();
            if (teacherSnapshot.size >= MAX_TEACHER_ACCOUNTS) {
                showStatus(`Teacher registration limit reached (${MAX_TEACHER_ACCOUNTS} accounts max).`, "error");
                return;
            }

            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({
                displayName: fullName
            });
            
            // Save teacher metadata to Firestore
            await db.collection("teachers").doc(userCredential.user.uid).set({
                fullName: fullName,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            showStatus("Teacher account created. You are now logged in.", "success");
            teacherPasswordInput.value = "";
            return;
        }

        await firebase.auth().signInWithEmailAndPassword(email, password);
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
    firebase.auth().signOut().then(() => {
        showStatus("Logged out.", "info");
    }).catch((error) => {
        showStatus("Logout failed: " + error.message, "error");
    });
}

// Event Listeners
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    processAuth(AUTH_MODE_LOGIN);
});

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

// Initial initialization
setAuthMode(AUTH_MODE_LOGIN);
