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
  const pct  = ((currentQuestion + 1) / questions.length) * 100;
  fill.style.width = pct + '%';
}

/**
 * Embaralha question.options e ajusta question.correct,
 * suportando respostas únicas ("C") e múltiplas ("D, E").
 */
function shuffleOptions(question) {
  // 1) Pega entradas [key,text] e embaralha
  const entries  = Object.entries(question.options);
  const shuffled = shuffleArray(entries);

  // 2) Lista de chaves originais corretas
  const origCorrectList = question.correct
    .split(',')
    .map(k => k.trim())     // ['D','E']
    .filter(k => k);        // remove vazios

  // 3) Remapeia para novas opções e reconstrói correctList
  const newOptions      = {};
  const newCorrectKeys  = [];
  const letters         = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
  },
    {
    number: 21,
    question: "Northern Trail Outfitters has two different sales processes: one for business opportunities with four stages and one for partner opportunities with eight stages. Both processes will vary in page layouts and picklist value options. What should an administrator configure to meet these requirements?",
    options: {
      A: "Validation rules that ensure that users are entering accurate sales stage information",
      B: "Different page layouts that control the picklist values for the opportunity types",
      C: "Public groups to limit record types and sales processes for opportunities",
      D: "Separate record types and Sales processes for the different types of opportunities"
    },
    correct: "D",
    explanation_en: `
Record types and Sales Processes allow you to offer different page layouts, required fields, and picklist values for each type of opportunity. By creating separate record types and associating each with its own sales process, you satisfy both layout and stage-value requirements.

References:
https://www.salesforceben.com/salesforce-record-types/
https://trailhead.salesforce.com/content/learn/projects/create-an-opportunity-record-type-for-npsp/create-and-manage-stages-and-sales-processes
    `,
    explanation_pt: `
Record Types e Sales Processes permitem oferecer diferentes layouts de página, campos obrigatórios e valores de picklist para cada tipo de oportunidade. Criando record types separados e associando cada um ao seu próprio sales process, você atende aos requisitos de layout e valores de estágio.

Referências:
https://www.salesforceben.com/salesforce-record-types/
https://trailhead.salesforce.com/content/learn/projects/create-an-opportunity-record-type-for-npsp/create-and-manage-stages-and-sales-processes
    `
  },
  {
    number: 22,
    question: "An administrator installed a managed package that contains a permission set group. The permission set group that was installed includes Delete access on several objects, and the administrator needs to prevent users in the permission set group from being able to delete records. What should the administrator do to control Delete access?",
    options: {
      A: "Use a muting permission set with a permission set group to mute selected permissions",
      B: "Create a new permission set that has Delete access deselected for the objects",
      C: "Create a new role that prevents Delete permissions from rolling up to the users",
      D: "Edit the profile for the users to remove Delete access from the objects"
    },
    correct: "A",
    explanation_en: `
Muting Permission Sets let you remove specific permissions granted by a Permission Set Group without altering the group itself. By creating a muting set that mutes Delete on those objects, you prevent deletions while keeping the rest of the package permissions intact.

Reference: https://help.salesforce.com/s/articleView?id=sf.perm_sets_muting.htm&type=5
    `,
    explanation_pt: `
Muting Permission Sets permitem remover permissões específicas concedidas por um Permission Set Group sem alterar o grupo em si. Criando um muting set que silencie o Delete nesses objetos, você impede deleções mantendo o restante das permissões do pacote.

Referência: https://help.salesforce.com/s/articleView?id=sf.perm_sets_muting.htm&type=5
    `
  },
  {
    number: 23,
    question: "Northern Trail Outfitters wants to calculate how much revenue has been generated for each of its marketing campaigns. How should an administrator deliver this information?",
    options: {
      A: "Design a standard Campaign report and add the value Won Opportunities in Campaign field",
      B: "Perform periodic data job to update campaign records",
      C: "Create a roll-up summary field on Opportunity to Campaign",
      D: "Add a Total Value Field on campaign and use a workflow rule to update the value when an opportunity is won"
    },
    correct: "C",
    explanation_en: `
Roll-up Summary Fields on the Campaign object can calculate sums (e.g., Total Opportunity Amount) from its related Opportunity records. This delivers up-to-date revenue totals per campaign automatically.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `,
    explanation_pt: `
Roll-up Summary Fields no objeto Campaign podem calcular somas (por exemplo, Total Opportunity Amount) a partir dos registros de Oportunidade relacionados. Isso fornece totais de receita por campanha de forma automática e atualizada.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `
  },
  {
    number: 24,
    question: "Cloud Kicks wants to allow customers to create their own cases while visiting its public homepage. What should the administrator recommend?",
    options: {
      A: "SMS Response",
      B: "Web-to-Case",
      C: "Email-to-Case",
      D: "Omni-Channel"
    },
    correct: "B",
    explanation_en: `
Web-to-Case generates HTML form code you can embed on your website so visitors can submit cases directly into Salesforce. It’s the standard solution for public-site case creation.

Reference: https://help.salesforce.com/s/articleView?id=sf.customizesupport_web_to_case.htm&type=5
    `,
    explanation_pt: `
Web-to-Case gera código de formulário HTML que você pode incorporar em seu site para que visitantes enviem casos diretamente ao Salesforce. É a solução padrão para criação de casos em site público.

Referência: https://help.salesforce.com/s/articleView?id=sf.customizesupport_web_to_case.htm&type=5
    `
  },
  {
    number: 25,
    question: "An administrator at Universal Containers needs a simple way to trigger an alert to the director of sales when opportunities reach an amount of $500,000. What should the administrator configure to meet this requirement?",
    options: {
      A: "Set up Big Deal Alerts for the amount",
      B: "Enable Opportunity Update Reminders",
      C: "Opportunity warning in Kanban View",
      D: "Key Deals component on the homepage"
    },
    correct: "A",
    explanation_en: `
Big Deal Alerts let you notify users when an Opportunity’s Amount or Probability meets thresholds you define. You can target the Director of Sales for alerts when Amount ≥ $500,000.

Reference: https://help.salesforce.com/s/articleView?id=sf.forecasts3_big_deal_alerts.htm&type=5
    `,
    explanation_pt: `
Big Deal Alerts permitem notificar usuários quando a Amount ou Probability de uma Oportunidade atinge limites definidos. Você pode direcionar alertas ao Diretor de Vendas quando Amount ≥ $500.000.

Referência: https://help.salesforce.com/s/articleView?id=sf.forecasts3_big_deal_alerts.htm&type=5
    `
  },
  {
    number: 26,
    question: "Cloud Kicks wants users to only be able to choose Opportunity stage closed won if the Lead Source has been selected. How should the administrator accomplish this goal?",
    options: {
      A: "Make Lead Source a dependent picklist to the Opportunity stage field",
      B: "Configure a validation rule requiring Lead Source when the stage is set to closed won",
      C: "Change the Opportunity stage field to read only on the page layout",
      D: "Modify the Opportunity stage a dependent picklist to the Lead source field"
    },
    correct: "B",
    explanation_en: `
A Validation Rule can check that Stage = "Closed Won" only when LeadSource is not null. This prevents saving Opportunities as Closed Won without a Lead Source.

Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Validation Rule pode verificar que Stage = "Closed Won" somente quando LeadSource não for nulo. Isso impede salvar Oportunidades como Closed Won sem Lead Source.

Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `
  },
  {
    number: 27,
    question: "Ursa Major Solar wants to automatically notify a manager about any cases awaiting a response from an agent for more than 2 hours after case creation. Which feature should an administrator use to fulfill this requirement?",
    options: {
      A: "Assignment Rule",
      B: "Case Escalation Rule",
      C: "Omni-Channel Supervisor",
      D: "Formula Field"
    },
    correct: "B",
    explanation_en: `
Case Escalation Rules let you define time-based criteria to escalate cases (e.g., notify a manager if not updated within 2 hours). This meets the requirement exactly.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_escalation.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules permitem definir critérios baseados em tempo para escalonar casos (por exemplo, notificar um gerente se não for atualizado em 2 horas). Isso atende exatamente ao requisito.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_escalation.htm&type=5
    `
  },
  {
    number: 28,
    question: "Sales users at Universal Containers are reporting that it is taking a long time to edit opportunity records. Normally, the only field they are editing is the Stage field. Which two options should the administrator recommend to help simplify the process? (Choose 2)",
    options: {
      A: "Add a path for stage to the opportunity record page",
      B: "Use a Kanban list view for Opportunity",
      C: "Configure an auto launched flow for Opportunity editing",
      D: "Create a simplified Opportunity page layout"
    },
    correct: "A, B",
    explanation_en: `
Paths on record pages allow users to update stages inline with visual guidance (A). Kanban list views let users drag cards between columns to change stage quickly (B). Both simplify stage updates.

References:
https://help.salesforce.com/s/articleView?id=sf.path_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.kanban_overview.htm&type=5
    `,
    explanation_pt: `
Paths em páginas de registro permitem que usuários atualizem estágios inline com orientação visual (A). Kanban list views permitem arrastar cards entre colunas para alterar estágio rapidamente (B). Ambos simplificam atualizações de estágio.

Referências:
https://help.salesforce.com/s/articleView?id=sf.path_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.kanban_overview.htm&type=5
    `
  },
  {
    number: 29,
    question: "A sales rep has a list of 300 accounts with contacts that they want to load at one time. Which tool should the administrator utilize to import the records to Salesforce?",
    options: {
      A: "Dataloader.io",
      B: "Data Loader",
      C: "Manual Import",
      D: "Data Import Wizard"
    },
    correct: "D",
    explanation_en: `
The Data Import Wizard supports up to 50,000 records in one batch and is user-friendly for importing Accounts with related Contacts (via contact mapping). It’s ideal for this use case.

Reference: https://help.salesforce.com/s/articleView?id=sf.data_importer.htm&type=5
    `,
    explanation_pt: `
O Data Import Wizard suporta até 50.000 registros em um único lote e é fácil de usar para importar Contas com Contatos relacionados (via mapeamento). É ideal para este caso.

Referência: https://help.salesforce.com/s/articleView?id=sf.data_importer.htm&type=5
    `
  },
  {
    number: 30,
    question: "An administrator created a record trigger flow to update contacts. How should the administrator reference the values of the active record the flow is running on?",
    options: {
      A: "Use the {!Contact.Id} global variable",
      B: "Use the {!Account.Id} record variable",
      C: "Use the $Record global variable",
      D: "Use the Get Records element to find the Id"
    },
    correct: "C",
    explanation_en: `
The $Record global variable provides access to all field values of the record that triggered the flow. This is the standard way to reference the active record within a record-triggered flow.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_ref_global_variables.htm&type=5
    `,
    explanation_pt: `
A variável global $Record fornece acesso a todos os valores de campo do registro que acionou o fluxo. É a forma padrão de referenciar o registro ativo em um fluxo acionado por registro.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_ref_global_variables.htm&type=5
    `
  },
    {
    number: 31,
    question: "An administrator gets a rush request from Human Resources to remove a user’s access to Salesforce immediately. The user is part of a hierarchy field called Direct Manager. What should the administrator do to fulfil the request?",
    options: {
      A: "Freeze the user to prevent them from logging in while removing them from being referenced in the Direct Manager field",
      B: "Deactivate the user and delete any records where they are referenced in the Direct Manager field",
      C: "Change the user’s profile to read-only while removing them from being referenced in the Direct Manager field",
      D: "Delete the user and leave all records where they are referenced in the Direct Manager field without changes"
    },
    correct: "A",
    explanation_en: `
Freezing a user immediately prevents them from logging in without deactivating their account record. This gives you time to update or remove references—in this case, clearing the Direct Manager field—before deactivation.

Reference: https://help.salesforce.com/s/articleView?id=sf.users_freeze.htm&type=5
    `,
    explanation_pt: `
Freezar um usuário impede imediatamente que ele faça login sem desativar o registro de usuário. Isso dá tempo para atualizar ou remover referências—neste caso, limpar o campo Direct Manager—antes da desativação.

Referência: https://help.salesforce.com/s/articleView?id=sf.users_freeze.htm&type=5
    `
  },
  {
    number: 32,
    question: "AW Computing (AWC) occasionally works with independent contractors, who the company stores as Contacts in Salesforce. Contractors often change agencies, and AWC wants to maintain the historical accuracy of the record. What should AWC use to track Contacts?",
    options: {
      A: "Use a partner community to track the Contacts",
      B: "Create a new Contact record for each agency",
      C: "Create a Junction object to track many-to-many relationship",
      D: "Enable Contacts to multiple Accounts"
    },
    correct: "D",
    explanation_en: `
Contacts to Multiple Accounts allows a single Contact record to be associated with multiple Accounts (business and person accounts). This preserves one Contact record’s history while linking it to each agency.

Reference: https://help.salesforce.com/s/articleView?id=sf.contacts_multiple_accounts.htm&type=5
    `,
    explanation_pt: `
Contacts to Multiple Accounts permite que um único registro de Contact seja associado a várias Accounts (empresariais e pessoas). Isso preserva o histórico de um registro de Contact enquanto o vincula a cada agência.

Referência: https://help.salesforce.com/s/articleView?id=sf.contacts_multiple_accounts.htm&type=5
    `
  },
  {
    number: 33,
    question: "Which two actions should an administrator perform with Case escalation rules? (Choose 2)",
    options: {
      A: "Re-open the Case",
      B: "Send email notifications",
      C: "Change the Case Priority",
      D: "Re-assign the Case"
    },
    correct: "B, D",
    explanation_en: `
Case Escalation Rules can automatically send email alerts (B) and reassign the Case owner (D) when criteria are met. They can also trigger other workflow actions but do not reopen cases or change the Priority field by default.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_caseesc.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules podem enviar alertas por e-mail automaticamente (B) e reatribuir o proprietário do Case (D) quando os critérios são atendidos. Elas também podem acionar outras ações de workflow, mas não reabrem casos nem alteram a prioridade por padrão.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_caseesc.htm&type=5
    `
  },
  {
    number: 34,
    question: "The Sales director at Cloud Kicks wants to be able to predict upcoming revenue in the next several fiscal quarters so they can set goals and benchmark how reps are performing. Which two features should the administrator configure? (Choose 2)",
    options: {
      A: "Sales Quotes",
      B: "Opportunity List View",
      C: "Forecasting",
      D: "Opportunity Stages"
    },
    correct: "C, D",
    explanation_en: `
Forecasting provides revenue predictions and quota tracking across fiscal periods (C). Opportunity Stages determine probabilities and forecast categories used in forecast calculations (D).

References:
https://help.salesforce.com/s/articleView?id=sf.forecasting3_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_opptystages.htm&type=5
    `,
    explanation_pt: `
Forecasting fornece previsões de receita e acompanhamento de cotas ao longo dos períodos fiscais (C). Opportunity Stages determinam probabilidades e categorias de previsão usadas nos cálculos de forecast (D).

Referências:
https://help.salesforce.com/s/articleView?id=sf.forecasting3_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_opptystages.htm&type=5
    `
  },
  {
    number: 35,
    question: "Universal Containers requires a different Lightning page to be displayed when Accounts are viewed in the Sales Console and in the Service Console. How should an administrator meet this requirement?",
    options: {
      A: "Update page layout assignments",
      B: "Define multiple record types",
      C: "Assign Lightning pages as app default",
      D: "Create different user profiles"
    },
    correct: "C",
    explanation_en: `
Lightning Page Assignments let you specify different page templates per app. By assigning one Lightning Record Page as the default for the Sales Console app and another for the Service Console app, you display different layouts accordingly.

References:
https://help.salesforce.com/s/articleView?id=sf.lightning_page_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.lightning_page_assignments.htm&type=5
    `,
    explanation_pt: `
Lightning Page Assignments permitem especificar diferentes templates de página por app. Atribuindo uma Lightning Record Page como padrão para o app Sales Console e outra para o Service Console, você exibe layouts diferentes conforme necessário.

Referências:
https://help.salesforce.com/s/articleView?id=sf.lightning_page_overview.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.lightning_page_assignments.htm&type=5
    `
  },
  {
    number: 36,
    question: "Sales reps at Northern Trail Outfitters have asked for a way to change the Probability field value of their Opportunities. What should an administrator suggest to meet this request?",
    options: {
      A: "Define a new Stage picklist value",
      B: "Create a custom field on Opportunity",
      C: "Configure Forecasting support",
      D: "Make the field editable on page layouts"
    },
    correct: "D",
    explanation_en: `
Probability is a standard percentage field that is read-only by default and derived from the Stage picklist. To allow edits, you simply make it editable on the Opportunity page layouts.

References:
https://help.salesforce.com/s/articleView?id=sf.opportunity_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_layoutedit.htm&type=5
    `,
    explanation_pt: `
Probability é um campo percentual padrão que é somente leitura por padrão e derivado do picklist Stage. Para permitir edições, basta torná-lo editável nos page layouts de Opportunity.

Referências:
https://help.salesforce.com/s/articleView?id=sf.opportunity_fields.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_layoutedit.htm&type=5
    `
  },
  {
    number: 37,
    question: "Ursa Major Solar has its business hours set from 9:00 AM to 5:00 PM for reps on Pacific Time. Reps on Eastern Time need business hours set to start 3 hours earlier to cover support. How should an administrator solve for this issue?",
    options: {
      A: "Set temporary business hours for each time zone",
      B: "Adjust the current business hours to accommodate the Eastern Time Zone",
      C: "Create one set of business hours per time zone",
      D: "Allow the reps to set business hours manually"
    },
    correct: "C",
    explanation_en: `
Salesforce supports multiple Business Hours definitions. Create separate Business Hours records—one for Pacific Time and one for Eastern Time—and assign each to the appropriate support assignment.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_supporthours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_supporthours_assign.htm&type=5
    `,
    explanation_pt: `
O Salesforce suporta múltiplas definições de Business Hours. Crie registros de Business Hours separados—um para Pacific Time e outro para Eastern Time—e atribua cada um ao suporte apropriado.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_supporthours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.customize_supporthours_assign.htm&type=5
    `
  },
  {
    number: 38,
    question: "An administrator at Cloud Kicks is building a flow that needs to search for records that meet certain conditions and store values from those records in a variable for use later in the flow. What flow element should the administrator add?",
    options: {
      A: "Assignment",
      B: "Get Records",
      C: "Create Records",
      D: "Update Records"
    },
    correct: "B",
    explanation_en: `
The Get Records element retrieves records from the database that match your specified criteria and stores them in a variable (single record or collection) for later use in the flow.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_data_getrecords.htm&type=5
    `,
    explanation_pt: `
O elemento Get Records recupera registros do banco de dados que correspondem aos critérios especificados e os armazena em uma variável (registro único ou coleção) para uso posterior no fluxo.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_data_getrecords.htm&type=5
    `
  },
  {
    number: 39,
    question: "An administrator at Cloud Kicks has a flow in production that is supposed to create new records. However, no new records are being created. What could the issue be?",
    options: {
      A: "The flow is read only",
      B: "The flow is inactive",
      C: "The flow URL is deactivated",
      D: "The flow trigger is missing"
    },
    correct: "B",
    explanation_en: `
Inactive flows cannot run. If the flow is deployed but marked inactive, none of its elements will execute, and no new records will be created until it’s activated.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_distribute_activate.htm&type=5
    `,
    explanation_pt: `
Fluxos inativos não podem ser executados. Se o fluxo estiver implantado mas inativo, nenhum de seus elementos será executado e nenhum novo registro será criado até que seja ativado.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_distribute_activate.htm&type=5
    `
  },
  {
    number: 40,
    question: "The sales manager at Cloud Kicks wants to set up a business process where opportunity discounts over 30% need to be approved by the VP of sales. Any discounts above 10% need to be approved by the user’s manager. The administrator has been tasked with creating an approval process. Which are two considerations the administrator needs to review before setting up this approval process? (Choose 2)",
    options: {
      A: "Create a custom Discount field on the opportunity to capture the discount amount",
      B: "Populate the Manager standard field on the sales users’ User Detail page",
      C: "Configure two separate approval processes",
      D: "Allow the submitter to choose the approver manually"
    },
    correct: "A, C",
    explanation_en: `
1. Opportunity does not include a standard Discount field, so you must create a custom field to capture discount percentages (A).
2. To route based on two thresholds (10% and 30%), configure two separate Approval Processes with distinct entry criteria and approvers (C).

Reference: https://help.salesforce.com/s/articleView?id=sf.approvals_getting_started.htm&type=5
    `,
    explanation_pt: `
1. A Opportunity não inclui um campo padrão de Discount, então você deve criar um campo personalizado para capturar as porcentagens de desconto (A).
2. Para rotear com base em dois limites (10% e 30%), configure dois Approval Processes separados com critérios de entrada e aprovadores distintos (C).

Referência: https://help.salesforce.com/s/articleView?id=sf.approvals_getting_started.htm&type=5
    `
  },
    {
    number: 41,
    question: "What are three characteristics of a master-detail relationship? (Choose 3)",
    options: {
      A: "The master object can be a standard or custom object",
      B: "Permissions for the detail record are set independently of the master",
      C: "Each object can have up to five master-detail relationships",
      D: "Roll-up summaries are supported in master-detail relationships",
      E: "The owner field on the detail records is the owner of the master record"
    },
    correct: "A, D, E",
    explanation_en: `
A master-detail relationship is a tight parent-child link where the master controls certain behaviors.  
- The master can be either standard or custom (A).  
- Roll-up summary fields on the master let you aggregate child data (D).  
- Detail records inherit the owner of the master, and their Owner field is hidden (E).

Reference:  
https://www.forcetalks.com/blog/master-detail-relationship-in-salesforce/  
https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `,
    explanation_pt: `
Uma relação master-detail é um vínculo forte pai-filho onde o mestre controla comportamentos.  
- O mestre pode ser objeto padrão ou personalizado (A).  
- Roll-up summaries no mestre permitem agregar dados dos filhos (D).  
- Filhos herdam o proprietário do mestre; o campo Owner fica oculto (E).

Referências:  
https://www.forcetalks.com/blog/master-detail-relationship-in-salesforce/  
https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `
  },
  {
    number: 42,
    question: "An administrator at Universal Containers has been asked to prevent users from accessing Salesforce from outside of their network. What are two considerations for this configuration? (Choose 2)",
    options: {
      A: "IP address restrictions are set on the profile or globally for the org",
      B: "Users can change their password to avoid login IP restrictions",
      C: "Enforce Login IP Ranges on Every Request must be selected to enforce IP restrictions",
      D: "Single sign-on will allow users to log in from anywhere"
    },
    correct: "A, C",
    explanation_en: `
To lock down access by IP:  
1. Define Login IP Ranges on profiles or via Org-wide network settings (A).  
2. In Session Settings, enable “Enforce Login IP Ranges on Every Request” to cover API and UI logins (C).

References:  
https://help.salesforce.com/s/articleView?id=sf.security_networkaccess.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.security_enforce_ip_ranges.htm&type=5
    `,
    explanation_pt: `
Para restringir acesso por IP:  
1. Defina Login IP Ranges em perfis ou nas configurações de rede da Org (A).  
2. Em Session Settings, habilite “Enforce Login IP Ranges on Every Request” para cobrir logins API e UI (C).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.security_networkaccess.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.security_enforce_ip_ranges.htm&type=5
    `
  },
  {
    number: 43,
    question: "The administrator at Cloud Kicks has created an approval process for time off requests. Which two automated actions are available to be added as part of the approval process? (Choose 2)",
    options: {
      A: "Field Update",
      B: "Chatter Post",
      C: "Auto launched Flow",
      D: "Email Alert"
    },
    correct: "A, D",
    explanation_en: `
Within an approval process you can add these automated actions:  
- Field Updates (A) to change record values on submit/approval/rejection.  
- Email Alerts (D) to notify users when the record is submitted, approved, or rejected.

References:  
https://help.salesforce.com/s/articleView?id=sf.approvals_automated_actions.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_creating_approval_actions.htm&type=5
    `,
    explanation_pt: `
Dentro de um processo de aprovação, você pode adicionar estas ações automáticas:  
- Field Updates (A) para alterar valores de registro na submissão/aprovação/rejeição.  
- Email Alerts (D) para notificar usuários quando o registro é submetido, aprovado ou rejeitado.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.approvals_automated_actions.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_creating_approval_actions.htm&type=5
    `
  },
  {
    number: 44,
    question: "Which two capabilities are considerations when marking a field as required in Object Manager? (Choose 2)",
    options: {
      A: "The field is not required to save records via the API on that object",
      B: "The field is universally required to save a record on that object",
      C: "The field is added to every page layout on that object",
      D: "The field is optional when saving records via web-to-lead and web-to-case"
    },
    correct: "A, B",
    explanation_en: `
Marking a field required in Object Manager means:  
- It must be populated for all UI saves—universally required (B).  
- It does not enforce requirement on API operations unless also marked on layout or at integration layer (A).

References:  
https://help.salesforce.com/s/articleView?id=sf.fields_about_required_fields.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_profile_picklists.htm&type=5
    `,
    explanation_pt: `
Marcar um campo como obrigatório no Object Manager significa:  
- Ele deve ser preenchido em todas as salvamentos na UI—obrigatório universalmente (B).  
- Não força obrigatoriedade em operações via API, a menos que também esteja no layout (A).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.fields_about_required_fields.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_profile_picklists.htm&type=5
    `
  },
  {
    number: 45,
    question: "Universal Containers requires that when an Opportunity is closed won, all other open opportunities on the same account must be marked as closed lost. Which automation solution should an administrator use to implement this request?",
    options: {
      A: "Quick Action",
      B: "Workflow Rule",
      C: "Flow Builder",
      D: "Outbound Message"
    },
    correct: "C",
    explanation_en: `
A Flow Builder record-triggered flow can run when an Opportunity’s Stage changes to Closed Won, query all other open Opportunities for that Account, and update their Stage to Closed Lost in bulk.

References:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled_start.htm&type=5
    `,
    explanation_pt: `
Um fluxo acionado por registro no Flow Builder pode ser executado quando o Stage da Oportunidade muda para Closed Won, buscar todas as outras Oportunidades abertas da mesma Conta e atualizar seus Stages para Closed Lost em massa.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled_start.htm&type=5
    `
  },
  {
    number: 46,
    question: "Cloud Kicks wants reports to categorize accounts into small, medium, and large based on the dollar value found in the Contract Value field. What feature should an administrator use to meet this request?",
    options: {
      A: "Detail Column",
      B: "Bucket Column",
      C: "Group Rows",
      D: "Filter Logic"
    },
    correct: "B",
    explanation_en: `
A Bucket Column in a report lets you define ranges (e.g., small, medium, large) on a numeric field without creating additional formula or custom fields.

Reference: https://help.salesforce.com/s/articleView?id=sf.reports_bucketing_overview.htm&type=5
    `,
    explanation_pt: `
Uma Bucket Column em relatórios permite definir intervalos (por exemplo, small, medium, large) em um campo numérico sem criar fórmulas ou campos personalizados adicionais.

Referência: https://help.salesforce.com/s/articleView?id=sf.reports_bucketing_overview.htm&type=5
    `
  },
  {
    number: 47,
    question: "Cloud Kicks (CK) is partnering with a used shoe store and second-hand bicycle emporium. CK has an automated business process it wants to run once a week to count the number of open cases related to an account. How should the administrator recommend automating this business process?",
    options: {
      A: "Create a workflow rule with an outbound message",
      B: "Set up a scheduled process in Process Builder",
      C: "Configure a scheduled flow in Flow Builder",
      D: "Use a process to update the account when it is edited"
    },
    correct: "C",
    explanation_en: `
Scheduled Flows in Flow Builder can run at defined intervals (e.g., weekly) to query and perform actions—such as counting open Cases per Account—automatically.

References:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled_start.htm&type=5
    `,
    explanation_pt: `
Scheduled Flows no Flow Builder podem ser executados em intervalos definidos (por exemplo, semanalmente) para consultar e executar ações—como contar Cases abertos por Conta—automaticamente.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled_start.htm&type=5
    `
  },
  {
    number: 48,
    question: "An administrator has assigned a permission set group with the Two-Factor Authentication for User Interface Logins and the Two-Factor Authentication for API Logins permissions to a group of users. Which two prompts will happen when one of the users attempts to log in to Data Loader? (Choose 2)",
    options: {
      A: "Users need to connect an authenticator app to their Salesforce account",
      B: "Users need to get a security token from a trusted network using Reset My Security Token",
      C: "Users need to download and install an authenticator app on their mobile device",
      D: "Users need to enter a verification code from email or SMS, whichever has higher priority"
    },
    correct: "A, D",
    explanation_en: `
With 2FA on UI and API:  
- Users must register an authenticator app or other 2FA method (A).  
- At login, they’ll be prompted for a verification code delivered via their chosen method (email/SMS) (D).

References:  
https://help.salesforce.com/s/articleView?id=sf.identity_2fa_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.identity_2fa_login_flow.htm&type=5
    `,
    explanation_pt: `
Com 2FA ativado para UI e API:  
- Usuários devem registrar um aplicativo autenticador ou outro método 2FA (A).  
- No login, serão solicitados a inserir um código de verificação enviado pelo método configurado (email/SMS) (D).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.identity_2fa_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.identity_2fa_login_flow.htm&type=5
    `
  },
  {
    number: 49,
    question: "Cloud Kicks need to be able to show different picklist values for sales and marketing users. Which two options will meet this requirement? (Choose 2)",
    options: {
      A: "One page layout, two record types, one picklist",
      B: "Two page layouts, one record type, two picklists",
      C: "Two permission sets, one record type, one picklist",
      D: "One record type, two profiles, one picklist"
    },
    correct: "A, D",
    explanation_en: `
To serve different picklist values by user group:  
- Use one picklist field with two Record Types and assign one layout per record type (A).  
- Or use one picklist and one record type, but assign different profiles and page layouts to filter values (D).

References:  
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_profile_picklists.htm&type=5
    `,
    explanation_pt: `
Para exibir diferentes valores de picklist por grupo de usuários:  
- Use um campo de picklist com dois Record Types e atribua um layout por record type (A).  
- Ou use um picklist e um record type, mas atribua perfis e page layouts distintos para filtrar valores (D).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_profile_picklists.htm&type=5
    `
  },
  {
    number: 50,
    question: "At Universal Containers, users would like to be able to share Salesforce records with other members of their team, while collaborating around general topics as well. Which are two considerations for enabling this functionality? (Choose 2)",
    options: {
      A: "Collaboration groups are created automatically for every department",
      B: "Object layouts should be configured to include the Groups related list",
      C: "The Add Record action must be configured in the group publisher",
      D: "An administrator needs to create a group to enable record sharing"
    },
    correct: "B, C",
    explanation_en: `
To share records in Chatter groups and collaborate:  
- Add the “Groups” related list to page layouts so users can see and add records to groups (B).  
- Ensure the “Add Record” publisher action is enabled in the group publisher layout (C).

References:  
https://help.salesforce.com/s/articleView?id=sf.collab_groups_records.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.collab_groups_record_actions.htm&type=5
    `,
    explanation_pt: `
Para compartilhar registros em grupos do Chatter e colaborar:  
- Adicione a lista relacionada “Groups” aos layouts de página para que usuários vejam e adicionem registros a grupos (B).  
- Garanta que a ação “Add Record” esteja configurada no publisher layout do grupo (C).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.collab_groups_records.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.collab_groups_record_actions.htm&type=5
    `
  },
    {
    number: 51,
    question: "Executives at Cloud Kicks have reported that their dashboards are showing inaccurate data. The administrator has discovered users have been changing the source reports. Which two actions should the administrator take to preserve the integrity of the source reports? (Choose 2)",
    options: {
      A: "Create a new report folder with viewer access",
      B: "Move the dashboard to the user’s private folder",
      C: "Move the dashboard reports to the view-only folder",
      D: "Change the dashboard to be a dynamic dashboard"
    },
    correct: "A, C",
    explanation_en: `
Create a dedicated folder for source reports with Viewer-only access so users cannot edit them (A). Then move the reports used by dashboards into that view-only folder to lock down modifications (C).

References:
https://help.salesforce.com/s/articleView?id=sf.reports_folders.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.reports_dashboard_folder_access.htm&type=5
    `,
    explanation_pt: `
Crie uma pasta dedicada para relatórios-fonte com acesso somente Leitura para que usuários não possam editá-los (A). Em seguida, mova os relatórios usados pelos dashboards para essa pasta de visualização apenas (C).

Referências:
https://help.salesforce.com/s/articleView?id=sf.reports_folders.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.reports_dashboard_folder_access.htm&type=5
    `
  },
  {
    number: 52,
    question: "Cloud Kicks has decided to delete a custom field. What will happen to the data in the field when it is deleted?",
    options: {
      A: "The data in the field is stored for 20 days",
      B: "The data is permanently deleted",
      C: "The data associated with the field is required",
      D: "The data is restorable from the recycle bin"
    },
    correct: "A",
    explanation_en: `
When you delete a custom field, Salesforce retains its data for 20 days in case you restore the field. After 20 days, the data is permanently removed.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_del_field.htm&type=5
    `,
    explanation_pt: `
Ao excluir um campo personalizado, o Salesforce mantém os dados por 20 dias para possível restauração. Após 20 dias, os dados são permanentemente removidos.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_del_field.htm&type=5
    `
  },
  {
    number: 53,
    question: "AW Computing has six sales teams in a region. These teams always consist of the same account manager, engineer, and assistant. What should the administrator configure to make it easier for teams to collaborate with the same customer?",
    options: {
      A: "Enable and configure standard opportunity teams with splits",
      B: "Enable account teams and show the users how to set up a default account team",
      C: "Create a queue for each team and assign account ownership to the queue",
      D: "Propose the users manually share all their accounts with their teammates"
    },
    correct: "B",
    explanation_en: `
Account Teams let you define roles (e.g., manager, engineer, assistant) and set default teams that auto-attach to accounts. Enable Account Teams and teach users to configure their default Account Team.

References:
https://help.salesforce.com/s/articleView?id=sf.accountteam.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.accountteam_default.htm&type=5
    `,
    explanation_pt: `
Account Teams permitem definir funções (por exemplo, manager, engineer, assistant) e configurar equipes padrão que se anexam automaticamente às contas. Habilite Account Teams e ensine os usuários a configurar sua Account Team padrão.

Referências:
https://help.salesforce.com/s/articleView?id=sf.accountteam.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.accountteam_default.htm&type=5
    `
  },
  {
    number: 54,
    question: "A user at Cloud Kicks is having issues logging in to Salesforce. The user asks the administrator to reset their password. Which two options should the administrator consider when resetting the user’s password? (Choose 2)",
    options: {
      A: "Resetting the password will change the user’s password policy",
      B: "Single sign-on users can reset their own passwords using the forgot password link",
      C: "Resetting a locked-out user’s password automatically unlocks the user’s account",
      D: "After resetting a password, the user may be required to activate their device to successfully log in to Salesforce"
    },
    correct: "C, D",
    explanation_en: `
Resetting a locked-out user’s password will also unlock their account (C). After a password reset, users may need to complete device verification (email/SMS code) before login (D).

References:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_loginhours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.identity_verification.htm&type=5
    `,
    explanation_pt: `
Redefinir a senha de um usuário bloqueado também desbloqueia sua conta (C). Após redefinir a senha, o usuário pode precisar validar o dispositivo (código por email/SMS) antes de efetuar login (D).

Referências:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_loginhours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.identity_verification.htm&type=5
    `
  },
  {
    number: 55,
    question: "When users log in to Salesforce via the user interface, which two settings does the system check for authentication? (Choose 2)",
    options: {
      A: "The user’s Two-Factor Authentication for API Logins permission",
      B: "The role IP address restrictions",
      C: "The user’s profile login hours restrictions",
      D: "The user’s Two-Factor Authentication for User Interface Logins permission"
    },
    correct: "C, D",
    explanation_en: `
For UI logins Salesforce enforces:  
- Profile login hours—users can only log in during allowed times (C).  
- 2FA UI requirement if enabled via permission sets or profiles (D).

References:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_loginhours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.security_2fa_perm_ui_logins.htm&type=5
    `,
    explanation_pt: `
Para logins pela interface, o Salesforce verifica:  
- Horário de login definido no perfil—usuários só podem acessar no período permitido (C).  
- Permissão de 2FA para UI se configurada por perfis ou permission sets (D).

Referências:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_loginhours.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.security_2fa_perm_ui_logins.htm&type=5
    `
  },
  {
    number: 56,
    question: "Which two solutions could an administrator find on the AppExchange to enhance their organization? (Choose 2)",
    options: {
      A: "Communities",
      B: "Consultants",
      C: "Components",
      D: "Customers"
    },
    correct: "B, C",
    explanation_en: `
On AppExchange you can discover:  
- Consultants—certified partners offering services (B).  
- Components—prebuilt Lightning components or packages (C).  

References:
https://appexchange.salesforce.com/consultants
https://appexchange.salesforce.com/components
    `,
    explanation_pt: `
No AppExchange você encontra:  
- Consultants—parceiros certificados que oferecem serviços (B).  
- Components—componentes Lightning pré-construídos ou pacotes (C).  

Referências:
https://appexchange.salesforce.com/consultants
https://appexchange.salesforce.com/components
    `
  },
  {
    number: 57,
    question: "Northern Trail Outfitters has requested that when the Referral Date field is updated on the custom object Referral Source, the parent object Referral also needs to be updated. Which automation solution should an administrator use to meet this request?",
    options: {
      A: "Lightning Web Component",
      B: "Approval Process",
      C: "Workflow Field Update",
      D: "Process Builder"
    },
    correct: "D",
    explanation_en: `
Process Builder can trigger when Referral Source.Referral_Date__c changes and then update the related parent Referral record’s date field accordingly.

Reference: https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `,
    explanation_pt: `
Process Builder pode disparar quando ReferralSource.Referral_Date__c for alterado e atualizar o registro pai Referral com a nova data.

Referência: https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `
  },
  {
    number: 58,
    question: "Sales and Customer Care at Ursa Major Solar need to see different fields on the Case related list from the Account record. Sales users want to see Case created date and status while Customer Care would like to see owner, status, and contact. What should the administrator use to achieve this?",
    options: {
      A: "Related Lookup Filters",
      B: "Compact Layout Editor",
      C: "Page Layout Editor",
      D: "Search Layout Editor"
    },
    correct: "C",
    explanation_en: `
Page Layout Editor lets you customize the columns shown in related lists per page layout. Create separate layouts for Sales and Customer Care and configure the Case related list columns accordingly.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_layoutrelatedlists.htm&type=5
    `,
    explanation_pt: `
Page Layout Editor permite personalizar as colunas exibidas em listas relacionadas por layout de página. Crie layouts separados para Sales e Customer Care e configure as colunas da lista de Case.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_layoutrelatedlists.htm&type=5
    `
  },
  {
    number: 59,
    question: "The support manager at Cloud Kicks wants to respond to customers as quickly as possible. They have requested that the response include the top five troubleshooting tips that could help solve the customer’s issue. What should the administrator suggest to meet this requirement?",
    options: {
      A: "Auto-Response Rules",
      B: "Email Alerts",
      C: "Knowledge Articles",
      D: "Assignment Rules"
    },
    correct: "C",
    explanation_en: `
Knowledge Articles let you author and maintain troubleshooting tips. You can attach or reference the top five tips directly in email responses or case comments.

Reference: https://help.salesforce.com/s/articleView?id=sf.knowledge_article_types.htm&type=5
    `,
    explanation_pt: `
Knowledge Articles permitem criar e manter dicas de solução de problemas. Você pode anexar ou referenciar as cinco principais dicas diretamente nas respostas por e-mail ou comentários de caso.

Referência: https://help.salesforce.com/s/articleView?id=sf.knowledge_article_types.htm&type=5
    `
  },
  {
    number: 60,
    question: "Northern Trail Outfitters is using one profile for all of its marketing users, providing read-only access to the Campaign object. A few marketing users now require comprehensive edit access on Campaigns. How should an administrator fulfil this request?",
    options: {
      A: "Permission Sets",
      B: "Organization-wide defaults",
      C: "Marketing user checkbox",
      D: "Field-level security"
    },
    correct: "A",
    explanation_en: `
Permission Sets allow you to grant edit access on Campaigns to selected users without changing their profile. Create a permission set with Campaign Edit permission and assign it to those users.

Reference: https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5
    `,
    explanation_pt: `
Permission Sets permitem conceder acesso de edição em Campaigns a usuários específicos sem alterar o perfil. Crie um permission set com permissão de edição e atribua aos usuários.

Referência: https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5
    `
  }
];

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
  const isMultiple  = correctList.length > 1;
  const maxSelect   = correctList.length;

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
    li.classList.remove('correct','wrong');
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
  quizStarted = true;
  currentQuestion = 0;
  score = 0;
  totalAnswered = 0;
  const bar = document.getElementById('progressBar');
    bar.style.display = 'block';
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
  const isMultiple  = correctList.length > 1;
  const inputType   = isMultiple ? 'checkbox' : 'radio';
  const maxSelect   = correctList.length;

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
  const isMultiple  = correctList.length > 1;

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

  // 4) Marca cada <li> com .correct / .wrong
  /* const lis = document.querySelectorAll('#evalQuizContent .options li');
  lis.forEach(li => {
    const key = li.querySelector('input').value;
    li.classList.remove('selected','correct','wrong');
    // sempre pinta de verde as corretas
    if (correctList.includes(key)) {
      li.classList.add('correct');
    }
    // em single-choice, pinta de vermelho a escolha errada
    else if (!isMultiple && selectedValues.includes(key)) {
      li.classList.add('wrong');
    }
    // desabilita input
    li.querySelector('input').disabled = true;
  }); */

    // Desabilita todos os inputs sem mostrar feedback visual
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
  // 0) Remove tooltip anterior
  const old = document.querySelector('.error-tooltip');
  if (old) old.remove();

  // 1) Incrementa tentativas e escolhe mensagem
  q.attemptCount = (q.attemptCount || 0) + 1;
  const idx     = Math.min(q.attemptCount - 1, errorMessages.length - 1);
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
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
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


function showSimpleToast(message, type = 'default', duration = 3000) {
  // remove toast anterior do mesmo tipo
  const prev = document.querySelector(`.toast-${type}`);
  if (prev) prev.remove();

  // container já existente
  const container = document.getElementById('toastContainer');

  // monta o toast
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);

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
  showSimpleToast("Placar apagado com sucesso!!!", 'success', 2500);
}