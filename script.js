
/* =====================================
   1. NAVIGASI
===================================== */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});


/* =====================================
   2. PENANDA ORGAN
===================================== */

const organData = {
    jantung: {
        name: "Jantung",
        description:
            "Jantung berfungsi memompa darah ke seluruh bagian tubuh."
    },

    paru: {
        name: "Paru-paru",
        description:
            "Paru-paru merupakan organ pernapasan yang menjadi tempat pertukaran oksigen dan karbon dioksida."
    },

    hati: {
        name: "Hati",
        description:
            "Hati membantu mengolah zat makanan, menyimpan cadangan energi, dan menetralkan zat berbahaya."
    },

    lambung: {
        name: "Lambung",
        description:
            "Lambung merupakan organ pencernaan yang membantu mencerna makanan secara mekanis dan kimiawi."
    }
};

const organPopup = document.getElementById("organPopup");
const organName = document.getElementById("organName");
const organDescription = document.getElementById("organDescription");

document.querySelectorAll(".hotspot").forEach(button => {

    button.addEventListener("click", () => {

        const organ = organData[button.dataset.organ];

        if (!organ) return;

        organName.textContent = organ.name;
        organDescription.textContent = organ.description;

        organPopup.classList.add("show");

    });

});

document.getElementById("closePopup").addEventListener("click", () => {
    organPopup.classList.remove("show");
});


/* =====================================
   3. PENANGANAN GAMBAR
===================================== */

// Jika gambar tidak dapat dimuat,
// tampilkan pengganti dengan nama materi.

document.querySelectorAll("img[data-fallback]").forEach(img => {

    img.addEventListener("error", () => {

        if (img.dataset.failed) return;

        img.dataset.failed = "true";
        img.style.display = "none";

        const fallback = document.createElement("div");

        fallback.className = "image-fallback";

        const title = document.createElement("strong");

        title.textContent = img.dataset.fallback;

        const description = document.createElement("span");

        description.textContent =
            "Gambar belum tersedia. Periksa koneksi internet atau alamat gambar.";

        fallback.append(title, description);

        img.parentElement.appendChild(fallback);

    });

});


/* =====================================
   4. SIMULASI ALUR IMPULS
===================================== */

const simulationData = {

    sadar: {
        title: "Gerak Sadar",

        description:
            "Gerakan yang dilakukan atas kehendak dan melibatkan pengolahan informasi oleh otak.",

        steps: [
            "Rangsangan",
            "Reseptor",
            "Saraf sensorik",
            "Otak",
            "Saraf motorik",
            "Efektor"
        ]
    },

    refleks: {
        title: "Gerak Refleks",

        description:
            "Gerakan otomatis yang berlangsung cepat melalui pusat gerak refleks di sumsum tulang belakang.",

        steps: [
            "Rangsangan",
            "Reseptor",
            "Saraf sensorik",
            "Sumsum tulang belakang",
            "Saraf motorik",
            "Efektor"
        ]
    }

};

let activeMode = "sadar";
let simulationTimer = null;

const flowContainer = document.getElementById("flowContainer");

const simulationTitle = document.getElementById("simulationTitle");

const simulationDescription =
    document.getElementById("simulationDescription");

const simulationStatus =
    document.getElementById("simulationStatus");

const runSimulation =
    document.getElementById("runSimulation");


function renderSimulation(mode) {

    activeMode = mode;

    clearInterval(simulationTimer);

    const data = simulationData[mode];

    simulationTitle.textContent = data.title;

    simulationDescription.textContent = data.description;

    flowContainer.replaceChildren();

    data.steps.forEach((step, index) => {

        if (index > 0) {

            const arrow = document.createElement("span");

            arrow.className = "flow-arrow";

            arrow.textContent = "→";

            flowContainer.appendChild(arrow);

        }

        const node = document.createElement("div");

        node.className = "flow-node";

        node.textContent = step;

        flowContainer.appendChild(node);

    });


    document.querySelectorAll(".mode-button").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );

    });

    simulationStatus.textContent =
        "Tekan tombol untuk menjalankan simulasi.";

    runSimulation.disabled = false;

    runSimulation.textContent = "Jalankan Simulasi ↗";

}


// Memilih jenis gerakan

document.querySelectorAll(".mode-button").forEach(button => {

    button.addEventListener("click", () => {

        renderSimulation(button.dataset.mode);

    });

});


// Menjalankan alur impuls

runSimulation.addEventListener("click", () => {

    clearInterval(simulationTimer);

    const nodes = [
        ...flowContainer.querySelectorAll(".flow-node")
    ];

    nodes.forEach(node => {
        node.classList.remove("active");
    });

    let index = 0;

    runSimulation.disabled = true;

    runSimulation.textContent = "Simulasi Berjalan...";

    simulationStatus.textContent =
        "Impuls mulai diteruskan...";


    simulationTimer = setInterval(() => {

        nodes.forEach(node => {
            node.classList.remove("active");
        });

        if (index < nodes.length) {

            nodes[index].classList.add("active");

            simulationStatus.textContent =
                `Tahap ${index + 1}: ${simulationData[activeMode].steps[index]}`;

            index++;

        } else {

            clearInterval(simulationTimer);

            simulationStatus.textContent =
                "Perjalanan impuls selesai. Impuls telah mencapai efektor.";

            runSimulation.disabled = false;

            runSimulation.textContent = "Ulangi Simulasi ↻";

        }

    }, 900);

});


/* =====================================
   5. KUIS BIOLOGI
===================================== */

