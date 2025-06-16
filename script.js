// --------------------- Funções de Embaralhamento ---------------------
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleOptions(question) {
  const entries = Object.entries(question.options);
  const shuffled = shuffleArray(entries);
  const newOptions = {};
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newCorrect = "";
  const correctText = question.options[question.correct];
  shuffled.forEach((entry, index) => {
    const newLetter = letters[index];
    newOptions[newLetter] = entry[1];
    if (entry[1] === correctText) {
      newCorrect = newLetter;
    }
  });
  question.options = newOptions;
  question.correct = newCorrect;
}

// --------------------- Quiz Normal ---------------------
const maxNavPerPage = 50;
let navCurrentPage = 1; // Página atual da navegação

let currentQuestion = 0;
let score = 0;          // Respostas corretas
let totalAnswered = 0;  // Total de questões respondidas
let quizStarted = false;
const questions = [
  {
    number: 1,
    question: "Users at Cloud Kicks are reporting different options when uploading a custom picklist on the Opportunity object based on the kind of opportunity. Where should an administrator update the option in the picklist?",
    options: {
      A: "Fields and relationships",
      B: "Related lookup filters",
      C: "Record Type",
      D: "Picklist value sets"
    },
    correct: "C",
    explanation_en: `
Record types allow you to update the options in a picklist based on the kind of opportunity. By configuring the picklist values on each Record Type, you can present different sets of choices to users depending on the type of opportunity they are working with.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Record types permitem que você atualize as opções de um picklist com base no tipo de oportunidade. Ao configurar valores de picklist em cada Record Type, você pode apresentar diferentes conjuntos de escolhas para os usuários de acordo com o tipo de oportunidade.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 2,
    question: "An administrator has been asked to update a flow that was created as part of a recent update. When the administrator opens the flow for editing, the Flow toolbox offers only four elements: Assignment, Decision, Get Records, and Loop. What would cause this?",
    options: {
      A: "The flow is a screen flow.",
      B: "The version of the flow is inactive.",
      C: "The flow is a before save flow.",
      D: "The version of the flow is activated."
    },
    correct: "C",
    explanation_en: `
Before save flows only support four elements: Assignment, Decision, Get Records, and Loop. Because this flow was configured as a record-triggered “before save” flow, the toolbox is limited to those four elements.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements.htm&type=5
    `,
    explanation_pt: `
Before save flows suportam apenas quatro elementos: Assignment, Decision, Get Records e Loop. Como este fluxo foi configurado como um fluxo acionado por registro “before save”, a caixa de ferramentas fica limitada a esses quatro elementos.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements.htm&type=5
    `
  },
  {
    number: 3,
    question: "An administrator wants to create a form in Salesforce for users to fill out when they lose a client. Which automation tool supports creating a wizard to accomplish this goal?",
    options: {
      A: "Process Builder",
      B: "Approval Process",
      C: "Outbound Message",
      D: "Flow Builder"
    },
    correct: "D",
    explanation_en: `
Flow Builder supports creating a wizard that can collect user input through screens and perform actions based on that input. Screen Flows in Flow Builder are ideal for guiding users step-by-step through a form-like experience.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `,
    explanation_pt: `
Flow Builder suporta a criação de um assistente (wizard) que pode coletar entradas do usuário por meio de telas e executar ações com base nessas entradas. Screen Flows no Flow Builder são ideais para orientar os usuários passo a passo em uma experiência semelhante a um formulário.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `
  },
  {
    number: 4,
    question: "The Client services and customer support teams share the same profile but have different permission sets. The Custom Object Retention related list needs to be restricted to the client services team on the Lightning record page layout. What should the administrator use to fulfil this request?",
    options: {
      A: "Sharing settings",
      B: "Page Layout Assignment",
      C: "Component Visibility",
      D: "Record Type Assignment"
    },
    correct: "C",
    explanation_en: `
Component Visibility allows you to restrict the display of a related list or component on a Lightning record page based on user permission sets, profiles, or field values. By configuring visibility rules, only users in the client services permission set will see the Custom Object Retention related list.

Reference: https://help.salesforce.com/s/articleView?id=sf.dynamic_forms_component_visibility.htm&type=5
    `,
    explanation_pt: `
Component Visibility permite restringir a exibição de uma lista relacionada ou componente em uma página de registro Lightning com base em permission sets, perfis ou valores de campo. Ao configurar regras de visibilidade, apenas usuários com o permission set de client services verão a lista relacionada Custom Object Retention.

Referência: https://help.salesforce.com/s/articleView?id=sf.dynamic_forms_component_visibility.htm&type=5
    `
  },
  {
    number: 5,
    question: "The VP of sales at Universal Containers wants to prevent members of the sales team from changing an opportunity to a date in the past. What should an administrator configure to meet this requirement?",
    options: {
      A: "Assignment Rule",
      B: "Validation Rule",
      C: "Field-Level Security",
      D: "Approval Process"
    },
    correct: "B",
    explanation_en: `
Validation rules allow you to enforce data integrity by preventing users from saving records that violate business rules. You can create a validation rule on the Close Date field to ensure it cannot be set to a past date.

Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `,
    explanation_pt: `
Validation rules permitem impor a integridade dos dados impedindo que os usuários salvem registros que violem regras de negócio. Você pode criar uma regra de validação no campo Close Date para garantir que não seja definido para uma data passada.

Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `
  },
  {
    number: 6,
    question: "Northern Trail Outfitters wants to track ROI for contacts that are key stakeholders for opportunities. The VP of Sales requested that this information be accessible on the opportunity and available for reporting. Which two options should the administrator configure to meet these requirements? (Choose 2)",
    options: {
      A: "Customize Campaign Member Role",
      B: "Add the Campaign Member related list to the Opportunity page layout",
      C: "Customize Campaign Role",
      D: "Customize Opportunity Contact Role",
      E: "Add the Opportunity Contact Role related list to the Opportunity page layout"
    },
    correct: "D, E",
    explanation_en: `
Opportunity Contact Roles allow you to identify and track the role of contacts that are key stakeholders for an opportunity. To make ROI data available on the opportunity record and in reports, you need to:
1. Customize the Opportunity Contact Role field (D).
2. Add the Opportunity Contact Role related list to the Opportunity page layout (E).

References:
https://help.salesforce.com/s/articleView?id=sf.opportunity_contact_roles.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_opportunity_contact_role.htm&type=5
    `,
    explanation_pt: `
Opportunity Contact Roles permitem identificar e rastrear o papel dos contatos que são stakeholders-chave em uma oportunidade. Para tornar os dados de ROI acessíveis no registro da oportunidade e em relatórios, você precisa:
1. Personalizar o campo Opportunity Contact Role (D).
2. Adicionar a lista relacionada Opportunity Contact Role ao layout da página de oportunidade (E).

Referências:
https://help.salesforce.com/s/articleView?id=sf.opportunity_contact_roles.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_opportunity_contact_role.htm&type=5
    `
  },
  {
    number: 7,
    question: "The administrator at Cloud Kicks has a Custom picklist field on Lead, which is missing on the Contact when leads are converted. Which two items should the administrator do to make sure these values are populated? (Choose 2)",
    options: {
      A: "Create a custom picklist field on Contact",
      B: "Update the picklist value with a validation rule",
      C: "Map the picklist field on the Lead to the Contact",
      D: "Set the picklist field to be required on the Lead Object"
    },
    correct: "A, C",
    explanation_en: `
To ensure custom picklist field values are carried over during lead conversion, you must:
1. Create the same custom picklist field on Contact (A).
2. Map the Lead picklist field to the Contact field in Lead Field Map settings (C).

References:
https://help.salesforce.com/s/articleView?id=sf.convert_lead_mapping.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_fields.htm&type=5
    `,
    explanation_pt: `
Para garantir que os valores do picklist personalizado sejam transferidos na conversão de lead, você deve:
1. Criar o mesmo campo picklist personalizado em Contact (A).
2. Mapear o campo picklist do Lead para o campo em Contact nas configurações de Lead Field Map (C).

Referências:
https://help.salesforce.com/s/articleView?id=sf.convert_lead_mapping.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_fields.htm&type=5
    `
  },
  {
    number: 8,
    question: "Universal Containers is trying to improve the user experience when searching for the correct status on a case. The company currently has one support process that is used for all record types on cases. The support process has 10 status values. Service reps say they never need more than five depending on what kind of case they are working on. How should the administrator improve on the current implementation?",
    options: {
      A: "Reduce the number of case status values to five",
      B: "Create a Screen Flow that shows only the correct values for status and surface the flow in the utility bar of the console",
      C: "Review which status choices are needed for each record type and create support processes for each that is necessary",
      D: "Edit the status choices directly on the record type"
    },
    correct: "C",
    explanation_en: `
Support Processes allow you to define different sets of status values for each Record Type on cases. By creating separate support processes for each record type, you can present only the relevant five status options to the users depending on the type of case.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_support_process.htm&type=5
    `,
    explanation_pt: `
Support Processes permitem definir conjuntos diferentes de valores de status para cada Record Type em casos. Ao criar processos de suporte separados para cada tipo de registro, você pode exibir apenas as cinco opções de status relevantes aos usuários, conforme o tipo de caso.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_support_process.htm&type=5
    `
  },
  {
    number: 9,
    question: "When a Sales rep clicks a button on an opportunity, a simple discount calculator screen should be launched. Which automation tool should an administrator use to build this discount calculator screen?",
    options: {
      A: "Flow Builder",
      B: "Workflow Rule",
      C: "Platform Event",
      D: "Process Builder"
    },
    correct: "A",
    explanation_en: `
Flow Builder supports creating Screen Flows that can be launched from a button on a record page. You can build a simple discount calculator interface and invoke it via a custom button or action on the Opportunity.

References:
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.flow_distribute_button.htm&type=5
    `,
    explanation_pt: `
Flow Builder suporta a criação de Screen Flows que podem ser iniciados a partir de um botão em uma página de registro. Você pode construir uma interface simples para cálculo de desconto e invocá-la via botão ou ação personalizada na Oportunidade.

Referências:
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.flow_distribute_button.htm&type=5
    `
  },
  {
    number: 10,
    question: "Northern Trail Outfitters wants to initiate expense reports from Salesforce to the external HR system. This process needs to be reviewed by managers and directors. Which two tools should an administrator configure? (Choose 2)",
    options: {
      A: "Quick Action",
      B: "Outbound Message",
      C: "Approval Process",
      D: "Email Alert Action"
    },
    correct: "A, C",
    explanation_en: `
Quick Actions can be used to initiate the expense report submission from Salesforce. Approval Processes will route the report for manager and director review. Together, they satisfy the requirement for initiating and reviewing the expense report.

References:
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.quick_actions_overview.htm&type=5
    `,
    explanation_pt: `
Quick Actions podem ser usadas para iniciar o envio do relatório de despesas a partir do Salesforce. Approval Processes irão direcionar o relatório para revisão de gerentes e diretores. Juntos, atendem ao requisito de iniciar e revisar o relatório de despesas.

Referências:
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.quick_actions_overview.htm&type=5
    `
  },
  {
    number: 11,
    question: "Cloud Kicks is working on a better way to track its product shipments utilizing Salesforce. Which field type should an administrator use to capture coordinates?",
    options: {
      A: "Geolocation",
      B: "Geofence",
      C: "Custom address",
      D: "External lookup"
    },
    correct: "A",
    explanation_en: `
Geolocation fields allow you to store the latitude and longitude coordinates of a location. They can be used to calculate distances between records and display maps of accounts, contacts, leads, or other custom objects.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_geoloc.htm&type=5
    `,
    explanation_pt: `
Campos do tipo Geolocation permitem armazenar as coordenadas de latitude e longitude de um local. Eles podem ser usados para calcular distâncias entre registros e exibir mapas de contas, contatos, leads ou outros objetos personalizados.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_geoloc.htm&type=5
    `
  },
  {
    number: 12,
    question: "What are two considerations an administrator should keep in mind when working with Salesforce objects? (Choose 2)",
    options: {
      A: "Custom and standard objects have standard fields",
      B: "Standard objects are included with Salesforce",
      C: "A new standard object can be created",
      D: "Only standard objects support master-detail relationships"
    },
    correct: "A, B",
    explanation_en: `
Custom objects and standard objects both come with a set of predefined (standard) fields such as Name, CreatedDate, etc. Standard objects (like Account, Contact, Lead) are included out of the box with Salesforce. You cannot create new standard objects via Setup, and custom objects also support master-detail relationships.

Reference: https://trailhead.salesforce.com/en/content/learn/modules/data_modeling/standard_and_custom_objects
    `,
    explanation_pt: `
Tanto objetos personalizados quanto objetos padrão possuem campos pré-definidos (standard), como Name, CreatedDate, etc. Objetos padrão (por exemplo, Account, Contact, Lead) são fornecidos por padrão no Salesforce. Não é possível criar novos objetos padrão via Setup, e objetos personalizados também suportam relacionamentos master-detail.

Referência: https://trailhead.salesforce.com/en/content/learn/modules/data_modeling/standard_and_custom_objects
    `
  },
  {
    number: 13,
    question: "Users have noticed that when they click on a report in a dashboard to view the report details, the values in the report are different from the values displayed on the dashboard. What are two reasons this is likely to occur? (Choose 2)",
    options: {
      A: "The report needs to be refreshed",
      B: "The dashboard needs to be refreshed",
      C: "The current user does not have access to the report folder",
      D: "The running dashboard user and viewer have different permissions"
    },
    correct: "B, D",
    explanation_en: `
Dashboards display snapshot data based on when they were last run, so they must be refreshed manually or on a schedule to reflect recent changes (B). Additionally, dashboards run with the security context of the running user; if the viewer’s permissions differ from the running user’s, they may see different data (D).

Reference: https://trailhead.salesforce.com/en/content/learn/modules/lex_implementation_dashboards_and_reports/dashboards
    `,
    explanation_pt: `
Dashboards mostram dados de um snapshot de acordo com a última execução, portanto precisam ser atualizados manualmente ou por agendamento para refletir alterações recentes (B). Além disso, dashboards executam no contexto de segurança do usuário em execução; se as permissões do visualizador forem diferentes das do usuário em execução, ele poderá ver dados diferentes (D).

Referência: https://trailhead.salesforce.com/en/content/learn/modules/lex_implementation_dashboards_and_reports/dashboards
    `
  },
  {
    number: 14,
    question: "The marketing team wants a new picklist value added to the Campaign Member Status field for the upsell promotional campaign. Which two solutions should the administrator use to modify the picklist field values? (Choose 2)",
    options: {
      A: "Add the Campaign Member Statuses related list to the Page Layout",
      B: "Edit the picklist values for the Campaign Status in Object Manager",
      C: "Mass modify the Campaign Member Statuses related list",
      D: "Modify the picklist value on the Campaign Member Statuses related list"
    },
    correct: "B, D",
    explanation_en: `
To add a new value for Campaign Status, edit the picklist values on the Campaign object in Object Manager (B). To add a new Campaign Member Status, modify the values directly on the Campaign Member Statuses related list on the Campaign page layout (D).

References:
https://help.salesforce.com/s/articleView?id=sf.campaigns_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.campaigns_member_status.htm&type=5
    `,
    explanation_pt: `
Para adicionar um novo valor em Campaign Status, edite os valores de picklist no objeto Campaign no Object Manager (B). Para adicionar um novo Campaign Member Status, modifique os valores diretamente na lista relacionada Campaign Member Statuses no layout de página de Campaign (D).

Referências:
https://help.salesforce.com/s/articleView?id=sf.campaigns_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.campaigns_member_status.htm&type=5
    `
  },
  {
    number: 15,
    question: "Ursa Solar Major is evaluating Salesforce for its service team and would like to know what objects were available out of the box. Which three of the standard objects are available to an administrator considering a support use case? (Choose 3)",
    options: {
      A: "Contract",
      B: "Case",
      C: "Ticket",
      D: "Request",
      E: "Account"
    },
    correct: "A, B, E",
    explanation_en: `
Contract, Case, and Account are standard objects included with Salesforce that are commonly used in service scenarios. “Ticket” and “Request” are not standard Salesforce objects out of the box.

References:
https://help.salesforce.com/s/articleView?id=sf.contract_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.case_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.account_fields.htm&type=5
    `,
    explanation_pt: `
Contract, Case e Account são objetos padrão incluídos no Salesforce e comumente usados em cenários de atendimento. “Ticket” e “Request” não são objetos padrão fornecidos por padrão.

Referências:
https://help.salesforce.com/s/articleView?id=sf.contract_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.case_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.account_fields.htm&type=5
    `
  },
  {
    number: 16,
    question: "The administrator at Cloud Kicks has been asked to replace two old workflow rules that are doing simple field updates when a lead is created to improve processing time. What tool should the administrator use to replace the workflow rules?",
    options: {
      A: "Quick Action Flow",
      B: "Before Save Flow",
      C: "Scheduled Flow",
      D: "Screen Flow"
    },
    correct: "B",
    explanation_en: `
Before Save Flows are record-triggered flows that run before a record is saved and can update fields on that record without additional DML operations. They execute faster and more efficiently than workflow rules for simple field updates.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_concepts_before_save_update.htm&type=5
    `,
    explanation_pt: `
Before Save Flows são fluxos acionados por registro que rodam antes de salvar o registro e podem atualizar seus campos sem operações DML adicionais. Eles são mais rápidos e eficientes que workflow rules para atualizações simples de campo.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_concepts_before_save_update.htm&type=5
    `
  },
  {
    number: 17,
    question: "Ursa Major Solar uses Opportunity to track sales of solar energy products. The company has two separate sales teams that focus on different energy markets. The Services team also wants to use Opportunity to track installation. All three teams will need to use different fields and stages. How should the administrator configure this requirement?",
    options: {
      A: "Create three sales processes. Create three record types and one page layout",
      B: "Create one sales process. Create three record types and three page layouts",
      C: "Create three sales processes. Create three record types and three page layouts",
      D: "Create one sales process. Create one record type and three page layouts"
    },
    correct: "C",
    explanation_en: `
You need three sales processes (one per team), three record types (to assign each process), and three page layouts (to surface the appropriate fields and stages). This ensures each team sees its own stages and fields.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_salesprocess.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_layout.htm&type=5
    `,
    explanation_pt: `
Você precisa de três sales processes (um para cada equipe), três record types (para vincular cada processo) e três page layouts (para exibir os campos e estágios corretos). Isso garante que cada equipe veja seus próprios estágios e campos.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_salesprocess.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_layout.htm&type=5
    `
  },
  {
    number: 18,
    question: "The service manager at Ursa Major Solar wants to let customers know that they have received their cases via email and their websites. Medium-priority and high-priority cases should receive different email notifications than low-priority cases. The administrator has created three email templates for this purpose. How should an administrator configure this requirement?",
    options: {
      A: "Include three assignment rules that fire when cases are created. Add a filter for case priority. Select the appropriate email template for each rule",
      B: "Add three auto-response rules. Configure one rule entry criteria for each rule and set a filter for case priority. Select the appropriate email template for each rule",
      C: "Configure one workflow rule that fires when cases are created. Add a filter for case priority. Select the appropriate email template for the rule",
      D: "Create one auto-response rule. Configure three rule entry criteria and set a filter for case priority. Select the appropriate email template for each rule entry"
    },
    correct: "D",
    explanation_en: `
Auto-response rules allow you to send email alerts automatically based on record criteria. You create one auto-response rule for cases and within it define three rule entries—one each for low, medium, and high priority—assigning the correct email template to each.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_leadsautor.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_casesautor.htm&type=5
    `,
    explanation_pt: `
Auto-response rules permitem enviar e-mails automaticamente com base em critérios de registro. Você cria uma auto-response rule para casos e dentro dela define três entradas de regra—uma para cada prioridade—atribuindo o template de e-mail correto a cada uma.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_leadsautor.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_casesautor.htm&type=5
    `
  },
  {
    number: 19,
    question: "The VP of sales at Dreamhouse Realty has requested a dashboard to visualize enterprise sales across the different teams. The key place of data is the total of all sales for the year and the progress to the enterprise sales goal. What dashboard component will effectively show this number and the proximity to the total goal as a single value?",
    options: {
      A: "Table",
      B: "Stacked Bar",
      C: "Donut",
      D: "Gauge"
    },
    correct: "D",
    explanation_en: `
A Gauge component displays a single metric value and its percentage of a target within colored ranges (e.g., red, yellow, green). It’s ideal for showing total sales and progress toward the sales goal on one dashboard.

Reference: https://help.salesforce.com/s/articleView?id=sf.dashboards_gauge_component_type.htm&type=5
    `,
    explanation_pt: `
O componente Gauge exibe um único valor métrico e sua porcentagem em relação a uma meta dentro de intervalos coloridos (por exemplo, vermelho, amarelo, verde). É ideal para mostrar o total de vendas e o progresso em direção à meta em um único painel.

Referência: https://help.salesforce.com/s/articleView?id=sf.dashboards_gauge_component_type.htm&type=5
    `
  },
  {
    number: 20,
    question: "A sales rep has left the company and an administrator has been asked to re-assign all their accounts and opportunities to a new sales rep and keep the teams as is. Which tool should an administrator use to accomplish this?",
    options: {
      A: "Data Loader",
      B: "Mass Transfer Tool",
      C: "Data Import Wizard",
      D: "Dataloader.io"
    },
    correct: "B",
    explanation_en: `
The Mass Transfer Tool in Setup lets you transfer ownership of records (up to 250 at a time) from one user to another while preserving related team members. It’s the recommended way to mass reassign Accounts and Opportunities.

Reference: https://help.salesforce.com/s/articleView?id=sf.mass_transfer_overview.htm&type=5
    `,
    explanation_pt: `
A Mass Transfer Tool em Setup permite transferir a propriedade de registros (até 250 de cada vez) de um usuário para outro, mantendo os membros da equipe relacionados. É a forma recomendada para reatribuir em massa Contas e Oportunidades.

Referência: https://help.salesforce.com/s/articleView?id=sf.mass_transfer_overview.htm&type=5
    `
  }
];
            
            function loadQuestion() {
              const quizContent = document.getElementById("quizContent");
              quizContent.innerHTML = "";
              
              if (currentQuestion >= questions.length) {
                quizContent.innerHTML = `<h2>Você concluiu o quiz!</h2><p>Sua pontuação: ${score} de ${questions.length}</p>`;
                return;
              }
              
              const q = questions[currentQuestion];
              
              // Enunciado
              const questionEl = document.createElement("div");
              questionEl.className = "question";
              questionEl.innerHTML = `<strong>Pergunta ${q.number}:</strong> ${q.question}`;
              quizContent.appendChild(questionEl);
              
              // Lista de opções
              const optionsList = document.createElement("ul");
              optionsList.className = "options";
              for (const [key, value] of Object.entries(q.options)) {
                const li = document.createElement("li");
                li.innerHTML = `<label><input type="radio" name="option" value="${key}"> (${key}) ${value}</label>`;
                optionsList.appendChild(li);
              }
              quizContent.appendChild(optionsList);
              
              // Contêiner dos botões (Responder e Próxima Pergunta)
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
              buttonContainer.appendChild(responderBtn);
              buttonContainer.appendChild(nextBtn);
              quizContent.appendChild(buttonContainer);
              
              // Evento para marcar com azul a opção selecionada
              const optionInputs = document.querySelectorAll('input[name="option"]');
              optionInputs.forEach(input => {
                input.addEventListener("change", () => {
                  optionInputs.forEach(opt => { opt.parentElement.style.backgroundColor = ""; });
                  input.parentElement.style.backgroundColor = "lightblue";
                });
              });
              
              updateSidebar();
            }
            
            function checkAnswer() {
              const q = questions[currentQuestion];
              const selected = document.querySelector('input[name="option"]:checked');
              const quizContent = document.getElementById("quizContent");
              
              if (!selected) {
                alert("Por favor, selecione uma opção.");
                return;
              }
              
              if (q.userAnswer === undefined) {
                q.userAnswer = selected.value;
                totalAnswered++;
              }
              
              const optionInputs = document.querySelectorAll('input[name="option"]');
              if (selected.value === q.correct) {
                selected.parentElement.style.backgroundColor = "lightgreen";
                score++;
              } else {
                selected.parentElement.style.backgroundColor = "lightcoral";
                optionInputs.forEach(input => {
                  if (input.value === q.correct) {
                    input.parentElement.style.backgroundColor = "yellow";
                  }
                });
              }
              
              const feedbackDiv = document.createElement("div");
              feedbackDiv.className = "feedback";
              feedbackDiv.textContent = (selected.value === q.correct) ? "Correto!" : `Incorreto! A resposta correta é (${q.correct}) ${q.options[q.correct]}.`;
              quizContent.appendChild(feedbackDiv);
              
              const explanationDiv = document.createElement("div");
              explanationDiv.className = "explanation";
              explanationDiv.innerHTML = `<em>Explicação:</em> ${q.explanation_pt}`;
              quizContent.appendChild(explanationDiv);
              
              optionInputs.forEach(input => input.disabled = true);
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
                alert("Por favor, insira seu nome para iniciar o quiz.");
                return;
              }
              quizStarted = true;
              currentQuestion = 0;
              score = 0;
              totalAnswered = 0;
              questions.forEach(q => { delete q.userAnswer; shuffleOptions(q); });
              document.getElementById("finalScore").innerHTML = "";
              loadQuestion();
            }
            
            function finishQuiz() {
              if (!quizStarted) {
                alert("Você precisa iniciar o quiz primeiro!");
                return;
              }
              const grade = totalAnswered === 0 ? 0 : Math.round((score / totalAnswered) * 100);
              const finalScoreDiv = document.getElementById("finalScore");
              finalScoreDiv.innerHTML = `<h3>Sua nota: ${grade}%</h3>
                                         <p>Total respondido: ${totalAnswered} | Corretas: ${score} | Erradas: ${totalAnswered - score}</p>`;
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
                scoreboardDiv.textContent = "Sem pontuações salvas.";
                return;
              }
              const list = document.createElement("ol");
              scoreboard.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.name} - ${entry.grade}% (Corretas: ${entry.correct}, Erradas: ${entry.wrong}) em ${entry.date}`;
                list.appendChild(li);
              });
              scoreboardDiv.appendChild(list);
            }
            
            function clearScoreboard() {
              if (confirm("Tem certeza que deseja apagar todas as pontuações?")) {
                localStorage.removeItem("quizScoreboard");
                updateScoreboardDisplay();
              }
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

function startEvaluation() {
  const name = document.getElementById("playerName").value.trim();
  if (name === "") {
    alert("Por favor, insira seu nome para iniciar a avaliação.");
    return;
  }
  evaluationQuestions = generateEvaluationQuestions();
  evaluationCurrentQuestion = 0;
  evaluationScore = 0;
  evaluationTotalAnswered = 0;
  evaluationTimeLeft = evaluationDuration;
  // Exibe o modal de avaliação (o modal não contém os elementos de navegação)
  document.getElementById("evaluationModal").style.display = "block";
  loadEvaluationQuestion();
  startEvaluationTimer();
}

function loadEvaluationQuestion() {
  const evalContent = document.getElementById("evalQuizContent");
  evalContent.innerHTML = "";
  
  if (evaluationCurrentQuestion >= evaluationQuestions.length) {
    evalContent.innerHTML = `<h2>Avaliação finalizada!</h2>`;
    return;
  }
  
  const q = evaluationQuestions[evaluationCurrentQuestion];
  
  // Cria o enunciado sem o número da pergunta
  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.innerHTML = `<strong>${q.question}</strong>`;
  evalContent.appendChild(questionEl);
  
  // Cria a lista de opções
  const optionsList = document.createElement("ul");
  optionsList.className = "options";
  for (const [key, value] of Object.entries(q.options)) {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="evalOption" value="${key}"> (${key}) ${value}</label>`;
    optionsList.appendChild(li);
  }
  evalContent.appendChild(optionsList);
  
  // Cria o contêiner para os botões "Voltar", "Responder" e "Próxima Questão"
  // Cria o botão "Responder" abaixo das alternativas
  const responderBtn = document.createElement("button");
  responderBtn.id = "evalResponderBtn";
  responderBtn.textContent = "Responder";
  responderBtn.addEventListener("click", checkEvaluationAnswer);
  evalContent.appendChild(responderBtn);

  // Cria um container para os botões "Voltar" e "Próxima Questão" com espaçamento
  const navBtnContainer = document.createElement("div");
  navBtnContainer.id = "evalNavButtons";
  navBtnContainer.style.display = "flex";
  navBtnContainer.style.justifyContent = "center";
  navBtnContainer.style.gap = "20px";
  navBtnContainer.style.marginTop = "15px";

  // Botão Voltar
  const backBtn = document.createElement("button");
  backBtn.id = "evalBackBtn";
  backBtn.textContent = "Voltar";
  backBtn.addEventListener("click", () => {
    if (evaluationCurrentQuestion > 0) {
      evaluationCurrentQuestion--;
      loadEvaluationQuestion();
    }
  });
  navBtnContainer.appendChild(backBtn);

  // Botão Próxima Questão
  const nextBtn = document.createElement("button");
  nextBtn.id = "evalNextBtn";
  nextBtn.textContent = "Próxima Questão";
  nextBtn.addEventListener("click", nextEvaluationQuestion);
  navBtnContainer.appendChild(nextBtn);

  evalContent.appendChild(navBtnContainer);
  
  // Evento para marcar com azul a opção selecionada
  const optionInputs = document.querySelectorAll('input[name="evalOption"]');
  optionInputs.forEach(input => {
    input.addEventListener("change", () => {
      optionInputs.forEach(opt => { opt.parentElement.style.backgroundColor = ""; });
      input.parentElement.style.backgroundColor = "lightblue";
    });
  });
}

function prevEvaluationQuestion() {
  if (evaluationCurrentQuestion > 0) {
    evaluationCurrentQuestion--;
    loadEvaluationQuestion();
  }
}

function checkEvaluationAnswer() {
  const q = evaluationQuestions[evaluationCurrentQuestion];
  const selected = document.querySelector('input[name="evalOption"]:checked');
  const evalContent = document.getElementById("evalQuizContent");
  
  if (!selected) {
    alert("Por favor, selecione uma opção.");
    return;
  }
  
  if (q.userAnswer === undefined) {
    q.userAnswer = selected.value;
    evaluationTotalAnswered++;
  }
  
  const optionInputs = document.querySelectorAll('input[name="evalOption"]');
  if (selected.value === q.correct) {
    selected.parentElement.style.backgroundColor = "lightgreen";
    evaluationScore++;
  } else {
    selected.parentElement.style.backgroundColor = "lightcoral";
    optionInputs.forEach(input => {
      if (input.value === q.correct) {
        input.parentElement.style.backgroundColor = "yellow";
      }
    });
  }
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.className = "feedback";
  feedbackDiv.textContent = (selected.value === q.correct) ? "Correto!" : `Incorreto! A resposta correta é (${q.correct}) ${q.options[q.correct]}.`;
  evalContent.appendChild(feedbackDiv);
  
  optionInputs.forEach(input => input.disabled = true);
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
    alert("Por favor, insira seu nome para iniciar a avaliação.");
    return;
  }
  // Reseta o feedback do modal
  document.getElementById("evalFeedback").innerHTML = "";
  
  evaluationQuestions = generateEvaluationQuestions();
  evaluationCurrentQuestion = 0;
  evaluationScore = 0;
  evaluationTotalAnswered = 0;
  evaluationTimeLeft = evaluationDuration;
  
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
});

// --------------------- Ouvintes do Quiz Normal ---------------------
// (Mantém os ouvintes já existentes para o quiz normal)
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);
document.getElementById("finishQuizBtn").addEventListener("click", finishQuiz);
document.getElementById("clearScoreboardBtn").addEventListener("click", clearScoreboard);

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
// Array com 10 mensagens de erro (do nível 1 ao 10)
const errorMessages = [
  "Bruno, você já respondeu essa pergunta.",
  "Bruno, já foi respondido, por favor prossiga.",
  "Ei Bruno, essa resposta já foi registrada. Presta atenção.",
  "Bruno larga o tapioca; essa resposta já foi confirmada.",
  "É serio isso? Bruno a resposta já foi dada mano.",
  "olha aí Leandrão, tá difícil pro Bruno entender que essa pergunta já foi respondida? Foco Bruno",
  "Tá vendo Adriel, ele fez outra vez, essa já foi respondida Bruno",
  "Sério, sai da porra do Whatsapp Bruno, depois você responde. Foque na próxima.",
  "Agora é serio, desamarra a faxineira da cama e presta atenção, essa questão já foi respondida!",
  "Caralho mano, como o Dudu apareceu no seu colo do nada? Tira ele daí e responde outra pergunta.",
  "Mim vai inscrevinha erado; sô pa ve si vc para di fase iço, essa questão já foi respondida.",
  "Bruno, como nada até aqui resolveu, vou deixar o chatgpt te responder!",
  "Bruno, caralho, tu tá de sacanagem? Essa pergunta já foi respondida mil vezes, presta atenção, porra!",
  "Ô Bruno, tu tá num universo paralelo? Só pode... Vê se acorda, pô, já tá tudo anotado, não enche mais!",
  "Tá de zoeira comigo, Bruno? Nem a porra do Google aguenta mais tu repetindo a mesma pergunta, meu irmão!",
  "Bruno, larga essa punheta aí, caralho, e presta atenção! A pergunta já tá respondida faz meia hora!",
  "Ô Bruno, para de enfiar o dedo onde não deve e volta pro questionário, porra! Não é difícil entender que isso já foi respondido.",
  "Tá ocupado lambendo o teclado, Bruno? Porque não é possível tu clicar sempre na mesma porra de pergunta! Bora seguir, cacete!",
  "Porra, Bruno, se continuar assim vou achar que tu tá transando com essa pergunta de tanto que tu repete! Larga isso e vai pra próxima!",
  "Bruno, sai do Xvideos e olha pra gente aqui, inferno! Já respondi essa merda umas mil vezes!",
  "Caralho, Bruno, quantos contatinhos tu tem pra ficar distraído assim? Fecha esse Tinder safado e segue a porra do formulário!",
  "Meu Deus, Bruno! Toda vez que tu repete essa pergunta eu imagino que tu tá enfiando algo no cu em vez de prestar atenção! Larga mão dessa ideia e bora pra outra!",
  "Bruno, segura essa libido aí, meu parceiro! Para de ficar se alisando enquanto repete a pergunta — já foi respondida, diabo!",
  "Porra, Bruno, até minha avó com tesão entende que isso já foi respondido! Foca, inferno!",
  "Bruno, larga essa macumba que tu tá fazendo e olha pro que a gente já respondeu! É sério, cara, tá enchendo o saco!",
  "Porra, Bruno, tu tá competindo pra ver quem consegue ser mais tapado hoje? Para de repetir essa merda de pergunta!",
  "Caramba, Bruno, tá achando que a gente é teu diarista mental, pra ficar repetindo resposta toda hora? Se liga, porra!",
  "Ô Bruno, cê tem problema de memória ou tá só testando minha paciência, desgraça? A mesma pergunta de novo não, né?!",
  "Puta que pariu, Bruno! Eu já expliquei, já desenhei, já fiz mímica! Essa porra já foi respondida, porra!",
  "Bruno, se tu insistir nessa questão mais uma vez, eu vou mandar teu nome pro Procon das Perguntas Repetidas, caralho!",
  "Caralho, Bruno, é sério, se você clicar de novo nesse botão, eu mesmo vou aí te dar um puxão de orelha, porque tá f... já!"
];

function displayErrorTooltip(q) {
  // Incrementa o contador de tentativas na pergunta
  if (!q.attemptCount) {
    q.attemptCount = 1;
  } else {
    q.attemptCount++;
  }
  // Define o nível (de 1 a 10)
  let index = Math.min(q.attemptCount - 1, errorMessages.length - 1);
  const message = errorMessages[index];

  // Cria o tooltip (div com overlay)
  const tooltip = document.createElement("div");
  tooltip.className = "error-tooltip";
  
  // Conteúdo do tooltip
  tooltip.innerHTML = `
    <p>${message}</p>
    <button id="tooltipOkBtn">OK</button>
  `;

  // Posiciona o tooltip sobre o quiz (ou de acordo com sua preferência)
  // Aqui, por exemplo, centralizamos no meio do viewport
  document.body.appendChild(tooltip);

  // Ouvinte para fechar o tooltip
  document.getElementById("tooltipOkBtn").addEventListener("click", () => {
    tooltip.remove();
  });
}

// Atualize a função checkAnswer para usar a função de tooltip se a pergunta já tiver sido respondida.
function checkAnswer() {
  const q = questions[currentQuestion];
  const selected = document.querySelector('input[name="option"]:checked');
  const quizContent = document.getElementById("quizContent");
  
  if (!selected) {
    alert("Por favor, selecione uma opção.");
    return;
  }
  
  // Se a pergunta já foi respondida, exibe o tooltip de erro e não processa novamente.
  if (q.userAnswer !== undefined) {
    displayErrorTooltip(q);
    return;
  }
  
  // Registra a resposta e processa normalmente
  q.userAnswer = selected.value;
  totalAnswered++;
  
  const optionInputs = document.querySelectorAll('input[name="option"]');
  
  if (selected.value === q.correct) {
    selected.parentElement.style.backgroundColor = "lightgreen";
    score++;
  } else {
    selected.parentElement.style.backgroundColor = "lightcoral";
    optionInputs.forEach(input => {
      if (input.value === q.correct) {
        input.parentElement.style.backgroundColor = "yellow";
      }
    });
  }
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.className = "feedback";
  feedbackDiv.textContent = (selected.value === q.correct) ? "Correto!" : `Incorreto! A resposta correta é (${q.correct}) ${q.options[q.correct]}.`;
  quizContent.appendChild(feedbackDiv);
  
  const explanationDiv = document.createElement("div");
  explanationDiv.className = "explanation";
  explanationDiv.innerHTML = `<em>Explicação:</em> ${q.explanation_pt}`;
  quizContent.appendChild(explanationDiv);
  
  optionInputs.forEach(input => input.disabled = true);
  updateSidebar();
}
function updateEvaluationProgress() {
  const progressEl = document.getElementById("evalProgress");
  // Exibe "Questão X de Y" onde X = avaliação atual + 1 e Y = total de questões (60)
  progressEl.textContent = `Questão ${evaluationCurrentQuestion + 1} de ${evaluationQuestions.length}`;
}

function loadEvaluationQuestion() {
  const evalContent = document.getElementById("evalQuizContent");
  evalContent.innerHTML = "";
  
  // Atualiza o progresso (ex.: "Questão 3 de 60")
  updateEvaluationProgress();

  if (evaluationCurrentQuestion >= evaluationQuestions.length) {
    evalContent.innerHTML = `<h2>Avaliação finalizada!</h2>`;
    return;
  }
  
  const q = evaluationQuestions[evaluationCurrentQuestion];
  
  // Cria o enunciado (sem número da questão)
  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.innerHTML = `${q.question}`;
  evalContent.appendChild(questionEl);
  
  // Cria a lista de alternativas
  const optionsList = document.createElement("ul");
  optionsList.className = "options";
  for (const [key, value] of Object.entries(q.options)) {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="evalOption" value="${key}"> (${key}) ${value}</label>`;
    optionsList.appendChild(li);
  }
  evalContent.appendChild(optionsList);
  
  // Cria o botão "Responder" abaixo das alternativas
  const responderBtn = document.createElement("button");
  responderBtn.id = "evalResponderBtn";
  responderBtn.textContent = "Responder";
  responderBtn.addEventListener("click", checkEvaluationAnswer);
  evalContent.appendChild(responderBtn);
  
  // Cria um container para os botões "Voltar" e "Próxima Questão" com espaçamento
  const navBtnContainer = document.createElement("div");
  navBtnContainer.id = "evalNavButtons";
  navBtnContainer.style.display = "flex";
  navBtnContainer.style.justifyContent = "center";
  navBtnContainer.style.gap = "20px";
  navBtnContainer.style.marginTop = "15px";
  
  // Botão Voltar
  const backBtn = document.createElement("button");
  backBtn.id = "evalBackBtn";
  backBtn.textContent = "Voltar";
  backBtn.addEventListener("click", () => {
    if (evaluationCurrentQuestion > 0) {
      evaluationCurrentQuestion--;
      loadEvaluationQuestion();
    }
  });
  navBtnContainer.appendChild(backBtn);
  
  // Botão Próxima Questão
  const nextBtn = document.createElement("button");
  nextBtn.id = "evalNextBtn";
  nextBtn.textContent = "Próxima Questão";
  nextBtn.addEventListener("click", nextEvaluationQuestion);
  navBtnContainer.appendChild(nextBtn);
  
  // Adiciona o container de navegação logo abaixo do botão "Responder"
  evalContent.appendChild(navBtnContainer);
  
  // Registra a marcação em azul quando o usuário seleciona uma opção
  const optionInputs = document.querySelectorAll('input[name="evalOption"]');
  optionInputs.forEach(input => {
    input.addEventListener("change", () => {
      optionInputs.forEach(opt => { opt.parentElement.style.backgroundColor = ""; });
      input.parentElement.style.backgroundColor = "lightblue";
    });
  });
}
