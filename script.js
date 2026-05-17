let startTime = 0;
let totalWordsRead = 0;
let usedPassages = [];

// GLOBAL ERROR LOGGER FOR MOBILE DEBUGGING
window.addEventListener('error', function (e) {
    const errorDiv = document.getElementById('mobile-debug-error-bar');
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = `Error: ${e.message} at ${e.filename}:${e.lineno}:${e.colno}`;
    }
    console.error("GLOBAL ERROR caught:", e);
});
window.onunhandledrejection = function (event) {
    var div = document.getElementById('mobile-debug-error-bar');
    if (div) {
        div.style.display = 'block';
        div.innerText = 'PROMISE ERROR: ' + event.reason;
    }
};

// SIGNAL READY
document.addEventListener('DOMContentLoaded', function () {
    var statusBar = document.getElementById('js-status-bar');
    if (statusBar) statusBar.innerText = 'JS: Ready';
});
const assessmentData = {
    EASY: [
        {
            title: "The Solar System",
            text: "The solar system is what’s up there out and about in space, all around the planet we live on! That’s right! Our sun, the star that warms and lights up the Earth! And not forgetting all the planets that move around it, our moon, and so forth. There are eight planets (yeah, we are in the third group of them from the sun!). Some of the planets are made of rock, and others are made of gases. How do astronauts find out about all there is to know out there? They use telescopes and satellites, of course. Some intelligent scientists even blast rockets to the planets and moons! Of course, the moon orbits around the Earth and even helps the ocean with its tides. Finding out about the solar system teaches us about the universe and how the planets orbit day after day!",
            questions: [
                { q: "Why do scientists use telescopes and satellites?", options: ["To study outer space", "To clean the moon daily", "To change the planets' paths", "To control the ocean tides"], correct: 0 },
                { q: "What can be inferred about the moon from the passage?", options: ["It produces heat for Earth", "It moves farther every year", "It affects the movement of tides", "It shines brighter than the sun"], correct: 2 },
                { q: "Which statement best explains the solar system?", options: ["It contains stars only", "It is made of moving clouds", "It includes the sun and planets", "It covers only Earth and the moon"], correct: 2 },
                { q: "Why is learning about the solar system important?", options: ["It teaches people about planets", "It explains how rockets are built", "It helps astronauts live on Earth", "It shows how oceans form waves"], correct: 0 },
                { q: "Which detail supports the idea that scientists explore space actively?", options: ["The moon moves around Earth", "Some planets are made of gas", "Astronauts use books about stars", "Scientists send rockets to planets"], correct: 3 }
            ]
        },
        {
            title: "The Human Body",
            text: "The human body is made of a lot of neat systems that work every day! The skeletal system gives support to our bodies, and protects important organs in us in case we should fall or fall against something. Then, we have muscles that help us to move more things and, in most cases, allow us to carry things too! Who knew that our blood throughout our body is moved around just by a special system, the circulatory system? Our heart pumps blood all about the body to all the nooks and crannies with oxygen. Using the lungs of the respiratory system, we help ourselves take in the air we need. The food we eat is aided by the digestive system, which allows us to break it down for nourishment and energy. To keep us from getting sick, doctors and nurses study our bodies and all their workings. And it is only some of the repairs and stuff the human body is supposed to do to stay healthy and moving that I have just scratched the surface of! Another would be drinking plenty of water, and of course, taking a nice leisurely walk daily!",
            questions: [
                { q: "What is the main function of the skeletal system?", options: ["To carry oxygen in blood", "To support and protect organs", "To break food into nutrients", "To move air through the lungs"], correct: 1 },
                { q: "Why is the circulatory system important?", options: ["It protects bones from damage", "It pumps blood through the body", "It allows food to enter muscles", "It controls movement during exercise"], correct: 1 },
                { q: "What may happen if students lack proper sleep?", options: ["They may lose concentration", "They may stop breathing easily", "They may forget how to walk", "They may weaken their bones"], correct: 0 },
                { q: "Which body system helps people breathe air?", options: ["Digestive system", "Skeletal system", "Respiratory system", "Circulatory system"], correct: 2 },
                { q: "Which idea is emphasized in the passage?", options: ["Healthy habits help the body", "Exercise is harder than studying", "Muscles are stronger than bones", "Doctors repair every body problem"], correct: 0 }
            ]
        },
        {
            title: "Plants and Photosynthesis",
            text: "Here’s a bit about the plants! Yes, they are living organisms, and need direct sunlight, water, air, and nutrients to survive! Most of them are neat and even make their own food in a nifty process called photosynthesis. In fact, they use the sunlight, and carbon dioxide and water that they take in, to do a process and produce glucose and oxygen! Chlorophyll, the green substance in leaves, enables plants to absorb sunlight. Roots draw earth and moisture from the soil for use in the plant. Stems convey the water and nutrients to different parts of the plant. Flowers are organs that help a plant to bear seed. Plants are of great importance to animal life. All the air we breathe is made by them, as well as nearly all the food of most of our race; on the other hand, without them, we animals could not live or possibly even exist.",
            questions: [
                { q: "What helps plants absorb sunlight?", options: ["Roots inside the soil", "Flowers holding the seeds", "Chlorophyll in the leaves", "Water stored in the stems"], correct: 2 },
                { q: "Why are plants important to animals?", options: ["They create clean oxygen", "They produce heavy rainfall", "They protect mountains daily", "They move nutrients underground"], correct: 0 },
                { q: "What is produced during photosynthesis?", options: ["Oxygen and glucose", "Water and minerals", "Chlorophyll and roots", "Carbon dioxide and soil"], correct: 0 },
                { q: "Which plant part carries water and nutrients?", options: ["Leaves near the flowers", "Stems throughout the plant", "Roots beneath the ground", "Seeds inside the flower"], correct: 1 },
                { q: "What would most likely happen without plants?", options: ["Animals would grow faster", "Rivers would stop flowing", "Humans would stop building", "Living things could not survive"], correct: 3 }
            ]
        },
        {
            title: "The Importance of Geometry",
            text: "Geometry is a part of mathematics that has to do with certain figures, lines, angles, and space. We learned in geometry class that there are triangles, circles, and rectangles, and other classes of figures. A triangle, we learned, is a figure with three sides and three angles. A rectangle is a figure with four sides, but with opposite sides equal. Geometry is used by builders, engineers, and artists. Architects use it in building designs and engineers use it in bridges and other work. We learned to find the perimeter and the area. The volume was found by using a formula. A ruler and a protractor help us to measure lines and angles. Doing all this kind of work helped us to learn to think clearly and to think logically. Geometry assists individuals in comprehending patterns, dimensions, and how objects are positioned relative to one another.",
            questions: [
                { q: "What does geometry mainly study?", options: ["Plants and living things", "Numbers used in division", "Shapes, lines, and angles", "Stories from world history"], correct: 2 },
                { q: "Why do architects use geometry?", options: ["To improve reading skills", "To create building designs", "To measure animal weight", "To study weather patterns"], correct: 1 },
                { q: "Which tool measures angles correctly?", options: ["Compass used in science", "Yardstick used outdoors", "Calculator used in class", "Protractor used in geometry"], correct: 3 },
                { q: "What skill can geometry improve?", options: ["Logical thinking abilities", "Musical performance skills", "Creative storytelling talent", "Physical strength and balance"], correct: 0 },
                { q: "Which statement about rectangles is correct?", options: ["They contain three equal sides", "They have opposite sides equal", "They form circles and curves", "They include five sharp angles"], correct: 1 }
            ]
        },
        {
            title: "Learning Percentages",
            text: "Percentages are applicable for comparing any two numbers in terms of 100. The symbol for percent is the percent sign (or %). Students apply percentages in their lessons in mathematics relative to problems about discounts and prices; it is also used in relation to grades and data; that is, 90 percent shows that there are 90 right answers out of the one hundred. Stores often employ percent-off during the same periods so they can reduce prices for items that otherwise would sell at a loss. Percent can be expressed sometimes as a fraction or a decimal; to express a percent numerically, students use their multiplication and division tables for each permutation of numbers. Also, graphs and tables are used to express information in terms of percent; we use percent to deal with statistics about money, voting, and costs, and so on; it helps us with school problems.",
            questions: [
                { q: "What does ninety percent mean?", options: ["Ninety out of one hundred", "Ninety added to one hundred", "Ninety divided by ten groups", "Ninety smaller than fifty percent"], correct: 0 },
                { q: "Why do stores use percent-off sales?", options: ["To increase school grades", "To compare voting results", "To lower prices on items", "To solve difficult equations"], correct: 2 },
                { q: "Which form can also represent percent?", options: ["A paragraph and table", "A graph and picture", "A fraction or decimal", "A ruler and symbol"], correct: 2 },
                { q: "How are percentages useful in school?", options: ["They explain weather conditions", "They measure classroom furniture", "They describe plant growth daily", "They help students solve problems"], correct: 3 },
                { q: "Which situation most likely uses percentages?", options: ["Measuring a wooden desk", "Finding a test score result", "Naming planets in the system", "Identifying parts of a flower"], correct: 1 }
            ]
        },
        {
            title: "Vocabulary of Measurement",
            text: "Everywhere in mathematics and science is the subject of measurement. We all measure length and height, distances, and the weights of things. The ordinary words used for measurement include meter and meter stick in mathematics, mile and yard, and Greek foot to the inch in science. The ruler measures the short things, while the measuring tape takes in the longer ones. Children love measurement, so besides solving their word problems with tape and yardsticks, athletes take the",
            questions: [
                { q: "What is measurement commonly used for?", options: ["Studying poetry and drama", "Comparing size and distance", "Learning songs for programs", "Reading stories in libraries"], correct: 1 },
                { q: "Which tool is best for longer measurements?", options: ["Small classroom ruler", "Short wooden pencil", "Measuring tape tool", "Science notebook paper"], correct: 2 },
                { q: "Why do athletes use measurement?", options: ["To solve algebra equations", "To improve reading comprehension", "To compare physical performance", "To identify states of matter"], correct: 2 },
                { q: "Which unit measures shorter distances?", options: ["Meter and inch", "Kilogram and liter", "Calendar and clock", "Fraction and percent"], correct: 0 },
                { q: "What can students learn from measurement activities?", options: ["How to design buildings", "How to describe feelings", "How to understand quantities", "How to memorize poems quickly"], correct: 2 }
            ]
        },
        {
            title: "Learning Good Study Habits",
            text: "Good study habits help students succeed in school and improve academic performance. Students should create a study schedule to manage time wisely and complete assignments on time. A quiet environment helps students focus during reading and writing activities. Taking notes during lessons also improves understanding and memory. Some students review vocabulary words and practice grammar exercises every night. Others ask teachers questions when they do not understand a lesson. Rest and proper sleep are important because tired students may lose concentration in class. Reading books regularly can improve comprehension and communication skills. Developing good study habits helps students become responsible, organized, and confident learners in different subjects.",
            questions: [
                { q: "Why should students create study schedules?", options: ["To decorate school notebooks", "To manage time wisely", "To avoid classroom lessons", "To shorten homework periods"], correct: 1 },
                { q: "What helps students focus during studying?", options: ["A quiet environment", "A crowded hallway", "A noisy playground", "A busy cafeteria"], correct: 0 },
                { q: "Why is proper sleep important for students?", options: ["It improves handwriting speed", "It increases classroom noise", "It prevents losing concentration", "It removes difficult assignments"], correct: 2 },
                { q: "Which activity can improve communication skills?", options: ["Reading books regularly", "Skipping grammar exercises", "Ignoring teacher instructions", "Avoiding classroom discussions"], correct: 0 },
                { q: "What is the main idea of the passage?", options: ["Students enjoy different hobbies", "Good habits support learning success", "Teachers assign difficult projects daily", "Schools require longer study hours"], correct: 1 }
            ]
        },
        {
            title: "Preparing for a School Program",
            text: "Students in Grade Seven prepared for the school program with excitement and teamwork. Some students practiced singing for the choir presentation, while others rehearsed dances and short plays. The teachers guided students during practice and reminded them to speak clearly on stage. One group worked on decorations using colorful paper and art materials. Another group prepared invitations for parents and guests. During the final rehearsal, students felt nervous but continued practicing confidently. On the day of the program, everyone wore clean uniforms and performed well. The audience applauded loudly after each performance. The school program became successful because students cooperated and showed responsibility throughout the preparation activities.",
            questions: [
                { q: "What helped make the school program successful?", options: ["Expensive stage decorations", "Cooperation among students", "Short practice sessions daily", "Strict classroom punishments"], correct: 1 },
                { q: "Why did students continue rehearsing confidently?", options: ["They wanted to avoid homework", "They planned to leave early", "They hoped to impress visitors", "They wished to improve performances"], correct: 3 },
                { q: "What was one group responsible for preparing?", options: ["Colorful decorations and materials", "Science experiments for visitors", "Sports equipment for athletes", "Musical instruments for teachers"], correct: 0 },
                { q: "How did the audience respond after performances?", options: ["They remained completely silent", "They asked difficult questions", "They applauded very loudly", "They left the building early"], correct: 2 },
                { q: "Which trait did students show during preparation?", options: ["Laziness during rehearsals", "Responsibility in activities", "Fear of speaking publicly", "Anger toward classmates"], correct: 1 }
            ]
        },
        {
            title: "The School Library",
            text: "The school library is a quiet place where students can read and study. Shelves are filled with books about science, mathematics, history, and literature. Students visit the library to borrow books, complete assignments, and improve reading skills. The librarian helps students find information and choose interesting stories to read. Some students prefer adventure books, while others enjoy poetry and biographies. Reading regularly helps students learn new vocabulary and improve comprehension. The library also has dictionaries, newspapers, and reference materials for research projects. Many students enjoy spending time in the library because it provides knowledge, peace, and opportunities to discover new ideas and information.",
            questions: [
                { q: "Why do students visit the library?", options: ["To practice outdoor games", "To complete schoolwork tasks", "To prepare food for lunch", "To perform musical programs"], correct: 1 },
                { q: "What does the librarian help students do?", options: ["Repair damaged furniture", "Organize classroom schedules", "Find books and information", "Practice speeches for contests"], correct: 2 },
                { q: "Which material is found in the library?", options: ["Cooking ingredients and tools", "Newspapers and dictionaries", "Sports uniforms and medals", "Paintbrushes and art supplies"], correct: 1 },
                { q: "Why do many students enjoy the library?", options: ["It offers quiet and knowledge", "It provides free classroom grades", "It allows games during lessons", "It replaces daily homework tasks"], correct: 0 },
                { q: "What skill can improve through regular reading?", options: ["Swimming and running speed", "Singing and dance movements", "Vocabulary and comprehension", "Drawing and painting techniques"], correct: 2 }
            ]
        },
        {
            title: "A Helpful Friend",
            text: "Maria is a kind and helpful student in Grade Seven. Every morning, she arrives at school early and greets her classmates with a smile. During English class, she helps other students understand difficult words and sentences. One day, her friend forgot to bring a notebook for the lesson. Maria shared her extra notebook without hesitation. After class, the teacher praised Maria for her good attitude and responsibility. Her classmates admired her because she was respectful and caring. Maria believes that helping others can make school a happier place. Because of her kindness, many students enjoy being her friend and working with her during activities.",
            questions: [
                { q: "Why did Maria’s classmates admire her?", options: ["She always answered quickly", "She behaved kindly and respectfully", "She finished tasks before others", "She joined every school contest"], correct: 1 },
                { q: "What did Maria do when her friend forgot a notebook?", options: ["She shared an extra notebook", "She borrowed one from teachers", "She asked classmates for help", "She explained the lesson aloud"], correct: 0 },
                { q: "How did the teacher respond to Maria’s actions?", options: ["The teacher ignored her kindness", "The teacher assigned more homework", "The teacher praised her attitude", "The teacher excused her absence"], correct: 2 },
                { q: "What belief does Maria express in the passage?", options: ["Teamwork always wins contests", "Kindness can improve school life", "Students should avoid mistakes", "Friends must study every night"], correct: 1 },
                { q: "Which word best describes Maria?", options: ["Caring toward other people", "Quiet during group activities", "Nervous before class lessons", "Competitive in school programs"], correct: 0 }
            ]
        },
        {
            title: "Patterns and Algebra",
            text: "Algebra is a branch of mathematics that uses symbols and letters to represent numbers. Students learn to solve equations and identify patterns in algebra class. A variable is a letter that stands for an unknown number. Equations contain equal signs that show two sides have the same value. Patterns help students predict what comes next in a sequence. For example, adding two to each number creates a simple pattern. Algebra is useful in business, science, and technology. Engineers and scientists use algebra to solve problems and make calculations. Understanding algebra helps students develop critical thinking and improve their mathematical reasoning skills every day.",
            questions: [
                { q: "What does a variable represent in algebra?", options: ["A hidden unknown number", "A completed math answer", "A graph with straight lines", "A ruler used for measuring"], correct: 0 },
                { q: "Why are patterns important in algebra?", options: ["They improve drawing abilities", "They help predict sequences", "They explain weather changes", "They replace scientific tools"], correct: 1 },
                { q: "Which field commonly uses algebra?", options: ["Literature and poetry", "Music and painting", "Business and science", "Farming and cooking"], correct: 2 },
                { q: "What does an equal sign show in equations?", options: ["Both sides have equal value", "Numbers should change places", "Variables must stay hidden", "Patterns continue forever daily"], correct: 0 },
                { q: "What skill does algebra help students develop?", options: ["Strong athletic coordination", "Advanced cooking techniques", "Mathematical reasoning skills", "Artistic design creativity"], correct: 2 }
            ]
        },
        {
            title: "States of Matter",
            text: "Matter is anything that has mass and takes up space. The three common states of matter are solid, liquid, and gas. Solids have a fixed shape and volume. Liquids have a fixed volume but can change shape depending on the container. Gases spread out and do not have a fixed shape or volume. Heat can change the state of matter. Ice melts into water when heated. Water turns into vapor during evaporation. Scientists study matter to understand physical and chemical changes. Matter is found everywhere, including rocks, air, water, plants, and animals. Understanding matter helps people learn more about science and daily life.",
            questions: [
                { q: "Which state of matter has a fixed shape?", options: ["Gas inside the air", "Liquid inside bottles", "Vapor during evaporation", "Solid with steady form"], correct: 3 },
                { q: "What happens when ice is heated?", options: ["It changes into water", "It spreads into gas", "It becomes a hard rock", "It disappears from matter"], correct: 0 },
                { q: "Why do scientists study matter?", options: ["To understand physical changes", "To improve musical performances", "To create fictional stories", "To design school uniforms"], correct: 0 },
                { q: "Which statement correctly describes gases?", options: ["They keep a fixed shape", "They spread out freely", "They remain hard and solid", "They stay inside the soil"], correct: 1 },
                { q: "What is the main idea of the passage?", options: ["Matter exists in different forms", "Water changes only during winter", "Solids are heavier than liquids", "Science explains classroom behavior"], correct: 0 }
            ]
        }
    ],
    MODERATE: [
        {
            title: "A Peaceful Morning in the Park",
            text: "On a quiet morning, Lila walked to the small park near her home. The grass was still wet with dew, and the air smelled fresh and clean. She carried a book but decided to watch the birds instead. A bright yellow bird landed on a bench, chirping softly. Lila smiled and sat nearby, enjoying the peaceful moment. Soon, a gentle breeze moved the leaves, creating a calming sound. She felt relaxed and happy, grateful for the simple beauty around her. After a while, she opened her book and began to read quietly. The quiet park made her feel calm inside.",
            questions: [
                { q: "Why did Lila watch the birds instead of reading her book?", options: ["The book she had was not fun to read", "The time was too short to start reading", "The place was too noisy for her to read", "The Park felt more interesting than reading her book"], correct: 3 },
                { q: "What is the effect of the order of events in the passage?", options: ["It shows Lila quickly deciding to leave the park", "It shows Lila slowly becoming calm in the park", "It shows Lila slowly becoming bored in the park", "It shows Lila quickly becoming active in the park"], correct: 1 },
                { q: "What does the yellow bird represent in the passage?", options: ["It shows something new that surprises Lila", "It shows a sign that she should leave soon", "It shows a simple and beautiful part of nature", "It shows a small distraction from her reading"], correct: 2 },
                { q: "How would the mood change if the park were crowded and noisy?", options: ["It would feel the same as a quiet morning", "It would feel more active and fuller of people", "It would feel more exciting and fuller of noise", "It would feel less calm and more uncomfortable"], correct: 3 },
                { q: "How does Lila’s mental state change in the passage?", options: ["She becomes more worried about her situation", "She becomes more confused about what to do", "She becomes more active while staying outside", "She becomes more relaxed and calmer over time"], correct: 3 }
            ]
        },
        {
            title: "Cooking with Grandmother",
            text: "Marco loved helping his grandmother in the kitchen every afternoon. Together, they prepared simple meals that filled the house with warm, delicious smells. He learned how to chop vegetables carefully and stir soup slowly. His grandmother often told stories about her childhood while they cooked. Marco listened closely, laughing at her funny memories. One day, he surprised her by cooking a dish on his own. She tasted it and smiled proudly. Marco felt proud too, knowing he had learned something special. Cooking became their favorite way to spend time together and share love through food. They grew closer every day.",
            questions: [
                { q: "What was Marco doing every afternoon?", options: ["Games played in the home", "Watching programs on television", "Assisting his grandmother in cooking meals", "Going off by yourself to read books in silence"], correct: 2 },
                { q: "What did Marco learn to do in the kitchen?", options: ["How to run fast every day", "How to sing songs very loudly", "How to chop vegetables cautiously", "How to paint pictures in a beautiful way"], correct: 2 },
                { q: "What did Marco’s grandmother do when she was cooking?", options: ["Peacefully slept next to the table", "Shared stories from her childhood", "Used headphones to listen to music", "Related watched movies while cooking"], correct: 1 },
                { q: "How do you think Marco surprised his grandma?", options: ["Cooked a dish on his own", "Food purchased from the market", "The kitchen was cleaned very fast", "Presented her with flowers from his garden"], correct: 0 },
                { q: "What did Marco learn as he cooked?", options: ["Cooking is just for old folks", "People feel tired after cooking", "Time is too precious to waste on cooking", "If you cook, you can’t help but share love"], correct: 3 }
            ]
        },
        {
            title: "The River Adventure",
            text: "At the edge of the village, there was a small river that sparkled under the sun. Children often gathered there after school to play and cool their feet in the water. Nina liked to skip stones across the surface, counting how many times they bounced. Her friend Leo preferred building tiny boats from leaves and sticks. One afternoon, they decided to race their boats downstream. They cheered and ran along the riverbank, laughing loudly. In the end, both boats got stuck near the same rock, and they agreed it was a tie. They promised to return and play again tomorrow.",
            questions: [
                { q: "Where was the river located?", options: ["Behind the large school", "At the edge of the village", "At the center of the town", "Near the busy marketplace"], correct: 1 },
                { q: "What did Nina enjoy doing at the river?", options: ["Catch fish using a net", "Skip stones on the water", "Swim across the deep river", "Build tiny boats out of leaves"], correct: 1 },
                { q: "What did Leo enjoy doing?", options: ["Rushing down the path", "Sitting on the grass quietly", "Counting the stones carefully", "Building tiny boats out of leaves"], correct: 3 },
                { q: "What did they do during their boat race?", options: ["Nina was a very fast boat", "One boat sank in the water", "Leo’s boat reached the end", "Both boats became stuck together"], correct: 3 },
                { q: "What do Nina and Leo go on to decide in the end?", options: ["They needed bigger boats", "The river was too dangerous", "Benefits of withdrawing from there", "The race ended without a clear victor"], correct: 3 }
            ]
        },
        {
            title: "Watching the Sunset",
            text: "Every evening, Tomas sat by his window and watched the sky change colors. The bright blue slowly turned into shades of orange, pink, and purple. He liked to imagine stories about the clouds, seeing shapes like animals and castles. Sometimes, he wrote his ideas in a small notebook beside him. His younger sister would join him and point out her own shapes in the sky. They often laughed at their different ideas. As the stars began to appear, Tomas felt calm and inspired. Watching the sunset became his favorite way to relax and end his day peacefully.",
            questions: [
                { q: "How did Tomas watch the sunset?", options: ["From their house roof", "By his window at home", "Sitting in their backyard", "On a park bench near the flowing river"], correct: 1 },
                { q: "What change happened to the sky during sunset?", options: ["It changed from light to dark", "It went orange, pink, and purple", "It changed from blue to soft colors", "It gave way to mixed warm evening shades"], correct: 1 },
                { q: "What did Tomas enjoy doing while watching the clouds?", options: ["Making notes on his ideas", "Building out stories with cloud shapes", "Looking with one's eyes at the shapes in the sky", "Developing scenes from clouds and looking at them"], correct: 1 },
                { q: "Who accompanied Tomas during the sunset?", options: ["His close friend", "His older cousin", "His younger sister", "His next-door neighbor"], correct: 2 },
                { q: "How did Tomas feel at the end of the day?", options: ["Calm and peaceful", "Quiet and thoughtful", "Relaxed and inspired", "Pleased with, deeply full of joy"], correct: 2 }
            ]
        },
        {
            title: "The Old Attic Box",
            text: "Sara found a small, dusty box in the corner of her attic one weekend. Curious, she opened it and discovered old photographs and letters inside. Each picture showed people she did not recognize, smiling and posing together. She asked her mother about them and learned they were her great-grandparents and relatives from long ago.",
            questions: [
                { q: "Where did Sara find her little dusty box in the story?", options: ["Near the hallway door", "Beneath the table", "Far corner of her attic", "Hidden in a cabinet"], correct: 2 },
                { q: "When Sara opened the box, what did she find?", options: ["Old photographs and letters", "Toys and games", "Repair tools", "New garments"], correct: 0 },
                { q: "Who were the people she found in the photographs?", options: ["Neighbors", "Classmates", "Strangers", "Great-grandparents and relatives"], correct: 3 },
                { q: "What were Sara’s steps after discovering the photographs?", options: ["Asked her mother", "Showed friends", "Returned the box", "Kept them secret"], correct: 0 },
                { q: "What do we learn from Sara finding the box?", options: ["Family history influences identity", "Old things are always neat", "Young people don't care about family", "Discovery obscures the past"], correct: 0 }
            ]
        },
        {
            title: "Rainy Day Fort",
            text: "During a rainy afternoon, Ben stayed indoors and searched for something fun to do. He decided to build a small fort using blankets, chairs, and pillows. Carefully, he arranged everything to create a cozy space. Inside, he brought a flashlight and his favorite storybook. The sound of rain tapping on the roof made the moment even more relaxing. Ben imagined he was in a secret hideout, far away from everything. He spent hours reading and playing quietly. When the rain stopped, he stepped outside feeling happy, already planning to build a bigger fort next time.",
            questions: [
                { q: "What was the weather like when the story was set?", options: ["Rainy", "Sunny", "Windy", "Overcast"], correct: 0 },
                { q: "What did Ben decide to build?", options: ["Schoolwork", "A small fort", "Tidying room", "A new game"], correct: 1 },
                { q: "What did Ben use to make the fort?", options: ["Plastic containers", "Wood boards", "Blankets, chairs, pillows", "Cardboard boxes"], correct: 2 },
                { q: "How did Ben get into his fort?", options: ["Brought snacks", "Brought school supplies", "Brought a flashlight and book", "Brought toys and games"], correct: 2 },
                { q: "How did Ben feel after the rain ended?", options: ["Restless", "Worn out", "Dissatisfied", "Excited to build a bigger one"], correct: 3 }
            ]
        },
        {
            title: "Mia’s First Presentation",
            text: "In school, Mia was nervous about giving her first-class presentation. She practiced her speech many times at home, standing in front of a mirror. On the day of the presentation, her hands felt cold, and her heart beat fast. When it was her turn, she took a deep breath and began speaking slowly. As she continued, she became more confident. Her classmates listened quietly and smiled at her. When she finished, they clapped, and her teacher praised her effort. Mia felt proud of herself for facing her fear and doing her best in front of everyone.",
            questions: [
                { q: "What feelings did Mia have before her presentation?", options: ["Excited", "Indifferent", "Confident", "Nervous"], correct: 3 },
                { q: "How did Mia get her presentation ready?", options: ["Silent review", "Asked classmates", "Used videos", "Practiced in front of a mirror"], correct: 3 },
                { q: "When it was Mia’s turn, what did she do?", options: ["Paused and spoke slowly", "Postponed the turn", "Read passively", "Spoke fast"], correct: 0 },
                { q: "How did Mia’s classmates react?", options: ["Ignored her", "Interrupted her", "Listened and smiled", "Asked questions"], correct: 2 },
                { q: "What gave Mia pride when she finished?", options: ["Speed", "High score", "Zero mistakes", "Facing fear and determination"], correct: 3 }
            ]
        },
        {
            title: "Cleaning Day Discoveries",
            text: "One bright morning, Carlos decided to clean his room after weeks of putting it off. He started by picking up clothes and organizing his desk. As he worked, he found old toys and books he had forgotten about. Each item brought back happy memories from his childhood. Instead of throwing them away, he chose some to donate to others. After hours of cleaning, his room looked neat and fresh. Carlos felt a sense of accomplishment and peace. He promised himself to keep his space tidy and to help others by sharing things he no longer needed.",
            questions: [
                { q: "Why did Carlos decide to clean his room?", options: ["Family advice", "Routine task", "Looking for missing items", "Organizing after postponing"], correct: 3 },
                { q: "What did Carlos do first?", options: ["Picked up clothes and desk", "Reminisced", "Sorted old books", "Sorted donations"], correct: 0 },
                { q: "What did Carlos discover while cleaning?", options: ["Broken goods", "Large storage", "Items needing repair", "Significant childhood recollections"], correct: 3 },
                { q: "What did Carlos do with some items?", options: ["Trash them", "Donate them", "Keep in boxes", "Keep for later"], correct: 1 },
                { q: "How did Carlos feel after finishing?", options: ["Regretful", "Triumphant and at peace", "Interested in more cleaning", "Realized the challenge"], correct: 1 }
            ]
        },
        {
            title: "The Group Project",
            text: "In senior high school, students often work on group projects. One group was asked to prepare a report about the importance of reading. They divided the tasks: some researched, others wrote, and one member practiced reading the report aloud. During the presentation, the group performed well because everyone understood the material. Their teacher noted that strong reading skills helped them succeed.",
            questions: [
                { q: "What was the group project about?", options: ["Sports", "Music", "Science", "Reading"], correct: 3 },
                { q: "How did the group divide tasks?", options: ["One person worked", "Copied from book", "Same tasks", "Researched, wrote, read aloud"], correct: 3 },
                { q: "Why did the group perform well?", options: ["No teacher", "Skipped practice", "Memorized", "Understood material"], correct: 3 },
                { q: "What skill helped them succeed?", options: ["Singing", "Reading", "Drawing", "Dancing"], correct: 1 },
                { q: "Who noticed their success?", options: ["Principal", "Parents", "Teacher", "Classmate"], correct: 2 }
            ]
        },
        {
            title: "The Exam",
            text: "During an English exam, students were asked to read a passage and answer questions. Some students read quickly but misunderstood the text. Others read carefully and answered correctly. The teacher explained that accuracy and comprehension are more important than speed alone. Students realized that balanced reading skills lead to better academic performance.",
            questions: [
                { q: "What kind of exam was given?", options: ["Math", "History", "English", "Science"], correct: 2 },
                { q: "What happened to students who read quickly?", options: ["Wrote essay", "Skipped exam", "Answered correctly", "Misunderstood text"], correct: 3 },
                { q: "What did careful readers do?", options: ["Left room", "Finished early", "Failed test", "Answered correctly"], correct: 3 },
                { q: "What did the teacher emphasize?", options: ["Speed", "Writing", "Memorization", "Accuracy and comprehension"], correct: 3 },
                { q: "What did students realize?", options: ["Reading is boring", "Exams are useless", "Speed is everything", "Balanced skills improve performance"], correct: 3 }
            ]
        }
    ],
    DIFFICULT: [
        {
            title: "The Unexpected Visitor",
            text: "On a quiet afternoon, Elena was studying when she heard a soft knock at the door. She opened it slowly and saw a small puppy standing outside, shivering and alone. Elena looked around but did not see anyone nearby. She brought the puppy inside and gave it food and water. The puppy quickly warmed up and began wagging its tail. Elena felt happy taking care of it. Later, she asked her neighbors if they had lost a puppy. Soon, the owner arrived and thanked her. Although she felt sad to say goodbye, she was glad she had helped the little animal safely return home.",
            questions: [
                { q: "Primary reason Elena brought the puppy inside?", options: ["Noise", "Wished to keep it", "Give to neighbor", "Worry about its condition"], correct: 3 },
                { q: "Detail suggesting puppy felt safe?", options: ["Feeding it", "Leaving it outside", "Ignoring it", "Wagging its tail"], correct: 3 },
                { q: "What can be inferred about Elena?", options: ["Indecisive student", "Knows all neighbors", "Caring/helpful nature", "Attached to animals"], correct: 2 },
                { q: "Why ask neighbors about the puppy?", options: ["Couldn't find owner", "Attachment", "Wanted praise", "Tired of care"], correct: 0 },
                { q: "Central theme?", options: ["Care and attention", "Communities", "Small acts of responsibility", "Tough calls"], correct: 2 }
            ]
        },
        {
            title: "A Lesson in Responsibility",
            text: "Kevin received a plant from his teacher to learn responsibility. Initially, he watered it daily. Over time, he became busy and forgot. He noticed leaves turning yellow and dry. He felt worried and realized his mistake. From then on, he cared for it properly and it grew healthy again. He learned responsibility requires consistency and patience.",
            questions: [
                { q: "Why did teacher give Kevin a plant?", options: ["Home décor", "Gardening interest", "Practice caring/responsibility", "Classroom prize"], correct: 2 },
                { q: "What made the plant unhealthy?", options: ["Poor light", "Irregular watering", "Wrong container", "Outdoor conditions"], correct: 1 },
                { q: "How did Kevin react to the dry plant?", options: ["Accepted issue", "Delegated care", "Managed properly again", "Replaced it"], correct: 2 },
                { q: "Synonym for 'consistency' in text?", options: ["Time management", "Following rules", "Regular intervals", "Easy completion"], correct: 2 },
                { q: "Ultimate lesson?", options: ["Avoid mistakes", "Vital teachers", "Specific knowledge", "Consistent work and care"], correct: 3 }
            ]
        },
        {
            title: "The School Project Challenge",
            text: "Anna’s group had to create an environmental poster. Initially, they disagreed on ideas, causing delays. After discussing calmly, they divided tasks and combined ideas. The teacher praised their teamwork and creativity. Anna realized working together with different opinions leads to success.",
            questions: [
                { q: "Initial problem?", options: ["No time", "Different ideas", "Lack of effort", "Missing materials"], correct: 1 },
                { q: "How was conflict resolved?", options: ["Strict rule", "Single leader", "Ignored disagreement", "Divided tasks and combined ideas"], correct: 3 },
                { q: "Teamwork outcome?", options: ["Solo is better", "Collaboration is superior", "Planning not needed", "Conflict prevents work"], correct: 1 },
                { q: "Why praise from teacher?", options: ["No discussion", "Independency", "Cooperation despite differences", "Ignoring leader"], correct: 2 },
                { q: "Main idea?", options: ["Teams equal quality", "Innefective results", "Individual initiative", "Clear instructions"], correct: 0 }
            ]
        },
        {
            title: "The Power of Practice",
            text: "Jason wanted to improve basketball skills. He struggled at first, missing shots. He watched videos and asked his coach for advice. Slowly, his aim improved. One day, he scored the winning shot. He learned consistent practice and determination achieve goals.",
            questions: [
                { q: "Challenge at beginning?", options: ["Lack of interest", "Struggling performance", "Teammate pressure", "No chance to play"], correct: 1 },
                { q: "How to improve?", options: ["Avoid hard training", "Just watch", "Consistent practice and advice", "No preparation"], correct: 2 },
                { q: "What does success demonstrate?", options: ["No guidance needed", "Innate talent", "Continuous practice results", "Quick results"], correct: 2 },
                { q: "Winning shot significance?", options: ["Proof of hard work", "Teammates ignored him", "Against rivals", "Berated for performance"], correct: 0 },
                { q: "Central message?", options: ["Talent > Practice", "Sports competition", "Natural ability", "Dedication leads to skills"], correct: 3 }
            ]
        },
        {
            title: "A Visit to the Library",
            text: "Lena visited the library for research. The quiet atmosphere helped her focus. Librarian assisted with resources. Lena discovered new facts and realized the value of libraries. She left feeling knowledgeable and inspired.",
            questions: [
                { q: "Why visit?", options: ["Meet friends", "Return books", "Research assignment", "Play games"], correct: 2 },
                { q: "Impact of atmosphere?", options: ["Distracted", "Bored", "Left early", "Concentration"], correct: 3 },
                { q: "Librarian's role?", options: ["Overlooked her", "Asked to leave", "Organizing only", "Assisted with resources"], correct: 3 },
                { q: "Realization?", options: ["Research is tiring", "Studying unimportant", "Libraries essential for learning", "Books are hard"], correct: 2 },
                { q: "Main takeaway?", options: ["Daily chore", "Research challenge", "Home study better", "Libraries support growth"], correct: 3 }
            ]
        },
        {
            title: "The Missing Homework",
            text: "Daniel forgot his homework. He felt nervous when asked to submit it. He realized he left it on his desk at home. Teacher allowed submission the next day. Daniel promised to be more organized. Taught him responsibility and checking belongings.",
            questions: [
                { q: "Why anxious?", options: ["Lost bag", "No studying", "Late", "Forgot homework"], correct: 3 },
                { q: "Daniel's realization?", options: ["Friend has it", "In locker", "Submitted early", "Left on desk at home"], correct: 3 },
                { q: "Teacher's reaction?", options: ["Lower grade", "Redo", "Overlooked it", "Submit next day"], correct: 3 },
                { q: "Lesson learned?", options: ["Ask for help", "Indifferent", "Organized and disciplined", "Home learning"], correct: 2 },
                { q: "Main message?", options: ["Strict rules", "Rules are tough", "Struggle for students", "Responsibility is key"], correct: 3 }
            ]
        },
        {
            title: "A Surprise Achievement",
            text: "Maya thought she was bad at drawing. Teacher encouraged practice. She drew sketches daily and improved. Her artwork was exhibit-chosen. She learned talent grows through effort and believing in oneself is key to success.",
            questions: [
                { q: "Initial view of talent?", options: ["Lacking skills", "Favorite subject", "Quite good", "Navigate life"], correct: 0 },
                { q: "Transformation cause?", options: ["Friend challenges", "Parents discouraged", "Teacher encouraged", "Competitions"], correct: 2 },
                { q: "Accomplishment?", options: ["Overlooked", "Showcased artwork", "Lost work", "Exhibit selection"], correct: 3 },
                { q: "Lesson on talent?", options: ["Effort required", "Irrelevant", "Fixed trait", "Flourishes through hard work"], correct: 3 },
                { q: "Main takeaway?", options: ["Challenging pursuit", "Faith in yourself", "Organizing exhibits", "More art activities"], correct: 1 }
            ]
        },
        {
            title: "The Friendly Competition",
            text: "Leo and Mark had a running competition. Leo led, Mark caught up. They crossed the finish line at the same time. Both felt energized. Competition helped them stay active and enjoy friendship.",
            questions: [
                { q: "Shared intention?", options: ["Pro race", "Who is fastest", "School event", "Activity and interaction"], correct: 3 },
                { q: "During race?", options: ["Finished in time", "Leo stopped", "Strong start vs catching up", "Did not finish"], correct: 2 },
                { q: "Behavior after?", options: ["Argued", "Complained", "Ignored each other", "Joked and complimented"], correct: 3 },
                { q: "Implication of 'friendly'?", options: ["Intense", "Assessed by teacher", "Official guidelines", "No hard feelings"], correct: 3 },
                { q: "Central theme?", options: ["Running is best", "Winning is goal", "Need clear winners", "Friendship via activities"], correct: 3 }
            ]
        },
        {
            title: "The Library Visit (Academic)",
            text: "Grade 12 students used the library for research. Read journals and articles. Some struggled with vocabulary; others summarized. Librarian noted comprehension is essential for learning. Reading proficiency supports academic success.",
            questions: [
                { q: "Why visit?", options: ["Games", "Friends", "Novels only", "Prepare for research"], correct: 3 },
                { q: "Materials read?", options: ["Comics", "Magazines", "Newspapers", "Journals, books, articles"], correct: 3 },
                { q: "Problem faced?", options: ["No teacher", "No time", "Broken computers", "Technical vocabulary"], correct: 3 },
                { q: "Helpful strategies?", options: ["Sleeping", "Ignoring", "Copying", "Summarizing and note-taking"], correct: 3 },
                { q: "Librarian's reminder?", options: ["Writing is useful", "Reading unnecessary", "Speed is most important", "Comprehension is essential"], correct: 3 }
            ]
        },
        {
            title: "The ABM Strand",
            text: "ABM students read business reports. Requires careful analysis. Class interpreted financial statements. Strong readers explained clearly. Strugglers focused only on numbers. Reading proficiency is vital in business studies.",
            questions: [
                { q: "Strand described?", options: ["Arts", "ABM", "STEM", "HUMSS"], correct: 1 },
                { q: "Texts read?", options: ["Novels", "Poems", "Comics", "Case studies and reports"], correct: 3 },
                { q: "Task given?", options: ["Draw chart", "Write poem", "Formulas", "Interpret financial statement"], correct: 3 },
                { q: "Who succeeded?", options: ["Skipped class", "Copied", "Ignored text", "Strong reading skills"], correct: 3 },
                { q: "Teacher's highlight?", options: ["Numbers enough", "Memorization", "Writing unnecessary", "Reading proficiency is vital"], correct: 3 }
            ]
        }
    ],
    VERY_DIFFICULT: [
        {
            title: "The Archivist’s Dilemma",
            text: "Elias preserved forgotten histories in a dimly lit archive. He found an anomalous document contradicting official records of a celebrated event. The official account seemed curated to hide uncomfortable truths. Elias feared revealing it would destabilize the institution. He felt torn between integrity and institutional loyalty.",
            questions: [
                { q: "Central conflict for Elias?", options: ["Reasoning for document", "Store or trash records", "Research vs duties", "Truth vs institutional loyalty"], correct: 3 },
                { q: "Implication of 'anomalous document'?", options: ["Accurate records", "Unfinished wear", "Manipulation to hide truths", "Fictional elements"], correct: 2 },
                { q: "What does hesitation suggest?", options: ["Fear of action", "Ethical dilemma of duty", "Lack of evidence", "Doubt of authenticity"], correct: 1 },
                { q: "Consequence of revealing?", options: ["Research advocacy", "Elevated standing", "Challenge authority/beliefs", "Public confidence"], correct: 2 },
                { q: "Broader theme?", options: ["Archival protection", "Personal career", "Preserving artifacts", "Truth vs consequences"], correct: 3 }
            ]
        },
        {
            title: "The Weight of Ambition (Adrian)",
            text: "Adrian climbed the corporate hierarchy with relentless ambition. He prioritized success over personal connections. As influence expanded, so did his isolation. Colleagues became subordinates. He reached the top but felt hollow, realizing he forfeited genuine fulfillment for accolades.",
            questions: [
                { q: "Main conflict (narrative error in doc, context Adrian)?", options: ["Tradition vs modern", "Truth vs loyalty", "Read vs write", "Ambition vs fulfillment"], correct: 3 },
                { q: "Corporate climb result?", options: ["More friends", "Transaction-based relations", "Better life balance", "Higher integrity"], correct: 1 },
                { q: "Paradox of achievement?", options: ["More money, more problems", "Success leads to isolation", "Desired everything but lost essence", "Skills equal accolades"], correct: 2 },
                { q: "Adrian's prioritization?", options: ["Success over connections", "Integrity over power", "Mentorship over metrics", "Family over corporate"], correct: 0 },
                { q: "Message?", options: ["Climb the ladder", "Ambition is vital", "Cost of relentless ambition", "Isolation is power"], correct: 2 }
            ]
        },
        {
            title: "The Silent Transformation",
            text: "Lena returned home after years, expecting familiarity. Instead, she saw streets modernized and faces replaced. Time had rewritten the place's identity. She realized change reshaped the town and her perception. Past existed only as reconstructed memory, vulnerable to distortion.",
            questions: [
                { q: "Insight gained?", options: ["Familiarity remains", "Change is physical only", "Memories shaped by time perception", "Fixed identity"], correct: 2 },
                { q: "Why feel alienated?", options: ["New environment perspective", "No people she knew", "Foreign practices", "Unrecognized locations"], correct: 0 },
                { q: "Implication about memory?", options: ["Unchanged", "Inevitable", "Historically accurate", "Reconstructive and distorted"], correct: 3 },
                { q: "Tone?", options: ["Hopeful", "Neutral", "Nostalgic/Uneasy", "Critical"], correct: 2 },
                { q: "Main theme?", options: ["Belonging via familiarity", "Certainty in past", "Time preserves all", "Change affects places and perception"], correct: 3 }
            ]
        },
        {
            title: "The Experiment of Consequences",
            text: "Dr. Varga conducted experiments challenging boundaries. In one study, a variable yielded unexpected results. Outcomes seemed benign but alarming consequences manifested. Despite warnings, he persisted. Realized his pursuit of knowledge precipitated uncontrollable outcomes.",
            questions: [
                { q: "Motivator for Dr. Varga?", options: ["Limited scope", "Past judgment", "Risk prevention", "Ignoring warnings for curiosity"], correct: 3 },
                { q: "Shift in outcomes?", options: ["Inadequate gear", "No records", "Insufficient data", "Unintended consequences"], correct: 3 },
                { q: "What do anomalies suggest?", options: ["Predictability", "Avoid all risks", "Discovery = success", "Curiosity can lead to unpleasantness"], correct: 3 },
                { q: "Reason for persistence?", options: ["Immediate halt", "Cautious adjustment", "Consultation", "Recognized hazards but continued"], correct: 3 },
                { q: "Central idea/Tone?", options: ["Excited possibilities", "Neutral results", "Optimistic", "Tense and cautionary"], correct: 3 }
            ]
        },
        {
            title: "The Echoes of Memory (Nathan)",
            text: "Nathan read an old journal. Past self seemed more confident. Discrepancies emerged between memory and record. Questioned reliability of recollections. Memory is a dynamic reconstruction susceptible to distortion.",
            questions: [
                { q: "Inner conflict?", options: ["Forgetting past", "Comparing successes", "Recorded clarity", "Questioning authenticity of memory"], correct: 3 },
                { q: "What does journal reveal?", options: ["Consistency", "Clarity", "Accuracy", "Difference between memory and record"], correct: 3 },
                { q: "Message about memory?", options: ["Fixed", "Reflects reality", "Depends on records", "Flexible/reconstructed"], correct: 3 },
                { q: "Feeling while reading?", options: ["Unaware", "Satisfied", "Uncertain about narrative", "Confident"], correct: 2 },
                { q: "Main theme?", options: ["Past shapes identity", "Memory is elusive/uncertain", "Reflection = growth", "Journals are accurate history"], correct: 1 }
            ]
        },
        {
            title: "The Collapse of Certainty (Victor)",
            text: "Victor relied on logic for control. Faced with a decision defying calculation, his framework failed. Methods were ineffective. Cognitive dissonance occurred, realizing not all life can be quantified. Certainty dissolved into ambiguity.",
            questions: [
                { q: "Initial belief system?", options: ["Unpredictability", "Every problem has logical solution", "Intuition", "Emotional choices"], correct: 1 },
                { q: "What challenges this?", options: ["Insufficient info", "Decision defying logic", "Multiple correct answers", "Emotional experience"], correct: 1 },
                { q: "Realization?", options: ["Logic is best", "Immediate solutions", "No uncertainty", "Not everything is logical"], correct: 3 },
                { q: "Theme?", options: ["Rational decision-making", "Complete understanding", "Straightforward solutions", "Certainty is limited in complexity"], correct: 3 },
                { q: "Tone?", options: ["Hopeful", "Neutral", "Confident", "Reflective and uncertain"], correct: 3 }
            ]
        },
        {
            title: "The Price of Understanding (Elise)",
            text: "Elise sought knowledge curiously. Uncovered ideas challenged beliefs. Realized limited previous understanding. Enlightenment cost certainty, replaced by complexity. Knowledge is a burden demanding questioning.",
            questions: [
                { q: "Drive for knowledge?", options: ["Recognition", "Academic success", "Intellectual capability", "Relentless curiosity"], correct: 3 },
                { q: "Effect of gaining knowledge?", options: ["Simplification", "Clear answers", "Boosts beliefs", "Sensitivity to complexity"], correct: 3 },
                { q: "Meaning of knowledge as a burden?", options: ["Limits access", "Prevents understanding", "Diminishes curiosity", "Acknowledging uncertainty"], correct: 3 },
                { q: "Theme?", options: ["Consistency", "Personal success", "Lack creates confusion", "Enlightenment and uncertainty"], correct: 3 },
                { q: "Tone?", options: ["Neutral", "Critical", "Enthusiastic", "Reflective/contemplative"], correct: 3 }
            ]
        },
        {
            title: "The Dichotomy of Progress",
            text: "Society glorifies progress as innovation/efficiency. Rapid pursuit creates unintended consequences like environmental degradation. Progress facilitates evolution but creates ethical dilemmas. Sustainability vs advancement.",
            questions: [
                { q: "Contradiction evident?", options: ["Solves social issues", "Quality improves", "Expansion emphasized", "Benefits and drawbacks"], correct: 3 },
                { q: "Associated problems?", options: ["Economic growth", "Production efficiency", "Tech advancement", "Degradation and inequality"], correct: 3 },
                { q: "Challenge introduced?", options: ["Speeding innovation", "Economic opportunities", "Accelerating tech", "Balance progress/sustainability"], correct: 3 },
                { q: "Central theme?", options: ["Positive results", "Erases differences", "Better society", "Complex ethical considerations"], correct: 3 },
                { q: "Tone?", options: ["Encouraging", "Optimistic", "Neutral", "Analytical and skeptical"], correct: 3 }
            ]
        },
        {
            title: "The STEM Challenge (Academic)",
            text: "STEM students read climate change articles with technical data. Comprehending readers explained real-world relations. Surface readers missed deeper meaning. Advanced reading is necessary for STEM success.",
            questions: [
                { q: "Article topic?", options: ["Poems", "History", "Climate change", "Business"], correct: 2 },
                { q: "Text content?", options: ["Songs", "Comics", "Pictures only", "Graphs, data, terms"], correct: 3 },
                { q: "Who explained findings?", options: ["Copiers", "Skippers", "Ignorers", "Strong comprehension"], correct: 3 },
                { q: "What did others miss?", options: ["Titles", "Pictures", "Easy words", "Deeper meaning"], correct: 3 },
                { q: "Teacher's conclusion?", options: ["Speed enough", "Memorization", "No reading needed", "Advanced reading skills necessary"], correct: 3 }
            ]
        },
        {
            title: "The Research Defense (Thesis)",
            text: "Grade 12 students prepared thesis defense. Read related studies and synthesized. Proficient readers answered panel with confidence. Strugglers found defending conclusions difficult. Advanced reading essential for academic success.",
            questions: [
                { q: "Event preparing for?", options: ["Field trip", "Quiz bee", "Thesis defense", "Sports"], correct: 2 },
                { q: "Reading material?", options: ["Novels", "Comics", "Magazines", "Related studies and literature"], correct: 3 },
                { q: "Who answered with confidence?", options: ["Copiers", "Memorizers", "Skippers", "Strong reading proficiency"], correct: 3 },
                { q: "Difficulty for strugglers?", options: ["Singing", "Charts", "Writing names", "Explaining research"], correct: 3 },
                { q: "Panel emphasis?", options: ["Speed", "Memorization", "Unnecessary", "Advanced reading skills essential"], correct: 3 }
            ]
        }
    ]
};

