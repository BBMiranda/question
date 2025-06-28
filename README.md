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
* [🗂️ Estrutura de Dados](#️-estrutura-de-dados)
* [🎨 Customização](#-customização)
* [🤝 Contribuição](#-contribuição)
* [📄 Licença](#-licença)

---

## 🌟 Visão Geral

Este projeto é um **quiz interativo** de perguntas sobre Salesforce Certified Administrator. Ele foi desenvolvido para:

* Permitir ao usuário praticar questões em formato de quiz livre.
* Oferecer um **modo avaliação** de 60 perguntas com timer de 105 minutos.
* Registrar e salvar pontuações locais no `localStorage`.
* Navegar entre perguntas respondidas, mantendo marcações e feedback.

O HTML, CSS e JavaScript foram escritos em ES6, sem frameworks externos, facilitando o entendimento e a manutenção.

---

## 🚀 Funcionalidades

* ✅ **Quiz livre**: iniciar, responder, finalizar e visualizar pontuação.
* ✅ **Avaliação cronometrada**: 60 questões sorteadas, sem feedback imediato.
* ✅ **Barra de progresso** dinâmica.
* ✅ **Navegação** por número de questão, com destaque de respondidas.
* ✅ **Salvamento local** de placar (nome, porcentagem, corretas e erradas).
* ✅ **Toasts** e **modais** customizados para confirmações e erros.
* ✅ **JSON externo** (`questions.json`) para facilitar manutenção de questões.

---

## 🧰 Tecnologias

* **HTML5**
* **CSS3** (Grid Layout, variáveis CSS)
* **JavaScript ES6+** (módulos, `fetch`, `async/await`)
* **LocalStorage** API

---

## ⚙️ Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/quiz-salesforce-admin.git
   cd quiz-salesforce-admin
   ```
2. Inicie um servidor local (ex.: Live Server, VSCode ou Python):

   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. Acesse no navegador:

   ```
   ```

[http://localhost:8000](http://localhost:8000)

````

> **Importante:** O quiz carrega as questões de `questions.json` via `fetch`, então é necessário rodar via HTTP.

---

## ▶️ Uso
- **Iniciar Quiz**: preencha seu nome e clique em **Inicia Quiz**.
- **Responder**: selecione opção(s) e envie. Feedback imediato no modo livre.
- **Próxima Pergunta**: navegue entre questões.
- **Finalizar Quiz**: veja nota final e salve no placar.
- **Iniciar Avaliação**: modo cronometrado, sem feedback de acerto até o fim.
- **Apagar Placar**: limpa todas as pontuações salvas localmente.

---

## 🗂️ Estrutura de Dados
```bash
├── index.html
├── style.css
├── script.js
└── questions.json
````

O arquivo **questions.json** contém um array de objetos:

```jsonc
[
  {
    "number": 1,
    "question": "Texto da pergunta...",
    "options": { "A": "Opção A", "B": "Opção B", ... },
    "correct": "C",
    "explanation_pt": "Texto explicativo com \n para quebras de linha",
    "explanation_en": "..."
  },
  // ... mais questões
]
```

---

## 🎨 Customização

* **Adicionar/editar questões**: abra e edite `questions.json` no formato JSON.
* **Temas e cores**: ajuste as variáveis CSS em `:root` no `style.css`.
* **Tempo de avaliação**: modifique `evaluationDuration` em segundos no `script.js`.
* **Limite de questões**: altere `slice(0, 60)` em `generateEvaluationQuestions()`.

---

## 🤝 Contribuição

Contribuições são bem-vindas! 🎉

1. Faça um *fork* do repositório.
2. Crie uma branch feature: `git checkout -b feature/nova-questao`.
3. Faça commit das alterações: `git commit -m "Adiciona nova questão X"`.
4. Envie para o branch original: `git push origin feature/nova-questao`.
5. Abra um *Pull Request*.

Por favor, siga as convenções de código e mantenha o estilo consistente.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

> Divirta-se e bons estudos! 🚀
