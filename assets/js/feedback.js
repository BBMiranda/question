// --------------------- Feedback, Toasts e Utilitarios de UI ---------------------
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
    const old = document.querySelector('.error-tooltip');
    if (old) old.remove();

    q.attemptCount = (q.attemptCount || 0) + 1;
    const idx = Math.min(q.attemptCount - 1, errorMessages.length - 1);
    const message = errorMessages[idx];

    const overlay = document.createElement("div");
    overlay.className = "error-tooltip";

    const box = document.createElement("div");
    box.className = "error-tooltip-box";

    const txt = document.createElement("p");
    txt.textContent = message;
    const btn = document.createElement("button");
    btn.textContent = "OK";
    btn.className = "tooltip-ok-btn";

    box.append(txt, btn);
    overlay.append(box);
    document.body.append(overlay);

    btn.addEventListener("click", () => overlay.remove());
}

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

    requestAnimationFrame(() => toast.classList.add('show'));

    toast.querySelector('.toast-close')
        .addEventListener('click', () => toast.remove());

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

function showConfirmToast(message) {
    return new Promise(resolve => {
        const prev = document.querySelector('.toast-confirm');
        if (prev) prev.remove();

        const container = document.getElementById('toastContainer');

        const toast = document.createElement('div');
        toast.classList.add('toast', 'toast-confirm');

        const msgEl = document.createElement('div');
        msgEl.classList.add('toast-message');
        msgEl.textContent = message;

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('toast-confirm-buttons');

        const btnNo = document.createElement('button');
        btnNo.classList.add('btn-no');
    btnNo.textContent = 'Não';
        btnYes.classList.add('btn-yes');
        btnYes.textContent = 'Sim';

        btnGroup.append(btnNo, btnYes);

        toast.append(msgEl, btnGroup);
        container.append(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

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
    const prev = document.querySelector(`.toast-${type}`);
    if (prev) prev.remove();

    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    if (extraClass) {
        toast.classList.add(extraClass);
    }

    const msgEl = document.createElement('div');
    msgEl.classList.add('toast-message');
    msgEl.textContent = message;

    toast.append(msgEl);
    container.append(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

function linkify(text) {
    return text
        .replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        .replace(/\n/g, '<br>');
}

async function clearScoreboard() {
    const ok = await showConfirmToast("Tem certeza que deseja apagar todas as pontuações?");
    if (!ok) return;

    localStorage.removeItem("quizScoreboard");
    updateScoreboardDisplay();
    showSimpleToast("Placar apagado com sucesso!!!", 'success', 2500, 'toast-centered');
}