let recognition;
let currentWordIndex = 0;
let wordElements = [];
let normalizedPassageWords = [];
let hesitationSeconds = 0;
let hesitationInterval;
let stopwatchSeconds = 0;
let stopwatchInterval;
let liveTranscriptCursor = "";
let liveResultSegments = new Map();
let mediaRecorder = null;
let mediaStream = null;
let recordedAudioChunks = [];
let recordedAudioMimeType = "audio/webm";
let isRecording = false;
let currentPassageData = null;
let pendingDomUpdates = [];
let domFlushHandle = null;
let lastHighlightedIndex = -1;
let pendingHighlightIndex = -1;
let highlightFlushHandle = null;
let audioContext = null;
let audioAnalyser = null;
let audioDataArray = null;
let noiseMonitorInterval = null;
let lastNoiseAdvanceAt = 0;
let pendingSpeechQueue = [];
let speechQueueHandle = null;
let sentenceRanges = [];
let activeSentenceIndex = 0;
let lastSpeechAssistAdvanceAt = 0;
let lastSpeechAssistTranscript = "";
let lastMobileLiveFallbackTranscript = "";
let lastMobileLiveFallbackAt = 0;
let lastRecognitionEventAt = 0;
let shouldAutoRestartRecognition = false;
let recognitionRestartHandle = null;
let recognitionWatchdogHandle = null;
let lastRecognitionRestartAt = 0;
let recognitionSessionStartedAt = 0;
let recognitionNoEventRestartCount = 0;
let hasShownLiveHighlightFallbackNotice = false;
let lastBackendSttError = "";
let mobileLiveBackendHandle = null;
let mobileLiveBackendInFlight = false;
let mobileLiveBackendLastTranscript = "";
let mobileRecorderFlushHandle = null;
let mobileStallWordIndex = -1;
let mobileStallFinalMissCount = 0;
let lastHesitationMarkedIndex = -1;
let examStarted = false;
let shouldFocusComprehensionCtaAfterAlert = false;
let comprehensionCtaClearHandle = null;

