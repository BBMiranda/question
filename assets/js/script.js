// --------------------- Funções de Embaralhamento ---------------------
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
 * suportando respostas únicas ("C") e múltiplas ("D, E").
 */
function shuffleOptions(question) {
    // 1) Pega entradas [key,text] e embaralha
    const entries = Object.entries(question.options);
    const shuffled = shuffleArray(entries);

    // 2) Lista de chaves originais corretas
    const origCorrectList = question.correct
        .split(',')
        .map(k => k.trim())     // ['D','E']
        .filter(k => k);        // remove vazios

    // 3) Remapeia para novas opções e reconstrói correctList
    const newOptions = {};
    const newCorrectKeys = [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    shuffled.forEach(([oldKey, text], idx) => {
        const newKey = letters[idx];
        newOptions[newKey] = text;

        // Se a antiga key estava entre as corretas, adiciona a nova
        if (origCorrectList.includes(oldKey)) {
            newCorrectKeys.push(newKey);
        }
    });

    // 4) Sobrescreve question.options e question.correct
    question.options = newOptions;
    question.correct = newCorrectKeys.join(', ');  // ex: "D, F"
}

// --------------------- Quiz Normal ---------------------
const maxNavPerPage = 60;
let navCurrentPage = 1;

let currentQuestion = 0;
let score = 0;
let totalAnswered = 0;
let quizStarted = false;

const questionBanks = window.questionBanks || {};
window.questionBanks = questionBanks;

let questions = [];

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

setActiveQuestionsByKey("admin");

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

    // Garante que a navegacao fique sempre na coluna da esquerda.
    if (navSection.parentElement !== leftCol) {
        leftCol.appendChild(navSection);
    }

    navSection.style.display = visible ? "" : "none";
}

function loadQuestion() {
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = "";

    // 1) Atualiza barra de progresso
    const pct = ((currentQuestion + 1) / questions.length) * 100;
    const fill = document.querySelector('.progress-fill');
    if (fill) fill.style.width = `${pct}%`;

    // 2) Se acabou o quiz
    if (currentQuestion >= questions.length) {
        quizContent.innerHTML = `
      <h2>Você concluiu o quiz!</h2>
      <p>Sua pontuação: ${score} de ${questions.length}</p>
    `;
        return;
    }

    const q = questions[currentQuestion];
    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    const maxSelect = correctList.length;

    // 3) Enunciado
    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.innerHTML = `<strong>Pergunta ${q.number}:</strong> ${q.question}`;
    quizContent.appendChild(questionEl);

    // 4) Lista de opções
    const optionsList = document.createElement("ul");
    optionsList.className = "options";
    const type = isMultiple ? 'checkbox' : 'radio';

    for (const [key, value] of Object.entries(q.options)) {
        const li = document.createElement("li");
        li.innerHTML = `
      <label>
        <input type="${type}" name="option" value="${key}">
        ${value}
      </label>
    `;
        optionsList.appendChild(li);
    }
    quizContent.appendChild(optionsList);

    // 5) Extrai inputs (radio ou checkbox)
    const inputs = optionsList.querySelectorAll('input[name="option"]');

    // 6) Limita número de seleções em múltipla escolha
    if (isMultiple) {
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const checkedCount = Array.from(inputs).filter(i => i.checked).length;
                inputs.forEach(i => {
                    i.disabled = (!i.checked && checkedCount >= maxSelect);
                });
            });
        });
    }

    // 7) Botões Responder / Próxima
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    const responderBtn = document.createElement("button");
    responderBtn.id = "responderBtn";
    responderBtn.textContent = "Responder";
    responderBtn.addEventListener("click", checkAnswer);
    const nextBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    nextBtn.textContent = "Próxima Pergunta";
    nextBtn.addEventListener("click", nextQuestion);
    buttonContainer.append(responderBtn, nextBtn);
    quizContent.appendChild(buttonContainer);

    // 8) Reaplica estado de resposta se já respondeu
    if (q.userAnswer !== undefined) {
        const answered = Array.isArray(q.userAnswer)
            ? q.userAnswer
            : [q.userAnswer];

        inputs.forEach(input => {
            const li = input.closest('li');
            // marca o que respondeu
            if (answered.includes(input.value)) {
                input.checked = true;
                const certo = correctList.includes(input.value);
                li.classList.add(certo ? 'correct' : 'wrong');
            }
            // destaca em amarelo as corretas não escolhidas
            else if (correctList.includes(input.value)) {
                li.style.backgroundColor = 'yellow';
            }
            // desabilita sempre após respondida
            input.disabled = true;
        });
    }

    // 9) Atualiza sidebar (placar e navegação)
    updateSidebar();
}