const questions = [

    {
        question:
            "Bagian sistem saraf yang menjadi pusat pengendali tubuh adalah...",

        answers: [
            "Jantung",
            "Otak",
            "Paru-paru",
            "Lambung"
        ],

        correct: 1,

        explanation:
            "Otak merupakan pusat pengendali sistem saraf manusia."
    },

    {
        question:
            "Unit struktural dan fungsional dasar sistem saraf disebut...",

        answers: [
            "Neuron",
            "Osteosit",
            "Trombosit",
            "Alveolus"
        ],

        correct: 0,

        explanation:
            "Neuron merupakan sel saraf yang menerima dan menghantarkan impuls."
    },

    {
        question:
            "Bagian neuron yang menerima rangsangan dari neuron lain adalah...",

        answers: [
            "Akson",
            "Dendrit",
            "Badan sel",
            "Selubung mielin"
        ],

        correct: 1,

        explanation:
            "Dendrit menerima rangsangan dan meneruskannya menuju badan sel."
    },

    {
        question:
            "Salah satu fungsi utama rangka manusia adalah...",

        answers: [
            "Menghasilkan impuls saraf",
            "Mencerna makanan",
            "Menopang dan melindungi tubuh",
            "Memompa darah"
        ],

        correct: 2,

        explanation:
            "Rangka menopang tubuh, memberi bentuk, dan melindungi organ dalam."
    },

    {
        question:
            "Contoh persendian engsel terdapat pada bagian...",

        answers: [
            "Bahu",
            "Siku",
            "Panggul",
            "Pangkal paha"
        ],

        correct: 1,

        explanation:
            "Sendi siku merupakan contoh sendi engsel yang memungkinkan gerakan menekuk dan meluruskan."
    },

    {
        question:
            "Ketika bisep berkontraksi untuk menekuk siku, otot trisep akan...",

        answers: [
            "Ikut berkontraksi",
            "Mengalami relaksasi",
            "Mengalami pertumbuhan",
            "Tidak memiliki fungsi"
        ],

        correct: 1,

        explanation:
            "Bisep dan trisep bekerja secara antagonis. Ketika bisep berkontraksi, trisep mengalami relaksasi."
    }

];


// Variabel kuis

let currentQuestion = 0;

let score = 0;

let hasAnswered = false;


// Elemen HTML

const quizCard = document.getElementById("quizCard");

const resultCard = document.getElementById("resultCard");

const questionNumber = document.getElementById("questionNumber");

const answeredNumber = document.getElementById("answeredNumber");

const questionText = document.getElementById("questionText");

const answerList = document.getElementById("answerList");

const progressBar = document.getElementById("progressBar");

const quizFeedback = document.getElementById("quizFeedback");

const nextQuestion = document.getElementById("nextQuestion");


// Menampilkan pertanyaan

function showQuestion() {

    hasAnswered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `SOAL ${String(currentQuestion + 1).padStart(2, "0")} / 06`;

    answeredNumber.textContent =
        `${currentQuestion} / 6 TERJAWAB`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionText.textContent = question.question;

    quizFeedback.textContent =
        "Pilih satu jawaban yang menurutmu benar.";

    quizFeedback.style.color = "";

    answerList.replaceChildren();

    nextQuestion.disabled = true;

    nextQuestion.textContent =
        currentQuestion === questions.length - 1
            ? "Lihat Hasil →"
            : "Selanjutnya →";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";

        const letter = document.createElement("span");

        letter.className = "answer-letter";

        letter.textContent = String.fromCharCode(65 + index);

        const answerText = document.createElement("span");

        answerText.textContent = answer;

        button.append(letter, answerText);

        button.addEventListener("click", () => {

            checkAnswer(index);

        });

        answerList.appendChild(button);

    });

}


// Memeriksa jawaban

function checkAnswer(selectedIndex) {

    if (hasAnswered) return;

    hasAnswered = true;

    const question = questions[currentQuestion];

    const correctIndex = question.correct;

    const options = [
        ...answerList.querySelectorAll(".answer-option")
    ];

    options.forEach((button, index) => {

        button.disabled = true;

        if (index === correctIndex) {

            button.classList.add("correct");

        }

        if (
            index === selectedIndex &&
            selectedIndex !== correctIndex
        ) {

            button.classList.add("wrong");

        }

    });


    if (selectedIndex === correctIndex) {

        score++;

        quizFeedback.textContent =
            "Benar! " + question.explanation;

        quizFeedback.style.color = "#20d49a";

    } else {

        quizFeedback.textContent =
            "Belum tepat. " + question.explanation;

        quizFeedback.style.color = "#ff9eae";

    }

    answeredNumber.textContent =
        `${currentQuestion + 1} / 6 TERJAWAB`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextQuestion.disabled = false;

}


// Berpindah ke pertanyaan berikutnya

nextQuestion.addEventListener("click", () => {

    if (!hasAnswered) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

});


// Menampilkan nilai akhir

function showResult() {

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");

    const finalScore = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("finalScore").textContent =
        finalScore;

    const passed = finalScore >= 75;

    document.getElementById("resultTitle").textContent =
        passed
            ? "Selamat! Kamu berhasil."
            : "Tetap semangat belajar!";

    document.getElementById("resultDescription").textContent =
        passed
            ? "Nilaimu sudah mencapai KKM 75. Pertahankan pemahamanmu!"
            : "Nilaimu belum mencapai KKM 75. Pelajari kembali materi dan coba lagi.";

    document.getElementById("resultDetail").textContent =
        `Jawaban benar: ${score} dari ${questions.length} soal.`;

}


// Mengulangi kuis

document.getElementById("restartQuiz").addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    hasAnswered = false;

    resultCard.classList.add("hidden");

    quizCard.classList.remove("hidden");

    showQuestion();

});


/* =====================================
   6. MENJALANKAN WEBSITE
===================================== */

renderSimulation("sadar");

showQuestion();

console.log("Digital Human Body Explorer berhasil dijalankan.");