let speechRecognitionCtor = null;
let hasBoundSpeechRecoveryHandlers = false;

function preparePassageForFluency(text) {
    const container = document.getElementById("passageText");
    const words = text.split(/\s+/);
    container.innerHTML = "";
    wordElements = [];
    normalizedPassageWords = [];
    currentWordIndex = 0;
    lastHighlightedIndex = -1;
    pendingHighlightIndex = -1;
    highlightFlushHandle = null;
    liveTranscriptCursor = "";
    liveResultSegments.clear();
    pendingSpeechQueue = [];
    speechQueueHandle = null;
    sentenceRanges = buildSentenceRanges(words);
    activeSentenceIndex = 0;
    mobileStallWordIndex = -1;
    mobileStallFinalMissCount = 0;
    lastHesitationMarkedIndex = -1;
    lastSpeechAssistAdvanceAt = 0;
    lastSpeechAssistTranscript = "";
    lastMobileLiveFallbackTranscript = "";
    lastMobileLiveFallbackAt = 0;

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.innerText = word + " ";
        span.classList.add("word");
        span.id = `word-${index}`;
        container.appendChild(span);
        wordElements.push(span);
        normalizedPassageWords.push(normalizeWord(word));
    });

    highlightCurrentWord();
}

function buildSentenceRanges(rawWords) {
    const ranges = [];
    let sentenceStart = 0;

    for (let index = 0; index < rawWords.length; index++) {
        const rawWord = rawWords[index] || "";
        if (/[.!?]["')\]]*$/.test(rawWord)) {
            ranges.push({ start: sentenceStart, end: index });
            sentenceStart = index + 1;
        }
    }

    if (sentenceStart < rawWords.length) {
        ranges.push({ start: sentenceStart, end: rawWords.length - 1 });
    }

    if (!ranges.length && rawWords.length) {
        ranges.push({ start: 0, end: rawWords.length - 1 });
    }

    return ranges;
}

function flushDomUpdates() {
    if (!pendingDomUpdates.length) {
        domFlushHandle = null;
        return;
    }

    const updates = pendingDomUpdates;
    pendingDomUpdates = [];
    domFlushHandle = null;

    updates.forEach((fn) => fn());
}

function scheduleDomUpdate(fn) {
    pendingDomUpdates.push(fn);
    if (domFlushHandle) return;
    const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
    domFlushHandle = raf(flushDomUpdates);
}

function highlightCurrentWord() {
    const nextIndex = currentWordIndex;
    if (nextIndex === lastHighlightedIndex && pendingHighlightIndex < 0) return;

    pendingHighlightIndex = nextIndex;

    if (isMobileHighlightMode()) {
        flushHighlightUpdate();
        return;
    }

    if (highlightFlushHandle) return;

    const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
    highlightFlushHandle = raf(flushHighlightUpdate);
}

function getTargetWordAt(index) {
    return normalizedPassageWords[index] || normalizeWord(wordElements[index]?.innerText);
}

function getCurrentSentenceRange() {
    if (!sentenceRanges.length) {
        return { start: 0, end: Math.max(wordElements.length - 1, 0) };
    }

    return sentenceRanges[activeSentenceIndex] || sentenceRanges[sentenceRanges.length - 1];
}

function syncSentencePointerToCurrentWord() {
    while (
        activeSentenceIndex < sentenceRanges.length - 1 &&
        currentWordIndex > sentenceRanges[activeSentenceIndex].end
    ) {
        activeSentenceIndex++;
    }
}

function findLookaheadMatch(spokenWord, startIndex, maxLookahead = FAST_READING_LOOKAHEAD, hardEndIndex = wordElements.length - 1) {
    if (!spokenWord) return -1;

    const endIndex = Math.min(wordElements.length - 1, startIndex + maxLookahead, hardEndIndex);
    for (let index = startIndex; index <= endIndex; index++) {
        if (isAcceptableWordMatch(spokenWord, getTargetWordAt(index))) {
            return index;
        }
    }

    return -1;
}

function getWordSimilarity(wordA, wordB) {
    if (!wordA || !wordB) return 0;
    if (isAcceptableWordMatch(wordA, wordB)) return 1;

    const distance = levenshteinDistance(wordA, wordB);
    const baseLength = Math.max(wordA.length, wordB.length, 1);
    return 1 - distance / baseLength;
}

function applyFinalSentenceFallback(spokenWords, confidence = 1, maxAllowedIndex = wordElements.length - 1, options = {}) {
    const markErrors = options.markErrors !== false;
    const minMatchRatio = Number.isFinite(options.minMatchRatio) ? options.minMatchRatio : 0.35;
    const minConfidenceForRatioGate = Number.isFinite(options.minConfidenceForRatioGate)
        ? options.minConfidenceForRatioGate
        : LOW_CONFIDENCE_MISPRONUNCIATION_THRESHOLD;

    if (!spokenWords.length || currentWordIndex >= wordElements.length) {
        return false;
    }

    syncSentencePointerToCurrentWord();
    const sentence = getCurrentSentenceRange();
    const sentenceStart = Math.max(currentWordIndex, sentence.start);
    const sentenceEnd = Math.min(sentence.end, wordElements.length - 1, maxAllowedIndex);

    if (sentenceStart > sentenceEnd) {
        return false;
    }

    let spokenCursor = 0;
    let matchedCount = 0;
    let lastMatchedTargetIndex = -1;
    const perWordActions = [];

    for (let targetIndex = sentenceStart; targetIndex <= sentenceEnd; targetIndex++) {
        const targetWord = getTargetWordAt(targetIndex);
        let matchAt = -1;
        let bestSimilarity = 0;
        const searchLimit = Math.min(spokenWords.length - 1, spokenCursor + 4);

        for (let probe = spokenCursor; probe <= searchLimit; probe++) {
            const probeWord = normalizeWord(spokenWords[probe]);
            if (!probeWord) continue;

            const similarity = getWordSimilarity(probeWord, targetWord);
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                matchAt = probe;
            }

            if (similarity >= 0.999) {
                break;
            }
        }

        if (matchAt !== -1 && bestSimilarity >= 0.6) {
            matchedCount++;
            perWordActions.push({ type: bestSimilarity >= 0.8 ? "read" : "mis", index: targetIndex });
            spokenCursor = matchAt + 1;
            lastMatchedTargetIndex = targetIndex;
        } else {
            perWordActions.push({ type: "omit", index: targetIndex });
        }
    }

    const sentenceWordCount = sentenceEnd - sentenceStart + 1;
    const matchRatio = matchedCount / Math.max(sentenceWordCount, 1);

    if (matchedCount < 2 && sentenceWordCount >= 4) {
        return false;
    }
    if (matchRatio < minMatchRatio && confidence >= minConfidenceForRatioGate) {
        return false;
    }

    perWordActions.forEach((action) => {
        if (!markErrors) {
            if (action.type !== "omit") {
                markWordAsRead(action.index);
            }
            return;
        }

        if (action.type === "read") {
            markWordAsRead(action.index);
            return;
        }
        if (action.type === "mis") {
            markWordAsError(action.index, "mis-error");
            return;
        }
        markWordAsError(action.index, "omit-error");
    });

    if (!markErrors) {
        if (lastMatchedTargetIndex < sentenceStart) {
            return false;
        }

        currentWordIndex = Math.max(currentWordIndex, lastMatchedTargetIndex + 1);
    } else {
        currentWordIndex = sentenceEnd + 1;
    }

    syncSentencePointerToCurrentWord();
    highlightCurrentWord();
    resetHesitation();
    return true;
}

function enqueueSpeechWords(spokenText, options) {
    if (!spokenText) return;

    pendingSpeechQueue.push({ spokenText, options });
    if (speechQueueHandle) return;

    const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
    speechQueueHandle = raf(processSpeechQueue);
}

function processSpeechQueue() {
    speechQueueHandle = null;

    if (!isRecording || !pendingSpeechQueue.length) {
        pendingSpeechQueue = [];
        return;
    }

    const batchSize = 4;
    let processed = 0;

    while (pendingSpeechQueue.length && processed < batchSize && isRecording) {
        const item = pendingSpeechQueue.shift();
        handleVoiceInput(item.spokenText, item.options);
        processed++;
    }

    if (pendingSpeechQueue.length && isRecording) {
        const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
        speechQueueHandle = raf(processSpeechQueue);
    }
}

function flushPendingSpeechQueueImmediately() {
    while (pendingSpeechQueue.length) {
        const item = pendingSpeechQueue.shift();
        handleVoiceInput(item.spokenText, item.options);
    }

    speechQueueHandle = null;
}

function getPendingInterimTranscriptSnapshot() {
    if (!liveResultSegments.size) return "";

    const orderedSegments = Array.from(liveResultSegments.entries())
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([, value]) => String(value || "").trim())
        .filter(Boolean);

    return orderedSegments.join(" ").trim();
}

function resetLiveTranscriptCursors() {
    liveTranscriptCursor = "";
    lastSpeechAssistTranscript = "";
    lastMobileLiveFallbackTranscript = "";
    lastMobileLiveFallbackAt = 0;
    deepgramLiveTranscriptCursor = "";
}

function resetLiveTranscriptTracking() {
    resetLiveTranscriptCursors();
    liveResultSegments.clear();
    pendingSpeechQueue = [];
    speechQueueHandle = null;
    deepgramLastDeltaLength = 0;
    deepgramLastTranscriptAt = 0;
}

function waitForRecognitionDrain(timeoutMs = 180) {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.max(0, timeoutMs));
    });
}

function bindSpeechRecoveryHandlers() {
    if (hasBoundSpeechRecoveryHandlers) {
        return;
    }

    hasBoundSpeechRecoveryHandlers = true;

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") {
            return;
        }

        if (isRecording && shouldAutoRestartRecognition) {
            scheduleRecognitionRestart();
        }
    });

    window.addEventListener("pageshow", () => {
        if (isRecording && shouldAutoRestartRecognition) {
            scheduleRecognitionRestart();
        }
    });
}

function recreateRecognitionForRestart() {
    if (!speechRecognitionCtor) {
        return false;
    }

    try {
        const nextRecognition = new speechRecognitionCtor();
        nextRecognition.continuous = true;
        nextRecognition.interimResults = true;
        nextRecognition.maxAlternatives = 1;
        nextRecognition.lang = BROWSER_RECOGNITION_LANG;

        nextRecognition.onstart = () => {
            recognitionSessionStartedAt = Date.now();
            lastRecognitionEventAt = 0;
            recognitionNoEventRestartCount = 0;
            hasShownLiveHighlightFallbackNotice = false;
        };

        nextRecognition.onresult = handleRecognitionResultEvent;
        const lifecycleAdapter = getRecognitionLifecycleAdapter(getPlatformRuntime(), getWatchdogProfile());
        nextRecognition.onerror = (e) => {
            console.warn("Live preview speech error:", e.error);
            const shouldRestart = lifecycleAdapter.shouldRestartOnError({
                error: e.error,
                isRecording,
                shouldAutoRestartRecognition,
                allowAnyError: true
            });
            if (shouldRestart) {
                scheduleRecognitionRestart();
            }
        };
        nextRecognition.onend = () => {
            if (lifecycleAdapter.shouldRestartOnEnd({ isRecording, shouldAutoRestartRecognition })) {
                scheduleRecognitionRestart();
                return;
            }
            console.log("Live preview recognition stopped");
        };

        try {
            if (recognition) {
                recognition.onresult = null;
                recognition.onend = null;
                recognition.onerror = null;
                recognition.onstart = null;
                if (typeof recognition.abort === "function") {
                    recognition.abort();
                }
            }
        } catch { }

        recognition = nextRecognition;
        startRecognitionWatchdog();
        return true;
    } catch (error) {
        console.warn("Could not recreate recognition:", error);
        return false;
    }
}

function startRecognitionWithRetry(initialDelayMs = null) {
    if (!recognition || !isRecording || !shouldAutoRestartRecognition) {
        return;
    }

    const restartPolicy = getRecognitionRestartPolicy(getPlatformRuntime());
    const startDelayMs = Number.isFinite(initialDelayMs)
        ? initialDelayMs
        : Number(restartPolicy.initialStartDelayMs || 0);
    const startRetryDelayMs = Number(restartPolicy.startRetryDelayMs || 320);

    const runStart = () => {
        if (!recognition || !isRecording || !shouldAutoRestartRecognition) {
            return;
        }

        try {
            recognition.start();
            startRecognitionWatchdog();
        } catch (error) {
            setTimeout(() => {
                if (!recognition || !isRecording || !shouldAutoRestartRecognition) return;
                try {
                    recognition.start();
                    startRecognitionWatchdog();
                } catch (retryError) {
                    console.warn("Live preview recognition could not start:", retryError || error);
                }
            }, startRetryDelayMs);
        }
    };

    if (startDelayMs > 0) {
        setTimeout(runStart, startDelayMs);
        return;
    }

    runStart();
}

function scheduleRecognitionRestart() {
    if (recognitionRestartHandle) {
        clearTimeout(recognitionRestartHandle);
        recognitionRestartHandle = null;
    }

    if (!recognition || !isRecording || !shouldAutoRestartRecognition) {
        return;
    }

    const restartPolicy = getRecognitionRestartPolicy(getPlatformRuntime());
    const restartDebounceMs = Number(restartPolicy.restartDebounceMs || 120);
    const restartRetryDelayMs = Number(restartPolicy.restartRetryDelayMs || 220);

    recognitionRestartHandle = setTimeout(() => {
        recognitionRestartHandle = null;

        if (!recognition || !isRecording || !shouldAutoRestartRecognition) {
            return;
        }

        lastRecognitionRestartAt = Date.now();
        recognitionSessionStartedAt = lastRecognitionRestartAt;
        lastRecognitionEventAt = 0;

        liveTranscriptCursor = "";
        liveResultSegments.clear();
        lastSpeechAssistTranscript = "";
        lastMobileLiveFallbackTranscript = "";
        lastMobileLiveFallbackAt = 0;

        try {
            try {
                recognition.abort();
            } catch { }
            recognition.start();
        } catch (error) {
            recognitionRestartHandle = setTimeout(() => {
                recognitionRestartHandle = null;
                if (!recognition || !isRecording || !shouldAutoRestartRecognition) return;
                try {
                    try {
                        recognition.abort();
                    } catch { }
                    recognition.start();
                } catch (retryError) {
                    const recreated = recreateRecognitionForRestart();
                    if (recreated && recognition && isRecording && shouldAutoRestartRecognition) {
                        try {
                            recognition.start();
                            return;
                        } catch { }
                    }
                    console.warn("Recognition restart failed:", retryError);
                }
            }, restartRetryDelayMs);
        }
    }, restartDebounceMs);
}

function stopRecognitionWatchdog() {
    if (recognitionWatchdogHandle) {
        clearInterval(recognitionWatchdogHandle);
        recognitionWatchdogHandle = null;
    }
}

function startRecognitionWatchdog() {
    stopRecognitionWatchdog();

    if (!recognition) {
        return;
    }

    const watchdogProfile = getWatchdogProfile();
    const lifecycleAdapter = getRecognitionLifecycleAdapter(getPlatformRuntime(), watchdogProfile);
    const fallbackNoticeRetryCount = watchdogProfile.fallbackNoticeRetryCount;

    recognitionWatchdogHandle = setInterval(() => {
        if (!isRecording || !shouldAutoRestartRecognition || !recognition) {
            return;
        }

        const restartReason = lifecycleAdapter.getWatchdogRestartReason({
            now: Date.now(),
            lastRecognitionRestartAt,
            lastRecognitionEventAt,
            recognitionSessionStartedAt
        });

        if (restartReason === "initial-silence") {
            recognitionNoEventRestartCount++;
            scheduleRecognitionRestart();

            if (recognitionNoEventRestartCount >= fallbackNoticeRetryCount && !hasShownLiveHighlightFallbackNotice) {
                hasShownLiveHighlightFallbackNotice = true;
                showAppAlert(
                    "Your device/browser has limited live speech events, so live highlights may pause. Continue reading and press Stop Recording to get final transcript-based scoring.",
                    "Limited Live Highlight"
                );
            }

            return;
        }

        if (restartReason === "stale-stream") {
            scheduleRecognitionRestart();
        }
    }, 700);
}

