// --------------------- Fluxo do Quiz Normal ---------------------
function loadQuestion() {
    const quizContent = document.getElementById("quizContent");
    quizContent.innerHTML = "";

    const pct = ((currentQuestion + 1) / questions.length) * 100;
    const fill = document.querySelector('.progress-fill');
    if (fill) fill.style.width = `${pct}%`;

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

    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.innerHTML = `<strong>Pergunta ${q.number}:</strong> ${q.question}`;
    quizContent.appendChild(questionEl);

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

    const inputs = optionsList.querySelectorAll('input[name="option"]');

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

    if (q.userAnswer !== undefined) {
        const answered = Array.isArray(q.userAnswer)
            ? q.userAnswer
            : [q.userAnswer];

        inputs.forEach(input => {
            const li = input.closest('li');
            if (answered.includes(input.value)) {
                input.checked = true;
                const certo = correctList.includes(input.value);
                li.classList.add(certo ? 'correct' : 'wrong');
            }
            else if (correctList.includes(input.value)) {
                li.style.backgroundColor = 'yellow';
            }
            input.disabled = true;
        });
    }

    updateSidebar();
}

function checkAnswer() {
    const q = questions[currentQuestion];
    const lis = Array.from(document.querySelectorAll('#quizContent .options li'));
    const inputs = lis.map(li => li.querySelector('input[name="option"]'));
    const selected = inputs.filter(i => i.checked).map(i => i.value);

    if (selected.length === 0) {
        showToast("Por favor, selecione ao menos uma opção.", 2500);
        return;
    }
    if (q.userAnswer !== undefined) {
        displayErrorTooltip(q);
        return;
    }

    q.userAnswer = selected.length > 1 ? selected : selected[0];
    totalAnswered++;

    const correctList = q.correct.split(',').map(s => s.trim());
    const isMultiple = correctList.length > 1;
    const isCorrect = isMultiple
        ? (correctList.length === selected.length && correctList.every(c => selected.includes(c)))
        : selected[0] === q.correct;

    if (!isMultiple && isCorrect) score++;
    if (isMultiple && isCorrect) score++;

    lis.forEach(li => {
        li.style.backgroundColor = '';
        li.classList.remove('correct', 'wrong');
    });

    lis.forEach(li => {
        const val = li.querySelector('input').value;
        const wasChecked = selected.includes(val);

        if (wasChecked) {
            li.classList.add(isCorrect ? 'correct' : 'wrong');
        }
        if (!wasChecked && correctList.includes(val)) {
            li.style.backgroundColor = 'yellow';
        }
        li.querySelector('input').disabled = true;
    });

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

function startQuiz() {
    const name = document.getElementById("playerName").value.trim();
    if (name === "") {
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
        scoreboardDiv.innerHTML = '<p class="scoreboard-empty">Sem pontuações salvas.</p>';
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

    let start;
    let end;
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
