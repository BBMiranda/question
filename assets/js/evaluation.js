// --------------------- Fluxo de Avaliacao ---------------------
let evaluationQuestions = [];
let evaluationCurrentQuestion = 0;
let evaluationScore = 0;
let evaluationTotalAnswered = 0;
const evaluationDuration = 105 * 60;
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

    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.innerHTML = `<strong>${q.question}</strong>`;
    evalContent.appendChild(questionEl);

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

    const inputs = optionsList.querySelectorAll('input[name="evalOption"]');
    inputs.forEach(i => {
        i.checked = false;
        i.disabled = false;
        i.closest("li").classList.remove("selected");
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

        document.getElementById("evalResponderBtn").disabled = true;
    }
}

function checkEvaluationAnswer() {
    const q = evaluationQuestions[evaluationCurrentQuestion];
    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;

    const selectedInputs = Array.from(
        document.querySelectorAll('#evalQuizContent input[name="evalOption"]:checked')
    );
    if (selectedInputs.length === 0) {
        showToast("Por favor, selecione pelo menos uma opção.", 2500);
        return;
    }

    if (q.userAnswer === undefined) {
        q.userAnswer = isMultiple
            ? selectedInputs.map(i => i.value)
            : selectedInputs[0].value;
        evaluationTotalAnswered++;
    }

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

    document.querySelectorAll('#evalQuizContent input[name="evalOption"]').forEach(input => input.disabled = true);
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
    const meta = 70;
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
        showToast("Por favor, insira seu nome para iniciar a avaliação.", 2500);
        return;
    }
    setActiveQuestionsByKey(getSelectedExamKey());
    document.getElementById("evalFeedback").innerHTML = "";

    evaluationQuestions = generateEvaluationQuestions();
    evaluationCurrentQuestion = 0;
    evaluationScore = 0;
    evaluationTotalAnswered = 0;
    evaluationTimeLeft = evaluationDuration;

    setNavigationVisibility(false);
    const quizContent = document.getElementById("quizContent");
    if (quizContent) {
        quizContent.innerHTML = "";
    }

    document.getElementById("evaluationModal").style.display = "block";
    loadEvaluationQuestion();
    startEvaluationTimer();
}

function updateEvaluationProgress() {
    const progressEl = document.getElementById("evalProgress");
    progressEl.textContent = `Questão ${evaluationCurrentQuestion + 1} de ${evaluationQuestions.length}`;
}