function handleInterimVoiceInput(spokenText) {
    if (currentWordIndex >= wordElements.length) return false;
    const runtime = getPlatformRuntime();

    const spokenWords = spokenText
        .toLowerCase()
        .replace(/[^\w\s']/g, "")
        .split(/\s+/)
        .filter(Boolean);

    let advanced = false;

    for (let i = 0; i < spokenWords.length; i++) {
        if (currentWordIndex >= wordElements.length) {
            break;
        }

        const token = normalizeWord(spokenWords[i]);
        if (!token || token.length < INTERIM_MIN_TOKEN_LENGTH) {
            continue;
        }

        const targetWord = getTargetWordAt(currentWordIndex);
        if (!targetWord) {
            continue;
        }

        const nextToken = normalizeWord(spokenWords[i + 1]);
        const nextTargetWord = getTargetWordAt(currentWordIndex + 1);

        if (isAcceptableWordMatch(token, targetWord)) {
            markWordAsRead(currentWordIndex);
            currentWordIndex++;
            advanced = true;
            resetHesitation();
            continue;
        }

        if (runtime.mobile && nextTargetWord && isAcceptableWordMatch(token, nextTargetWord)) {
            // Spoken token aligned with the next expected word; treat current as omitted and keep live cursor moving.
            markWordAsError(currentWordIndex, "omit-error");
            currentWordIndex++;
            markWordAsRead(currentWordIndex);
            currentWordIndex++;
            advanced = true;
            resetHesitation();
            continue;
        }

        if (
            runtime.mobile &&
            token.length >= 4 &&
            nextTargetWord &&
            nextToken &&
            isAcceptableWordMatch(nextToken, nextTargetWord)
        ) {
            // This is a low-certainty assist path; classify instead of forcing substitution.
            determineErrorType(token, targetWord, 1);
            currentWordIndex++;
            advanced = true;
            resetHesitation();
        }
    }

    if (advanced) {
        syncSentencePointerToCurrentWord();
        highlightCurrentWord();

        if (currentWordIndex >= wordElements.length) {
            stopFluencyTest();
        }
    }

    return advanced;
}

function normalizeWord(value) {
    return (value || "")
        .toLowerCase()
        .replace(/[^a-z0-9']/g, "");
}

function resetStartReadingButton() {
    const btn = document.getElementById("startReadingBtn");
    if (!btn) return;
    btn.innerText = "🎤 START READING ALOUD";
    btn.style.background = "#27ae60";
}

function getPlatformRuntime() {
    if (window.PlatformSpeechStrategy?.detectRuntime) {
        return window.PlatformSpeechStrategy.detectRuntime();
    }

    const fallbackMobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const fallbackIos = /iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream;
    const fallbackAndroid = /Android/i.test(navigator.userAgent);
    const fallbackIpadDesktopUa =
        String(navigator.platform || "") === "MacIntel" &&
        Number(navigator.maxTouchPoints || 0) > 1;
    const fallbackMobile = fallbackMobileUa || fallbackIos || fallbackAndroid || fallbackIpadDesktopUa;

    return {
        ios: fallbackIos || fallbackIpadDesktopUa,
        android: fallbackAndroid,
        mobile: fallbackMobile,
        desktop: !fallbackMobile
    };
}

function shouldUseDeepgramMobileOnly(runtime = getPlatformRuntime()) {
    return !!(runtime?.ios || runtime?.android);
}

function getWatchdogProfile() {
    const runtime = getPlatformRuntime();
    if (window.PlatformSpeechStrategy?.getWatchdogProfile) {
        return window.PlatformSpeechStrategy.getWatchdogProfile(runtime);
    }

    if (runtime.ios) {
        return {
            restartCooldownMs: 7000,
            initialSilenceThresholdMs: 20000,
            staleStreamThresholdMs: 11000,
            fallbackNoticeRetryCount: 5
        };
    }

    if (runtime.mobile) {
        return {
            restartCooldownMs: 6000,
            initialSilenceThresholdMs: 12000,
            staleStreamThresholdMs: 9000,
            fallbackNoticeRetryCount: 4
        };
    }

    return {
        restartCooldownMs: 1800,
        initialSilenceThresholdMs: 3200,
        staleStreamThresholdMs: 2600,
        fallbackNoticeRetryCount: 3
    };
}

function getLivePolicy() {
    const runtime = getPlatformRuntime();
    if (window.PlatformSpeechStrategy?.getLivePolicy) {
        return window.PlatformSpeechStrategy.getLivePolicy(runtime);
    }

    return {
        strictMobileLiveMode: runtime.mobile,
        iosConservativeLive: runtime.ios,
        iosSafeLookahead: runtime.ios ? 3 : 1,
        iosFinalTailSize: runtime.ios ? 4 : 1,
        androidFinalTailSize: runtime.android ? 3 : 1
    };
}

function getMatchingProfile() {
    const runtime = getPlatformRuntime();
    if (window.PlatformSpeechStrategy?.getMatchingProfile) {
        return window.PlatformSpeechStrategy.getMatchingProfile(runtime);
    }

    return {
        lowConfidenceMispronunciationThreshold: 0.82,
        interimProcessMinConfidence: 0.45,
        finalProcessMinConfidence: 0.3,
        mobileFastReadingLookahead: 1,
        mobileMaxOmissionJump: 1,
        sentenceFallbackMinWords: 3,
        sentenceFallbackMinMatchRatio: 0.35,
        sentenceFallbackMinConfidence: 0.3
    };
}

function getPlatformReadAloudFlow(runtime, livePolicy) {
    if (runtime?.ios && window.IOSReadAloudFlow?.resolveFallbackAction) {
        return window.IOSReadAloudFlow;
    }

    if (runtime?.android && window.AndroidReadAloudFlow?.resolveFallbackAction) {
        return window.AndroidReadAloudFlow;
    }

    return {
        getTailCount: () => Number(livePolicy?.androidFinalTailSize || 3),
        getFinalDeltaOptions: (ctx = {}) => ({
            allowErrors: ctx.isFinal === true,
            confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
            isFinal: ctx.isFinal === true,
            liveProgressOnly: true
        }),
        resolveFallbackAction: (ctx = {}) => {
            const tailSnapshot = String(ctx.transcript || "")
                .toLowerCase()
                .replace(/[^\w\s']/g, "")
                .split(/\s+/)
                .filter(Boolean)
                .slice(-Math.max(1, Number(ctx.tailCount) || 1))
                .join(" ");

            if (!tailSnapshot) {
                return { shouldProcess: false };
            }

            const isDuplicate = tailSnapshot === String(ctx.lastSnapshot || "");
            const allowRepeat = isDuplicate && (Number(ctx.now || 0) - Number(ctx.lastSnapshotAt || 0) > 500);
            if (isDuplicate && !allowRepeat) {
                return { shouldProcess: false };
            }

            const isFinal = ctx.isFinal === true;
            return {
                shouldProcess: true,
                snapshot: tailSnapshot,
                options: {
                    allowErrors: isFinal,
                    confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
                    isFinal,
                    liveProgressOnly: true
                }
            };
        }
    };
}

function getRecognitionRestartPolicy(runtime) {
    if (window.PlatformRecognitionRestartPolicy?.create) {
        return window.PlatformRecognitionRestartPolicy.create(runtime);
    }

    if (runtime?.ios) {
        return {
            initialStartDelayMs: 140,
            startRetryDelayMs: 420,
            restartDebounceMs: 160,
            restartRetryDelayMs: 320
        };
    }

    if (runtime?.android) {
        return {
            initialStartDelayMs: 120,
            startRetryDelayMs: 280,
            restartDebounceMs: 120,
            restartRetryDelayMs: 220
        };
    }

    return {
        initialStartDelayMs: 90,
        startRetryDelayMs: 220,
        restartDebounceMs: 90,
        restartRetryDelayMs: 180
    };
}

function getSpeechPlatformAdapter(runtime, livePolicy, options = {}) {
    if (window.PlatformSpeechAdapter?.create) {
        return window.PlatformSpeechAdapter.create(runtime, livePolicy, options);
    }

    const forceDetailedMatching = options.forceDetailedMatching === true;
    const liveProgressOnly = options.liveProgressOnly === true;
    const isMobileRecognitionMode = runtime.mobile;
    const strictMobileLiveMode = isMobileRecognitionMode && !forceDetailedMatching;
    const iosConservativeLive = runtime.ios && liveProgressOnly && !forceDetailedMatching;

    return {
        isMobileRecognitionMode,
        strictMobileLiveMode,
        iosConservativeLive,
        getFinalTailSize: (isFinalResult) => {
            if (!strictMobileLiveMode || !isFinalResult) {
                return 0;
            }

            if (runtime.ios) return livePolicy.iosFinalTailSize;
            if (runtime.android) return livePolicy.androidFinalTailSize;
            return 1;
        },
        getSafeLookahead: () => livePolicy.iosSafeLookahead
    };
}

function getRecognitionLifecycleAdapter(runtime, watchdogProfile) {
    if (window.PlatformRecognitionLifecycle?.create) {
        return window.PlatformRecognitionLifecycle.create(runtime, watchdogProfile);
    }

    const recoverableErrors = new Set(["no-speech", "aborted", "network"]);

    return {
        isRecoverableError: (errorCode) => recoverableErrors.has(String(errorCode || "").toLowerCase()),
        shouldRestartOnEnd: (context = {}) => context.isRecording === true && context.shouldAutoRestartRecognition === true,
        shouldRestartOnError: (context = {}) => {
            if (!(context.isRecording === true && context.shouldAutoRestartRecognition === true)) {
                return false;
            }

            if (context.allowAnyError === true) {
                return true;
            }

            return recoverableErrors.has(String(context.error || "").toLowerCase());
        },
        getWatchdogRestartReason: (state = {}) => {
            const now = Number(state.now || Date.now());
            const lastRestartAt = Number(state.lastRecognitionRestartAt || 0);
            const lastEventAt = Number(state.lastRecognitionEventAt || 0);
            const sessionStartedAt = Number(state.recognitionSessionStartedAt || 0);

            const restartCooldownMs = Number(watchdogProfile.restartCooldownMs || 1800);
            const initialSilenceThresholdMs = Number(watchdogProfile.initialSilenceThresholdMs || 3200);
            const staleStreamThresholdMs = Number(watchdogProfile.staleStreamThresholdMs || 2600);

            const restartCooldownElapsed = now - lastRestartAt > restartCooldownMs;
            if (!restartCooldownElapsed) {
                return null;
            }

            if (!lastEventAt) {
                const initialSilenceTooLong = sessionStartedAt > 0 && now - sessionStartedAt > initialSilenceThresholdMs;
                if (initialSilenceTooLong) {
                    return "initial-silence";
                }

                return null;
            }

            const staleRecognitionStream = now - lastEventAt > staleStreamThresholdMs;
            return staleRecognitionStream ? "stale-stream" : null;
        }
    };
}

function getTranscriptMatchingEngine() {
    if (window.TranscriptMatchingEngine) {
        return window.TranscriptMatchingEngine;
    }

    return {
        toNormalizedWords: (spokenText) => String(spokenText || "")
            .toLowerCase()
            .replace(/[^\w\s']/g, "")
            .split(/\s+/)
            .filter(Boolean),
        getWordsToProcess: (spokenWords, context = {}) => {
            const safeWords = Array.isArray(spokenWords) ? spokenWords : [];
            const strictMobileLiveMode = context.strictMobileLiveMode === true;
            const isFinalResult = context.isFinalResult === true;

            if (!(strictMobileLiveMode && isFinalResult)) {
                return safeWords;
            }

            return safeWords.slice(-Math.max(1, Number(context.tailSize || 1)));
        },
        getLookaheadWindow: (context = {}) => {
            if (context.isMobileRecognitionMode === true) {
                return Number(context.mobileLookahead || 1);
            }

            return Math.max(
                0,
                Math.min(
                    Number(context.fastReadingLookahead || 4),
                    Number(context.currentSentenceEnd || 0) - Number(context.currentWordIndex || 0)
                )
            );
        }
    };
}

function getSpeechStateMutations(context) {
    if (window.SpeechStateMutations?.create) {
        return window.SpeechStateMutations.create(context);
    }

    return {
        readAndAdvance: (options = {}) => {
            context.markWordAsRead(context.getCurrentWordIndex());
            context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            context.highlightCurrentWord();
            context.resetHesitation();
            if (options.resetMobileStall) {
                context.resetMobileStallTracking();
            }
        },
        errorAndAdvance: (className, options = {}) => {
            context.markWordAsError(context.getCurrentWordIndex(), className);
            context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            context.highlightCurrentWord();
            context.resetHesitation();
            if (options.resetMobileStall) {
                context.resetMobileStallTracking();
            }
        },
        errorOnly: (className, options = {}) => {
            context.markWordAsError(context.getCurrentWordIndex(), className);
            context.highlightCurrentWord();
            context.resetHesitation();
            if (options.resetMobileStall) {
                context.resetMobileStallTracking();
            }
        },
        setIndexAndReadAdvance: (index, options = {}) => {
            context.setCurrentWordIndex(index);
            context.markWordAsRead(context.getCurrentWordIndex());
            context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            context.highlightCurrentWord();
            context.resetHesitation();
            if (options.resetMobileStall) {
                context.resetMobileStallTracking();
            }
        },
        refresh: (options = {}) => {
            context.highlightCurrentWord();
            context.resetHesitation();
            if (options.resetMobileStall) {
                context.resetMobileStallTracking();
            }
        }
    };
}

function getSpeechTransitionHelpers(context) {
    if (window.SpeechTransitionHelpers?.create) {
        return window.SpeechTransitionHelpers.create(context);
    }

    return {
        markOmissionsUntil: (matchIndex) => {
            const endIndex = Math.max(0, Number(matchIndex) || 0);
            while (context.getCurrentWordIndex() < endIndex) {
                context.markWordAsError(context.getCurrentWordIndex(), "omit-error");
                context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            }
        },
        applyLookaheadRange: (matchIndex) => {
            const endIndex = Math.max(0, Number(matchIndex) || 0);
            while (context.getCurrentWordIndex() < endIndex) {
                context.markWordAsError(context.getCurrentWordIndex(), "omit-error");
                context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            }
            context.readAndAdvance();
        },
        applyNextSentenceMatch: (matchIndex) => {
            const endIndex = Math.max(0, Number(matchIndex) || 0);
            while (context.getCurrentWordIndex() < endIndex) {
                context.markWordAsError(context.getCurrentWordIndex(), "omit-error");
                context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            }
            context.syncSentencePointerToCurrentWord();
            context.readAndAdvance();
        }
    };
}

function getSpeechCallbackActions(context) {
    if (window.SpeechCallbackActions?.create) {
        return window.SpeechCallbackActions.create(context);
    }

    return {
        advanceAndRefresh: (options = {}) => {
            context.setCurrentWordIndex(context.getCurrentWordIndex() + 1);
            context.stateMutations.refresh(options);
        },
        strictMobileClassify: (spokenWord, targetWord, recognitionConfidence, lowConfidenceThreshold) => {
            const mobileConfidence = Math.max(Number(recognitionConfidence || 0), Number(lowConfidenceThreshold || 0));
            context.determineErrorType(spokenWord, targetWord, mobileConfidence);
            context.stateMutations.refresh();
        },
        lookaheadSingleDesktop: () => {
            context.stateMutations.errorAndAdvance("omit-error");
            context.stateMutations.readAndAdvance();
        },
        omissionFlow: (isMobileRecognitionMode, wordCount) => {
            context.stateMutations.errorAndAdvance("omit-error");
            if (isMobileRecognitionMode) return;
            if (context.getCurrentWordIndex() < Number(wordCount || 0)) {
                context.stateMutations.readAndAdvance();
            }
        },
        determineAndRefresh: (spokenWord, targetWord, recognitionConfidence) => {
            context.determineErrorType(spokenWord, targetWord, recognitionConfidence);
            context.stateMutations.refresh();
        },
        clampToEnd: (index) => {
            context.setCurrentWordIndex(Number(index || 0));
            context.highlightCurrentWord();
        }
    };
}

function getSpeechErrorClassifier() {
    if (window.SpeechErrorClassifier?.classify) {
        return window.SpeechErrorClassifier;
    }

    return {
        classify: (ctx = {}) => {
            const spoken = String(ctx.spoken || "");
            const target = String(ctx.target || "");
            const confidence = Number.isFinite(ctx.confidence) ? ctx.confidence : 1;
            const match = typeof ctx.isAcceptableWordMatch === "function"
                ? ctx.isAcceptableWordMatch(spoken, target)
                : spoken === target;

            if (match) {
                return "read";
            }

            const baseLength = Math.max(spoken.length, target.length, 1);
            const distance = typeof ctx.levenshteinDistance === "function"
                ? ctx.levenshteinDistance(spoken, target)
                : baseLength;
            const similarity = 1 - distance / baseLength;
            const misThreshold = Number.isFinite(ctx.mispronunciationSimilarityThreshold)
                ? ctx.mispronunciationSimilarityThreshold
                : 0.34;
            const lowConfidenceThreshold = Number.isFinite(ctx.lowConfidenceMispronunciationThreshold)
                ? ctx.lowConfidenceMispronunciationThreshold
                : 0.82;
            const bridgeThreshold = Number.isFinite(ctx.mispronunciationBridgeSimilarityThreshold)
                ? ctx.mispronunciationBridgeSimilarityThreshold
                : 0.72;

            let bridgeSimilarity = 0;
            if (typeof ctx.normalizePhoneticBridge === "function") {
                const spokenBridge = String(ctx.normalizePhoneticBridge(spoken) || "");
                const targetBridge = String(ctx.normalizePhoneticBridge(target) || "");

                if (spokenBridge && targetBridge) {
                    if (spokenBridge === targetBridge) {
                        bridgeSimilarity = 1;
                    } else {
                        const bridgeBaseLength = Math.max(spokenBridge.length, targetBridge.length, 1);
                        const bridgeDistance = typeof ctx.levenshteinDistance === "function"
                            ? ctx.levenshteinDistance(spokenBridge, targetBridge)
                            : bridgeBaseLength;
                        bridgeSimilarity = 1 - bridgeDistance / bridgeBaseLength;
                    }
                }
            }

            if (
                similarity >= misThreshold ||
                bridgeSimilarity >= bridgeThreshold ||
                confidence < lowConfidenceThreshold
            ) {
                return "mis-error";
            }

            return "sub-error";
        }
    };
}

function getDecisionDebugLogger() {
    if (window.DecisionDebugLogger) {
        return window.DecisionDebugLogger;
    }

    return {
        isEnabled: () => false,
        setEnabled: () => { },
        clear: () => { },
        log: () => { },
        getRecent: () => []
    };
}

let decisionDebugPanelRefreshHandle = null;
let decisionDebugPanelFilter = "all";

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDecisionDebugTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

function setDecisionDebugPanelOpen(isOpen) {
    const panel = document.getElementById("decisionDebugPanel");
    if (!panel) return;
    panel.classList.toggle("is-open", !!isOpen);
}

function decisionEventMatchesFilter(eventName, filterName) {
    const normalizedEventName = String(eventName || "").toLowerCase();
    const normalizedFilter = String(filterName || "all").toLowerCase();

    if (normalizedFilter === "all") return true;
    if (normalizedFilter === "live") return normalizedEventName.startsWith("live.");
    if (normalizedFilter === "detailed") return normalizedEventName.startsWith("detailed.");
    if (normalizedFilter === "end") return normalizedEventName.startsWith("end.");

    return true;
}

function updateDecisionDebugFilterButtons() {
    const filtersRoot = document.getElementById("decisionDebugFilters");
    if (!filtersRoot) return;

    const filterButtons = Array.from(filtersRoot.querySelectorAll("button[data-filter]"));
    filterButtons.forEach((button) => {
        const filterName = String(button.dataset.filter || "all").toLowerCase();
        button.classList.toggle("is-active", filterName === decisionDebugPanelFilter);
    });
}

function renderDecisionDebugPanel() {
    const panel = document.getElementById("decisionDebugPanel");
    const statusEl = document.getElementById("decisionDebugStatus");
    const listEl = document.getElementById("decisionDebugList");
    const enableBtn = document.getElementById("decisionDebugEnableBtn");
    if (!panel || !statusEl || !listEl || !enableBtn) return;

    const logger = getDecisionDebugLogger();
    const enabled = logger.isEnabled();
    const filtered = logger
        .getRecent(160)
        .filter((entry) => decisionEventMatchesFilter(entry?.event, decisionDebugPanelFilter));
    const recent = filtered.slice(-10).reverse();
    const filterLabel = decisionDebugPanelFilter.charAt(0).toUpperCase() + decisionDebugPanelFilter.slice(1);

    statusEl.textContent = enabled
        ? `Logger ON | Filter: ${filterLabel} | Showing ${recent.length}`
        : `Logger OFF | Filter: ${filterLabel}`;
    statusEl.classList.toggle("is-on", enabled);
    enableBtn.textContent = enabled ? "Disable" : "Enable";
    updateDecisionDebugFilterButtons();

    if (!recent.length) {
        listEl.innerHTML = `<li>${enabled ? `No events for ${escapeHtml(filterLabel)} filter yet.` : "Enable logger to start capturing events."}</li>`;
        return;
    }

    listEl.innerHTML = recent.map((entry) => {
        const payload = entry && entry.payload != null
            ? ` ${escapeHtml(JSON.stringify(entry.payload))}`
            : "";

        return `<li><strong>${escapeHtml(formatDecisionDebugTime(entry.at))}</strong> ${escapeHtml(entry.event)}${payload}</li>`;
    }).join("");
}

function initDecisionDebugPanel() {
    const launcher = document.getElementById("decisionDebugLauncher");
    const panel = document.getElementById("decisionDebugPanel");
    const enableBtn = document.getElementById("decisionDebugEnableBtn");
    const clearBtn = document.getElementById("decisionDebugClearBtn");
    const closeBtn = document.getElementById("decisionDebugCloseBtn");
    const filtersRoot = document.getElementById("decisionDebugFilters");

    if (!launcher || !panel || !enableBtn || !clearBtn || !closeBtn || !filtersRoot) {
        return;
    }

    const logger = getDecisionDebugLogger();

    launcher.addEventListener("click", () => {
        const isOpen = panel.classList.contains("is-open");
        setDecisionDebugPanelOpen(!isOpen);
        if (!isOpen) {
            renderDecisionDebugPanel();
        }
    });

    closeBtn.addEventListener("click", () => {
        setDecisionDebugPanelOpen(false);
    });

    enableBtn.addEventListener("click", () => {
        logger.setEnabled(!logger.isEnabled());
        renderDecisionDebugPanel();
    });

    clearBtn.addEventListener("click", () => {
        logger.clear();
        renderDecisionDebugPanel();
    });

    const filterButtons = Array.from(filtersRoot.querySelectorAll("button[data-filter]"));
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            decisionDebugPanelFilter = String(button.dataset.filter || "all").toLowerCase();
            renderDecisionDebugPanel();
        });
    });

    if (decisionDebugPanelRefreshHandle) {
        clearInterval(decisionDebugPanelRefreshHandle);
    }

    decisionDebugPanelRefreshHandle = setInterval(() => {
        if (!panel.classList.contains("is-open")) {
            return;
        }
        renderDecisionDebugPanel();
    }, 700);

    setDecisionDebugPanelOpen(false);
    renderDecisionDebugPanel();
}

function getLiveProgressRules() {
    if (window.LiveProgressRules?.processToken) {
        return window.LiveProgressRules;
    }

    return {
        processToken: (ctx = {}) => {
            const normalizedSpokenWord = ctx.normalizedSpokenWord;
            const targetWord = ctx.targetWord;
            const nextSpokenWord = ctx.nextSpokenWord;
            const nextTargetWord = ctx.nextTargetWord;

            if (ctx.isAcceptableWordMatch(normalizedSpokenWord, targetWord)) {
                if (!ctx.iosConservativeLive && ctx.isFinalResult && ctx.recognitionConfidence < ctx.lowConfidenceThreshold) {
                    ctx.onMis();
                } else {
                    ctx.onRead();
                }
                return true;
            }

            if (ctx.iosConservativeLive) {
                const boundedLookaheadMatch = ctx.findLookaheadMatch(
                    normalizedSpokenWord,
                    ctx.currentWordIndex + 1,
                    ctx.safeLookahead,
                    ctx.currentSentenceEnd
                );

                if (boundedLookaheadMatch !== -1) {
                    ctx.onIosLookahead(boundedLookaheadMatch);
                }

                return true;
            }

            if (!ctx.allowErrors) {
                const canSoftAdvance =
                    ctx.allowSoftAdvanceWithoutErrors === true &&
                    ctx.isClearMobileReadToken(normalizedSpokenWord, ctx.recognitionConfidence, ctx.isFinalResult);

                if (canSoftAdvance) {
                    if (ctx.isAcceptableWordMatch(normalizedSpokenWord, nextTargetWord)) {
                        if (!ctx.iosConservativeLive) {
                            ctx.onOmit();
                        } else {
                            ctx.onAdvanceRefresh();
                        }
                        return true;
                    }

                    const hasNextAlignmentEvidence =
                        ctx.isFinalResult ||
                        (nextSpokenWord && ctx.isAcceptableWordMatch(nextSpokenWord, nextTargetWord));

                    if (hasNextAlignmentEvidence) {
                        if (!ctx.iosConservativeLive) {
                            ctx.onSub();
                        } else {
                            ctx.onAdvanceRefresh();
                        }
                    }
                }

                return true;
            }

            if (ctx.isFinalResult && nextSpokenWord && ctx.isAcceptableWordMatch(nextSpokenWord, targetWord)) {
                if (!ctx.iosConservativeLive) {
                    ctx.onAdd();
                } else {
                    ctx.onRefresh();
                }
                return true;
            }

            if (ctx.isAcceptableWordMatch(normalizedSpokenWord, nextTargetWord)) {
                if (!ctx.iosConservativeLive) {
                    ctx.onOmit();
                } else {
                    ctx.onAdvanceRefresh();
                }
                return true;
            }

            const hasNextAlignmentEvidence =
                ctx.isFinalResult ||
                (nextSpokenWord && ctx.isAcceptableWordMatch(nextSpokenWord, nextTargetWord));

            if (ctx.isClearMobileReadToken(normalizedSpokenWord, ctx.recognitionConfidence, ctx.isFinalResult) && hasNextAlignmentEvidence) {
                if (!ctx.iosConservativeLive) {
                    ctx.onSub();
                } else {
                    ctx.onAdvanceRefresh();
                }
            }

            return true;
        }
    };
}

function getDetailedMatchingRules() {
    if (window.DetailedMatchingRules?.processToken) {
        return window.DetailedMatchingRules;
    }

    return {
        processToken: (ctx = {}) => {
            if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.targetWord)) {
                if (ctx.isFinalResult && ctx.recognitionConfidence < ctx.lowConfidenceThreshold) {
                    ctx.onExactMis();
                } else {
                    ctx.onExactRead();
                }
                return true;
            }

            if (ctx.strictMobileLiveMode) {
                if (!ctx.allowErrors) return true;
                if (!ctx.isClearMobileReadToken(ctx.normalizedSpokenWord, ctx.recognitionConfidence, ctx.isFinalResult)) return true;

                if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.nextTargetWord)) {
                    ctx.onStrictMobileOmit();
                    return true;
                }

                ctx.onStrictMobileClassify();
                return true;
            }

            const lookaheadWindow = ctx.getLookaheadWindow();
            let lookaheadMatchIndex = ctx.findLookaheadMatch(
                ctx.normalizedSpokenWord,
                ctx.currentWordIndex + 1,
                lookaheadWindow,
                ctx.currentSentenceEnd
            );

            if (ctx.isMobileRecognitionMode && lookaheadMatchIndex > ctx.currentWordIndex + ctx.mobileMaxOmissionJump) {
                lookaheadMatchIndex = -1;
            }

            if (!ctx.isMobileRecognitionMode && lookaheadMatchIndex > ctx.currentWordIndex + 2) {
                lookaheadMatchIndex = -1;
            }

            if (lookaheadMatchIndex > ctx.currentWordIndex + 1) {
                ctx.onLookaheadRange(lookaheadMatchIndex);
                return true;
            }

            if (lookaheadMatchIndex === ctx.currentWordIndex + 1) {
                if (ctx.isMobileRecognitionMode) {
                    ctx.onLookaheadSingleMobile();
                } else {
                    const shouldPreferClassification =
                        ctx.isFinalResult !== true ||
                        ctx.recognitionConfidence < ctx.lowConfidenceThreshold;

                    if (shouldPreferClassification) {
                        ctx.onDetermineError();
                    } else {
                        ctx.onLookaheadSingleDesktop();
                    }
                }
                return true;
            }

            if (!ctx.isMobileRecognitionMode && ctx.nextSentence) {
                const nextSentenceSpan = Math.min(
                    2,
                    ctx.nextSentence.end - ctx.nextSentence.start + 1
                );

                const nextSentenceMatch = ctx.findLookaheadMatch(
                    ctx.normalizedSpokenWord,
                    ctx.nextSentence.start,
                    nextSentenceSpan,
                    ctx.nextSentence.end
                );

                if (nextSentenceMatch !== -1) {
                    ctx.onNextSentenceMatch(nextSentenceMatch);
                    return true;
                }
            }

            if (!ctx.allowErrors) return true;

            if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.nextTargetWord)) {
                const shouldPreferClassification =
                    !ctx.isMobileRecognitionMode &&
                    (ctx.isFinalResult !== true ||
                        ctx.recognitionConfidence < ctx.lowConfidenceThreshold);

                if (shouldPreferClassification) {
                    ctx.onDetermineError();
                } else {
                    ctx.onOmission();
                }
                return true;
            }

            if (ctx.nextSpokenWord && ctx.isAcceptableWordMatch(ctx.nextSpokenWord, ctx.targetWord)) {
                ctx.onAddition();
                return true;
            }

            ctx.onDetermineError();
            return true;
        }
    };
}

