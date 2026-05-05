// --------------------- Estado e Utilitarios Compartilhados ---------------------
const maxNavPerPage = 60;
let navCurrentPage = 1;

let currentQuestion = 0;
let score = 0;
let totalAnswered = 0;
let quizStarted = false;

const questionBanks = window.questionBanks || {};
window.questionBanks = questionBanks;

let questions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateProgressBar() {
    const bar = document.getElementById('progressBar');
    const fill = bar.querySelector('.progress-fill');
    const pct = ((currentQuestion + 1) / questions.length) * 100;
    fill.style.width = pct + '%';
}

/**
 * Embaralha question.options e ajusta question.correct,
 * suportando respostas unicas ("C") e multiplas ("D, E").
 */
function shuffleOptions(question) {
    const entries = Object.entries(question.options);
    const shuffled = shuffleArray(entries);

    const origCorrectList = question.correct
        .split(',')
        .map(k => k.trim())
        .filter(k => k);

    const newOptions = {};
    const newCorrectKeys = [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    shuffled.forEach(([oldKey, text], idx) => {
        const newKey = letters[idx];
        newOptions[newKey] = text;

        if (origCorrectList.includes(oldKey)) {
            newCorrectKeys.push(newKey);
        }
    });

    question.options = newOptions;
    question.correct = newCorrectKeys.join(', ');
}

/**
 * Helper: Valida se a resposta do usuário está correta.
 * @param {string} correctAnswer - Resposta correta (ex: "C" ou "B, D")
 * @param {string|string[]} userAnswer - Resposta do usuário
 * @returns {boolean} true se correto
 */
function isAnswerCorrect(correctAnswer, userAnswer) {
    const correctList = correctAnswer.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    const selected = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

    if (isMultiple) {
        return correctList.length === selected.length && 
               correctList.every(c => selected.includes(c));
    }
    return selected[0] === correctList[0];
}

/**
 * Renderiza lista de opções para uma questão.
 * @param {Object} question - Objeto da questão
 * @param {string} inputName - Nome do input (para diferenciar quiz/eval)
 * @param {Function} onChangeCallback - Callback ao mudar seleção
 * @returns {HTMLUListElement} Lista de opções renderizada
 */
function renderQuestionOptions(question, inputName = 'option', onChangeCallback = null) {
    const correctList = question.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    const inputType = isMultiple ? 'checkbox' : 'radio';
    const maxSelect = correctList.length;

    const optionsList = document.createElement("ul");
    optionsList.className = "options";

    Object.entries(question.options).forEach(([key, text]) => {
        const li = document.createElement("li");
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = inputType;
        input.name = inputName;
        input.value = key;

        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${text ?? ''}`));
        li.appendChild(label);
        optionsList.appendChild(li);
    });

    const inputs = optionsList.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            if (isMultiple) {
                input.closest("li").classList.toggle("selected", input.checked);
                const checkedCount = Array.from(inputs).filter(i => i.checked).length;
                inputs.forEach(i => {
                    if (!i.checked) i.disabled = (checkedCount >= maxSelect);
                });
            } else {
                inputs.forEach(i => i.closest("li").classList.remove("selected"));
                input.closest("li").classList.add("selected");
            }
            if (onChangeCallback) onChangeCallback();
        });
    });

    return optionsList;
}

function cloneQuestion(question) {
    return {
        ...question,
        options: { ...question.options }
    };
}

function setActiveQuestionsByKey(key) {
    const bank = questionBanks[key] || questionBanks.admin || [];
    questions.length = 0;
    bank.forEach(q => questions.push(cloneQuestion(q)));
}

function getSelectedExamKey() {
    const select = document.getElementById("examSelect");
    return select ? select.value : "admin";
}

function updateQuizTitle(examKey = getSelectedExamKey()) {
    const titleEl = document.querySelector(".quiz-header h1");
    const select = document.getElementById("examSelect");

    let examName = "Platform Administrator";
    if (select) {
        const selectedOption = Array.from(select.options).find(opt => opt.value === examKey);
        examName = selectedOption ? selectedOption.textContent.trim() : examName;
    }

    if (titleEl) {
        titleEl.textContent = `Quiz - ${examName}`;
    }

    document.title = `Quiz - ${examName}`;
}

function renderWelcomeState() {
    const quizContent = document.getElementById("quizContent");
    if (!quizContent) return;

    const select = document.getElementById("examSelect");
    const selectedExamName = select
        ? select.options[select.selectedIndex].textContent.trim()
        : "Platform Administrator";

    quizContent.innerHTML = `
        <section class="quiz-welcome">
            <div class="welcome-card">
                <span class="welcome-badge">Prova selecionada: ${selectedExamName}</span>
                <h2 class="welcome-title">Pronto para começar?</h2>
                <p class="welcome-text">Digite seu nome, revise a prova selecionada e inicie quando quiser. O quiz foi organizado para manter foco, ritmo e clareza durante toda a jornada.</p>
                <ul class="welcome-list">
                    <li>Questões embaralhadas automaticamente para treino mais realista.</li>
                    <li>Feedback imediato e placar atualizado em tempo real.</li>
                    <li>Avaliação com tempo para simular o contexto de certificação.</li>
                </ul>
                <button class="welcome-start-btn" type="button">Iniciar Quiz</button>
            </div>
        </section>
    `;

    const startBtn = quizContent.querySelector(".welcome-start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", startQuiz);
    }
}

function setNavigationVisibility(visible) {
    const leftCol = document.getElementById("leftCol");
    const navSection = document.getElementById("navSection");
    if (!navSection || !leftCol) return;

    if (navSection.parentElement !== leftCol) {
        leftCol.appendChild(navSection);
    }

    navSection.style.display = visible ? "" : "none";
}

setActiveQuestionsByKey("admin");