function checkAnswer() {
    const q = questions[currentQuestion];
    const lis = Array.from(document.querySelectorAll('#quizContent .options li'));
    const inputs = lis.map(li => li.querySelector('input[name="option"]'));
    const selected = inputs.filter(i => i.checked).map(i => i.value);

    // 1) valida seleção
    if (selected.length === 0) {
        showToast("Por favor, selecione ao menos uma opção.", 2500);
        return;
    }
    // evita reprocessar
    if (q.userAnswer !== undefined) {
        displayErrorTooltip(q);
        return;
    }

    // 2) registra
    q.userAnswer = selected.length > 1 ? selected : selected[0];
    totalAnswered++;

    // prepara listas
    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    // para single choice, só um certo
    const isCorrect = isMultiple
        ? (correctList.length === selected.length && correctList.every(c => selected.includes(c)))
        : selected[0] === q.correct;

    if (!isMultiple && isCorrect) score++;
    if (isMultiple && isCorrect) score++;

    // 3) limpa azul e aplica classes
    lis.forEach(li => {
        li.style.backgroundColor = '';        // limpa qualquer inline anterior
        li.classList.remove('correct', 'wrong');
    });

    lis.forEach(li => {
        const val = li.querySelector('input').value;
        const wasChecked = selected.includes(val);

        if (wasChecked) {
            // se marcou, pinta de verde ou vermelho
            li.classList.add(isCorrect ? 'correct' : 'wrong');
        }
        // se não marcou, mas é uma resposta correta, pinta de amarelo
        if (!wasChecked && correctList.includes(val)) {
            li.style.backgroundColor = 'yellow';
        }
        // desabilita sempre
        li.querySelector('input').disabled = true;
    });

    // 4) monta o feedback-wrapper
    const wrapper = document.createElement('div');
    wrapper.className = `feedback-wrapper ${isCorrect ? 'correct' : 'wrong'}`;

    const badge = document.createElement('div');
    badge.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    badge.textContent = isCorrect ? 'Correto!' : 'Incorreto';

    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.innerHTML = `<em>Explicação:</em>${linkify(q.explanation_pt)}`;

    wrapper.append(badge, explanation);
    document.getElementById('quizContent').appendChild(wrapper);

    // 5) atualiza placar/navegação
    updateSidebar();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function updateSidebar() {
    document.getElementById("correctCount").textContent = score;
    document.getElementById("wrongCount").textContent = totalAnswered - score;
    updateNavigation();
    updateScoreboardDisplay();
}

// Suas funções updateNavigation() e renderQuestionNav() para o quiz normal
// (Mantenha as mesmas implementações já existentes para o quiz normal)

function startQuiz() {
    const name = document.getElementById("playerName").value.trim();
    if (name === "") {
        //alert("Por favor, insira seu nome para iniciar o quiz.");
        showToast("Por favor, insira seu nome para iniciar o quiz.", 2500);
        return;
    }
    setActiveQuestionsByKey(getSelectedExamKey());
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    totalAnswered = 0;
    const bar = document.getElementById('progressBar');
    bar.style.display = 'block';
    setNavigationVisibility(true);
    updateProgressBar();
    questions.forEach(q => { delete q.userAnswer; shuffleOptions(q); });
    document.getElementById("finalScore").innerHTML = "";
    loadQuestion();
}

function finishQuiz() {
    if (!quizStarted) {
        //alert("Você precisa iniciar o quiz primeiro!");
        showToast("Você precisa iniciar o quiz primeiro!", 2500);
        return;
    }
    const grade = totalAnswered === 0 ? 0 : Math.round((score / totalAnswered) * 100);
    const finalScoreDiv = document.getElementById("finalScore");
    finalScoreDiv.innerHTML = `
        <div class="final-score-card">
            <h3 class="final-score-title">Sua nota <span>${grade}%</span></h3>
            <p class="final-score-meta">Total respondido: ${totalAnswered} | Corretas: ${score} | Erradas: ${totalAnswered - score}</p>
        </div>
    `;
    const name = document.getElementById("playerName").value.trim();
    if (name !== "") {
        saveScore(name, grade, score, totalAnswered - score);
    }
}

function saveScore(name, grade, correct, wrong) {
    let scoreboard = JSON.parse(localStorage.getItem("quizScoreboard")) || [];
    scoreboard.push({ name, grade, correct, wrong, date: new Date().toLocaleString() });
    localStorage.setItem("quizScoreboard", JSON.stringify(scoreboard));
    updateScoreboardDisplay();
}

function updateScoreboardDisplay() {
    const scoreboardDiv = document.getElementById("scoreboard");
    scoreboardDiv.innerHTML = "";
    const scoreboard = JSON.parse(localStorage.getItem("quizScoreboard")) || [];
    if (scoreboard.length === 0) {
        scoreboardDiv.innerHTML = '<p class="scoreboard-empty">Sem pontuacoes salvas.</p>';
        return;
    }
    const list = document.createElement("ol");
    list.className = "scoreboard-list";
    scoreboard.forEach(entry => {
        const li = document.createElement("li");
        li.className = "score-item";

        const header = document.createElement("div");
        header.className = "score-item-header";

        const nameEl = document.createElement("strong");
        nameEl.className = "score-name";
        nameEl.textContent = entry.name;

        const gradeEl = document.createElement("span");
        gradeEl.className = "score-percent";
        gradeEl.textContent = `${entry.grade}%`;

        header.append(nameEl, gradeEl);

        const details = document.createElement("div");
        details.className = "score-details";
        details.textContent = `Corretas: ${entry.correct} | Erradas: ${entry.wrong}`;

        const dateEl = document.createElement("div");
        dateEl.className = "score-date";
        dateEl.textContent = entry.date;

        li.append(header, details, dateEl);
        list.appendChild(li);
    });
    scoreboardDiv.appendChild(list);
}

// --------------------- Modal de Avaliação ---------------------
let evaluationQuestions = []; // 60 questões sorteadas
let evaluationCurrentQuestion = 0;
let evaluationScore = 0;
let evaluationTotalAnswered = 0;
const evaluationDuration = 105 * 60; // 105 minutos em segundos
let evaluationTimeLeft = evaluationDuration;
let evaluationInterval;

function generateEvaluationQuestions() {
    const allQuestions = [...questions];
    shuffleArray(allQuestions);
    const selected = allQuestions.slice(0, 60);
    selected.forEach(q => shuffleOptions(q));
    return selected;
}

function loadEvaluationQuestion() {
    const progressEl = document.getElementById("evalProgress");
    progressEl.textContent = `Questão ${evaluationCurrentQuestion + 1} de ${evaluationQuestions.length}`;

    const evalContent = document.getElementById("evalQuizContent");
    evalContent.innerHTML = "";

    const q = evaluationQuestions[evaluationCurrentQuestion];
    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    const inputType = isMultiple ? 'checkbox' : 'radio';
    const maxSelect = correctList.length;

    // 1) Enunciado
    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.innerHTML = `<strong>${q.question}</strong>`;
    evalContent.appendChild(questionEl);

    // 2) Opções
    const optionsList = document.createElement("ul");
    optionsList.className = "options";
    Object.entries(q.options).forEach(([key, text]) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <label>
        <input
          type="${inputType}"
          name="evalOption"
          value="${key}">
        ${text}
      </label>`;
        optionsList.appendChild(li);
    });
    evalContent.appendChild(optionsList);

    // 3) Botões
    const btn = document.createElement("button");
    btn.id = "evalResponderBtn";
    btn.textContent = "Responder";
    btn.classList.add("primary");
    btn.addEventListener("click", checkEvaluationAnswer);
    evalContent.appendChild(btn);

    const nav = document.createElement("div");
    nav.id = "evalNavButtons";
    Object.assign(nav.style, {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "15px"
    });
    const back = document.createElement("button");
    back.textContent = "Voltar";
    back.classList.add("secondary");
    back.addEventListener("click", () => {
        if (evaluationCurrentQuestion > 0) {
            evaluationCurrentQuestion--;
            loadEvaluationQuestion();
        }
    });
    const next = document.createElement("button");
    next.textContent = "Próxima Questão";
    next.classList.add("secondary");
    next.addEventListener("click", nextEvaluationQuestion);
    if (evaluationCurrentQuestion >= evaluationQuestions.length - 1) {
        next.disabled = true;
    }
    nav.append(back, next);
    evalContent.appendChild(nav);

    // 4) Comportamento das opções
    const inputs = optionsList.querySelectorAll('input[name="evalOption"]');
    inputs.forEach(i => {
        // limpa estado inicial
        i.checked = false;
        i.disabled = false;
        i.closest("li").classList.remove("selected");
        // escuta mudança para dar feedback visual de seleção
        i.addEventListener("change", () => {
            if (isMultiple) {
                i.closest("li").classList.toggle("selected", i.checked);
                const cnt = Array.from(inputs).filter(x => x.checked).length;
                inputs.forEach(x => {
                    if (!x.checked) x.disabled = (cnt >= maxSelect);
                });
            } else {
                inputs.forEach(x => x.closest("li").classList.remove("selected"));
                i.closest("li").classList.add("selected");
            }
        });
    });

    // 5) Se a questão já foi respondida, reaplica a seleção
    if (q.userAnswer !== undefined) {
        const answered = Array.isArray(q.userAnswer)
            ? q.userAnswer
            : [q.userAnswer];

        inputs.forEach(input => {
            if (answered.includes(input.value)) {
                input.checked = true;
                input.closest("li").classList.add("selected");
            }
            input.disabled = true;
        });

        // desabilita o botão “Responder” após já ter respondido
        document.getElementById("evalResponderBtn").disabled = true;
    }
}

function prevEvaluationQuestion() {
    if (evaluationCurrentQuestion > 0) {
        evaluationCurrentQuestion--;
        loadEvaluationQuestion();
    }
}

function checkEvaluationAnswer() {
    const q = evaluationQuestions[evaluationCurrentQuestion];
    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;

    // 1) Pega seleções
    const selectedInputs = Array.from(
        document.querySelectorAll('#evalQuizContent input[name="evalOption"]:checked')
    );
    if (selectedInputs.length === 0) {
        showToast("Por favor, selecione pelo menos uma opção.", 2500);
        return;
    }

    // 2) Registra resposta (só na 1ª vez)
    if (q.userAnswer === undefined) {
        q.userAnswer = isMultiple
            ? selectedInputs.map(i => i.value)
            : selectedInputs[0].value;
        evaluationTotalAnswered++;
    }

    // 3) Calcula acerto
    const selectedValues = selectedInputs.map(i => i.value);
    let isCorrect;
    if (isMultiple) {
        isCorrect = selectedValues.length === correctList.length
            && correctList.every(c => selectedValues.includes(c));
    } else {
        isCorrect = selectedValues[0] === correctList[0];
    }
    if (isCorrect) {
        evaluationScore++;
    }

    // 4) Desabilita todos os inputs sem mostrar feedback visual
    document.querySelectorAll('#evalQuizContent input[name="evalOption"]').forEach(input => input.disabled = true);

    // 5) Desabilita o botão “Responder” para evitar re-submissão
    document.getElementById("evalResponderBtn").disabled = true;
}


function nextEvaluationQuestion() {
    if (evaluationCurrentQuestion < evaluationQuestions.length - 1) {
        evaluationCurrentQuestion++;
        loadEvaluationQuestion();
    }
}

function finishEvaluation() {
    clearInterval(evaluationInterval);
    const grade = evaluationTotalAnswered === 0 ? 0 : Math.round((evaluationScore / evaluationTotalAnswered) * 100);
    const meta = 70; // Exemplo de meta
    const message = (grade >= meta) ? "Parabéns! Você atingiu a meta." : "Que pena, tente outra vez.";
    const evalFeedback = document.getElementById("evalFeedback");
    evalFeedback.innerHTML = `<h3>Sua nota: ${grade}%</h3>
                            <p>Total respondido: ${evaluationTotalAnswered} | Corretas: ${evaluationScore} | Erradas: ${evaluationTotalAnswered - evaluationScore}</p>
                            <h2>${message}</h2>`;
}

function startEvaluationTimer() {
    evaluationTimeLeft = evaluationDuration;
    const timerDiv = document.getElementById("timer");
    evaluationInterval = setInterval(() => {
        if (evaluationTimeLeft <= 0) {
            clearInterval(evaluationInterval);
            finishEvaluation();
            return;
        }
        const minutes = String(Math.floor(evaluationTimeLeft / 60)).padStart(2, "0");
        const seconds = String(evaluationTimeLeft % 60).padStart(2, "0");
        timerDiv.textContent = `Tempo restante: ${minutes}:${seconds}`;
        evaluationTimeLeft--;
    }, 1000);
}

function startEvaluation() {
    const name = document.getElementById("playerName").value.trim();
    if (name === "") {
        //alert("Por favor, insira seu nome para iniciar a avaliação.");
        showToast("Por favor, insira seu nome para iniciar a avaliação.", 2500);
        return;
    }
    setActiveQuestionsByKey(getSelectedExamKey());
    // Reseta o feedback do modal
    document.getElementById("evalFeedback").innerHTML = "";

    evaluationQuestions = generateEvaluationQuestions();
    evaluationCurrentQuestion = 0;
    evaluationScore = 0;
    evaluationTotalAnswered = 0;
    evaluationTimeLeft = evaluationDuration;

    // Durante a avaliacao, oculta navegacao lateral e limpa a area central.
    setNavigationVisibility(false);
    const quizContent = document.getElementById("quizContent");
    if (quizContent) {
        quizContent.innerHTML = "";
    }

    // Exibe o modal de avaliação (o modal não contém os elementos de navegação)
    document.getElementById("evaluationModal").style.display = "block";
    loadEvaluationQuestion();
    startEvaluationTimer();
}


// --------------------- Modal e Ouvintes ---------------------
const evaluationModal = document.getElementById("evaluationModal");
const closeModalBtn = document.getElementById("closeModal");

document.getElementById("startEvalBtn").addEventListener("click", startEvaluation);
document.getElementById("evalFinishBtn").addEventListener("click", finishEvaluation);
closeModalBtn.addEventListener("click", () => {
    evaluationModal.style.display = "none";
    clearInterval(evaluationInterval);
    renderWelcomeState();
    setNavigationVisibility(false);
});

const examSelect = document.getElementById("examSelect");
if (examSelect) {
    examSelect.addEventListener("change", () => {
        quizStarted = false;
        currentQuestion = 0;
        score = 0;
        totalAnswered = 0;
        setActiveQuestionsByKey(examSelect.value);
        updateQuizTitle(examSelect.value);
        document.getElementById("finalScore").innerHTML = "";
        renderWelcomeState();
        const bar = document.getElementById("progressBar");
        if (bar) bar.style.display = "none";
        setNavigationVisibility(false);
        updateSidebar();
    });
}

// --------------------- Ouvintes do Quiz Normal ---------------------
// (Mantém os ouvintes já existentes para o quiz normal)
const startQuizBtn = document.getElementById("startQuizBtn");
if (startQuizBtn) {
    startQuizBtn.addEventListener("click", startQuiz);
}
document.getElementById("finishQuizBtn").addEventListener("click", finishQuiz);
document.getElementById("clearScoreboardBtn").addEventListener("click", clearScoreboard);

updateQuizTitle();
renderWelcomeState();
setNavigationVisibility(false);
updateSidebar();
updateScoreboardDisplay();


function updateNavigation() {
    const total = questions.length;
    let numNavPages;
    if (total <= maxNavPerPage) {
        numNavPages = 1;
    } else {
        numNavPages = Math.ceil(total / maxNavPerPage);
    }

    const navPagesDiv = document.getElementById("navPages");
    navPagesDiv.innerHTML = "";
    for (let p = 1; p <= numNavPages; p++) {
        const btn = document.createElement("button");
        btn.textContent = p;
        if (p === navCurrentPage) {
            btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
            navCurrentPage = p;
            renderQuestionNav();
        });
        navPagesDiv.appendChild(btn);
    }
    renderQuestionNav();
}

function renderQuestionNav() {
    const total = questions.length;
    const questionNavDiv = document.getElementById("questionNav");
    questionNavDiv.innerHTML = "";

    let start, end;
    if (total <= maxNavPerPage) {
        start = 1;
        end = total;
    } else {
        start = (navCurrentPage - 1) * maxNavPerPage + 1;
        end = Math.min(start + maxNavPerPage - 1, total);
    }

    for (let i = start; i <= end; i++) {
        const btn = document.createElement("button");
        btn.textContent = String(i).padStart(2, "0");

        const q = questions[i - 1];
        if (q.userAnswer !== undefined) {
            btn.style.backgroundColor = (q.userAnswer === q.correct) ? "lightgreen" : "lightcoral";
        }

        if (i === questions[currentQuestion].number) {
            btn.style.fontWeight = "bold";
            btn.style.border = "2px solid #000";
        }

        btn.addEventListener("click", () => {
            currentQuestion = i - 1;
            loadQuestion();
        });
        questionNavDiv.appendChild(btn);
    }
}
// Array com mensagens de aviso progressivas para resposta já confirmada
const errorMessages = [
    "Essa questão já foi respondida. Bora para a próxima!",
    "Ops! Esse caso já está fechado no seu pipeline.",
    "Resposta repetida detectada. O registro já foi salvo com sucesso.",
    "Essa você já converteu. Vamos avançar para a próxima etapa?",
    "Sem retrabalho: essa já entrou no relatório.",
    "Aqui está tudo sob controle: pergunta já confirmada.",
    "Essa oportunidade já foi ganha. Partiu próxima pergunta!",
    "A automação funcionou: resposta já processada por aqui.",
    "Excelente consistência! Agora vamos para um novo desafio.",
    "Pontuação preservada. Siga em frente e continue brilhando!"
];

function displayErrorTooltip(q) {
    // 0) Remove tooltip anterior
    const old = document.querySelector('.error-tooltip');
    if (old) old.remove();

    // 1) Incrementa tentativas e escolhe mensagem
    q.attemptCount = (q.attemptCount || 0) + 1;
    const idx = Math.min(q.attemptCount - 1, errorMessages.length - 1);
    const message = errorMessages[idx];

    // 2) Overlay (escurece a tela)
    const overlay = document.createElement("div");
    overlay.className = "error-tooltip";

    // 3) Caixa interna (a “caixinha” branca/vermelha)
    const box = document.createElement("div");
    box.className = "error-tooltip-box";

    // 4) Conteúdo da caixinha
    const txt = document.createElement("p");
    txt.textContent = message;
    const btn = document.createElement("button");
    btn.textContent = "OK";
    btn.className = "tooltip-ok-btn";

    // 5) Monta árvore
    box.append(txt, btn);
    overlay.append(box);
    document.body.append(overlay);

    // 6) Fecha ao clicar em OK
    btn.addEventListener("click", () => overlay.remove());
}



function updateEvaluationProgress() {
    const progressEl = document.getElementById("evalProgress");
    // Exibe "Questão X de Y" onde X = avaliação atual + 1 e Y = total de questões (60)
    progressEl.textContent = `Questão ${evaluationCurrentQuestion + 1} de ${evaluationQuestions.length}`;
}

/**
 * Exibe uma notificação toast com a mensagem informada.
 * @param {string} message – Texto a exibir.
 * @param {number} duration – Tempo em ms até sumir (padrão: 3000).
 */
function showToast(message, duration = 3000) {
    const prev = document.querySelector('.toast-error-centered');
    if (prev) prev.remove();

    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast toast-error toast-error-centered';
    toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" aria-label="Fechar">&times;</button>
  `;
    container.appendChild(toast);

    // anima entrada
    requestAnimationFrame(() => toast.classList.add('show'));

    // permite fechar manualmente
    toast.querySelector('.toast-close')
        .addEventListener('click', () => toast.remove());

    // fecha automaticamente após 'duration'
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

function showConfirmToast(message) {
    return new Promise(resolve => {
        // 0) Remove confirmação anterior
        const prev = document.querySelector('.toast-confirm');
        if (prev) prev.remove();

        // 1) Container principal
        const container = document.getElementById('toastContainer');

        // 2) Toast + classes
        const toast = document.createElement('div');
        toast.classList.add('toast', 'toast-confirm');

        // 3) Mensagem
        const msgEl = document.createElement('div');
        msgEl.classList.add('toast-message');
        msgEl.textContent = message;

        // 4) Grupo de botões
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('toast-confirm-buttons');

        const btnNo = document.createElement('button');
        btnNo.classList.add('btn-no');
        btnNo.textContent = 'Não';

        const btnYes = document.createElement('button');
        btnYes.classList.add('btn-yes');
        btnYes.textContent = 'Sim';

        btnGroup.append(btnNo, btnYes);

        // 5) Monta tudo
        toast.append(msgEl, btnGroup);
        container.append(toast);

        // 6) Anima entrada
        requestAnimationFrame(() => toast.classList.add('show'));

        // 7) Lógica dos botões
        btnYes.addEventListener('click', () => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
            resolve(true);
        });
        btnNo.addEventListener('click', () => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
            resolve(false);
        });
    });
}


function showSimpleToast(message, type = 'default', duration = 3000, extraClass = '') {
    // remove toast anterior do mesmo tipo
    const prev = document.querySelector(`.toast-${type}`);
    if (prev) prev.remove();

    // container já existente
    const container = document.getElementById('toastContainer');

    // monta o toast
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    if (extraClass) {
        toast.classList.add(extraClass);
    }

    // mensagem
    const msgEl = document.createElement('div');
    msgEl.classList.add('toast-message');
    msgEl.textContent = message;

    toast.append(msgEl);
    container.append(toast);

    // anima a entrada
    requestAnimationFrame(() => toast.classList.add('show'));

    // remove após duration
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

function linkify(text) {
    return text
        // transformar URLs em <a href="" target="_blank">…
        .replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // opcional: manter quebras de linha
        .replace(/\n/g, '<br>');
}

// Atualize clearScoreboard para usar o confirm toast
async function clearScoreboard() {
    const ok = await showConfirmToast("Tem certeza que deseja apagar todas as pontuações?");
    if (!ok) return;  // se clicar em "Não", aborta

    localStorage.removeItem("quizScoreboard");
    updateScoreboardDisplay();
    showSimpleToast("Placar apagado com sucesso!!!", 'success', 2500, 'toast-centered');
}