function getVoiceInputEndEvaluator() {
    if (window.VoiceInputEndEvaluator) {
        return window.VoiceInputEndEvaluator;
    }

    return {
        shouldApplySentenceFallback: (ctx = {}) => (
            ctx.isFinalResult === true &&
            Number(ctx.currentWordIndex) === Number(ctx.startWordIndex) &&
            ctx.strictMobileLiveMode !== true &&
            Number(ctx.wordsToProcessLength || 0) >= 3
        ),
        resolvePostLoopAction: (ctx = {}) => {
            const currentWordIndex = Number(ctx.currentWordIndex || 0);
            const processCapIndex = Number(ctx.processCapIndex ?? Number.MAX_SAFE_INTEGER);
            const wordCount = Number(ctx.wordCount || 0);

            if (currentWordIndex > processCapIndex) {
                return { type: "stop" };
            }

            if (currentWordIndex < wordCount) {
                return { type: "none" };
            }

            const preventMobileAutoStop =
                ctx.useBackendSttMode === true &&
                ctx.isMobileRecognitionMode === true &&
                ctx.forceDetailedMatching !== true;

            if (preventMobileAutoStop) {
                return { type: "clamp-end", index: Math.max(0, wordCount - 1) };
            }

            if (ctx.isIOSLiveMode === true && ctx.forceDetailedMatching !== true) {
                return { type: "clamp-end", index: Math.max(0, wordCount - 1) };
            }

            return { type: "stop" };
        }
    };
}

function normalizePhoneticBridge(value) {
    let token = normalizeWord(value);
    if (!token) return "";

    token = token
        .replace(/ph/g, "f")
        .replace(/ck/g, "k")
        .replace(/qu/g, "kw")
        .replace(/tion/g, "syon")
        .replace(/ci/g, "si")
        .replace(/ce/g, "se")
        .replace(/cy/g, "si")
        .replace(/v/g, "b")
        .replace(/z/g, "s")
        .replace(/x/g, "ks")
        .replace(/th/g, "t")
        .replace(/j/g, "dy")
        .replace(/c/g, "k")
        .replace(/oo/g, "u")
        .replace(/ee/g, "i")
        .replace(/ou/g, "aw")
        .replace(/([a-z])\1+/g, "$1");

    return token;
}

const ENGLISH_VARIANT_GROUPS = [
    ["color", "colour"],
    ["favorite", "favourite"],
    ["honor", "honour"],
    ["organize", "organise"],
    ["center", "centre"],
    ["meter", "metre"],
    ["liter", "litre"],
    ["theater", "theatre"],
    ["analyze", "analyse"],
    ["program", "programme"]
];

function isVariantEquivalent(wordA, wordB) {
    return ENGLISH_VARIANT_GROUPS.some(group => group.includes(wordA) && group.includes(wordB));
}

function isAcceptableWordMatch(spokenWord, targetWord) {
    if (!spokenWord || !targetWord) return false;
    if (spokenWord === targetWord) return true;
    if (isVariantEquivalent(spokenWord, targetWord)) return true;

    const bridgeSpoken = normalizePhoneticBridge(spokenWord);
    const bridgeTarget = normalizePhoneticBridge(targetWord);
    if (!bridgeSpoken || !bridgeTarget) return false;

    if (bridgeSpoken === bridgeTarget) return true;

    const bridgeDistance = levenshteinDistance(bridgeSpoken, bridgeTarget);
    const bridgeBaseLength = Math.max(bridgeSpoken.length, bridgeTarget.length, 1);
    const bridgeSimilarity = 1 - bridgeDistance / bridgeBaseLength;

    if (bridgeSimilarity >= 0.8) return true;

    return false;
}

const LOW_CONFIDENCE_MISPRONUNCIATION_THRESHOLD = 0.82;
const MISPRONUNCIATION_SIMILARITY_THRESHOLD = 0.4;
const AZURE_MISPRONUNCIATION_ACCURACY_THRESHOLD = 75;
const STRICT_RECOGNITION_MODE = true;
const STRICT_NOISE_FALLBACK_MODE = false;
const NOISE_RMS_THRESHOLD = 0.12;
const NOISE_ADVANCE_COOLDOWN_MS = 350;

const SPEECH_ASSIST_COOLDOWN_MS = 1200;
const SPEECH_ASSIST_MIN_CONFIDENCE = 0.5;
const INTERIM_PROCESS_MIN_CONFIDENCE = 0.45;
const FINAL_PROCESS_MIN_CONFIDENCE = 0.3;
const DESKTOP_INTERIM_MIN_CONFIDENCE = 0.58;
const DESKTOP_FINAL_MIN_CONFIDENCE = 0.45;
const INTERIM_MIN_TOKEN_LENGTH = 2;
const FAST_READING_LOOKAHEAD = 1;
const MOBILE_FAST_READING_LOOKAHEAD = 1;
const MOBILE_MAX_OMISSION_JUMP = 1;
const USE_BACKEND_STT_MODE = true;
const MOBILE_STREAM_TIMESLICE_FAST_MS = 50;
const MOBILE_STREAM_TIMESLICE_STABLE_MS = 80;
const MOBILE_STREAM_STALL_THRESHOLD_MS = 1400;
const MOBILE_LIVE_PREVIEW_INTERVAL_MS = 500;
const MOBILE_LIVE_PREVIEW_MIN_BYTES = 1800;
const MOBILE_LIVE_PREVIEW_MAX_CHUNKS = 14;
const MOBILE_LIVE_TRANSCRIPT_TAIL_WORDS = 4;
const DEEPGRAM_API_KEY = "bf322035aa3f2ced5cc4dfb26579846b2ce1f91d";
const BROWSER_RECOGNITION_LANG = "en-US";
const BACKEND_STT_LANGUAGE = "en-US";
const BACKEND_STT_MIN_TRANSCRIPT_CHARS = 2;
const BACKEND_STT_MIN_MATCHED_WORDS = 4;
const BACKEND_STT_MIN_MATCH_RATIO = 0.18;
const ENABLE_AZURE_PRONUNCIATION_ASSESSMENT = false;
const AZURE_ASSESSMENT_ENDPOINTS = [];

function clearWordStateClasses(el) {
    if (!el) return;
    el.classList.remove("read-success", "sub-error", "omit-error", "add-error", "mis-error");
}

function resetMobileStallTracking() {
    mobileStallWordIndex = -1;
    mobileStallFinalMissCount = 0;
}

function isClearMobileReadToken(token, confidence, isFinal) {
    if (!token || token.length < INTERIM_MIN_TOKEN_LENGTH) {
        return false;
    }

    if (isFinal) {
        return true;
    }

    if (typeof confidence === "number" && Number.isFinite(confidence)) {
        return confidence >= 0.72;
    }

    return isIOSDevice() && token.length >= 4;
}

function isMobileHighlightMode() {
    return getPlatformRuntime().mobile;
}

function isIOSDevice() {
    return getPlatformRuntime().ios;
}

function flushHighlightUpdate() {
    highlightFlushHandle = null;

    if (pendingHighlightIndex < 0) {
        return;
    }

    const nextIndex = pendingHighlightIndex;
    pendingHighlightIndex = -1;

    if (nextIndex === lastHighlightedIndex) {
        return;
    }

    if (wordElements[lastHighlightedIndex]) {
        wordElements[lastHighlightedIndex].classList.remove("current-word");
    }

    if (wordElements[nextIndex]) {
        wordElements[nextIndex].classList.add("current-word");
    }

    lastHighlightedIndex = nextIndex;
}

function advanceWordFromSpeechAssist(className = "mis-error") {
    if (!isRecording || currentWordIndex >= wordElements.length) return;

    markWordAsError(currentWordIndex, className);
    currentWordIndex++;
    syncSentencePointerToCurrentWord();
    highlightCurrentWord();
    resetHesitation();

    if (currentWordIndex >= wordElements.length) {
        stopFluencyTest();
    }
}

function maybeAssistProgressFromSpeech(result, transcript) {
    if (!isRecording || currentWordIndex >= wordElements.length) return;

    if (isMobileHighlightMode()) {
        return;
    }

    const normalizedTranscript = normalizeWord(transcript);
    if (!normalizedTranscript) return;

    const now = Date.now();
    const isFinalResult = result?.isFinal === true;
    const rawConfidence = result?.[0]?.confidence;
    const confidence = (typeof rawConfidence === "number" && rawConfidence > 0) ? rawConfidence : null;

    if (!isFinalResult) {
        return;
    }

    if (confidence !== null && confidence < SPEECH_ASSIST_MIN_CONFIDENCE) {
        return;
    }

    if (now - lastSpeechAssistAdvanceAt < SPEECH_ASSIST_COOLDOWN_MS) {
        return;
    }

    if (normalizedTranscript.length < 4) {
        return;
    }

    if (normalizedTranscript === lastSpeechAssistTranscript) {
        return;
    }

    advanceWordFromSpeechAssist("mis-error");
    lastSpeechAssistAdvanceAt = now;
    lastSpeechAssistTranscript = normalizedTranscript;
}

function showAppAlert(message, title = "Notice") {
    const alertRoot = document.getElementById("appAlert");
    const titleEl = document.getElementById("appAlertTitle");
    const messageEl = document.getElementById("appAlertMessage");

    if (!alertRoot || !titleEl || !messageEl) {
        window.alert(message);
        return;
    }

    titleEl.innerText = title;
    messageEl.innerText = message;
    alertRoot.classList.add("show");
    alertRoot.setAttribute("aria-hidden", "false");
}

function closeAppAlert() {
    const alertRoot = document.getElementById("appAlert");
    if (!alertRoot) return;

    alertRoot.classList.remove("show");
    alertRoot.setAttribute("aria-hidden", "true");

    if (shouldFocusComprehensionCtaAfterAlert) {
        shouldFocusComprehensionCtaAfterAlert = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(spotlightComprehensionButton, 420);
    }
}

window.closeAppAlert = closeAppAlert;

function spotlightComprehensionButton() {
    const ctaButton = document.getElementById("openComprehensionBtn");
    if (!ctaButton) return;

    ctaButton.classList.remove("cta-glow");
    void ctaButton.offsetWidth;
    ctaButton.classList.add("cta-glow");

    ctaButton.scrollIntoView({ behavior: "smooth", block: "center" });

    if (typeof ctaButton.focus === "function") {
        ctaButton.focus({ preventScroll: true });
    }

    if (comprehensionCtaClearHandle) {
        clearTimeout(comprehensionCtaClearHandle);
    }

    comprehensionCtaClearHandle = setTimeout(() => {
        ctaButton.classList.remove("cta-glow");
    }, 8000);
}

function hasWordStateClass(el, className) {
    return (
        className &&
        el.classList.contains(className) &&
        !el.classList.contains("current-word")
    );
}

function markWordAsRead(index) {
    const shouldCount = arguments[1] !== false;
    const el = wordElements[index];
    if (!el) return;

    const hasErrorClass =
        el.classList.contains("sub-error") ||
        el.classList.contains("omit-error") ||
        el.classList.contains("add-error") ||
        el.classList.contains("mis-error");

    if (hasErrorClass) {
        if (shouldCount && el.dataset.readCounted !== "1") {
            totalWordsRead++;
            el.dataset.readCounted = "1";
        }
        return;
    }

    if (hasWordStateClass(el, "read-success")) {
        if (shouldCount && el.dataset.readCounted !== "1") {
            totalWordsRead++;
            el.dataset.readCounted = "1";
        }
        return;
    }

    scheduleDomUpdate(() => {
        el.classList.remove("current-word");
        clearWordStateClasses(el);
        el.classList.add("read-success");
    });
    if (shouldCount) {
        if (el.dataset.readCounted !== "1") {
            totalWordsRead++;
            el.dataset.readCounted = "1";
        }
    } else {
        el.dataset.readCounted = "0";
    }
}

function markWordAsError(index, className) {
    const el = wordElements[index];
    if (!el) return;

    if (hasWordStateClass(el, className)) {
        return;
    }

    const existingErrorClass =
        el.classList.contains("sub-error") ? "sub-error" :
        el.classList.contains("mis-error") ? "mis-error" :
        el.classList.contains("omit-error") ? "omit-error" :
        el.classList.contains("add-error") ? "add-error" :
        "";

    if ((existingErrorClass === "sub-error" || existingErrorClass === "mis-error") &&
        (className === "omit-error" || className === "add-error")) {
        return;
    }

    scheduleDomUpdate(() => {
        el.classList.remove("current-word");
        clearWordStateClasses(el);
        el.classList.add(className);
    });
}

function levenshteinDistance(a, b) {
    const rows = a.length + 1;
    const cols = b.length + 1;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) dp[i][0] = i;
    for (let j = 0; j < cols; j++) dp[0][j] = j;

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[a.length][b.length];
}

function formatStopwatch(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateStopwatchDisplay() {
    document.getElementById("seconds").innerText = formatStopwatch(stopwatchSeconds);
}

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    updateStopwatchDisplay();

    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
}

async function startAudioRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
    }

    if (typeof window.MediaRecorder === "undefined") {
        return false;
    }

    recordedAudioChunks = [];

    const preferredMimeTypes = [
        "audio/mp4;codecs=mp4a.40.2",
        "audio/mp4",
        "audio/aac",
        "audio/webm;codecs=opus",
        "audio/ogg;codecs=opus",
        "audio/webm",
        "audio/ogg"
    ];

    const canCheckMime = typeof MediaRecorder.isTypeSupported === "function";
    const selectedMimeType = canCheckMime
        ? preferredMimeTypes.find(type => {
            try {
                return MediaRecorder.isTypeSupported(type);
            } catch {
                return false;
            }
        })
        : null;
    recordedAudioMimeType = selectedMimeType || "";

    try {
        const runtime = getPlatformRuntime();
        const audioConstraints = runtime.mobile ? true : {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        };

        mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: audioConstraints
        });

        mediaRecorder = selectedMimeType
            ? new MediaRecorder(mediaStream, { mimeType: selectedMimeType })
            : new MediaRecorder(mediaStream);

        recordedAudioMimeType = mediaRecorder.mimeType || selectedMimeType || recordedAudioMimeType || "audio/webm";

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedAudioChunks.push(event.data);
                // PIPE TO AI STREAM (Mobile Real-time Highlighter)
                if (deepgramSocket && deepgramSocket.readyState === 1) {
                    deepgramSocket.send(event.data);
                    deepgramAudioChunksSent++;
                }
            }
        };

        if (mobileRecorderFlushHandle) {
            clearInterval(mobileRecorderFlushHandle);
            mobileRecorderFlushHandle = null;
        }

        if (runtime.mobile && typeof mediaRecorder.requestData === "function") {
            mobileRecorderFlushHandle = setInterval(() => {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    try {
                        mediaRecorder.requestData();
                    } catch { }
                }
            }, 140);
        }

        mediaRecorder.start(mobileRecorderTimesliceMs);
        startStrictNoiseMonitor();
        return true;
    } catch (error) {
        console.warn("Audio recording could not start:", error);
        mediaRecorder = null;
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        stopStrictNoiseMonitor();
        return false;
    }
}

async function ensureMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showAppAlert(
            "Microphone is not available in this browser/environment. Use HTTPS and a supported Chrome browser.",
            "Microphone Unavailable"
        );
        return false;
    }

    try {
        const probeStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        probeStream.getTracks().forEach((track) => track.stop());

        // Crucial for mobile: Wake up the AudioContext immediately after a user gesture
        const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
        if (AudioContextCtor) {
            if (!audioContext) {
                audioContext = new AudioContextCtor();
            }
            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }
        }

        return true;
    } catch (error) {
        const reason = String(error?.name || "").toLowerCase();
        const blockedByPermission = reason.includes("notallowed") || reason.includes("security");

        showAppAlert(
            blockedByPermission
                ? "Microphone permission is blocked. Enable microphone access for this site in browser settings, then try again."
                : "Could not access your microphone. Check browser/site mic settings and device input, then try again.",
            "Microphone Access Needed"
        );

        return false;
    }
}

function startStrictNoiseMonitor() {
    stopStrictNoiseMonitor();

    if (!STRICT_RECOGNITION_MODE || !STRICT_NOISE_FALLBACK_MODE || !mediaStream) {
        return;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
        return;
    }

    try {
        audioContext = new AudioContextCtor();
        const source = audioContext.createMediaStreamSource(mediaStream);
        audioAnalyser = audioContext.createAnalyser();
        audioAnalyser.fftSize = 1024;
        source.connect(audioAnalyser);
        audioDataArray = new Uint8Array(audioAnalyser.fftSize);

        noiseMonitorInterval = setInterval(() => {
            if (!isRecording || !audioAnalyser || !audioDataArray) return;

            audioAnalyser.getByteTimeDomainData(audioDataArray);

            let sumSquares = 0;
            for (let i = 0; i < audioDataArray.length; i++) {
                const centered = (audioDataArray[i] - 128) / 128;
                sumSquares += centered * centered;
            }

            const rms = Math.sqrt(sumSquares / audioDataArray.length);
            const now = Date.now();

            if (rms >= NOISE_RMS_THRESHOLD && now - lastNoiseAdvanceAt >= NOISE_ADVANCE_COOLDOWN_MS) {
                advanceWordFromStrictNoise();
                lastNoiseAdvanceAt = now;
            }
        }, 80);
    } catch (error) {
        console.warn("Strict noise monitor could not start:", error);
        stopStrictNoiseMonitor();
    }
}

function stopStrictNoiseMonitor() {
    if (noiseMonitorInterval) {
        clearInterval(noiseMonitorInterval);
        noiseMonitorInterval = null;
    }

    audioDataArray = null;
    audioAnalyser = null;

    if (audioContext) {
        audioContext.close().catch(() => { });
        audioContext = null;
    }
}

function advanceWordFromStrictNoise() {
    if (!isRecording || currentWordIndex >= wordElements.length) return;

    markWordAsError(currentWordIndex, "add-error");
    currentWordIndex++;
    highlightCurrentWord();
    resetHesitation();

    if (currentWordIndex >= wordElements.length) {
        stopFluencyTest();
    }
}

function stopAudioRecordingAndGetBlob() {
    return new Promise((resolve) => {
        if (!mediaRecorder) {
            if (mobileRecorderFlushHandle) {
                clearInterval(mobileRecorderFlushHandle);
                mobileRecorderFlushHandle = null;
            }
            resolve(null);
            return;
        }

        const finalizeBlob = () => {
            const mimeType = recordedAudioMimeType || "audio/webm";
            const audioBlob = recordedAudioChunks.length
                ? new Blob(recordedAudioChunks, { type: mimeType })
                : null;

            recordedAudioChunks = [];

            if (mobileRecorderFlushHandle) {
                clearInterval(mobileRecorderFlushHandle);
                mobileRecorderFlushHandle = null;
            }

            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }

            mediaStream = null;
            mediaRecorder = null;
            stopStrictNoiseMonitor();

            resolve(audioBlob);
        };

        if (mediaRecorder.state === "inactive") {
            finalizeBlob();
            return;
        }

        mediaRecorder.onstop = finalizeBlob;
        mediaRecorder.stop();
    });
}

