// --------------------- Bootstrap e Ouvintes ---------------------
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
