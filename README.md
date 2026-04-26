# 📚 Quiz – Salesforce Certified Administrator

![Versão](https://img.shields.io/badge/version-1.0.0-blue) ![Licença](https://img.shields.io/badge/license-MIT-green)

> Um quiz interativo para praticar para a certificação Salesforce Certified Administrator, com modo livre e modo avaliação cronometrada.

---

## 📖 Sumário

* [🌟 Visão Geral](#-visão-geral)
* [🚀 Funcionalidades](#-funcionalidades)
* [🧰 Tecnologias](#-tecnologias)
* [⚙️ Instalação](#️-instalação)
* [▶️ Uso](#️-uso)
* [🗂️ Estrutura de Arquivos](#️-estrutura-de-arquivos)
* [🎨 Customização](#-customização)
* [🤝 Contribuição](#-contribuição)
* [📄 Licença](#-licença)

---

## 🌟 Visão Geral

Este projeto é um **quiz interativo** de perguntas sobre Salesforce Certified Administrator. Foi desenvolvido em **JavaScript puro** (ES6), sem frameworks, e organizado por pastas para facilitar manutenção:

* `index.html` — marcação básica e containers de quiz, placar e avaliação.
* `assets/css/style.css` — estilos modernos com CSS Grid, variáveis e animações.
* `assets/js/core.js` — estado global compartilhado, seleção de prova, título e helpers base.
* `assets/js/quiz.js` — fluxo do quiz normal (responder, navegar, placar e pontuação).
* `assets/js/evaluation.js` — fluxo da avaliação cronometrada.
* `assets/js/feedback.js` — toasts, confirmação, tooltip de erro e utilitários de feedback.
* `assets/js/main.js` — bootstrap da aplicação e registro de ouvintes.
* `assets/js/data/*.js` — bancos de questões por prova.

---

## 🚀 Funcionalidades

* ✅ **Quiz livre**: iniciar, responder, finalizar e visualizar pontuação imediata.
* ✅ **Avaliação cronometrada**: 60 perguntas sorteadas, sem feedback visual até o fim.
* ✅ **Barra de progresso** dinâmica.
* ✅ **Navegação** por número de questão, com destaque de respondidas.
* ✅ **Salvamento local** de placar (nome, porcentagem, corretas e erradas) via `localStorage`.
* ✅ **Toasts** e **modais** customizados para confirmações e notificações.

---

## 🧰 Tecnologias

* **HTML5**
* **CSS3** (Grid Layout, variáveis CSS, animações)
* **JavaScript ES6+** (módulos, arrow functions, `fetch` removido)
* **LocalStorage** API

---

## ⚙️ Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/quiz-salesforce-admin.git
   cd quiz-salesforce-admin
   ```
2. Abra `index.html` diretamente no navegador ou via servidor HTTP:

   ```bash
   # Opcional: usar Python
   python -m http.server 8000
   ```
3. Acesse:

   ```
   http://localhost:8000/index.html
   ```

> **Obs.:** Não há necessidade de arquivos JSON externos. As questões estão em arquivos JavaScript dentro de `assets/js/data/`.

---

## ▶️ Uso

1. Insira seu nome no campo **Placar**.
2. Clique em **Inicia Quiz**.
3. Selecione a opção correta e pressione **Responder**.
4. Navegue entre as perguntas com **Próxima Pergunta** ou pelo menu lateral.
5. Ao finalizar, clique em **Finalizar Quiz** para ver sua nota.
6. Em **Iniciar Avaliação**, responda 60 perguntas cronômetradas; o resultado aparece ao fim.
7. Use **Apagar Placar** para limpar todas as pontuações salvas.

---

## 🗂️ Estrutura de Arquivos

```bash
├── index.html
├── README.md
└── assets/
   ├── css/
   │   └── style.css
   └── js/
      ├── core.js
      ├── feedback.js
      ├── quiz.js
      ├── evaluation.js
      ├── main.js
      └── data/
         ├── questions-admin.js
         ├── questions-developer.js
         └── questions-appbuilder.js
```

---

## 🎨 Customização

* **Editar questões:** atualize os arquivos em `assets/js/data/` conforme a prova desejada.
* **Temas e cores:** altere variáveis CSS em `:root` no `assets/css/style.css`.
* **Tempo de avaliação:** ajuste `evaluationDuration` (em segundos) em `assets/js/evaluation.js`.
* **Número de questões:** modifique `slice(0, 60)` na função `generateEvaluationQuestions()`.

---

## 🤝 Contribuição

Contribuições são bem-vindas! 🎉

1. Faça um *fork* do repositório.
2. Crie uma branch: `git checkout -b feature/minha-melhoria`.
3. Faça commit das alterações: `git commit -m "Minha melhoria no quiz"`.
4. Envie para o branch original: `git push origin feature/minha-melhoria`.
5. Abra um *Pull Request* e descreva suas mudanças.

Por favor, siga as convenções de código e mantenha o estilo consistente.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

>Bons estudos e sucesso na certificação!!! 🚀