async function applyAzurePronunciationAssessment(audioBlob) {
    if (!ENABLE_AZURE_PRONUNCIATION_ASSESSMENT) {
        return false;
    }

    if (!audioBlob || !currentPassageData?.text) {
        return false;
    }

    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBase64 = arrayBufferToBase64(arrayBuffer);
    const requestPayload = {
        audioBase64,
        mimeType: recordedAudioMimeType || audioBlob.type || "audio/webm",
        referenceText: currentPassageData.text,
        language: "en-US"
    };

    for (const endpoint of AZURE_ASSESSMENT_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestPayload)
            });

            if (!response.ok) {
                console.warn("Azure pronunciation assessment HTTP error", endpoint, response.status);
                continue;
            }

            const payload = await response.json();
            if (!payload?.ok || !Array.isArray(payload.words)) {
                console.warn("Azure pronunciation assessment payload invalid", endpoint, payload);
                continue;
            }

            applyAzureWordAssessment(payload.words);
            return true;
        } catch (error) {
            console.warn("Azure pronunciation assessment failed for endpoint:", endpoint, error);
        }
    }

    return false;
}

async function applyBackendSttTranscription(audioBlob, options = {}) {
    if (!USE_BACKEND_STT_MODE || !audioBlob || !currentPassageData?.text) {
        return false;
    }

    lastBackendSttError = "";
    const runtime = getPlatformRuntime();

    if (shouldUseDeepgramMobileOnly(runtime)) {
        console.log("Processing mobile transcription via backend STT endpoint...");

        try {
            const arrayBuffer = await audioBlob.arrayBuffer();
            const endpoint = buildExamFunctionUrl("/.netlify/functions/stt-transcribe");
            const data = await requestExamJson(endpoint, {
                audioBase64: arrayBufferToBase64(arrayBuffer),
                mimeType: recordedAudioMimeType || audioBlob.type || "audio/webm",
                language: BACKEND_STT_LANGUAGE,
                provider: "deepgram"
            });
            const transcript = String(data?.transcript || "").trim();
            return processBackendSttResult(transcript, options);
        } catch (error) {
            console.error("Mobile backend STT failed:", error);
            lastBackendSttError = String(error?.message || error || "Transcription failed");
            return false;
        }
    }

    return false;
}

function processBackendSttResult(transcript, options = {}) {
    const cleanTranscript = String(transcript).trim();
    if (!cleanTranscript) return false;

    const livePreview = options.livePreview === true;

    if (livePreview) {
        const deltaWords = getTranscriptDeltaWords(
            mobileLiveBackendLastTranscript,
            cleanTranscript,
            MOBILE_LIVE_TRANSCRIPT_TAIL_WORDS
        );
        mobileLiveBackendLastTranscript = cleanTranscript;

        if (!deltaWords.length) {
            return false;
        }

        handleVoiceInput(deltaWords.join(" "), {
            allowErrors: true,
            confidence: 1,
            isFinal: false,
            liveProgressOnly: true
        });
        totalWordsRead = document.querySelectorAll(".passage-container .read-success").length;
        updateRealtimeMetrics();
        return true;
    }

    if (cleanTranscript.length < BACKEND_STT_MIN_TRANSCRIPT_CHARS) {
        lastBackendSttError = "Empty transcript from STT";
        return false;
    }

    const transcriptQuality = estimateTranscriptPassageQuality(cleanTranscript);

    // Lower threshold for mobile match quality
    const minRatio = (getPlatformRuntime().mobile) ? 0.05 : BACKEND_STT_MIN_MATCH_RATIO;
    const minWords = (getPlatformRuntime().mobile) ? 1 : BACKEND_STT_MIN_MATCHED_WORDS;

    if (
        transcriptQuality.matchedWords < minWords ||
        transcriptQuality.matchRatio < minRatio
    ) {
        lastBackendSttError = `Low transcript overlap (${transcriptQuality.matchedWords} words found)`;
        return false;
    }

    applyFinalTranscriptionScoring(cleanTranscript);
    return true;
}

function startMobileBackendLivePreview() {
    stopMobileBackendLivePreview();

    if (!shouldUseDeepgramMobileOnly() || !USE_BACKEND_STT_MODE) {
        return;
    }

    mobileLiveBackendLastTranscript = "";
    mobileLiveBackendInFlight = false;

    mobileLiveBackendHandle = setInterval(async () => {
        if (!isRecording || mobileLiveBackendInFlight || !mediaRecorder) {
            return;
        }

        if (deepgramSocket && deepgramSocket.readyState === 1) {
            const now = Date.now();
            const hasRecentStreamTranscript =
                deepgramLastTranscriptAt > 0 &&
                (now - deepgramLastTranscriptAt) <= MOBILE_STREAM_STALL_THRESHOLD_MS;

            if (hasRecentStreamTranscript) {
                return;
            }

            deepgramLastStreamError = `stream stale ${now - deepgramLastTranscriptAt}ms; using fallback`;
            refreshMobileLiveDebugLine();

            if (!mobileRecorderAdaptedToStable && deepgramAudioChunksSent > 30) {
                mobileRecorderTimesliceMs = MOBILE_STREAM_TIMESLICE_STABLE_MS;
                mobileRecorderAdaptedToStable = true;
                deepgramLastStreamError = `stream stalled; next session uses ${MOBILE_STREAM_TIMESLICE_STABLE_MS}ms`;
                refreshMobileLiveDebugLine();
            }
        }

        if (!recordedAudioChunks || recordedAudioChunks.length < 2) {
            return;
        }

        const sampleMime = recordedAudioMimeType || "audio/webm";
        const recentChunks = recordedAudioChunks.slice(-MOBILE_LIVE_PREVIEW_MAX_CHUNKS);
        if (!recentChunks.length) {
            return;
        }

        const snapshotBlob = new Blob(recentChunks, { type: sampleMime });
        if (snapshotBlob.size < MOBILE_LIVE_PREVIEW_MIN_BYTES) {
            return;
        }

        mobileLiveBackendInFlight = true;
        try {
            await applyBackendSttTranscription(snapshotBlob, { livePreview: true });
        } catch (error) {
            console.warn("Mobile live preview update failed:", error);
        } finally {
            mobileLiveBackendInFlight = false;
        }
    }, MOBILE_LIVE_PREVIEW_INTERVAL_MS);
}

function stopMobileBackendLivePreview() {
    if (mobileLiveBackendHandle) {
        clearInterval(mobileLiveBackendHandle);
        mobileLiveBackendHandle = null;
    }
    mobileLiveBackendInFlight = false;
}

/**
 * Applies the final STT results to the passage and updates the scoreboard.
 * Fixes the 0 WPM / 0 Accuracy bug by ensuring the final match is counted.
 */
function applyFinalTranscriptionScoring(transcript) {
    console.log("Applying final transcription scoring...");

    // 1. Mark the words in the passage based on the high-accuracy transcript
    applyTranscriptToPassage(transcript, {
        allowErrors: true,
        confidence: 1
    });

    // 2. Clear all "loading" or "processing" states
    isRecording = false;

    // 3. Re-calculate total success count from THE DOM (final truth)
    totalWordsRead = document.querySelectorAll(".passage-container .read-success").length;

    // 4. Update the dashboard WITH A SAFETY DELAY for mobile metrics
    setTimeout(() => {
        showFluencyResults();
    }, 500);
}

function applyTranscriptToPassage(transcript, options = {}) {
    const cleanTranscript = String(transcript || "").trim();
    if (!cleanTranscript || !wordElements.length) return;

    const hasProcessingCap = Number.isInteger(options.maxProcessIndex);
    const maxProcessIndex = hasProcessingCap
        ? Math.max(-1, Math.min(options.maxProcessIndex, wordElements.length - 1))
        : wordElements.length - 1;

    if (hasProcessingCap && maxProcessIndex < 0) {
        wordElements.forEach((el) => {
            if (!el) return;
            el.dataset.readCounted = "0";
            scheduleDomUpdate(() => {
                el.classList.remove("current-word");
                clearWordStateClasses(el);
            });
        });
        flushDomUpdates();
        currentWordIndex = 0;
        totalWordsRead = 0;
        highlightCurrentWord();
        resetHesitation();
        return;
    }

    currentWordIndex = 0;
    totalWordsRead = 0;
    activeSentenceIndex = 0;

    wordElements.forEach((el, index) => {
        if (!el) return;

        if (!hasProcessingCap || index <= maxProcessIndex) {
            el.dataset.readCounted = "0";
        }

        scheduleDomUpdate(() => {
            el.classList.remove("current-word");
            if (!hasProcessingCap || index <= maxProcessIndex) {
                clearWordStateClasses(el);
            }
        });
    });

    flushDomUpdates();
    highlightCurrentWord();
    resetHesitation();

    handleVoiceInput(cleanTranscript, {
        allowErrors: options.allowErrors !== false,
        confidence: 1,
        isFinal: true,
        forceDetailedMatching: true,
        maxProcessIndex
    });

    flushDomUpdates();

    if (hasProcessingCap) {
        for (let index = maxProcessIndex + 1; index < wordElements.length; index++) {
            const el = wordElements[index];
            if (!el) continue;
            el.dataset.readCounted = "0";
            scheduleDomUpdate(() => {
                clearWordStateClasses(el);
                el.classList.remove("current-word");
            });
        }
        flushDomUpdates();
        currentWordIndex = Math.min(currentWordIndex, maxProcessIndex + 1);
        lastHighlightedIndex = -1;
        highlightCurrentWord();
    }
}

function estimateTranscriptPassageQuality(transcript) {
    const spokenWords = String(transcript || "")
        .toLowerCase()
        .replace(/[^\w\s']/g, "")
        .split(/\s+/)
        .map(normalizeWord)
        .filter((word) => word && word.length >= INTERIM_MIN_TOKEN_LENGTH);

    if (!spokenWords.length || !normalizedPassageWords.length) {
        return {
            matchedWords: 0,
            totalWords: spokenWords.length,
            matchRatio: 0
        };
    }

    let matchedWords = 0;
    let searchStart = 0;

    for (const spokenWord of spokenWords) {
        const matchIndex = findLookaheadMatch(
            spokenWord,
            searchStart,
            8,
            normalizedPassageWords.length - 1
        );

        if (matchIndex === -1) {
            continue;
        }

        matchedWords++;
        searchStart = matchIndex + 1;

        if (searchStart >= normalizedPassageWords.length) {
            break;
        }
    }

    return {
        matchedWords,
        totalWords: spokenWords.length,
        matchRatio: matchedWords / Math.max(spokenWords.length, 1)
    };
}

function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
}

function applyAzureWordAssessment(azureWords) {
    let pointer = 0;

    azureWords.forEach((wordResult) => {
        const spokenWord = normalizeWord(wordResult.word);
        const errorType = String(wordResult.errorType || "").toLowerCase();
        const accuracyScore = Number(wordResult.accuracyScore || 100);

        while (pointer < wordElements.length) {
            const targetWord = normalizeWord(wordElements[pointer].innerText);

            if (!targetWord) {
                pointer++;
                continue;
            }

            if (errorType === "omission") {
                markWordAsError(pointer, "omit-error");
                pointer++;
                return;
            }

            if (isAcceptableWordMatch(spokenWord, targetWord)) {
                if (errorType === "mispronunciation" || accuracyScore < AZURE_MISPRONUNCIATION_ACCURACY_THRESHOLD) {
                    markWordAsError(pointer, "mis-error");
                } else if (errorType === "insertion") {
                    markWordAsError(pointer, "add-error");
                } else if (errorType === "substitution") {
                    markWordAsError(pointer, "sub-error");
                } else if (errorType === "omission") {
                    markWordAsError(pointer, "omit-error");
                } else {
                    markWordAsRead(pointer, false);
                }

                pointer++;
                return;
            }

            pointer++;
        }
    });

    flushDomUpdates();
    totalWordsRead = wordElements.filter(el => el.classList.contains("read-success")).length;
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function renderQuiz(questions) {
    let quizHTML = "";
    questions.forEach((item, qIdx) => {
        quizHTML += `
            <div class="question-item">
                <p><strong>${qIdx + 1}. ${item.q}</strong></p>
                ${item.options.map((opt, oIdx) => `
                    <label class="option-label">
                        <input type="radio" name="q${qIdx}" value="${oIdx}"> ${opt}
                    </label>
                `).join('')}
            </div>
        `;
    });
    document.getElementById("xwquizArea").innerHTML = quizHTML;
}

function startBackendOnlyRecordingSession() {
    isRecording = true;
    shouldAutoRestartRecognition = true;
    lastRecognitionEventAt = 0;
    lastRecognitionRestartAt = 0;
    recognitionNoEventRestartCount = 0;
    hasShownLiveHighlightFallbackNotice = false;
    recognitionSessionStartedAt = Date.now();

    startTime = Date.now();
    currentWordIndex = 0;
    totalWordsRead = 0;
    liveTranscriptCursor = "";
    liveResultSegments.clear();
    pendingSpeechQueue = [];
    speechQueueHandle = null;
    activeSentenceIndex = 0;
    lastSpeechAssistAdvanceAt = 0;
    lastSpeechAssistTranscript = "";
    lastMobileLiveFallbackTranscript = "";
    lastMobileLiveFallbackAt = 0;
    deepgramLiveTranscriptCursor = "";
    deepgramAudioChunksSent = 0;
    deepgramLastDeltaLength = 0;
    deepgramLastTranscriptAt = 0;
    deepgramLastStreamError = "";
    deepgramLastSocketState = "starting";
    lastHesitationMarkedIndex = -1;
    resetMobileStallTracking();

    wordElements.forEach((el) => {
        if (!el) return;
        el.dataset.readCounted = "0";
        scheduleDomUpdate(() => {
            el.classList.remove("current-word");
            clearWordStateClasses(el);
        });
    });
    lastHighlightedIndex = -1;
    highlightCurrentWord();

    document.getElementById("startReadingBtn").innerText = "🛑 STOP RECORDING";
    document.getElementById("startReadingBtn").style.background = "#c0392b";

    // START STOPWATCH IMMEDIATELY
    startStopwatch();

    // MOBILE FIX: REMOVED Ghost engine to prevent multi-mic conflict
    // Start background high-accuracy recording only for mobile
    startAudioRecording().then((started) => {
        if (!started && isRecording) {
            console.warn("Background audio recording failed to start.");
            deepgramLastStreamError = "mediaRecorder start failed";
            refreshMobileLiveDebugLine();
            return;
        }

        startMobileBackendLivePreview();
    });

    startMobileLiveDebugTicker();

}

function handleRecognitionResultEvent(event) {
    if (!isRecording) return;

    lastRecognitionEventAt = Date.now();
    recognitionNoEventRestartCount = 0;
    const isMobileMode = isMobileHighlightMode();
    const runtime = getPlatformRuntime();
    const livePolicy = getLivePolicy();
    const platformReadAloudFlow = getPlatformReadAloudFlow(runtime, livePolicy);
    const matchingProfile = getMatchingProfile();
    const baseInterimMinConfidence = Number(matchingProfile.interimProcessMinConfidence || INTERIM_PROCESS_MIN_CONFIDENCE);
    const baseFinalMinConfidence = Number(matchingProfile.finalProcessMinConfidence || FINAL_PROCESS_MIN_CONFIDENCE);
    const interimMinConfidence = isMobileMode
        ? baseInterimMinConfidence
        : Math.max(baseInterimMinConfidence, DESKTOP_INTERIM_MIN_CONFIDENCE);
    const finalMinConfidence = isMobileMode
        ? baseFinalMinConfidence
        : Math.max(baseFinalMinConfidence, DESKTOP_FINAL_MIN_CONFIDENCE);
    const mobileTailCount = Number(platformReadAloudFlow.getTailCount(livePolicy) || 3);
    const now = Date.now();
    let sawFinalTranscript = false;

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result?.[0]?.transcript || "";
        const rawConfidence = result?.[0]?.confidence;
        const confidence = (typeof rawConfidence === "number" && rawConfidence > 0) ? rawConfidence : null;
        const isFinal = result.isFinal === true;

        if (isFinal) {
            sawFinalTranscript = true;
        }

        if (isMobileMode && !isFinal && transcript) {
            const advancedFromInterim = handleInterimVoiceInput(transcript);
            if (advancedFromInterim) {
                updateRealtimeMetrics();
            }
        }

        if (!isFinal && confidence !== null && confidence < interimMinConfidence) {
            continue;
        }

        if (isFinal && confidence !== null && confidence < finalMinConfidence) {
            continue;
        }

        const deltaWords = getDeltaWordsFromResultSegment(i, transcript, isFinal);

        if (!isFinal && deltaWords.length < 1) {
            if (isMobileMode && transcript) {
                const fallbackAction = platformReadAloudFlow.resolveFallbackAction({
                    transcript,
                    tailCount: mobileTailCount,
                    lastSnapshot: lastMobileLiveFallbackTranscript,
                    lastSnapshotAt: lastMobileLiveFallbackAt,
                    now,
                    isFinal: false,
                    confidence: confidence ?? NaN
                });

                if (fallbackAction.shouldProcess) {
                    handleVoiceInput(fallbackAction.snapshot, {
                        ...fallbackAction.options
                    });
                    lastMobileLiveFallbackTranscript = fallbackAction.snapshot;
                    lastMobileLiveFallbackAt = now;
                }
            }

            continue;
        }

        if (!deltaWords.length) {
            if (isFinal && isMobileMode) {
                const fallbackAction = platformReadAloudFlow.resolveFallbackAction({
                    transcript,
                    tailCount: mobileTailCount,
                    lastSnapshot: lastMobileLiveFallbackTranscript,
                    lastSnapshotAt: lastMobileLiveFallbackAt,
                    now,
                    isFinal: true,
                    confidence: confidence ?? NaN
                });

                if (fallbackAction.shouldProcess) {
                    handleVoiceInput(fallbackAction.snapshot, {
                        ...fallbackAction.options
                    });
                    lastMobileLiveFallbackTranscript = fallbackAction.snapshot;
                    lastMobileLiveFallbackAt = now;
                }

                continue;
            }

            maybeAssistProgressFromSpeech(result, transcript);
            continue;
        }

        if (!isFinal) {
            handleVoiceInput(deltaWords.join(" "), {
                allowErrors: isMobileMode,
                confidence: confidence ?? NaN,
                isFinal: false,
                liveProgressOnly: isMobileMode
            });
            continue;
        }

        if (isMobileMode) {
            const finalDeltaOptions = platformReadAloudFlow.getFinalDeltaOptions({
                isFinal: true,
                confidence: confidence ?? NaN
            });
            handleVoiceInput(deltaWords.join(" "), {
                ...finalDeltaOptions
            });
            continue;
        }

        enqueueSpeechWords(deltaWords.join(" "), {
            allowErrors: true,
            confidence,
            isFinal: true
        });
        updateRealtimeMetrics();
    }

    if (sawFinalTranscript) {
        resetLiveTranscriptCursors();
    }
}

function startFluencyTest() {
    if (!examStarted) {
        showAppAlert("Start Exam first before using Oral Reading & Fluency.", "Exam Not Started");
        return;
    }

    // Crucial for mobile: Synchronously resume and update UI
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextCtor) {
        if (!audioContext) audioContext = new AudioContextCtor();
        if (audioContext.state === "suspended") {
            audioContext.resume().catch(e => console.warn("AudioContext resume failed", e));
        }
    }

    if (isRecording) {
        stopFluencyTest();
        return;
    }

    const btn = document.getElementById("startReadingBtn");
    btn.innerText = "⏳ STARTING...";
    btn.style.background = "#f39c12";

    // Call async portion without 'await' to preserve click context
    runFluencyTestStartSequence();
}

async function runFluencyTestStartSequence() {
    // Safety Fuse for mobile: if mic doesn't respond in 3.5s, reset
    const safetyFuse = setTimeout(() => {
        if (!isRecording) {
            const btn = document.getElementById("startReadingBtn");
            btn.innerText = "🎤 START READING ALOUD";
            btn.style.background = "#27ae60";
            showAppAlert("Microphone took too long to start. Try refreshing or checking browser permissions.", "Connection Timeout");
        }
    }, 3500);

    const hasMicrophoneAccess = await ensureMicrophonePermission();
    clearTimeout(safetyFuse);

    if (!hasMicrophoneAccess) {
        const btn = document.getElementById("startReadingBtn");
        btn.innerText = "🎤 START READING ALOUD";
        btn.style.background = "#27ae60";
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognitionCtor = SpeechRecognition || null;
    bindSpeechRecoveryHandlers();

    const runtime = getPlatformRuntime();
    // Use Deepgram only on mobile OS, native recognition on desktop.
    const forceBackendMode = shouldUseDeepgramMobileOnly(runtime);

    if (forceBackendMode) {
        // Start background high-accuracy recording
        startBackendOnlyRecordingSession();

        // MOBILE AI STREAMING (Real-time Highlighting)
        initDeepgramLiveStream();
        return;
    }

    if (!SpeechRecognition) {
        showAppAlert("Please use Chrome browser for speech recognition support.", "Browser Required");
        resetStartReadingButton();
        return;
    }

    recognition = new SpeechRecognition();
    isRecording = true;
    shouldAutoRestartRecognition = true;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = BROWSER_RECOGNITION_LANG;

    recognition.onstart = () => {
        isRecording = true;
        shouldAutoRestartRecognition = true;
        lastRecognitionEventAt = 0;
        lastRecognitionRestartAt = 0;
        recognitionNoEventRestartCount = 0;
        hasShownLiveHighlightFallbackNotice = false;
        recognitionSessionStartedAt = Date.now();

        startTime = Date.now();
        currentWordIndex = 0;
        totalWordsRead = 0;
        liveTranscriptCursor = "";
        liveResultSegments.clear();
        pendingSpeechQueue = [];
        speechQueueHandle = null;
        activeSentenceIndex = 0;
        lastSpeechAssistAdvanceAt = 0;
        lastSpeechAssistTranscript = "";
        resetMobileStallTracking();

        wordElements.forEach((el) => {
            if (!el) return;
            el.dataset.readCounted = "0";
            scheduleDomUpdate(() => {
                el.classList.remove("current-word");
                clearWordStateClasses(el);
            });
        });
        lastHighlightedIndex = -1;
        highlightCurrentWord();

        document.getElementById("startReadingBtn").innerText = "🛑 STOP RECORDING";
        document.getElementById("startReadingBtn").style.background = "#c0392b";

        startStopwatch();
        startAudioRecording().then((started) => {
            if (!started && isRecording) {
                showAppAlert(
                    "Microphone recording did not start. Please check microphone access and try again.",
                    "Microphone Error"
                );
                stopFluencyTest();
            }
        });
        startHesitationTimer();
        startRecognitionWatchdog();
    };

    recognition.onresult = handleRecognitionResultEvent;
    const lifecycleAdapter = getRecognitionLifecycleAdapter(getPlatformRuntime(), getWatchdogProfile());

    recognition.onerror = (e) => {
        console.log("Speech error:", e.error);

        if (lifecycleAdapter.shouldRestartOnError({
            error: e.error,
            isRecording,
            shouldAutoRestartRecognition,
            allowAnyError: false
        })) {
            scheduleRecognitionRestart();
            return;
        }

        stopFluencyTest();
    };

    recognition.onend = () => {
        if (lifecycleAdapter.shouldRestartOnEnd({ isRecording, shouldAutoRestartRecognition })) {
            resetLiveTranscriptCursors();
            scheduleRecognitionRestart();
            return;
        }
        console.log("Recognition stopped");
    };

    startRecognitionWithRetry(120);

    setTimeout(() => {
        if (isRecording && recognitionSessionStartedAt === 0) {
            shouldAutoRestartRecognition = false;
            isRecording = false;
            stopRecognitionWatchdog();
            if (recognition) {
                try {
                    recognition.abort();
                } catch { }
                recognition = null;
            }
            resetStartReadingButton();
            showAppAlert(
                "Speech recognition did not start. Check microphone permission and try again.",
                "Recognition Not Started"
            );
        }
    }, 4200);
}

function buildCombinedTranscript(results) {
    let combined = "";

    for (let i = 0; i < results.length; i++) {
        const segment = results[i]?.[0]?.transcript || "";
        if (segment) {
            combined += segment + " ";
        }
    }

    return combined.trim();
}

function handleVoiceInput(spokenText, options = { allowErrors: true, confidence: 1, isFinal: false }) {
    if (currentWordIndex >= wordElements.length) return;

    const allowErrors = options.allowErrors !== false;
    const recognitionConfidenceRaw = typeof options.confidence === "number" ? options.confidence : 1;
    const recognitionConfidence = Number.isFinite(recognitionConfidenceRaw) ? recognitionConfidenceRaw : 1;
    const isFinalResult = options.isFinal === true;
    const forceDetailedMatching = options.forceDetailedMatching === true;
    const liveProgressOnly = options.liveProgressOnly === true;
    const hasProcessCap = Number.isInteger(options.maxProcessIndex);
    const processCapIndex = hasProcessCap
        ? Math.max(-1, Math.min(options.maxProcessIndex, wordElements.length - 1))
        : wordElements.length - 1;
    const runtime = getPlatformRuntime();
    const livePolicy = getLivePolicy();
    const matchingProfile = getMatchingProfile();
    const lowConfidenceThreshold = Number(
        matchingProfile.lowConfidenceMispronunciationThreshold || LOW_CONFIDENCE_MISPRONUNCIATION_THRESHOLD
    );
    const mobileFastLookahead = Number(matchingProfile.mobileFastReadingLookahead || MOBILE_FAST_READING_LOOKAHEAD);
    const mobileMaxOmissionJump = Number(matchingProfile.mobileMaxOmissionJump || MOBILE_MAX_OMISSION_JUMP);
    const platformAdapter = getSpeechPlatformAdapter(runtime, livePolicy, {
        forceDetailedMatching,
        liveProgressOnly
    });
    const matchingEngine = getTranscriptMatchingEngine();
    const liveProgressRules = getLiveProgressRules();
    const detailedMatchingRules = getDetailedMatchingRules();
    const endEvaluator = getVoiceInputEndEvaluator();
    const decisionLogger = getDecisionDebugLogger();
    const stateMutations = getSpeechStateMutations({
        getCurrentWordIndex: () => currentWordIndex,
        setCurrentWordIndex: (value) => { currentWordIndex = value; },
        markWordAsRead,
        markWordAsError,
        highlightCurrentWord,
        resetHesitation,
        resetMobileStallTracking
    });
    const transitionHelpers = getSpeechTransitionHelpers({
        getCurrentWordIndex: () => currentWordIndex,
        setCurrentWordIndex: (value) => { currentWordIndex = value; },
        markWordAsError,
        syncSentencePointerToCurrentWord,
        readAndAdvance: () => stateMutations.readAndAdvance()
    });
    const callbackActions = getSpeechCallbackActions({
        getCurrentWordIndex: () => currentWordIndex,
        setCurrentWordIndex: (value) => { currentWordIndex = value; },
        determineErrorType,
        stateMutations,
        highlightCurrentWord
    });
    const isMobileRecognitionMode = platformAdapter.isMobileRecognitionMode;
    const strictMobileLiveMode = platformAdapter.strictMobileLiveMode;
    const isIOSLiveMode = runtime.ios && liveProgressOnly;
    const iosConservativeLive = platformAdapter.iosConservativeLive;

    const withDecision = (label, fn) => {
        return (...args) => {
            decisionLogger.log(label, {
                currentWordIndex,
                isFinalResult,
                liveProgressOnly,
                args
            });
            return fn(...args);
        };
    };

    if (hasProcessCap && currentWordIndex > processCapIndex) return;

    const spokenWords = matchingEngine.toNormalizedWords(spokenText);
    const tailSize = platformAdapter.getFinalTailSize(isFinalResult);
    const wordsToProcess = matchingEngine.getWordsToProcess(spokenWords, {
        strictMobileLiveMode,
        isFinalResult,
        tailSize
    });

    const startWordIndex = currentWordIndex;
    syncSentencePointerToCurrentWord();

    for (let i = 0; i < wordsToProcess.length; i++) {
        if (currentWordIndex >= wordElements.length || currentWordIndex > processCapIndex) {
            break;
        }

        syncSentencePointerToCurrentWord();
        const currentSentence = getCurrentSentenceRange();
        const currentSentenceEnd = Math.min(currentSentence.end, wordElements.length - 1, processCapIndex);

        const targetWord = getTargetWordAt(currentWordIndex);
        const normalizedSpokenWord = normalizeWord(wordsToProcess[i]);
        const nextSpokenWord = normalizeWord(wordsToProcess[i + 1]);
        const nextTargetWord = currentWordIndex + 1 <= processCapIndex
            ? getTargetWordAt(currentWordIndex + 1)
            : "";

        if (!normalizedSpokenWord) {
            continue;
        }

        if (liveProgressOnly) {
            decisionLogger.log("live.processToken", {
                currentWordIndex,
                normalizedSpokenWord,
                targetWord,
                nextTargetWord,
                recognitionConfidence,
                isFinalResult,
                allowErrors,
                iosConservativeLive
            });

            liveProgressRules.processToken({
                normalizedSpokenWord,
                targetWord,
                nextSpokenWord,
                nextTargetWord,
                isFinalResult,
                allowErrors,
                allowSoftAdvanceWithoutErrors: liveProgressOnly && !allowErrors,
                iosConservativeLive,
                recognitionConfidence,
                lowConfidenceThreshold,
                isAcceptableWordMatch,
                isClearMobileReadToken,
                safeLookahead: platformAdapter.getSafeLookahead(),
                currentWordIndex,
                currentSentenceEnd,
                findLookaheadMatch,
                onRead: withDecision("live.onRead", () => stateMutations.readAndAdvance({ resetMobileStall: true })),
                onMis: withDecision("live.onMis", () => stateMutations.errorAndAdvance("mis-error", { resetMobileStall: true })),
                onAdd: withDecision("live.onAdd", () => stateMutations.errorOnly("add-error")),
                onOmit: withDecision("live.onOmit", () => stateMutations.errorAndAdvance("omit-error", { resetMobileStall: true })),
                onSub: withDecision("live.onSub", () => callbackActions.determineAndRefresh(
                    normalizedSpokenWord,
                    targetWord,
                    recognitionConfidence
                )),
                onIosLookahead: withDecision("live.onIosLookahead", (index) => stateMutations.setIndexAndReadAdvance(index, { resetMobileStall: true })),
                onAdvanceRefresh: withDecision("live.onAdvanceRefresh", () => callbackActions.advanceAndRefresh({ resetMobileStall: true })),
                onRefresh: withDecision("live.onRefresh", () => stateMutations.refresh())
            });

            continue;
        }

        decisionLogger.log("detailed.processToken", {
            currentWordIndex,
            normalizedSpokenWord,
            targetWord,
            nextTargetWord,
            recognitionConfidence,
            isFinalResult,
            allowErrors,
            strictMobileLiveMode,
            isMobileRecognitionMode
        });

        detailedMatchingRules.processToken({
            normalizedSpokenWord,
            targetWord,
            nextSpokenWord,
            nextTargetWord,
            isFinalResult,
            recognitionConfidence,
            lowConfidenceThreshold,
            strictMobileLiveMode,
            allowErrors,
            isMobileRecognitionMode,
            mobileMaxOmissionJump,
            currentWordIndex,
            currentSentenceEnd,
            nextSentence: sentenceRanges[activeSentenceIndex + 1],
            fastReadingLookahead: FAST_READING_LOOKAHEAD,
            isAcceptableWordMatch,
            isClearMobileReadToken,
            findLookaheadMatch,
            getLookaheadWindow: () => matchingEngine.getLookaheadWindow({
                isMobileRecognitionMode,
                mobileLookahead: mobileFastLookahead,
                fastReadingLookahead: FAST_READING_LOOKAHEAD,
                currentSentenceEnd,
                currentWordIndex
            }),
            onExactMis: withDecision("detailed.onExactMis", () => stateMutations.errorAndAdvance("mis-error", { resetMobileStall: true })),
            onExactRead: withDecision("detailed.onExactRead", () => stateMutations.readAndAdvance({ resetMobileStall: true })),
            onStrictMobileOmit: withDecision("detailed.onStrictMobileOmit", () => stateMutations.errorAndAdvance("omit-error")),
            onStrictMobileClassify: withDecision("detailed.onStrictMobileClassify", () => callbackActions.strictMobileClassify(
                normalizedSpokenWord,
                targetWord,
                recognitionConfidence,
                lowConfidenceThreshold
            )),
            onLookaheadRange: withDecision("detailed.onLookaheadRange", (matchIndex) => transitionHelpers.applyLookaheadRange(matchIndex)),
            onLookaheadSingleMobile: withDecision("detailed.onLookaheadSingleMobile", () => stateMutations.errorAndAdvance("omit-error")),
            onLookaheadSingleDesktop: withDecision("detailed.onLookaheadSingleDesktop", () => callbackActions.lookaheadSingleDesktop()),
            onNextSentenceMatch: withDecision("detailed.onNextSentenceMatch", (nextSentenceMatch) => transitionHelpers.applyNextSentenceMatch(nextSentenceMatch)),
            onOmission: withDecision("detailed.onOmission", () => callbackActions.omissionFlow(isMobileRecognitionMode, wordElements.length)),
            onAddition: withDecision("detailed.onAddition", () => stateMutations.errorOnly("add-error")),
            onDetermineError: withDecision("detailed.onDetermineError", () => callbackActions.determineAndRefresh(
                normalizedSpokenWord,
                targetWord,
                recognitionConfidence
            ))
        });

        continue;
    }

    const shouldApplyFallback = endEvaluator.shouldApplySentenceFallback({
        isFinalResult,
        currentWordIndex,
        startWordIndex,
        strictMobileLiveMode,
        wordsToProcessLength: wordsToProcess.length,
        isMobileRecognitionMode,
        recognitionConfidence,
        minWords: Number(matchingProfile.sentenceFallbackMinWords || 3),
        minConfidence: Number(matchingProfile.sentenceFallbackMinConfidence || FINAL_PROCESS_MIN_CONFIDENCE)
    });
    decisionLogger.log("end.shouldApplyFallback", {
        shouldApplyFallback,
        currentWordIndex,
        startWordIndex,
        strictMobileLiveMode,
        wordsToProcessLength: wordsToProcess.length,
        isFinalResult
    });

    if (shouldApplyFallback) {
        applyFinalSentenceFallback(wordsToProcess, recognitionConfidence, processCapIndex, {
            minMatchRatio: Number(matchingProfile.sentenceFallbackMinMatchRatio || 0.35),
            minConfidenceForRatioGate: Number(matchingProfile.sentenceFallbackMinConfidence || FINAL_PROCESS_MIN_CONFIDENCE)
        });
    }

    const postLoopAction = endEvaluator.resolvePostLoopAction({
        currentWordIndex,
        processCapIndex,
        wordCount: wordElements.length,
        useBackendSttMode: USE_BACKEND_STT_MODE,
        isMobileRecognitionMode,
        forceDetailedMatching,
        isIOSLiveMode
    });
    decisionLogger.log("end.postLoopAction", {
        postLoopAction,
        currentWordIndex,
        processCapIndex,
        wordCount: wordElements.length,
        isMobileRecognitionMode,
        isIOSLiveMode,
        forceDetailedMatching,
        useBackendSttMode: USE_BACKEND_STT_MODE
    });

    if (postLoopAction.type === "stop") {
        stopFluencyTest();
        return;
    }

    if (postLoopAction.type === "clamp-end") {
        callbackActions.clampToEnd(postLoopAction.index);
        return;
    }
}

function getDeltaWordsFromResultSegment(segmentIndex, transcript, isFinal) {
    const normalizedTranscript = (transcript || "")
        .toLowerCase()
        .replace(/[^\w\s']/g, "")
        .trim();

    const previousTranscript = liveResultSegments.get(segmentIndex) || "";
    const currentWords = normalizedTranscript ? normalizedTranscript.split(/\s+/).filter(Boolean) : [];
    const previousWords = previousTranscript ? previousTranscript.split(/\s+/).filter(Boolean) : [];

    let commonPrefixLength = 0;
    while (
        commonPrefixLength < previousWords.length &&
        commonPrefixLength < currentWords.length &&
        previousWords[commonPrefixLength] === currentWords[commonPrefixLength]
    ) {
        commonPrefixLength++;
    }

    if (isFinal) {
        liveResultSegments.delete(segmentIndex);
    } else {
        liveResultSegments.set(segmentIndex, normalizedTranscript);
    }

    return currentWords.slice(commonPrefixLength);
}

function getTranscriptDeltaWords(previousTranscript, currentTranscript, rewriteTailWords = MOBILE_LIVE_TRANSCRIPT_TAIL_WORDS) {
    const normalizeTranscript = (value) => String(value || "")
        .toLowerCase()
        .replace(/[^\w\s']/g, "")
        .trim();

    const prevNormalized = normalizeTranscript(previousTranscript);
    const currNormalized = normalizeTranscript(currentTranscript);

    if (!currNormalized) {
        return [];
    }

    const previousWords = prevNormalized ? prevNormalized.split(/\s+/).filter(Boolean) : [];
    const currentWords = currNormalized ? currNormalized.split(/\s+/).filter(Boolean) : [];

    let commonPrefixLength = 0;
    while (
        commonPrefixLength < previousWords.length &&
        commonPrefixLength < currentWords.length &&
        previousWords[commonPrefixLength] === currentWords[commonPrefixLength]
    ) {
        commonPrefixLength++;
    }

    if (!previousWords.length) {
        return currentWords;
    }

    if (commonPrefixLength === currentWords.length) {
        return [];
    }

    if (commonPrefixLength === 0) {
        return currentWords.slice(-Math.max(1, Number(rewriteTailWords) || 1));
    }

    return currentWords.slice(commonPrefixLength);
}


function startHesitationTimer() {
    clearInterval(hesitationInterval);
    hesitationSeconds = 0;
    hesitationInterval = setInterval(() => {
        hesitationSeconds++;
        if (hesitationSeconds >= 5) {
            if (
                currentWordIndex < wordElements.length &&
                lastHesitationMarkedIndex !== currentWordIndex
            ) {
                markWordAsError(currentWordIndex, "add-error");
                highlightCurrentWord();
                lastHesitationMarkedIndex = currentWordIndex;
            }
            hesitationSeconds = 5;
        }
    }, 1000);
}

function resetHesitation() {
    hesitationSeconds = 0;
    lastHesitationMarkedIndex = -1;
}

function determineErrorType(spoken, target, confidence = 1) {
    const classifier = getSpeechErrorClassifier();
    const classification = classifier.classify({
        spoken,
        target,
        confidence,
        isAcceptableWordMatch,
        levenshteinDistance,
        normalizePhoneticBridge,
        mispronunciationSimilarityThreshold: MISPRONUNCIATION_SIMILARITY_THRESHOLD,
        mispronunciationBridgeSimilarityThreshold: 0.72,
        lowConfidenceMispronunciationThreshold: LOW_CONFIDENCE_MISPRONUNCIATION_THRESHOLD
    });

    if (classification === "read") {
        markWordAsRead(currentWordIndex);
        currentWordIndex++;
        resetHesitation();
        return;
    }

    markWordAsError(currentWordIndex, classification);

    currentWordIndex++;
    resetHesitation();
}

async function stopFluencyTest() {
    if (!isRecording) return;

    stopMobileBackendLivePreview();
    stopMobileLiveDebugTicker();

    if (deepgramSocket) {
        try {
            deepgramSocket.onopen = null;
            deepgramSocket.onmessage = null;
            deepgramSocket.onclose = null;
            deepgramSocket.onerror = null;
            deepgramSocket.close();
        } catch { }
        deepgramSocket = null;
    }
    deepgramLiveTranscriptCursor = "";

    shouldAutoRestartRecognition = false;
    if (recognitionRestartHandle) {
        clearTimeout(recognitionRestartHandle);
        recognitionRestartHandle = null;
    }
    stopRecognitionWatchdog();

    flushPendingSpeechQueueImmediately();
    if (recognition) {
        await waitForRecognitionDrain(180);
        flushPendingSpeechQueueImmediately();
    }

    const trailingInterimTranscript = getPendingInterimTranscriptSnapshot();
    const hasFreshTail = Date.now() - lastRecognitionEventAt <= 450;
    if (trailingInterimTranscript && hasFreshTail) {
        handleVoiceInput(trailingInterimTranscript, {
            allowErrors: false,
            confidence: 1,
            isFinal: false
        });
        flushPendingSpeechQueueImmediately();
    }

    const stopBoundaryIndex = currentWordIndex - 1;
    isRecording = false;

    if (recognition) {
        try {
            recognition.onresult = null;
            recognition.onend = null;
            recognition.onerror = null;

            recognition.abort();
        } catch (e) { }

        recognition = null;
    }

    clearInterval(hesitationInterval);
    stopStopwatch();
    liveTranscriptCursor = "";
    pendingSpeechQueue = [];
    speechQueueHandle = null;
    liveResultSegments.clear();
    activeSentenceIndex = 0;
    lastSpeechAssistTranscript = "";
    resetMobileStallTracking();
    lastRecognitionRestartAt = 0;
    recognitionSessionStartedAt = 0;
    recognitionNoEventRestartCount = 0;
    hasShownLiveHighlightFallbackNotice = false;
    stopStrictNoiseMonitor();

    const recordedAudioBlob = await stopAudioRecordingAndGetBlob();
    document.getElementById("startReadingBtn").innerText = "⏳ PROCESSING...";
    document.getElementById("startReadingBtn").style.background = "#f39c12";

    let backendSttApplied = false;
    if (recordedAudioBlob) {
        backendSttApplied = await applyBackendSttTranscription(recordedAudioBlob, {
            maxProcessIndex: stopBoundaryIndex
        });
    }

    if (USE_BACKEND_STT_MODE && !backendSttApplied) {
        if (lastBackendSttError && lastBackendSttError.startsWith("Low transcript overlap")) {
            showAppAlert(
                "Backend transcript quality was too low, so the system kept your live reading result.",
                "Using Live Result"
            );
        } else if (lastBackendSttError) {
            showAppAlert(
                `Could not transcribe audio from backend STT. ${lastBackendSttError}`,
                "Transcription Unavailable"
            );
        }
    }

    if (recordedAudioBlob) {
        await applyAzurePronunciationAssessment(recordedAudioBlob);
    }

    const domReadCount = document.querySelectorAll(".passage-container .read-success").length;
    totalWordsRead = Math.max(totalWordsRead, domReadCount);
    updateRealtimeMetrics();

    document.getElementById("startReadingBtn").innerText = "🎤 START READING ALOUD";
    document.getElementById("startReadingBtn").style.background = "#27ae60";

    showFluencyResults();
}

function updateRealtimeMetrics() {
    const safeTotalWords = Math.max(wordElements.length, 1);
    const elapsedMinutes = Math.max(stopwatchSeconds / 60, 1 / 60);
    const wordsReadNow = Number.isFinite(totalWordsRead) ? totalWordsRead : 0;
    const wpm = Math.round(wordsReadNow / elapsedMinutes || 0);
    const accuracy = Math.round((wordsReadNow / safeTotalWords) * 100);

    currentFluencyMetrics = {
        wordsRead: wordsReadNow,
        totalWords: wordElements.length,
        wpm,
        accuracyPercent: accuracy
    };

    const wpmValEl = document.getElementById("wpmVal");
    const spdValEl = document.getElementById("spdVal");
    if (wpmValEl) wpmValEl.innerText = wpm;
    if (spdValEl) spdValEl.innerText = wpm;
}

function showFluencyResults() {
    const timeElapsed = Math.max(stopwatchSeconds / 60, 1 / 60);
    const wpm = Math.round(totalWordsRead / timeElapsed || 0);

    const accuracy = Math.round((totalWordsRead / wordElements.length) * 100);

    currentFluencyMetrics = {
        wordsRead: totalWordsRead,
        totalWords: wordElements.length,
        wpm,
        accuracyPercent: accuracy
    };

    const resultsDashEl = document.getElementById("resultsDash");
    const scoreValueEl = document.getElementById("scoreValue");
    if (resultsDashEl) {
        resultsDashEl.style.display = "block";
    }
    if (scoreValueEl) {
        scoreValueEl.innerText = `${totalWordsRead}/${wordElements.length}`;
    }

    showAppAlert(`WPM: ${wpm}\nAccuracy: ${accuracy}%`, "Accuracy Score");
}

let currentLevel = "";
let currentPassageIndex = 0;
let score = 0;
let currentPassageOrder = 1;
let currentPassageTotal = 0;
let currentAttemptId = null;
let currentFluencyMetrics = {
    wordsRead: 0,
    totalWords: 0,
    wpm: 0,
    accuracyPercent: 0
};
let deepgramSocket = null; // AI Streaming for Mobile
let deepgramLiveTranscriptCursor = "";
let deepgramLastSocketState = "idle";
let deepgramLastDeltaLength = 0;
let deepgramAudioChunksSent = 0;
let deepgramLastTranscriptAt = 0;
let deepgramLastStreamError = "";
let mobileLiveDebugTicker = null;
let mobileRecorderTimesliceMs = MOBILE_STREAM_TIMESLICE_FAST_MS;
let mobileRecorderAdaptedToStable = false;

function resolveExamApiBase() {
    const host = String(window.location.hostname || "").toLowerCase();
    const isNetlifyHost = host.endsWith("netlify.app") || host.endsWith("netlify.live");
    const isLocalHost = host === "localhost" || host === "127.0.0.1";

    if (isNetlifyHost) {
        return "";
    }

    if (isLocalHost) {
        return "https://word-harbor.netlify.app";
    }

    return "";
}

const EXAM_API_BASE = resolveExamApiBase();

function buildExamFunctionUrl(path) {
    if (!EXAM_API_BASE) {
        return path;
    }

    return `${EXAM_API_BASE}${path}`;
}

async function requestExamJson(url, payload) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
        const coreMessage = result?.error || `Request failed with status ${response.status}`;
        const detailsMessage = String(result?.details || "").trim();
        throw new Error(detailsMessage ? `${coreMessage}: ${detailsMessage}` : coreMessage);
    }

    return result;
}

function ensureMobileLiveDebugLine() {
    let line = document.getElementById("mobileLiveDebugLine");
    if (line) return line;

    line = document.createElement("div");
    line.id = "mobileLiveDebugLine";
    line.style.position = "fixed";
    line.style.right = "8px";
    line.style.bottom = "8px";
    line.style.zIndex = "10002";
    line.style.background = "rgba(0,0,0,0.78)";
    line.style.color = "#7CFC00";
    line.style.fontFamily = "monospace";
    line.style.fontSize = "10px";
    line.style.lineHeight = "1.3";
    line.style.padding = "6px 8px";
    line.style.borderRadius = "8px";
    line.style.maxWidth = "74vw";
    line.style.pointerEvents = "none";
    line.style.whiteSpace = "pre-line";
    line.style.display = "none";
    document.body.appendChild(line);
    return line;
}

function getDeepgramSocketStateLabel() {
    if (!deepgramSocket) return "none";
    if (deepgramSocket.readyState === WebSocket.CONNECTING) return "connecting";
    if (deepgramSocket.readyState === WebSocket.OPEN) return "open";
    if (deepgramSocket.readyState === WebSocket.CLOSING) return "closing";
    if (deepgramSocket.readyState === WebSocket.CLOSED) return "closed";
    return "unknown";
}

function refreshMobileLiveDebugLine() {
    const line = ensureMobileLiveDebugLine();
    const runtime = getPlatformRuntime();
    const mobileMode = shouldUseDeepgramMobileOnly(runtime);

    if (!mobileMode) {
        line.style.display = "none";
        return;
    }

    line.style.display = "block";
    const socketState = getDeepgramSocketStateLabel();
    const now = Date.now();
    const transcriptAgeMs = deepgramLastTranscriptAt ? (now - deepgramLastTranscriptAt) : -1;
    const backendErr = String(lastBackendSttError || "").slice(0, 42);
    const streamErr = String(deepgramLastStreamError || "").slice(0, 42);
    line.innerText = [
        `mobile:${mobileMode ? "yes" : "no"} socket:${socketState}`,
        `chunks:${deepgramAudioChunksSent} deltaWords:${deepgramLastDeltaLength}`,
        `lastMsgMs:${transcriptAgeMs < 0 ? "-" : transcriptAgeMs}`,
        `sttErr:${backendErr || "-"}`,
        `streamErr:${streamErr || "-"}`
    ].join("\n");
}

function startMobileLiveDebugTicker() {
    stopMobileLiveDebugTicker();
    refreshMobileLiveDebugLine();
    mobileLiveDebugTicker = setInterval(refreshMobileLiveDebugLine, 500);
}

function stopMobileLiveDebugTicker() {
    if (mobileLiveDebugTicker) {
        clearInterval(mobileLiveDebugTicker);
        mobileLiveDebugTicker = null;
    }

    const line = document.getElementById("mobileLiveDebugLine");
    if (line) {
        line.style.display = "none";
    }
}

async function startStudentAttemptRecord(studentName, level, passageTitle) {
    try {
        const db = firebase.firestore();
        const normalizedName = String(studentName || "").trim().toLowerCase();

        if (!normalizedName) return null;

        // Ensure student exists
        const studentRef = db.collection("students").doc(normalizedName);
        await studentRef.set({
            fullName: studentName,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Create attempt
        const attemptRef = await db.collection("attempts").add({
            studentId: normalizedName,
            studentName: studentName,
            level: level,
            passageTitle: passageTitle,
            fluencyWordsRead: 0,
            fluencyTotalWords: 0,
            wpm: 0,
            accuracyPercent: 0,
            comprehensionScore: 0,
            comprehensionTotal: 0,
            startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return attemptRef.id;
    } catch (error) {
        console.error("Firestore Error in startStudentAttemptRecord:", error);
        return null;
    }
}

async function completeStudentAttemptRecord(attemptId, comprehensionScore, comprehensionTotal) {
    if (!attemptId) return;

    try {
        const db = firebase.firestore();
        await db.collection("attempts").doc(attemptId).update({
            fluencyWordsRead: currentFluencyMetrics.wordsRead,
            fluencyTotalWords: currentFluencyMetrics.totalWords,
            wpm: currentFluencyMetrics.wpm,
            accuracyPercent: currentFluencyMetrics.accuracyPercent,
            comprehensionScore,
            comprehensionTotal,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error("Firestore Error in completeStudentAttemptRecord:", error);
    }
}

function buildQuizHtml(data) {
    let quizHTML = "";

    data.questions.forEach((item, qIdx) => {
        const displayQuestionNumber = qIdx + 1;
        quizHTML += `
            <div class="question-item">
                <span class="question-text">${displayQuestionNumber}. ${item.q}</span>
                ${item.options.map((opt, oIdx) => {
            const letter = String.fromCharCode(65 + oIdx);
            return `
        <label class="option-label">
            <input type="radio" name="q${qIdx}" value="${oIdx}">
            <strong>${letter}.</strong> ${opt}
        </label>
    `;
        }).join("")}
            </div>
        `;
    });

    return quizHTML;
}

function getAnsweredQuestionCount() {
    if (!currentPassageData || !Array.isArray(currentPassageData.questions)) return 0;

    let answered = 0;
    currentPassageData.questions.forEach((_, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected) {
            answered++;
        }
    });

    return answered;
}

function areAllCurrentPassageQuestionsAnswered() {
    const total = Array.isArray(currentPassageData?.questions) ? currentPassageData.questions.length : 0;
    if (!total) return false;
    return getAnsweredQuestionCount() === total;
}

function updateSubmitButtonState() {
    const submitBtnEl = document.getElementById("submitBtn");
    if (!submitBtnEl) return;

    const total = Array.isArray(currentPassageData?.questions) ? currentPassageData.questions.length : 0;
    const answered = getAnsweredQuestionCount();
    const canSubmit = total > 0 && answered === total;

    submitBtnEl.disabled = !canSubmit;
    submitBtnEl.title = canSubmit
        ? "Submit answers"
        : `Answer all questions first (${answered}/${total})`;
}

function bindQuizAnswerListeners() {
    const quizAreaEl = document.getElementById("quizArea");
    if (!quizAreaEl || quizAreaEl.dataset.answerBinding === "1") return;

    quizAreaEl.addEventListener("change", updateSubmitButtonState);
    quizAreaEl.dataset.answerBinding = "1";
}

function showExamInterface() {
    const inputContainerEl = document.getElementById("inputContainer");
    if (inputContainerEl) {
        inputContainerEl.style.display = "none";
    }

    const assessmentPagesPanelEl = document.getElementById("assessmentPagesPanel");
    if (assessmentPagesPanelEl) {
        assessmentPagesPanelEl.style.display = "block";
    }

    const examAreaEl = document.getElementById("examArea");
    if (examAreaEl) {
        examAreaEl.style.display = "";
    }

    const submitBtnEl = document.getElementById("submitBtn");
    if (submitBtnEl) {
        submitBtnEl.style.display = "block";
        updateSubmitButtonState();
    }
}

function persistExamSessionState(studentName) {
    const payload = {
        studentName: String(studentName || "").trim(),
        level: currentLevel,
        passageIndex: currentPassageIndex,
        passageOrder: currentPassageOrder,
        passageTotal: currentPassageTotal,
        attemptId: currentAttemptId
    };

    localStorage.setItem("activeExamSession", JSON.stringify(payload));
}

function updatePassageIndicator() {
    const indicatorEl = document.getElementById("passageIndicator");
    if (!indicatorEl || !currentPassageData) return;

    const questionCount = Array.isArray(currentPassageData.questions) ? currentPassageData.questions.length : 0;
    const questionStart = questionCount > 0 ? 1 : 0;
    const questionEnd = questionCount;

    indicatorEl.innerText = `Passage ${currentPassageOrder} of ${currentPassageTotal || "-"} • Questions ${questionStart}-${questionEnd}`;
    indicatorEl.style.display = "block";
}

function restoreExamSessionOnIndex() {
    const inputContainerEl = document.getElementById("inputContainer");
    const examAreaEl = document.getElementById("examArea");
    const studentNameEl = document.getElementById("studentName");
    const levelSelectEl = document.getElementById("level");
    const quizAreaEl = document.getElementById("quizArea");
    const passageTitleEl = document.getElementById("passageTitle");

    if (!inputContainerEl || !examAreaEl || !studentNameEl || !levelSelectEl || !quizAreaEl || !passageTitleEl) {
        return false;
    }

    let session;
    try {
        session = JSON.parse(localStorage.getItem("activeExamSession") || "null");
    } catch (error) {
        session = null;
    }

    if (!session?.level) {
        return false;
    }

    const levelData = assessmentData[session.level];
    const index = Number(session.passageIndex);

    if (!Array.isArray(levelData) || Number.isNaN(index) || index < 0 || index >= levelData.length) {
        return false;
    }

    const restoredStudentName = String(session.studentName || localStorage.getItem("lastStudentName") || "").trim();
    if (restoredStudentName) {
        studentNameEl.value = restoredStudentName;
    }

    levelSelectEl.value = session.level;
    currentLevel = session.level;
    currentPassageIndex = index;
    currentPassageTotal = getPassageCycleIndices(levelData).length;
    currentPassageOrder = Math.min(
        Math.max(Number(session.passageOrder) || index + 1, 1),
        Math.max(currentPassageTotal, 1)
    );
    currentPassageData = levelData[index];
    currentAttemptId = Number(session.attemptId || 0) || null;
    examStarted = true;

    passageTitleEl.innerText = currentPassageData.title;
    preparePassageForFluency(currentPassageData.text);
    quizAreaEl.innerHTML = buildQuizHtml(currentPassageData);
    bindQuizAnswerListeners();
    updatePassageIndicator();

    showExamInterface();

    const startReadingBtn = document.getElementById("startReadingBtn");
    if (startReadingBtn) {
        startReadingBtn.disabled = false;
    }

    return true;
}

function getUsedPassagesByLevel() {
    try {
        const raw = JSON.parse(localStorage.getItem("usedPassagesByLevel") || "{}");
        return raw && typeof raw === "object" ? raw : {};
    } catch (error) {
        return {};
    }
}

function setUsedPassagesByLevel(value) {
    localStorage.setItem("usedPassagesByLevel", JSON.stringify(value || {}));
}

function getPassageCycleIndices(levelData) {
    const cycleCount = Math.min(10, Array.isArray(levelData) ? levelData.length : 0);
    return Array.from({ length: cycleCount }, (_, idx) => idx);
}

function pickRandomPassageIndex(indices) {
    if (!Array.isArray(indices) || !indices.length) {
        return -1;
    }

    const randomIndex = Math.floor(Math.random() * indices.length);
    return indices[randomIndex];
}

function selectSequentialPassageIndex(level, levelData, isNextRequest) {
    const usedByLevel = getUsedPassagesByLevel();
    const cycleIndices = getPassageCycleIndices(levelData);
    const cycleSet = new Set(cycleIndices);
    const usedForLevel = Array.isArray(usedByLevel[level])
        ? usedByLevel[level].filter((index) => cycleSet.has(index))
        : [];

    if (!cycleIndices.length) {
        return {
            index: 0,
            order: 1,
            total: 0
        };
    }

    const isNewExamStart = !isNextRequest || currentLevel !== level || !examStarted;

    if (isNewExamStart) {
        usedForLevel.length = 0;
        const firstIndex = pickRandomPassageIndex(cycleIndices);
        usedForLevel.push(firstIndex);
        usedByLevel[level] = usedForLevel;
        setUsedPassagesByLevel(usedByLevel);
        return {
            index: firstIndex,
            order: 1,
            total: cycleIndices.length
        };
    }

    if (usedForLevel.length >= cycleIndices.length) {
        usedForLevel.length = 0;
        showAppAlert("Passages 1-10 reshuffled. Starting a new random cycle.", "Passage Cycle Complete");
    }

    const usedSet = new Set(usedForLevel);
    const available = cycleIndices.filter((index) => !usedSet.has(index));
    const nextIndex = pickRandomPassageIndex(available.length ? available : cycleIndices);

    usedForLevel.push(nextIndex);
    usedByLevel[level] = usedForLevel;
    setUsedPassagesByLevel(usedByLevel);

    return {
        index: nextIndex,
        order: usedForLevel.length,
        total: cycleIndices.length
    };
}


function renderSelectedPassage(data) {
    document.getElementById("passageTitle").innerText = data.title;
    currentPassageData = data;
    currentFluencyMetrics = {
        wordsRead: 0,
        totalWords: 0,
        wpm: 0,
        accuracyPercent: 0
    };
    preparePassageForFluency(data.text);
    updatePassageIndicator();

    const quizHTML = buildQuizHtml(data);

    document.getElementById("quizArea").innerHTML = quizHTML;
    bindQuizAnswerListeners();
    showExamInterface();

    document.getElementById("examArea").style.display = "";
    document.getElementById("submitBtn").style.display = "block";
    updateSubmitButtonState();
    const resultsDashEl = document.getElementById("resultsDash");
    if (resultsDashEl) {
        resultsDashEl.style.display = "none";
    }

    const startReadingBtn = document.getElementById("startReadingBtn");
    if (startReadingBtn) {
        startReadingBtn.disabled = false;
    }

    stopStopwatch();
    stopwatchSeconds = 0;
    updateStopwatchDisplay();

    document.getElementById("examArea").scrollIntoView({ behavior: "smooth" });
}

async function loadPreviousPassage() {
    if (!examStarted) {
        showAppAlert("Start exam first before going to previous passage.", "Exam Not Started");
        return;
    }

    const selectedLevel = document.getElementById("level")?.value || currentLevel;
    const levelData = assessmentData[selectedLevel];
    if (!Array.isArray(levelData) || !levelData.length) {
        showAppAlert("No passages available for the selected level.", "No Passage");
        return;
    }

    const usedByLevel = getUsedPassagesByLevel();
    const cycleSet = new Set(getPassageCycleIndices(levelData));
    const usedForLevel = Array.isArray(usedByLevel[selectedLevel])
        ? usedByLevel[selectedLevel].filter((index) => cycleSet.has(index))
        : [];

    if (usedForLevel.length <= 1) {
        showAppAlert("You are already on the first passage for this level.", "First Passage");
        return;
    }

    usedForLevel.pop();
    const previousIndex = usedForLevel[usedForLevel.length - 1];
    usedByLevel[selectedLevel] = usedForLevel;
    setUsedPassagesByLevel(usedByLevel);

    currentLevel = selectedLevel;
    currentPassageTotal = getPassageCycleIndices(levelData).length;
    currentPassageOrder = usedForLevel.length;
    currentPassageIndex = previousIndex;
    examStarted = true;

    const effectiveName = String(
        document.getElementById("studentName")?.value || localStorage.getItem("lastStudentName") || ""
    ).trim();
    if (effectiveName) {
        localStorage.setItem("lastStudentName", effectiveName);
    }

    currentAttemptId = null;
    try {
        currentAttemptId = await startStudentAttemptRecord(
            effectiveName,
            currentLevel,
            levelData[currentPassageIndex]?.title || ""
        );
    } catch (error) {
        console.warn("Could not start student attempt record:", error);
    }

    persistExamSessionState(effectiveName);
    renderSelectedPassage(levelData[currentPassageIndex]);
}

async function loadPassage(isNextRequest = false) {
    // Pre-warm AudioContext on user gesture
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextCtor && !audioContext) {
        audioContext = new AudioContextCtor();
    }

    const studentName = document.getElementById("studentName").value.trim();
    currentLevel = document.getElementById("level").value;
    const levelData = assessmentData[currentLevel];

    const studentNameEl = document.getElementById("studentName");
    const typedName = String(studentNameEl?.value || "").trim();
    const savedName = String(localStorage.getItem("lastStudentName") || "").trim();
    const effectiveName = typedName || savedName;

    if (!Array.isArray(levelData) || !levelData.length) {
        showAppAlert("No passages available for the selected level.", "No Passage");
        return;
    }

    if (!isNextRequest && !effectiveName) {
        showAppAlert("Please enter Student Name before starting.", "Missing Student Name");
        return;
    }

    if (isNextRequest && !effectiveName) {
        showAppAlert("No active student session found. Please start exam first.", "Session Required");
        return;
    }

    if (studentNameEl && !studentNameEl.value && effectiveName) {
        studentNameEl.value = effectiveName;
    }

    localStorage.setItem("lastStudentName", effectiveName);
    localStorage.setItem("latestAssessmentLevel", currentLevel);

    examStarted = true;

    const passageSelection = selectSequentialPassageIndex(currentLevel, levelData, isNextRequest);
    currentPassageIndex = passageSelection.index;
    currentPassageOrder = passageSelection.order;
    currentPassageTotal = passageSelection.total;
    const data = levelData[currentPassageIndex];

    currentAttemptId = null;
    try {
        currentAttemptId = await startStudentAttemptRecord(effectiveName, currentLevel, data?.title || "");
    } catch (error) {
        console.warn("Could not start student attempt record:", error);
    }

    persistExamSessionState(effectiveName);
    renderSelectedPassage(data);
}

function checkAnswers() {
    if (!areAllCurrentPassageQuestionsAnswered()) {
        const total = Array.isArray(currentPassageData?.questions) ? currentPassageData.questions.length : 0;
        const answered = getAnsweredQuestionCount();
        showAppAlert(`Please answer all questions before submitting. (${answered}/${total})`, "Incomplete Answers");
        updateSubmitButtonState();
        return;
    }

    const data = assessmentData[currentLevel][currentPassageIndex];
    let userScore = 0;
    const total = data.questions.length;

    data.questions.forEach((item, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected && parseInt(selected.value) === item.correct) {
            userScore++;
        }
    });

    score = userScore;
    const latestScore = `${userScore}/${total}`;
    localStorage.setItem("latestComprehensionScore", latestScore);
    localStorage.setItem("latestAssessmentLevel", currentLevel);

    const resultsDashEl = document.getElementById("resultsDash");
    const scoreValueEl = document.getElementById("scoreValue");
    if (resultsDashEl) {
        resultsDashEl.style.display = "block";
    }
    if (scoreValueEl) {
        scoreValueEl.innerText = latestScore;
    }

    const redirectBtn = document.getElementById("openComprehensionBtn");
    if (redirectBtn) {
        redirectBtn.disabled = false;
        shouldFocusComprehensionCtaAfterAlert = true;
    }

    completeStudentAttemptRecord(currentAttemptId, userScore, total)
        .then(() => {
            currentAttemptId = null;
        })
        .catch((error) => {
            console.warn("Could not save exam result to database:", error);
        });

    showAppAlert("Comprehension score is ready. Click 'View Comprehension Score' to open it.", "Score Ready");
}

function saveScore() {
    const nameInput = document.getElementById("studentName");
    const name = (nameInput?.value || localStorage.getItem("lastStudentName") || "").trim();
    if (!name) {
        showAppAlert("Please enter Student Name.", "Missing Student Name");
        return;
    }

    const scoreValueEl = document.getElementById("scoreValue");
    const scoreText = String(scoreValueEl?.innerText || localStorage.getItem("latestComprehensionScore") || "").trim();
    const levelText = currentLevel || localStorage.getItem("latestAssessmentLevel") || "-";

    if (!scoreText) {
        showAppAlert("No comprehension score found yet. Submit answers first.", "Score Missing");
        return;
    }

    const entry = {
        date: new Date().toLocaleString(),
        name,
        level: levelText,
        score: scoreText
    };

    let history = JSON.parse(localStorage.getItem("cellsHistory")) || [];
    history.unshift(entry);
    localStorage.setItem("cellsHistory", JSON.stringify(history));

    updateHistoryTable();
    showAppAlert("Record saved to history!", "Success");
}

async function updateHistoryTable() {
    const historyBodyEl = document.getElementById("historyBody");
    if (!historyBodyEl) return;

    try {
        const db = firebase.firestore();
        const snapshot = await db.collection("attempts")
            .orderBy("createdAt", "desc")
            .limit(50)
            .get();

        const html = snapshot.docs.map(doc => {
            const item = doc.data();
            const dateStr = item.createdAt ? (item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt)).toLocaleString() : "-";
            const score = `${item.comprehensionScore || 0}/${item.comprehensionTotal || 0}`;
            return `
                <tr>
                    <td>${dateStr}</td>
                    <td>${item.studentName || "-"}</td>
                    <td>${item.level || "-"}</td>
                    <td>${score}</td>
                </tr>
            `;
        }).join("");

        historyBodyEl.innerHTML = html || '<tr><td colspan="4">No records found.</td></tr>';
    } catch (error) {
        console.error("Error fetching history from Firestore:", error);
        historyBodyEl.innerHTML = '<tr><td colspan="4">Error loading history from cloud.</td></tr>';
    }
}

window.onload = async () => {
    const latestScore = localStorage.getItem("latestComprehensionScore") || "0/0";
    const scoreValueEl = document.getElementById("scoreValue");
    if (scoreValueEl) {
        scoreValueEl.innerText = latestScore;
    }

    const levelBadgeEl = document.getElementById("scoreLevelValue");
    if (levelBadgeEl) {
        levelBadgeEl.innerText = localStorage.getItem("latestAssessmentLevel") || "-";
    }

    updateHistoryTable();

    const restoredExam = restoreExamSessionOnIndex();

    const startReadingBtn = document.getElementById("startReadingBtn");
    if (startReadingBtn && !restoredExam) {
        startReadingBtn.disabled = true;
    }

    initDecisionDebugPanel();
};
function initDeepgramLiveStream() {
    if (!shouldUseDeepgramMobileOnly()) {
        return;
    }

    if (!DEEPGRAM_API_KEY) {
        console.warn("Deepgram live stream skipped: missing DEEPGRAM_API_KEY");
        deepgramLastStreamError = "missing DEEPGRAM_API_KEY";
        refreshMobileLiveDebugLine();
        return;
    }

    if (deepgramSocket && (deepgramSocket.readyState === 0 || deepgramSocket.readyState === 1)) {
        return;
    }

    console.log("Initializing Mobile AI Stream...");
    deepgramLastSocketState = "connecting";
    refreshMobileLiveDebugLine();

    const url = "wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&interim_results=true&endpointing=10";
    try {
        deepgramSocket = new WebSocket(url, ["token", DEEPGRAM_API_KEY]);

        deepgramSocket.onopen = () => {
            console.log("AI Stream: Connected.");
            showAppAlert("Deepgram AI Stream: READY", "AI Live Highlighter");
            deepgramLastSocketState = "open";
            deepgramLastStreamError = "";
            refreshMobileLiveDebugLine();
        };

        deepgramSocket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            const transcript = String(data.channel?.alternatives?.[0]?.transcript || "").trim();

            if (transcript && isRecording) {
                const lower = transcript.toLowerCase();
                const cursor = String(deepgramLiveTranscriptCursor || "");
                let delta = lower;

                if (cursor && lower.startsWith(cursor)) {
                    delta = lower.slice(cursor.length).trim();
                } else if (cursor) {
                    // Deepgram sometimes rewrites earlier words; use a short tail so live highlight can keep moving.
                    const tailWords = lower.split(/\s+/).filter(Boolean).slice(-MOBILE_LIVE_TRANSCRIPT_TAIL_WORDS);
                    delta = tailWords.join(" ");
                }

                deepgramLiveTranscriptCursor = lower;

                if (!delta) {
                    return;
                }

                deepgramLastDeltaLength = delta.split(/\s+/).filter(Boolean).length;
                deepgramLastTranscriptAt = Date.now();

                handleVoiceInput(delta, {
                    allowErrors: false,
                    confidence: 1,
                    isFinal: data.is_final === true,
                    liveProgressOnly: true
                });
                updateRealtimeMetrics();
                refreshMobileLiveDebugLine();

                if (data.is_final === true) {
                    resetLiveTranscriptCursors();
                }
            }
        };

        deepgramSocket.onclose = () => {
            deepgramSocket = null;
            deepgramLastSocketState = "closed";
            refreshMobileLiveDebugLine();
            if (isRecording) {
                console.log("Attempting to reconnect stream...");
                setTimeout(initDeepgramLiveStream, 500);
            }
        };

        deepgramSocket.onerror = (err) => {
            console.error("Deepgram Stream Error:", err);
            deepgramLastSocketState = "error";
            deepgramLastStreamError = String(err?.message || "socket error");
            refreshMobileLiveDebugLine();
        };
    } catch (e) {
        console.error("Deepgram initialization failed", e);
        deepgramLastSocketState = "init-failed";
        deepgramLastStreamError = String(e?.message || e || "init failed");
        refreshMobileLiveDebugLine();
    }
}
