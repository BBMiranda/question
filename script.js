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
  },
  {
    number: 61,
    question: "The administrator for Cloud Kicks has created a screen flow to help service reps ask the same set of questions when customers call in with issues. This screen should be visible from cases. How should the screen flow be distributed?",
    options: {
      A: "Page Layout",
      B: "Component Filter",
      C: "Lightning page",
      D: "Home page"
    },
    correct: "C",
    explanation_en: `
To expose a Screen Flow on the Case record page, add it as a Flow component on a Lightning Record Page. Use Lightning App Builder to drag the Flow component onto the Case Lightning page and select the screen flow.

References:
https://help.salesforce.com/s/articleView?id=sf.flow_distribute_lightning_page.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `,
    explanation_pt: `
Para exibir um Screen Flow na página de registro de Case, adicione-o como componente de Fluxo em uma Lightning Record Page. Use o Lightning App Builder para arrastar o componente de Fluxo para a página de Case e selecionar o fluxo de tela.

Referências:
https://help.salesforce.com/s/articleView?id=sf.flow_distribute_lightning_page.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `
  },
    {
    number: 62,
    question: "Northern Trail Outfitters has a custom quick action on Account that creates a new Case. How should an administrator make the quick action available on the Salesforce mobile app?",
    options: {
      A: "Create a custom Lightning App with the action",
      B: "Modify compact Case page layout to include the action",
      C: "Include the action in the Salesforce Mobile Navigation menu",
      D: "Add the Salesforce Mobile and Lightning Experience action to the page layout"
    },
    correct: "D",
    explanation_en: `
To expose a quick action in the Salesforce mobile app, add it to the “Salesforce Mobile and Lightning Experience Actions” section of the page layout. Use the Page Layout Editor to drag the quick action into that section.

References:
https://help.salesforce.com/s/articleView?id=sf.actions_in_lex.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_page_layouts.htm&type=5
    `,
    explanation_pt: `
Para disponibilizar uma ação rápida no aplicativo móvel, adicione-a na seção “Salesforce Mobile and Lightning Experience Actions” do layout de página. Use o Page Layout Editor para arrastar a ação rápida até essa seção.

Referências:
https://help.salesforce.com/s/articleView?id=sf.actions_in_lex.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_page_layouts.htm&type=5
    `
  },
  {
    number: 63,
    question: "The administrator at DreamHouse Realty added an email quick action to the Case page layout and is unable to see the action on the case feed. Which feature must be enabled to ensure the quick action will be displayed as expected?",
    options: {
      A: "Email Notifications",
      B: "Email-to-Case",
      C: "Email Alerts",
      D: "Email Templates"
    },
    correct: "B",
    explanation_en: `
Email-to-Case must be enabled for email quick actions on cases to function properly. It allows cases to be created and managed via email interactions.

Reference: https://help.salesforce.com/s/articleView?id=sf.customizesupport_email_to_case.htm&type=5
    `,
    explanation_pt: `
É necessário habilitar o Email-to-Case para que ações rápidas de email em casos sejam exibidas e funcionem corretamente. Isso permite criar e gerenciar casos via email.

Referência: https://help.salesforce.com/s/articleView?id=sf.customizesupport_email_to_case.htm&type=5
    `
  },
  {
    number: 64,
    question: "An administrator has reviewed an upcoming critical update. How should the administrator proceed with activation of the critical update?",
    options: {
      A: "Activate the critical update in a sandbox",
      B: "Allow the critical update to auto-activate",
      C: "Activate the critical update in production",
      D: "Allow the critical update to auto-activate in a sandbox"
    },
    correct: "A",
    explanation_en: `
Best practice is to first activate and test critical updates in a sandbox to verify their impact on customizations before enabling them in production.

Reference: https://help.salesforce.com/s/articleView?id=sf.admin_critical_updates.htm&type=5
    `,
    explanation_pt: `
A prática recomendada é ativar e testar atualizações críticas primeiro em um sandbox para verificar seu impacto nas customizações antes de habilitá-las em produção.

Referência: https://help.salesforce.com/s/articleView?id=sf.admin_critical_updates.htm&type=5
    `
  },
  {
    number: 65,
    question: "DreamHouse Realty regularly processes customer requests for warranty work and would like to offer customers a self-serve option to generate cases. Which two solutions should an administrator use to meet this request? (Choose 2)",
    options: {
      A: "Web-to-Case",
      B: "Case Escalation",
      C: "Case Queues",
      D: "Email-to-Case"
    },
    correct: "A, D",
    explanation_en: `
Web-to-Case lets customers submit cases via a web form (A). Email-to-Case converts inbound emails into cases (D). Both provide self-serve case creation.

References:
https://help.salesforce.com/s/articleView?id=sf.customizesupport_web_to_case.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customizesupport_email_to_case.htm&type=5
    `,
    explanation_pt: `
Web-to-Case permite que clientes enviem casos via formulário na web (A). Email-to-Case converte emails recebidos em casos (D). Ambas fornecem criação de casos self-service.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customizesupport_web_to_case.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customizesupport_email_to_case.htm&type=5
    `
  },
  {
    number: 66,
    question: "An administrator is on a tight deadline to create dashboards for the sales and marketing teams at AW Computing. What should the administrator do to meet the deadline without increasing the budget?",
    options: {
      A: "Train someone on the sales and marketing teams to build dashboards",
      B: "Check the AppExchange for prebuilt solutions that can be easily customized",
      C: "Hire a Consultant to build the custom dashboards",
      D: "Build the dashboards manually to meet the deadline"
    },
    correct: "B",
    explanation_en: `
AppExchange offers prebuilt dashboard solutions and components that can be installed and quickly tailored, saving time and budget.

Reference: https://appexchange.salesforce.com/
    `,
    explanation_pt: `
O AppExchange oferece soluções de dashboard pré-construídas e componentes que podem ser instalados e rapidamente adaptados, economizando tempo e orçamento.

Referência: https://appexchange.salesforce.com/
    `
  },
  {
    number: 67,
    question: "DreamHouse Realty wants to offer a form on its Experience Cloud site where inspectors will submit findings from a property inspection. Which feature should an administrator place on the page to fulfill this requirement?",
    options: {
      A: "Related List",
      B: "Autolaunched Flow",
      C: "Record Detail",
      D: "Screen Flow"
    },
    correct: "D",
    explanation_en: `
Screen Flows can be embedded in Experience Cloud pages to present interactive forms for user input and then handle record creation or updates based on that input.

References:
https://trailhead.salesforce.com/content/learn/modules/screen-flows/get-started-with-screen-flows  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `,
    explanation_pt: `
Screen Flows podem ser incorporados em páginas Experience Cloud para exibir formulários interativos para entrada de dados e, em seguida, criar ou atualizar registros com base nessas entradas.

Referências:
https://trailhead.salesforce.com/content/learn/modules/screen-flows/get-started-with-screen-flows  
https://help.salesforce.com/s/articleView?id=sf.flow_builder_overview.htm&type=5
    `
  },
  {
    number: 68,
    question: "The administrator at Ursa Major Solar needs to make sure the unassigned cases from VIP customers get transferred to the appropriate service representative within 5 hours. VIP Customers have access to support 24 hours a day. How should this be configured?",
    options: {
      A: "Assignment Rules",
      B: "Business Hours",
      C: "Case Queues",
      D: "Escalation Rules"
    },
    correct: "D",
    explanation_en: `
Case Escalation Rules allow you to define time-based criteria (e.g., 5 hours) to reassign or notify users when cases meet conditions and exceed time thresholds.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_escalation.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules permitem definir critérios baseados em tempo (por exemplo, 5 horas) para reatribuir ou notificar usuários quando casos atendem a condições e excedem períodos de tempo.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_escalation.htm&type=5
    `
  },
  {
    number: 69,
    question: "An administrator at Ursa Major Solar needs to send information to an external accounting system. What workflow action should the administrator use to accomplish this?",
    options: {
      A: "Assign Task",
      B: "Outbound Message",
      C: "Create Record",
      D: "Custom Notification"
    },
    correct: "B",
    explanation_en: `
Outbound Messages in Workflow Rules or Approval Processes send SOAP messages containing field data to a specified external endpoint, ideal for integrations.

References:
https://help.salesforce.com/s/articleView?id=sf.workflow_om_considerations.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_om_define.htm&type=5
    `,
    explanation_pt: `
Outbound Messages em Workflow Rules ou Approval Processes enviam mensagens SOAP com dados de campos para um endpoint externo especificado, ideal para integrações.

Referências:
https://help.salesforce.com/s/articleView?id=sf.workflow_om_considerations.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_om_define.htm&type=5
    `
  },
  {
    number: 70,
    question: "Northern Trail Outfitters has the Case object set to Private. The support manager raised a concern that reps have a broader view of data than expected and can see all cases on their group dashboards. What could be causing reps to have inappropriate access to data on dashboards?",
    options: {
      A: "Dashboard Filters",
      B: "Dashboard Subscriptions",
      C: "Dynamic Dashboards",
      D: "Public Dashboards"
    },
    correct: "C",
    explanation_en: `
Dynamic Dashboards run as the viewing user or the dashboard running user. If set to run as “Run as logged-in user,” users may see data beyond their record visibility.

Reference: https://help.salesforce.com/s/articleView?id=sf.dashboards_dynamic.htm&type=5
    `,
    explanation_pt: `
Dynamic Dashboards são executados no contexto do usuário em execução ou logado. Se configurados para “Run as logged-in user,” podem exibir dados além do permitido pela visibilidade de registros.

Referência: https://help.salesforce.com/s/articleView?id=sf.dashboards_dynamic.htm&type=5
    `
  },
  {
    number: 71,
    question: "An administrator wants to trigger a follow-up task for the opportunity owner when they close an opportunity as won and another task after 60 days to check in with the customer. Which two automation tools should the administrator use? (Choose 2)",
    options: {
      A: "Process Builder",
      B: "Workflow Rule",
      C: "Field Update",
      D: "Outbound Message"
    },
    correct: "A, C",
    explanation_en: `
Use Process Builder to detect Stage = Closed Won and immediately create the first follow-up task (A). Use a Field Update to set a date field that can trigger a time-dependent Workflow Rule to create the second task after 60 days (C).

References:
https://help.salesforce.com/s/articleView?id=sf.process_which_tool.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_time_action_considerations.htm&type=5
    `,
    explanation_pt: `
Use Process Builder para detectar Stage = Closed Won e criar imediatamente a primeira tarefa de follow-up (A). Use um Field Update para preencher um campo de data que disparará uma Workflow Rule dependente de tempo para criar a segunda tarefa após 60 dias (C).

Referências:
https://help.salesforce.com/s/articleView?id=sf.process_which_tool.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_time_action_considerations.htm&type=5
    `
  },
  {
    number: 72,
    question: "An administrator creates a custom text area field on the Account object and adds it to the service team's page layout. The service team manager wants it to appear in the Highlights Panel so reps can quickly find it on the Account Page. How should the administrator accomplish this?",
    options: {
      A: "Create a new page layout and a new section titled Highlights Panel",
      B: "In the Account Object Manager, create a custom Compact Layout",
      C: "From the page layout editor, drag the field to the Highlights Panel",
      D: "Make the field required and move it to the top of the page"
    },
    correct: "B",
    explanation_en: `
Compact Layouts determine which fields display in the Highlights Panel. Create or edit a Compact Layout in Account Object Manager and add the custom text area field.

Reference: https://help.salesforce.com/s/articleView?id=sf.compact_layouts_create.htm&type=5
    `,
    explanation_pt: `
Compact Layouts definem quais campos aparecem no Highlights Panel. Crie ou edite um Compact Layout no Account Object Manager e adicione o campo de área de texto.

Referência: https://help.salesforce.com/s/articleView?id=sf.compact_layouts_create.htm&type=5
    `
  },
  {
    number: 73,
    question: "A team of support users at Cloud Kicks is helping inside sales reps make follow-up calls to prospects that filled out an interest form online. The team currently does not have access to the Lead object. How should an administrator provide proper access?",
    options: {
      A: "Create a new profile",
      B: "Configure permission sets",
      C: "Assign a new role",
      D: "Set up manual sharing"
    },
    correct: "B",
    explanation_en: `
Permission Sets allow granting Lead object and field permissions to specific users without changing their profile.

Reference: https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5
    `,
    explanation_pt: `
Permission Sets permitem conceder permissões de objeto e campo Lead a usuários específicos sem alterar o perfil.

Referência: https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5
    `
  },
  {
    number: 74,
    question: "An administrator supporting a global team of Salesforce users has been asked to configure company settings. Choose 2 options",
    options: {
      A: "Currency Locale",
      B: "Default Language",
      C: "Password Policy",
      D: "Login Hours"
    },
    correct: "A, B",
    explanation_en: `
Company Settings include Currency Locale (controls currency formatting/display) (A) and Default Language (controls UI language) (B). Password Policy and Login Hours are profile or org-wide security settings.

References:
https://help.salesforce.com/s/articleView?id=sf.admin_supported_currencies.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_supported_languages.htm&type=5
    `,
    explanation_pt: `
Company Settings incluem Currency Locale (formatação/exibição de moeda) (A) e Default Language (idioma da interface) (B). Password Policy e Login Hours são configurações de segurança de perfil ou org-wide.

Referências:
https://help.salesforce.com/s/articleView?id=sf.admin_supported_currencies.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_supported_languages.htm&type=5
    `
  },
  {
    number: 75,
    question: "Which item is available in a Lightning App where visibility is limited to the Salesforce Mobile App?",
    options: {
      A: "Today",
      B: "Favorites",
      C: "Utility Bar",
      D: "Home Page"
    },
    correct: "C",
    explanation_en: `
The Utility Bar is supported in Lightning Apps configured only for Salesforce Mobile. It provides persistent tools accessible from any mobile page.

Reference: https://help.salesforce.com/s/articleView?id=sf.app_builder_utility_bar.htm&type=5
    `,
    explanation_pt: `
O Utility Bar é suportado em Lightning Apps configurados apenas para Salesforce Mobile. Ele fornece ferramentas persistentes acessíveis de qualquer página móvel.

Referência: https://help.salesforce.com/s/articleView?id=sf.app_builder_utility_bar.htm&type=5
    `
  },
    {
    number: 76,
    question: "Ursa Major Solar wants to know which of its marketing efforts are helping the team win Opportunities. What should an administrator configure to provide these insights?",
    options: {
      A: "Campaign Hierarchy",
      B: "Campaign Influence",
      C: "Map Custom Lead Fields",
      D: "List Email Activities"
    },
    correct: "B",
    explanation_en: `
Campaign Influence tracks which campaigns contributed to won Opportunities and lets you apply attribution models to measure ROI of marketing efforts.

Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_influence.htm&type=5
    `,
    explanation_pt: `
Campaign Influence rastreia quais campanhas contribuíram para Oportunidades fechadas como ganhas e permite aplicar modelos de atribuição para medir o ROI dos esforços de marketing.

Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_influence.htm&type=5
    `
  },
  {
    number: 77,
    question: "Ursa Major Solar uses two different page layouts for Account records. One layout for customer accounts and another for partner accounts. What should the administrator configure to meet this requirement?",
    options: {
      A: "Use a public group and sharing rule to share customer accounts",
      B: "Add partner team members to the default Account Team",
      C: "Grant CRUD access to customer accounts on the partner profile",
      D: "Create one record type for customer accounts and one for partner accounts"
    },
    correct: "D",
    explanation_en: `
Record Types let you assign different page layouts (and picklist values) per type. Create one record type for customer accounts and one for partner accounts, then assign the proper layout.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Record Types permitem atribuir diferentes layouts de página (e valores de picklist) por tipo. Crie um record type para customer accounts e outro para partner accounts, e atribua o layout correto.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 78,
    question: "Users at Cloud Kicks want to see information more useful for their role on the Case page. How should an administrator make the pages more dynamic and easier to use?",
    options: {
      A: "Add Component Visibility filters to the components",
      B: "Remove fields from the record details component",
      C: "Delete the extra component from the page",
      D: "Include more tab components with filters"
    },
    correct: "A",
    explanation_en: `
Component Visibility filters in Lightning App Builder let you show or hide components based on user profile, record type, or field values, making pages dynamic and role-specific.

Reference: https://help.salesforce.com/s/articleView?id=sf.app_builder_component_visibility.htm&type=5
    `,
    explanation_pt: `
Filtros de Component Visibility no Lightning App Builder permitem mostrar ou ocultar componentes com base em perfil de usuário, tipo de registro ou valores de campos, tornando as páginas dinâmicas e específicas por função.

Referência: https://help.salesforce.com/s/articleView?id=sf.app_builder_component_visibility.htm&type=5
    `
  },
  {
    number: 79,
    question: "Universal Containers customers have provided feedback that their support cases are not being responded to quickly enough. UC wants to send all unassigned cases that have been open for more than 2 hours to an urgent case queue and alert the support manager. Which feature should an administrator configure to meet this requirement?",
    options: {
      A: "Case Scheduled Reports",
      B: "Case Dashboard Refreshes",
      C: "Case Escalation Rules",
      D: "Case Assignment Rules"
    },
    correct: "C",
    explanation_en: `
Case Escalation Rules let you define time-based criteria (e.g., >2 hours unassigned) to automatically reassign cases to a queue and send notification emails.

Reference: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules permitem definir critérios baseados em tempo (por exemplo, >2 horas sem atribuição) para reatribuir casos a uma fila e enviar notificações por e-mail.

Referência: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `
  },
  {
    number: 80,
    question: "Cloud Kicks has created a screen flow for their sales team to use when adding new leads. Which two things should the administrator do to display the screen flow? (Choose 2)",
    options: {
      A: "Create a custom Tab and add the screen flow to it",
      B: "Use the Flow component and add the screen flow to the record page",
      C: "Add the flow to the utility bar of the console",
      D: "Install an app from the AppExchange"
    },
    correct: "A, B",
    explanation_en: `
A: Create a Screen Flow Tab to surface the flow directly.  
B: Use the Flow standard Lightning component in App Builder to embed the flow on the lead record page.

    `,
    explanation_pt: `
A: Crie uma aba de fluxo para exibir o Screen Flow diretamente.  
B: Use o componente de Fluxo no Lightning App Builder para incorporar o fluxo na página de registro de Lead.

    `
  },
  {
    number: 81,
    question: "Universal Containers has two sales teams (A and B) under the same Manager role. How should the administrator share records owned by Sales team A with Sales team B?",
    options: {
      A: "Hierarchical sharing",
      B: "Manual sharing",
      C: "Criteria-based sharing",
      D: "Owner-based sharing"
    },
    correct: "B",
    explanation_en: `
Manual Sharing lets record owners (or admins) share individual records with specific users or groups—including Sales team B members.

Reference: https://help.salesforce.com/s/articleView?id=sf.sharing_overview.htm&type=5
    `,
    explanation_pt: `
Manual Sharing permite que proprietários de registros (ou administradores) compartilhem registros individuais com usuários ou grupos específicos—incluindo membros da equipe de vendas B.

Referência: https://help.salesforce.com/s/articleView?id=sf.sharing_overview.htm&type=5
    `
  },
  {
    number: 82,
    question: "An administrator at Cloud Kicks needs to export a file of Closed Won Opportunities from the last 90 days including Name, ID, Close Date, and Amount. How should the administrator export this file?",
    options: {
      A: "Data Export Wizard",
      B: "Data Import Wizard",
      C: "Data Export Wizard",
      D: "Data Loader"
    },
    correct: "A",
    explanation_en: `
Use the Data Export Wizard in Setup to schedule or run an ad-hoc export of selected objects (Opportunities) and fields to CSV.

Reference: https://help.salesforce.com/s/articleView?id=sf.data_export.htm&type=5
    `,
    explanation_pt: `
Use o Data Export Wizard em Setup para agendar ou executar uma exportação ad-hoc de objetos (Oportunidades) e campos selecionados para CSV.

Referência: https://help.salesforce.com/s/articleView?id=sf.data_export.htm&type=5
    `
  },
  {
    number: 83,
    question: "Northern Trail Outfitters wants emails received from customers to generate cases automatically to the correct queue. How should the administrator ensure the emails are sent to the correct queue?",
    options: {
      A: "Utilize a flow to assign the case to the queue",
      B: "Use a custom Email Service to set the owner upon creation",
      C: "Create an Escalation Rule to send cases to the queue",
      D: "Configure Email-to-Case so emails are delivered to the correct queue"
    },
    correct: "D",
    explanation_en: `
Email-to-Case lets you define routing addresses that automatically create cases from incoming emails and assign them to specified queues based on the email address used.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_email2case.htm&type=5
    `,
    explanation_pt: `
Email-to-Case permite definir endereços de roteamento que criam automaticamente casos a partir de emails recebidos e os atribuem a filas especificadas com base no endereço de email usado.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_email2case.htm&type=5
    `
  },
  {
    number: 84,
    question: "Sales reps at Cloud Kicks want to be notified when they have a high likelihood of winning an Opportunity over $1,000,000. Which feature meets this requirement?",
    options: {
      A: "Key Deals",
      B: "Big Deal Alerts",
      C: "Activity Timeline",
      D: "Performance Chart"
    },
    correct: "B",
    explanation_en: `
Big Deal Alerts notify users when an Opportunity’s Amount or Probability meets thresholds you define (e.g., > $1M).

Reference: https://help.salesforce.com/s/articleView?id=sf.forecasts3_big_deal_alerts.htm&type=5
    `,
    explanation_pt: `
Big Deal Alerts notificam usuários quando o Amount ou Probability de uma Oportunidade atinge limites definidos (por exemplo, > $1M).

Referência: https://help.salesforce.com/s/articleView?id=sf.forecasts3_big_deal_alerts.htm&type=5
    `
  },
  {
    number: 85,
    question: "Universal Containers wants stricter user passwords. Which two settings should an administrator configure? (Choose 2)",
    options: {
      A: "Password different than username",
      B: "Prevent common words",
      C: "Minimum password length",
      D: "Password complexity requirement"
    },
    correct: "C, D",
    explanation_en: `
Configure minimum password length (C) and enable complexity requirements (mixed-case, numbers, special characters) (D) in Password Policies.

Reference: https://help.salesforce.com/s/articleView?id=sf.admin_password_policies.htm&type=5
    `,
    explanation_pt: `
Configure o comprimento mínimo da senha (C) e habilite requisitos de complexidade (letras maiúsculas/minúsculas, números, caracteres especiais) (D) em Password Policies.

Referência: https://help.salesforce.com/s/articleView?id=sf.admin_password_policies.htm&type=5
    `
  },
  {
    number: 86,
    question: "Northern Trail Outfitters wants to know the average stage duration for all closed Opportunities. How should an administrator support this request?",
    options: {
      A: "Use Process Builder to capture daily averages",
      B: "Add formula fields to track stage dates",
      C: "Run the Opportunity Stage Duration report",
      D: "Refresh weekly reporting snapshots"
    },
    correct: "C",
    explanation_en: `
The standard Opportunity Stage Duration report shows how long Opportunities spend in each stage. You can group and summarize to get average durations.

Reference: https://help.salesforce.com/s/articleView?id=sf.reports_opportunity_stage_duration_report.htm&type=5
    `,
    explanation_pt: `
O relatório padrão Opportunity Stage Duration mostra quanto tempo as Oportunidades passam em cada estágio. Você pode agrupar e resumir para obter durações médias.

Referência: https://help.salesforce.com/s/articleView?id=sf.reports_opportunity_stage_duration_report.htm&type=5
    `
  },
  {
    number: 87,
    question: "Ursa Major Solar has a Path on Case and wants to prevent users from moving the case back to a previous status. Which feature should an administrator use?",
    options: {
      A: "Validation Rules",
      B: "Global Value Picklists",
      C: "Predefined Field Values",
      D: "Dependent Picklists"
    },
    correct: "A",
    explanation_en: `
A Validation Rule comparing PRIORVALUE(Status) to Status can block transitions backward—preventing users from saving a case at an earlier status.

Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Validation Rule que compara PRIORVALUE(Status) com Status pode impedir transições para estágios anteriores—impedindo que usuários salvem o caso em um status anterior.

Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `
  },
  {
    number: 88,
    question: "Sales reps miss key fields when filling out Opportunities. Which three options should the administrator use to address this need? (Choose 3)",
    options: {
      A: "Enable Guided Selling",
      B: "Use Validation Rules",
      C: "Configure Opportunity Path",
      D: "Use Flow to mark fields required",
      E: "Mark fields required on the page layout"
    },
    correct: "A, B, E",
    explanation_en: `
A: Guided Selling adds prompts and guidance per Path stage.  
B: Validation Rules enforce entry of key fields before save.  
E: Marking fields required on the layout ensures users must populate them.

Referência:
https://help.salesforce.com/s/articleView?id=sf.path_guided_selling.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.fields_defining_field_properties.htm&type=5
    `,
    explanation_pt: `
A: Guided Selling adiciona orientações por estágio do Path.  
B: Validation Rules garantem entrada de campos-chave antes do salvamento.  
E: Campos obrigatórios no layout forçam os usuários a preenchê-los.

Referências:
https://help.salesforce.com/s/articleView?id=sf.path_guided_selling.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.fields_defining_field_properties.htm&type=5
    `
  },
  {
    number: 89,
    question: "Cloud Kicks new administrator needs to find what license types CK has purchased and how many are available. Where should the administrator go?",
    options: {
      A: "Search for license types in Setup",
      B: "User Licenses related list in Company Information",
      C: "User Management Settings in Setup",
      D: "Usage-Based Entitlements related list in Company Information"
    },
    correct: "B",
    explanation_en: `
The User Licenses related list on the Company Information page shows each license type purchased and available counts.

Reference: https://help.salesforce.com/s/articleView?id=sf.users_understanding_license_types.htm&type=5
    `,
    explanation_pt: `
A lista relacionada User Licenses na página Company Information mostra cada tipo de licença adquirido e a quantidade disponível.

Referência: https://help.salesforce.com/s/articleView?id=sf.users_understanding_license_types.htm&type=5
    `
  },
  {
    number: 90,
    question: "The marketing team wants to send personalized emails whenever a lead fills out the Web-to-Lead form, varying messages by Industry. What should an administrator configure?",
    options: {
      A: "Use a Validation Rule to trigger workflow email",
      B: "Configure an Auto-Response Rule to email the lead",
      C: "Add a public group and Process Builder to email the lead",
      D: "Create an Assignment Rule to email the lead"
    },
    correct: "B",
    explanation_en: `
Auto-Response Rules send customized email templates based on lead criteria (e.g., Industry) immediately after Web-to-Lead submissions.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_leadsautoresponse.htm&type=5
    `,
    explanation_pt: `
Auto-Response Rules enviam templates de e-mail personalizados com base em critérios do lead (por exemplo, Industry) imediatamente após envios via Web-to-Lead.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_leadsautoresponse.htm&type=5
    `
  },
  {
    number: 91,
    question: "Cloud Kicks has a customer success agent going on leave and needs to change ownership on multiple cases. Which two users can fulfill this request? (Choose 2)",
    options: {
      A: "A user with Read permission on Account",
      B: "A user with the manager role above the agent",
      C: "A user with the System Administrator profile",
      D: "A user with the Manage Cases permission"
    },
    correct: "B, C",
    explanation_en: `
B: Managers above the user in the role hierarchy can reassign cases owned by their subordinates.  
C: System Administrators can change ownership on any record.

References:
https://help.salesforce.com/s/articleView?id=sf.case_change_owner.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_userperms.htm&type=5
    `,
    explanation_pt: `
B: Gerentes acima do usuário na hierarquia de funções podem reatribuir casos de seus subordinados.  
C: Administradores do sistema podem alterar a propriedade de qualquer registro.

Referências:
https://help.salesforce.com/s/articleView?id=sf.case_change_owner.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_userperms.htm&type=5
    `
  },
  {
    number: 92,
    question: "The marketing director requests that the Budget field be populated before Lead Status can be set to Qualified. What tool should the administrator use?",
    options: {
      A: "Lead Conversion",
      B: "Require Field",
      C: "Workflow Rule",
      D: "Validation Rule"
    },
    correct: "D",
    explanation_en: `
A Validation Rule on Lead can enforce that if Status = 'Qualified', then Budget__c is not null, preventing save otherwise.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Validation Rule em Lead pode impor que, se Status = 'Qualified', então Budget__c não seja nulo, impedindo o salvamento caso contrário.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `
  },
  {
    number: 93,
    question: "A user reports that a newly created custom field on Account is not visible. Which two steps should the administrator take to troubleshoot? (Choose 2)",
    options: {
      A: "Ensure the page layout for the user’s profile includes the field",
      B: "Run the Setup Audit Trail",
      C: "Update the org-wide default for the object",
      D: "Review the field-level security for the field and user’s profile"
    },
    correct: "A, D",
    explanation_en: `
A: Confirm the field is added to the page layout assigned to the user’s profile.  
D: Verify Field-Level Security grants the profile access to view/edit the field.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_layoutoverview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_fls.htm&type=5
    `,
    explanation_pt: `
A: Confirme se o campo está no layout de página atribuído ao perfil do usuário.  
D: Verifique se a Segurança em Nível de Campo concede ao perfil acesso de visualização/edição ao campo.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_layoutoverview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_fls.htm&type=5
    `
  },
  {
    number: 94,
    question: "A new record type for customer warranty cases is created. Which two assignments should be used to display it to users? (Choose 2)",
    options: {
      A: "Profile Assignment",
      B: "Role Assignment",
      C: "App Manager Assignment",
      D: "Page Layout Assignment"
    },
    correct: "A, D",
    explanation_en: `
A: Assign the record type to the appropriate profiles.  
D: Map each record type to its page layout for each profile under Page Layout Assignment.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype_assign.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype_pagelayoutassign.htm&type=5
    `,
    explanation_pt: `
A: Atribua o record type aos perfis apropriados.  
D: Configure cada record type no layout de página para cada perfil em Page Layout Assignment.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype_assign.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_recordtype_pagelayoutassign.htm&type=5
    `
  },
  {
    number: 95,
    question: "When converting a lead, which two records can be created? (Choose 2)",
    options: {
      A: "Account",
      B: "Campaign",
      C: "Case",
      D: "Contact"
    },
    correct: "A, D",
    explanation_en: `
Lead Conversion can create an Account (A) and a Contact (D), and optionally an Opportunity.

Reference: https://help.salesforce.com/s/articleView?id=sf.convert_lead.htm&type=5
    `,
    explanation_pt: `
A conversão de Lead pode criar uma Conta (A) e um Contato (D), e opcionalmente uma Oportunidade.

Referência: https://help.salesforce.com/s/articleView?id=sf.convert_lead.htm&type=5
    `
  },
  {
    number: 96,
    question: "Universal Containers has a Task queue for support. The same team now handles Cases. Which two options help the support team? (Choose 2)",
    options: {
      A: "Configure a flow to assign cases to the queue",
      B: "Use Assignment Rules to set the queue as case owner",
      C: "Add Case to the existing queue’s Available Objects",
      D: "Create a new queue and add Cases as an Available Object"
    },
    correct: "B, C",
    explanation_en: `
B: Assignment Rules can automatically assign new Cases to the existing queue.  
C: Ensure the queue configuration includes Case as an Available Object so it can own Cases.

References:
https://help.salesforce.com/s/articleView?id=sf.case_assignment_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_queues.htm&type=5
    `,
    explanation_pt: `
B: Assignment Rules podem atribuir automaticamente novos Cases à fila existente.  
C: Verifique se a configuração da fila inclui Case como Available Object para poder ser proprietário de Cases.

Referências:
https://help.salesforce.com/s/articleView?id=sf.case_assignment_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_queues.htm&type=5
    `
  },
  {
    number: 97,
    question: "AW Computing wants to send welcome tasks and an email to the primary contact automatically when an Opportunity is Closed Won. Which automation tool best accomplishes this?",
    options: {
      A: "Validation Rule",
      B: "Outbound Message",
      C: "Approval Process",
      D: "Process Builder"
    },
    correct: "D",
    explanation_en: `
Process Builder can create follow-up Tasks and send Email Alerts when an Opportunity changes to Closed Won, chaining multiple actions in one process.

Reference: https://help.salesforce.com/s/articleView?id=sf.process_which_tool.htm&type=5
    `,
    explanation_pt: `
Process Builder pode criar Tarefas de boas-vindas e enviar Email Alerts quando uma Oportunidade é marcada como Closed Won, executando múltiplas ações em um processo.

Referência: https://help.salesforce.com/s/articleView?id=sf.process_which_tool.htm&type=5
    `
  },
  {
    number: 98,
    question: "Cloud Kicks users see confusing error messages in a screen flow that could be resolved with more account data. How should the administrator address this?",
    options: {
      A: "Remove validation rules",
      B: "Create a permission set to bypass the error",
      C: "Use a fault connector to display a screen with instructions",
      D: "Uncheck the End User Flow Errors box in Setup"
    },
    correct: "C",
    explanation_en: `
Add a Fault path (connector) on the flow element and use a Screen component to display a clear error message and instructions on required data before continuing.

References:
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_connector_fault.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screencmp_display_text.htm&type=5
    `,
    explanation_pt: `
Adicione um conector de falha na ação do fluxo e use um componente de Tela para exibir uma mensagem de erro clara e instruções sobre os dados necessários antes de continuar.

Referências:
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_connector_fault.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screencmp_display_text.htm&type=5
    `
  },
  {
    number: 99,
    question: "Cloud Kicks has a custom object Shoe. The administrator needs to prevent orphaned Shoe records when related to Account. What should the administrator do?",
    options: {
      A: "Create an Indirect Lookup",
      B: "Create an Encrypted Lookup",
      C: "Create a Hierarchical Lookup",
      D: "Create a Master-Detail Lookup"
    },
    correct: "D",
    explanation_en: `
A Master-Detail relationship enforces that child (Shoe) records require a parent (Account) and are deleted if the parent is removed, preventing orphans.

Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_considerations.htm&type=5
    `,
    explanation_pt: `
Uma relação Master-Detail garante que registros filho (Shoe) exijam um pai (Account) e sejam excluídos se o pai for removido, evitando órfãos.

Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_considerations.htm&type=5
    `
  },
  {
    number: 100,
    question: "AW Computing needs to capture a Loss Reason in a rich text field when an Opportunity is Closed Lost. How should an administrator configure this requirement?",
    options: {
      A: "Select the Required checkbox on the Loss Reason field in page layout",
      B: "Create a Validation Rule to display an error if Stage = Closed Lost and Loss Reason is blank",
      C: "Check the Required checkbox on the Loss Reason field in Object Manager",
      D: "Configure a Workflow Rule to display an error if Loss Reason is blank"
    },
    correct: "B",
    explanation_en: `
A Validation Rule can enforce that when Stage = 'Closed Lost', the Loss_Reason__c rich text field is not blank, preventing save until populated.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Validation Rule pode impor que, quando Stage = 'Closed Lost', o campo rich text Loss_Reason__c não esteja em branco, impedindo o salvamento até ser preenchido.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `
  },
    {
    number: 101,
    question: "Users at Cloud Kicks want to be able to create a task that will repeat every two weeks. What should an administrator do to meet the requirement?",
    options: {
      A: "Enable Creation of Recurring Tasks",
      B: "Build a Flow to create recurring tasks",
      C: "Use a Workflow Rule to create recurring tasks",
      D: "Turn on Recurring Activities"
    },
    correct: "A",
    explanation_en: `
Enable the “Enable Creation of Recurring Tasks” permission in profiles or permission sets so users can create tasks that repeat at defined intervals (e.g., every two weeks).

Reference: https://help.salesforce.com/s/articleView?id=sf.tasks_recurring.htm&type=5
    `,
    explanation_pt: `
Habilite a permissão “Enable Creation of Recurring Tasks” em perfis ou permission sets para que usuários possam criar tarefas que se repetem em intervalos definidos (por exemplo, a cada duas semanas).

Referência: https://help.salesforce.com/s/articleView?id=sf.tasks_recurring.htm&type=5
    `
  },
  {
    number: 102,
    question: "Cloud Kicks wants its reports to show a fiscal year starting on February 1 with 12 months. How should the administrator address this requirement?",
    options: {
      A: "Set Fiscal Year to Custom and starting month as February",
      B: "Set Fiscal Year to Custom and duration to 4 quarters",
      C: "Set Fiscal Year to Standard and starting month as February",
      D: "Set Fiscal Year to Standard and duration to 12 months"
    },
    correct: "A",
    explanation_en: `
Create a Custom Fiscal Year and specify February as the start month. This allows a February 1–January 31 fiscal calendar.

Reference: https://help.salesforce.com/s/articleView?id=sf.admin_fiscal_year.htm&type=5
    `,
    explanation_pt: `
Crie um Fiscal Year Customizado e defina fevereiro como mês de início. Isso permite um calendário fiscal de 1º de fevereiro a 31 de janeiro.

Referência: https://help.salesforce.com/s/articleView?id=sf.admin_fiscal_year.htm&type=5
    `
  },
  {
    number: 103,
    question: "Cloud Kicks has asked the administrator to test a new screen flow that creates Contacts. What are two key components of testing the flow? (Choose 2)",
    options: {
      A: "Set up a Flow Interview to test the flow",
      B: "Run the flow by creating Contacts",
      C: "Use Debug to test the flow in Flow Builder",
      D: "Test the flow in a sandbox"
    },
    correct: "B, C",
    explanation_en: `
B: Execute the flow end-to-end to verify Contacts are created correctly.  
C: Use the Debug option in Flow Builder to step through logic and inspect variables.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_test.htm&type=5
    `,
    explanation_pt: `
B: Execute o fluxo na prática para verificar se os Contatos são criados corretamente.  
C: Utilize a opção Debug no Flow Builder para percorrer a lógica e inspecionar variáveis.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_test.htm&type=5
    `
  },
  {
    number: 104,
    question: "An administrator at Universal Containers is reviewing security settings. What should the administrator do to prevent unauthorized access to Salesforce?",
    options: {
      A: "Disable TLS requirements for sessions",
      B: "Enable Multi-Factor Authentication",
      C: "Customize Organization-Wide Defaults",
      D: "Enable caching and autocomplete on the login page"
    },
    correct: "B",
    explanation_en: `
Enable Multi-Factor Authentication (MFA) across the org to require users to present two or more verification factors at login, significantly reducing unauthorized access risk.

Reference: https://help.salesforce.com/s/articleView?id=sf.security_mfa.htm&type=5
    `,
    explanation_pt: `
Habilite a Autenticação de Múltiplos Fatores (MFA) em toda a org para exigir múltiplos fatores de verificação no login, reduzindo substancialmente o risco de acesso não autorizado.

Referência: https://help.salesforce.com/s/articleView?id=sf.security_mfa.htm&type=5
    `
  },
  {
    number: 105,
    question: "An administrator needs to store the Record Type ID for later use in a flow. Which kind of variable should the administrator use?",
    options: {
      A: "Boolean variable",
      B: "Text variable",
      C: "ID variable",
      D: "Record variable"
    },
    correct: "C",
    explanation_en: `
Use an “ID” variable to hold a Salesforce record or record type ID, ensuring proper type handling in the flow.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_variables.htm&type=5
    `,
    explanation_pt: `
Use uma variável do tipo “ID” para armazenar o ID de um registro ou record type no fluxo, garantindo o tipo correto.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_variables.htm&type=5
    `
  },
  {
    number: 106,
    question: "Universal Containers wants to count open Cases per Account and update each Account with that count every Friday evening. What should the administrator use?",
    options: {
      A: "Record-Triggered Flow",
      B: "Scheduled Process Builder",
      C: "Roll-Up Summary Field",
      D: "Scheduled Flow"
    },
    correct: "D",
    explanation_en: `
Scheduled Flows can run weekly (Friday evening), aggregate open Cases per Account, and update each Account’s field.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled.htm&type=5
    `,
    explanation_pt: `
Scheduled Flows podem ser executados semanalmente (toda sexta-feira à noite), agregando Cases abertos por Conta e atualizando um campo em cada Conta.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_concepts_scheduled.htm&type=5
    `
  },
  {
    number: 107,
    question: "The business development team feels the Account creation process has too many fields. Which automation tool should an administrator use to simplify the process?",
    options: {
      A: "Approval Process",
      B: "Workflow Rule",
      C: "Flow Builder",
      D: "Validation Rule"
    },
    correct: "C",
    explanation_en: `
Use Flow Builder to create a guided Screen Flow that surfaces only essential fields and hides the rest, streamlining data entry.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5
    `,
    explanation_pt: `
Use o Flow Builder para criar um Screen Flow guiado que exiba apenas os campos essenciais e oculte os demais, agilizando a entrada de dados.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5
    `
  },
  {
    number: 108,
    question: "What should an administrator use as an identifier when importing and updating records from a separate financial system?",
    options: {
      A: "Auto-Number field",
      B: "External ID",
      C: "Rich Text field",
      D: "Salesforce Record ID"
    },
    correct: "B",
    explanation_en: `
Create a custom field marked as External ID to match and upsert records by the external system’s unique identifier.

Reference: https://help.salesforce.com/s/articleView?id=sf.custom_field_attributes.htm&type=5
    `,
    explanation_pt: `
Crie um campo personalizado marcado como External ID para corresponder e atualizar registros pelo identificador exclusivo do sistema externo.

Referência: https://help.salesforce.com/s/articleView?id=sf.custom_field_attributes.htm&type=5
    `
  },
  {
    number: 109,
    question: "During approval, a manager gets an error when approving a record. What should the administrator check first?",
    options: {
      A: "Add a delegated approver for the next step",
      B: "Update field-level security on fields updated by the process",
      C: "Verify the next approver in the process is active",
      D: "Ensure updated fields are visible on the page layout"
    },
    correct: "C",
    explanation_en: `
If the next approver’s user record is inactive or missing, the approval process cannot assign the record forward. Ensure that user is active.

Reference: https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
    `,
    explanation_pt: `
Se o usuário do próximo aprovador estiver inativo ou ausente, o processo de aprovação não conseguirá atribuir o registro. Verifique se o usuário está ativo.

Referência: https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
    `
  },
  {
    number: 110,
    question: "Cloud Kicks wants to try out an AppExchange app before installing in production. Which two options should the administrator suggest? (Choose 2)",
    options: {
      A: "Test Drive in a production org",
      B: "Download into a Trailhead Playground",
      C: "Install in a sandbox",
      D: "Check edition compatibility"
    },
    correct: "B, C",
    explanation_en: `
B: Use a free Trailhead Playground to explore the app.  
C: Install into a sandbox copy of production to test in your environment.

    `,
    explanation_pt: `
B: Use um Trailhead Playground gratuito para explorar o app.  
C: Instale em um sandbox para testar no seu ambiente.

    `
  },
  {
    number: 111,
    question: "Which three aspects of standard fields can an administrator customize? (Choose 3)",
    options: {
      A: "Picklist Values",
      B: "Help Text",
      C: "Field History Tracking",
      D: "Decimal Places",
      E: "Field Name"
    },
    correct: "A, B, D",
    explanation_en: `
Standard fields allow customization of their picklist values (A), help text (B), and decimal precision (D).

Reference:  
https://help.salesforce.com/s/articleView?id=sf.customize_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_fields_edit.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_fields_number.htm&type=5
    `,
    explanation_pt: `
Campos padrão permitem personalizar seus valores de picklist (A), texto de ajuda (B) e casas decimais (D).

Referências:  
https://help.salesforce.com/s/articleView?id=sf.customize_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_fields_edit.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_fields_number.htm&type=5
    `
  },
  {
    number: 112,
    question: "Which tool should an administrator use to review recent setup configuration changes in their org?",
    options: {
      A: "Critical Updates",
      B: "Debug Logs",
      C: "Setup Audit Trail",
      D: "Field History Tracking"
    },
    correct: "C",
    explanation_en: `
The Setup Audit Trail logs up to 180 days of setup changes (who, when, what), helping track configuration modifications.

Reference: https://help.salesforce.com/s/articleView?id=sf.monitorsetup.htm&type=5
    `,
    explanation_pt: `
O Setup Audit Trail registra até 180 dias de alterações de configuração (quem, quando, o quê), auxiliando no rastreamento de modificações.

Referência: https://help.salesforce.com/s/articleView?id=sf.monitorsetup.htm&type=5
    `
  },
  {
    number: 113,
    question: "DreamHouse Reality announced a new concierge offering requiring a different opportunity process. What should the administrator configure?",
    options: {
      A: "Create a Quick Action",
      B: "Create a new Approval Process",
      C: "Create a new Sales Process",
      D: "Create a new Opportunity Product"
    },
    correct: "C",
    explanation_en: `
Define a new Sales Process (stages) matching the unique concierge sales model, then associate via record type.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_salesprocess.htm&type=5
    `,
    explanation_pt: `
Defina um novo Sales Process (estágios) correspondente ao modelo de concierge e associe via record type.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_salesprocess.htm&type=5
    `
  },
  {
    number: 114,
    question: "The admin needs to change a Master-Detail relationship to Lookup on custom objects. Which scenario prevents this change?",
    options: {
      A: "A junction object is required",
      B: "Lookup field contains values on all records",
      C: "Lookup field is required",
      D: "A Roll-Up Summary field exists on the master"
    },
    correct: "D",
    explanation_en: `
Roll-Up Summary fields depend on master-detail. If any exist on the master, you cannot convert to lookup until they’re removed.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `,
    explanation_pt: `
Roll-Up Summary fields dependem de master-detail. Se existirem no mestre, não é possível converter para lookup até removê-los.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `
  },
  {
    number: 115,
    question: "Leadership wants an enterprise-wide dashboard of all open Opportunities, but users only see their own. How should the administrator build the dashboard without changing sharing settings?",
    options: {
      A: "Update dashboard folder settings to Manager role",
      B: "Add a filter by owner role",
      C: "Build individual dashboards per profile",
      D: "Set the dashboard Running User as someone with access to all Opportunities"
    },
    correct: "D",
    explanation_en: `
Dashboards run in the context of the Running User’s permissions. Set Running User to an admin or manager who can see all Opportunities to display enterprise-wide data.

Reference: https://help.salesforce.com/s/articleView?id=sf.dashboards_running_user.htm&type=5
    `,
    explanation_pt: `
Dashboards executam no contexto de permissões do Running User. Defina um admin ou gerente com acesso a todas as Oportunidades para exibir dados enterprise-wide.

Referência: https://help.salesforce.com/s/articleView?id=sf.dashboards_running_user.htm&type=5
    `
  },
  {
    number: 116,
    question: "Which two types of pages can an administrator build and customize using Lightning App Builder for the Salesforce mobile app? (Choose 2)",
    options: {
      A: "User Page",
      B: "Dashboard Page",
      C: "App Page",
      D: "Record Page"
    },
    correct: "C, D",
    explanation_en: `
App Pages (stand-alone tabs) and Record Pages can be built in Lightning App Builder for mobile. User and Dashboard pages are not supported mobile App Builder types.

Reference: https://help.salesforce.com/s/articleView?id=sf.app_builder_mobile_pages.htm&type=5
    `,
    explanation_pt: `
App Pages (abas independentes) e Record Pages podem ser criadas no Lightning App Builder para mobile. User Pages e Dashboard Pages não são tipos suportados para o App Builder mobile.

Referência: https://help.salesforce.com/s/articleView?id=sf.app_builder_mobile_pages.htm&type=5
    `
  },
  {
    number: 117,
    question: "An administrator wants to deactivate a user who left the company. Which two scenarios would prevent deactivation? (Choose 2)",
    options: {
      A: "The user is part of a Territory Hierarchy",
      B: "The user is in a custom hierarchy field",
      C: "The user is assigned in a Workflow Email Alert",
      D: "The user holds the top role in the Role Hierarchy"
    },
    correct: "A, C",
    explanation_en: `
Users assigned in Territory models or referenced in active Workflow Email Alerts cannot be deactivated until removed from those assignments.

Reference: https://help.salesforce.com/s/articleView?id=sf.users_deactivate_considerations.htm&type=5
    `,
    explanation_pt: `
Usuários atribuídos em Territory Hierarchies ou referenciados em Workflow Email Alerts ativos não podem ser desativados até serem removidos dessas atribuições.

Referência: https://help.salesforce.com/s/articleView?id=sf.users_deactivate_considerations.htm&type=5
    `
  },
  {
    number: 118,
    question: "What should an administrator be aware of before changing an Auto-Number field to Text?",
    options: {
      A: "Existing field values will remain unchanged",
      B: "Existing field values will be converted",
      C: "Existing field values will be deleted",
      D: "Changing Auto-Number to Text is prevented"
    },
    correct: "D",
    explanation_en: `
Salesforce prevents changing an Auto-Number field to Text because it would break automatic sequencing and cause data inconsistency.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_auto_number.htm&type=5
    `,
    explanation_pt: `
O Salesforce impede a conversão de um campo Auto-Number para Texto, pois quebraria a sequência automática e causaria inconsistências.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_auto_number.htm&type=5
    `
  },
  {
    number: 119,
    question: "Sales users want the Industry field from Account to display on the Opportunity page layout. Which field type should an administrator create?",
    options: {
      A: "Custom Account Field",
      B: "Standard Account Field",
      C: "Cross-Object Formula Field",
      D: "Master-Detail Relationship Field"
    },
    correct: "C",
    explanation_en: `
A Cross-Object Formula on Opportunity referencing Account.Industry displays that value without extra relationships.

Reference: https://help.salesforce.com/s/articleView?id=sf.cross_object_formulas.htm&type=5
    `,
    explanation_pt: `
Uma fórmula Cross-Object em Opportunity que referencia Account.Industry exibe esse valor sem criar relacionamentos adicionais.

Referência: https://help.salesforce.com/s/articleView?id=sf.cross_object_formulas.htm&type=5
    `
  },
  {
    number: 120,
    question: "Cloud Kicks wants consistency in email communications on cases, with categorize-able messages. Which solution should the administrator suggest?",
    options: {
      A: "Prebuilt Quick Texts",
      B: "Prebuilt Email Templates",
      C: "Prebuilt Flow Templates",
      D: "Prebuilt Auto-Responses"
    },
    correct: "B",
    explanation_en: `
Use Email Templates—categorized and searchable—to ensure consistent messaging. Agents select the appropriate template when emailing on cases.

Reference:  
https://help.salesforce.com/s/articleView?id=sf.email_templates_prebuilt.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.email_templates_use.htm&type=5
    `,
    explanation_pt: `
Use Email Templates—categorias pesquisáveis que garantem mensagens consistentes. Os agentes selecionam o template adequado ao responder casos por email.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.email_templates_prebuilt.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.email_templates_use.htm&type=5
    `
  },  {
    number: 121,
    question: "The administrator at Cloud Kicks updated the custom object Event to include a lookup field to the primary Contact. When running an Event report, they want to reference fields from the associated Contact record. What should the administrator do to pull Contact fields into the custom report?",
    options: {
      A: "Configure formula fields on Event to populate Contact information",
      B: "Edit the custom Event report type and add fields related via lookup",
      C: "Create a new report type with Event as primary object and Contact as related object",
      D: "Use a dashboard with filters to show Event and Contact data as requested"
    },
    correct: "B",
    explanation_en: `
Edit the existing custom Event report type and, in its layout, include fields from the lookup-related Contact object. This makes the Contact fields available in your Event reports.

Reference: https://help.salesforce.com/s/articleView?id=sf.reports_builder_create_report_type.htm&type=5
    `,
    explanation_pt: `
Edite o report type personalizado de Event e, no layout, adicione campos do objeto Contact relacionado por lookup. Isso torna os campos de Contact disponíveis nos relatórios de Event.

Referência: https://help.salesforce.com/s/articleView?id=sf.reports_builder_create_report_type.htm&type=5
    `
  },
  {
    number: 122,
    question: "Cloud Kicks wants to track Shoe Designs by Product. Shoe Designs should be unable to be deleted, and there can be multiple designs per product across various stages. Which two steps should the administrator configure to meet this requirement? (Choose 2)",
    options: {
      A: "Create a custom object for Shoe Design",
      B: "Configure a custom lookup field for Shoe Design on Product",
      C: "Add a custom master-detail field for Shoe Design on Product",
      D: "Use a standard object for Designs"
    },
    correct: "A, C",
    explanation_en: `
A: Create a custom object “Shoe Design.”  
C: Create a master-detail relationship on Shoe Design pointing to Product—this prevents deleting designs orphaned from products and allows multiple designs per product.

References:
https://help.salesforce.com/s/articleView?id=sf.customize_customobjects.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.relationships_considerations.htm&type=5
    `,
    explanation_pt: `
A: Crie um objeto personalizado “Shoe Design.”  
C: Crie uma relação master-detail em Shoe Design apontando para Product—isso impede a exclusão de designs órfãos e permite múltiplos designs por produto.

Referências:
https://help.salesforce.com/s/articleView?id=sf.customize_customobjects.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.relationships_considerations.htm&type=5
    `
  },
  {
    number: 123,
    question: "The VP of Sales at Cloud Kicks is receiving an error that prevents them from saving an Opportunity. The administrator attempted the same edit without error. How can the administrator validate the error the user is receiving?",
    options: {
      A: "Edit the page layout",
      B: "View the Setup Audit Trail",
      C: "Log in as the user",
      D: "Review the sharing model"
    },
    correct: "C",
    explanation_en: `
Use “Login As” to assume the user’s profile and permissions and reproduce the error exactly as they see it.

Reference: https://help.salesforce.com/s/articleView?id=sf.admin_login.htm&type=5
    `,
    explanation_pt: `
Use “Login As” para assumir o perfil e permissões do usuário e reproduzir o erro exatamente como ele vê.

Referência: https://help.salesforce.com/s/articleView?id=sf.admin_login.htm&type=5
    `
  },
  {
    number: 124,
    question: "Org-wide default for Opportunity is Private. Which two features should the administrator use to open up access for sales users working on collaborative deals? (Choose 2)",
    options: {
      A: "Sharing Set",
      B: "Role Hierarchy",
      C: "Profiles",
      D: "Sharing Rules"
    },
    correct: "B, D",
    explanation_en: `
Role Hierarchy (B) grants upward access in the role tree.  
Sharing Rules (D) allow criteria- or owner-based sharing to public groups, roles, or territories.

References:
https://help.salesforce.com/s/articleView?id=sf.admin_sharing.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.security_sharing_rules.htm&type=5
    `,
    explanation_pt: `
Role Hierarchy (B) concede acesso aos superiores na hierarquia de funções.  
Sharing Rules (D) permitem compartilhamento baseado em critérios ou proprietário para grupos públicos, funções ou territórios.

Referências:
https://help.salesforce.com/s/articleView?id=sf.admin_sharing.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.security_sharing_rules.htm&type=5
    `
  },
  {
    number: 125,
    question: "The administrator at AW Computing wants Account Details, related lists, and Chatter feeds each on separate tabs when reviewing an Account. Which type of page should the administrator create?",
    options: {
      A: "Lightning App Page",
      B: "Lightning Page Tab",
      C: "Lightning Record Page",
      D: "Lightning Page Component"
    },
    correct: "C",
    explanation_en: `
Create a Lightning Record Page for Account and use the Tabs component in App Builder to place details, related lists, and Chatter each on its own tab.

References:
https://help.salesforce.com/s/articleView?id=sf.app_builder_record_page.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.app_builder_tabs.htm&type=5
    `,
    explanation_pt: `
Crie uma Lightning Record Page para Account e use o componente Tabs no App Builder para colocar detalhes, listas relacionadas e Chatter em abas separadas.

Referências:
https://help.salesforce.com/s/articleView?id=sf.app_builder_record_page.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.app_builder_tabs.htm&type=5
    `
  },
  {
    number: 126,
    question: "When an Opportunity closes, Cloud Kicks wants to automatically create a renewal Opportunity. Which two automation tools should an administrator use? (Choose 2)",
    options: {
      A: "Approval Process",
      B: "Flow Builder",
      C: "Workflow Rule",
      D: "Process Builder"
    },
    correct: "B, D",
    explanation_en: `
B: Use Flow Builder to define logic and actions to clone or create a renewal Opportunity.  
D: Use Process Builder to trigger that flow when Stage changes to Closed Won.

References:
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `,
    explanation_pt: `
B: Use o Flow Builder para definir lógica e ações que copiem ou criem uma Opportunity de renovação.  
D: Use o Process Builder para acionar esse fluxo quando o Stage mudar para Closed Won.

Referências:
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `
  },
  {
    number: 127,
    question: "Cloud Kicks wants to give credit to Opportunity team members based on their level of effort contributed to each deal. Which feature should the administrator use?",
    options: {
      A: "Stages",
      B: "Splits",
      C: "Queues",
      D: "List Views"
    },
    correct: "B",
    explanation_en: `
Opportunity Splits let you allocate revenue or overlay credit percentages to each team member based on effort.

Reference: https://help.salesforce.com/s/articleView?id=sf.forecasts3_splits_overview.htm&type=5
    `,
    explanation_pt: `
Opportunity Splits permitem alocar porcentagens de receita ou overlay para cada membro da equipe com base no esforço.

Referência: https://help.salesforce.com/s/articleView?id=sf.forecasts3_splits_overview.htm&type=5
    `
  },
  {
    number: 128,
    question: "A new flow that auto-sets field values on Account creation is not working properly. What should the administrator do to identify the problem?",
    options: {
      A: "Use the native Debug feature in Flow Builder",
      B: "Review debug logs with the Apex log level",
      C: "View the Setup Audit Trail for errors",
      D: "Set up Email logs and review the send-error log"
    },
    correct: "A",
    explanation_en: `
Use the Flow Builder’s Debug mode to step through the flow, inspect input/output at each element, and see error details.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_debug.htm&type=5
    `,
    explanation_pt: `
Use o modo Debug no Flow Builder para percorrer o fluxo passo a passo, inspecionar entradas/saídas em cada elemento e ver detalhes de erro.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_debug.htm&type=5
    `
  },
  {
    number: 129,
    question: "The Sales Manager approves time-off requests. They need a backup manager to see and respond while the manager is on vacation. What should the administrator use?",
    options: {
      A: "Delegated Approver",
      B: "Two-step Approval Process",
      C: "Approval History related list",
      D: "Delegated Administrator"
    },
    correct: "A",
    explanation_en: `
Delegated Approver lets the Sales Manager temporarily assign their approval requests to another user during absences.

Reference: https://help.salesforce.com/s/articleView?id=sf.approvals_delegate.htm&type=5
    `,
    explanation_pt: `
Delegated Approver permite que o Sales Manager delegue temporariamente suas aprovações a outro usuário durante ausências.

Referência: https://help.salesforce.com/s/articleView?id=sf.approvals_delegate.htm&type=5
    `
  },
  {
    number: 130,
    question: "Ursa Major Solar’s Employee Engagement committee wants to post updates but restrict other employees from posting. What should the administrator create?",
    options: {
      A: "Chatter Stream",
      B: "Chatter Broadcast Group",
      C: "Chatter Recommendations",
      D: "Chatter Unlisted Group"
    },
    correct: "B",
    explanation_en: `
A Broadcast Group restricts posting to owners/managers only—everyone else can view and comment.

Reference: https://help.salesforce.com/s/articleView?id=sf.collab_groups_create.htm&type=5
    `,
    explanation_pt: `
Um Broadcast Group restringe postagens apenas a proprietários/gerentes—todos os demais podem ver e comentar.

Referência: https://help.salesforce.com/s/articleView?id=sf.collab_groups_create.htm&type=5
    `
  },
  {
    number: 131,
    question: "A Sales Rep hosts monthly networking events in a series and needs to report on Campaign ROI by month and by series. How should the administrator set up the Campaigns to simplify reporting?",
    options: {
      A: "Add different record types for each monthly event type",
      B: "Create individual Campaigns with the same name",
      C: "Configure Campaign Member Statuses to record attendance",
      D: "Use a Campaign Hierarchy where monthly events roll up to a parent Campaign"
    },
    correct: "D",
    explanation_en: `
Set up a parent Campaign for the series and child Campaigns for each monthly event—Campaign Hierarchy lets you roll up metrics.

Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_hierarchy.htm&type=5
    `,
    explanation_pt: `
Crie uma Campaign pai para a série e Campaigns filhas para cada evento mensal—Campaign Hierarchy permite agregação de métricas.

Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_hierarchy.htm&type=5
    `
  },
  {
    number: 132,
    question: "Cloud Kicks has a custom object Shipment. They want to see all Shipment items on the Account page, and when an Account is deleted, Shipments should remain. What type of relationship should the administrator use between Shipment and Account?",
    options: {
      A: "Shipments should have a Lookup to Account",
      B: "Accounts should have a Lookup to Shipments",
      C: "Shipments should have a Master-Detail to Account",
      D: "Accounts should have a Master-Detail to Shipments"
    },
    correct: "A",
    explanation_en: `
A Lookup relationship from Shipment to Account displays related shipments on the Account page, and does not delete shipments when the Account is deleted.

Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `,
    explanation_pt: `
Uma relação Lookup de Shipment para Account exibe remessas relacionadas na página de Account e não exclui Shipments quando a Account é excluída.

Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `
  },
  {
    number: 133,
    question: "Northern Trail Outfitters uses a custom object Invoice to collect payment info. The Billing System field must be filled on every Invoice. How should the administrator ensure this requirement?",
    options: {
      A: "Make the field universally required",
      B: "Create a Process Builder to set the field",
      C: "Define an Approval Process for the child",
      D: "Require the field on the record type"
    },
    correct: "A",
    explanation_en: `
Mark the Billing System field as universally required in field settings—this enforces entry for all records in the UI.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_fields.htm&type=5
    `,
    explanation_pt: `
Marque o campo Billing System como obrigatório universalmente nas configurações de campo—isso força o preenchimento em todos os registros na UI.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_fields.htm&type=5
    `
  },
  {
    number: 134,
    question: "Cloud Kicks has product owners who need a space to share feedback and ideas with just the product team. How should the administrator leverage Salesforce to help the team collaborate?",
    options: {
      A: "Use Quick Actions to log communication",
      B: "Configure a Chatter Public Group",
      C: "Create a Chatter Private Group",
      D: "Add Activity History to document tasks"
    },
    correct: "C",
    explanation_en: `
A Chatter Private Group restricts posting and membership to invited users only—ideal for confidential product feedback.

Reference: https://help.salesforce.com/s/articleView?id=sf.collab_groups_overview.htm&type=5
    `,
    explanation_pt: `
Um Chatter Private Group restringe postagens e membros apenas a usuários convidados—ideal para feedback confidencial de produto.

Referência: https://help.salesforce.com/s/articleView?id=sf.collab_groups_overview.htm&type=5
    `
  },
  {
    number: 135,
    question: "An analytics user needs Read, Create, and Edit access for objects but must be restricted from deleting any records. What should the administrator do to meet this requirement?",
    options: {
      A: "Assign the standard System Administrator profile",
      B: "Give the user View All access and place them in the highest role",
      C: "Create and assign a custom profile with Delete access removed for each object",
      D: "Create and assign a Permission Set that includes Read, Create, and Edit access"
    },
    correct: "C",
    explanation_en: `
Create a custom profile granting Read, Create, and Edit on needed objects—explicitly uncheck Delete permissions to block deletion.

Reference: https://help.salesforce.com/s/articleView?id=sf.users_profiles.htm&type=5
    `,
    explanation_pt: `
Crie um perfil personalizado concedendo Read, Create e Edit nos objetos necessários—desmarque explicitamente a permissão Delete para bloquear exclusão.

Referência: https://help.salesforce.com/s/articleView?id=sf.users_profiles.htm&type=5
    `
  },
  {
    number: 136,
    question: "Universal Containers has enabled Data Protection and Privacy. Which page layouts will have the Individual field available for tracking data privacy info?",
    options: {
      A: "Case and Opportunity",
      B: "Account and User",
      C: "Contact, Lead, and Person Account",
      D: "Individual, User, and Account"
    },
    correct: "C",
    explanation_en: `
When Data Protection & Privacy is enabled, the Individual lookup appears on Contact, Lead, and Person Account layouts to link records to Individual.

Reference: https://help.salesforce.com/s/articleView?id=sf.individual_object.htm&type=5
    `,
    explanation_pt: `
Quando Data Protection & Privacy está habilitado, o lookup Individual aparece nos layouts de Contact, Lead e Person Account para vincular registros ao objeto Individual.

Referência: https://help.salesforce.com/s/articleView?id=sf.individual_object.htm&type=5
    `
  },
  {
    number: 137,
    question: "To give access to a new custom object with custom fields to more than one user, which two options should an administrator use? (Choose 2)",
    options: {
      A: "Add to manual sharing list",
      B: "Assign a Permission Set Group to users",
      C: "Create a Permission Set",
      D: "Edit organization-wide defaults"
    },
    correct: "B, C",
    explanation_en: `
C: Create a Permission Set granting access to the custom object and fields.  
B: Bundle that Permission Set into a Permission Set Group and assign to multiple users at once.

References:  
https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.perm_set_groups_overview.htm&type=5
    `,
    explanation_pt: `
C: Crie um Permission Set concedendo acesso ao objeto e campos personalizados.  
B: Agrupe esse Permission Set em um Permission Set Group e atribua a vários usuários de uma vez.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.perm_sets_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.perm_set_groups_overview.htm&type=5
    `
  },
  {
    number: 138,
    question: "Cloud Kicks wants to update a screen flow so that if the checkbox High Value Customer is true, the first screen is skipped and the user is directed to the second screen. How should the administrator configure the Decision element?",
    options: {
      A: "Use the equals operator and {!$GlobalConstant.True} as the value",
      B: "Use the equals operator and \"High Value Customer\" as the value",
      C: "Use the contains operator and {!$GlobalConstant.False} as the value",
      D: "Use the contains operator and \"High Value Customer\" as the value"
    },
    correct: "A",
    explanation_en: `
In the Decision element, set the condition: {!High_Value_Customer__c} equals {!$GlobalConstant.True} to detect when the box is checked.

Reference:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_operators.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_decision.htm&type=5
    `,
    explanation_pt: `
No elemento Decision, configure a condição: {!High_Value_Customer__c} equals {!$GlobalConstant.True} para detectar quando a caixa está marcada.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_operators.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_decision.htm&type=5
    `
  },
  {
    number: 139,
    question: "The administrator at Ursa Major Solar imported records into an object by mistake. Which two tools should be used to undo this import? (Choose 2)",
    options: {
      A: "Weekly Data Export",
      B: "Mass Delete Records",
      C: "Data Loader",
      D: "Data Import Wizard"
    },
    correct: "B, C",
    explanation_en: `
B: Use Mass Delete Records for supported objects to quickly delete the mistakenly imported records.  
C: Use Data Loader’s delete operation with a CSV of record IDs to bulk remove the imported records.

References:  
https://help.salesforce.com/s/articleView?id=sf.admin_massdelete.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.data_loader.htm&type=5
    `,
    explanation_pt: `
B: Use Mass Delete Records para objetos suportados e excluir rapidamente os registros importados por engano.  
C: Use a operação delete do Data Loader com um CSV de IDs de registro para remover em massa os registros importados.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.admin_massdelete.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.data_loader.htm&type=5
    `
  },
  {
    number: 140,
    question: "Ursa Major Solar wants a guided expense report process for submissions, routing, and authorizations. Which two tools should the administrator use? (Choose 2)",
    options: {
      A: "Validation Rule",
      B: "Flow Builder",
      C: "Approval Process",
      D: "Quick Action"
    },
    correct: "B, C",
    explanation_en: `
B: Use Flow Builder to create a Screen Flow guiding users through expense entry.  
C: Use an Approval Process to route and authorize expense reports post-submission.

References:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
    `,
    explanation_pt: `
B: Use o Flow Builder para criar um Screen Flow que guie os usuários na entrada de despesas.  
C: Use um Approval Process para rotear e autorizar relatórios de despesas após a submissão.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5
    `
  },
  {
    number: 141,
    question: "When a Contact with Title = CEO is created, the Contact’s Account record should be updated with the CEO’s name. Which feature should an administrator use?",
    options: {
      A: "Quick Action",
      B: "Workflow Rule",
      C: "Process Builder",
      D: "Validation Rule"
    },
    correct: "C",
    explanation_en: `
Process Builder can trigger on Contact creation when Title = 'CEO' and update the parent Account’s CEO Name field.

Reference: https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `,
    explanation_pt: `
Process Builder pode disparar na criação de Contact quando Title = 'CEO' e atualizar o campo de nome do CEO no objeto Account pai.

Referência: https://help.salesforce.com/s/articleView?id=sf.process_overview.htm&type=5
    `
  },
  {
    number: 142,
    question: "New leads need to be routed to the correct salesperson based on Lead Address. What feature should be used?",
    options: {
      A: "Configure a Validation Rule",
      B: "Use Lead Assignment Rules",
      C: "Create a Formula Field",
      D: "Assign with an Escalation Rule"
    },
    correct: "B",
    explanation_en: `
Lead Assignment Rules route new leads automatically to users or queues based on address criteria.

Reference: https://help.salesforce.com/s/articleView?id=sf.leads_assignment_rules.htm&type=5
    `,
    explanation_pt: `
Lead Assignment Rules roteiam leads automaticamente para usuários ou filas com base em critérios de endereço.

Referência: https://help.salesforce.com/s/articleView?id=sf.leads_assignment_rules.htm&type=5
    `
  },
  {
    number: 143,
    question: "Users want to visually see Opportunity sales stages via Path. Which is an important consideration for Path configuration?",
    options: {
      A: "Kanban views for Path must be configured manually",
      B: "The Owner field can be edited in the key fields panel",
      C: "Celebrations cannot be added to a Path",
      D: "Path can include Guidance and Key Fields for each stage"
    },
    correct: "D",
    explanation_en: `
Path lets you add stage-specific guidance text and highlight key fields per stage to guide users.

Reference: https://help.salesforce.com/s/articleView?id=sf.path_overview.htm&type=5
    `,
    explanation_pt: `
Path permite adicionar texto de orientação específico por estágio e destacar campos-chave em cada estágio para guiar os usuários.

Referência: https://help.salesforce.com/s/articleView?id=sf.path_overview.htm&type=5
    `
  },
  {
    number: 144,
    question: "Which tool should an administrator use to identify and fix potential session vulnerabilities?",
    options: {
      A: "Field History Tracking",
      B: "Setup Audit Trail",
      C: "Security Health Check",
      D: "Organization-Wide Defaults"
    },
    correct: "C",
    explanation_en: `
Security Health Check analyzes org security settings against a baseline and highlights vulnerabilities and remediation steps.

Reference: https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5
    `,
    explanation_pt: `
Security Health Check analisa configurações de segurança da org em comparação a um padrão e destaca vulnerabilidades e etapas de correção.

Referência: https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5
    `
  },
  {
    number: 145,
    question: "Which three items are available in the mobile navigation menu? (Choose 3)",
    options: {
      A: "Lightning App Pages",
      B: "Lightning Home Page",
      C: "Chatter",
      D: "Utility Bar",
      E: "Dashboards"
    },
    correct: "A, C, E",
    explanation_en: `
Mobile navigation supports Lightning App Pages, Chatter, and Dashboards. Utility Bar and Lightning Home Page aren’t direct items in mobile nav.

Reference: https://help.salesforce.com/s/articleView?id=sf.app_nav_setup.htm&type=5
    `,
    explanation_pt: `
A navegação mobile suporta Lightning App Pages, Chatter e Dashboards. Utility Bar e Lightning Home Page não são itens diretos no menu mobile.

Referência: https://help.salesforce.com/s/articleView?id=sf.app_nav_setup.htm&type=5
    `
  },
    {
    number: 146,
    question: "Support agents at Cloud Kicks are spending too much time finding resources to solve cases. They need a more efficient way to find documentation and similar cases from the Case page layout. How should an administrator meet this requirement?",
    options: {
      A: "Create a custom object to capture popular case resolutions",
      B: "Use an interview flow to capture Case details",
      C: "Direct users to Global Search to look for similar cases",
      D: "Configure Knowledge with articles and data categories"
    },
    correct: "D",
    explanation_en: `
Salesforce Knowledge lets you author and categorize articles, then surface relevant documentation and similar articles directly on the Case record via data categories and related lists.

References:
https://help.salesforce.com/s/articleView?id=sf.knowledge_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.knowledge_categories.htm&type=5
    `,
    explanation_pt: `
O Salesforce Knowledge permite criar e categorizar artigos, e exibir a documentação relevante e artigos semelhantes diretamente no registro de Case por meio de data categories e listas relacionadas.

Referências:
https://help.salesforce.com/s/articleView?id=sf.knowledge_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.knowledge_categories.htm&type=5
    `
  },
  {
    number: 147,
    question: "DreamHouse Realty needs to use consistent picklist values in the Category field on Accounts and Cases, with values respective to record types. Which two options should the administrator use? (Choose 2)",
    options: {
      A: "Multi-select picklist",
      B: "Dependent picklist",
      C: "Global picklist",
      D: "Custom picklist"
    },
    correct: "B, C",
    explanation_en: `
Use a Global Picklist (Value Set) for shared values across objects, and Dependent Picklists to tailor available values per record type.

References:
https://help.salesforce.com/s/articleView?id=sf.picklist_global_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.fields_about_dependent_picklists.htm&type=5
    `,
    explanation_pt: `
Use um Global Picklist (Value Set) para valores compartilhados em objetos, e Dependent Picklists para ajustar valores disponíveis por record type.

Referências:
https://help.salesforce.com/s/articleView?id=sf.picklist_global_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.fields_about_dependent_picklists.htm&type=5
    `
  },
  {
    number: 148,
    question: "Universal Containers customers have provided feedback that their support cases are not being responded to quickly enough. UC wants to send all unassigned Cases that have been open for more than two hours to an urgent Case queue and alert the support manager. Which feature should an administrator configure to meet this requirement?",
    options: {
      A: "Case Escalation Rules",
      B: "Case Dashboard Refreshes",
      C: "Case Scheduled Report",
      D: "Case Assignment Rules"
    },
    correct: "A",
    explanation_en: `
Case Escalation Rules allow time-based criteria (e.g., >2 hours unassigned) to reassign cases to a queue and send notifications automatically.

Reference: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules permitem critérios baseados em tempo (por exemplo, >2 horas sem atribuição) para reatribuir casos a uma fila e enviar notificações automaticamente.

Referência: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `
  },
  {
    number: 149,
    question: "An administrator at Universal Containers needs an automated way to delete records based on field values. What automated solution should the administrator use?",
    options: {
      A: "Workflow Rule",
      B: "Process Builder",
      C: "Flow Builder",
      D: "Automation Studio"
    },
    correct: "C",
    explanation_en: `
Flow Builder can be used to create a Schedule or Record-Triggered Flow that finds records meeting criteria and uses the Delete Records element to remove them.

References:
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_delete.htm&type=5
    `,
    explanation_pt: `
O Flow Builder pode criar um Schedule ou Record-Triggered Flow que busca registros que atendem aos critérios e usa o elemento Delete Records para removê-los.

Referências:
https://help.salesforce.com/s/articleView?id=sf.flow_builder.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_concepts_delete.htm&type=5
    `
  },
  {
    number: 150,
    question: "The Human Resources department at Northern Trail Outfitters wants employees to provide feedback about their manager using a custom object in Salesforce. It is important that managers are unable to see the feedback records from their staff. How should an administrator configure the custom object to meet this requirement?",
    options: {
      A: "Uncheck Grant Access Using Hierarchies",
      B: "Define a criteria-based sharing rule",
      C: "Set the default external access to Private",
      D: "Configure an owner-based sharing rule"
    },
    correct: "A",
    explanation_en: `
With “Grant Access Using Hierarchies” unchecked on a custom object, role hierarchy does not grant upward access, preventing managers from seeing their subordinates’ records unless explicitly shared.

Reference: https://help.salesforce.com/s/articleView?id=sf.security_sharing_owd_custom_objects.htm&type=5
    `,
    explanation_pt: `
Com “Grant Access Using Hierarchies” desmarcado em um objeto personalizado, a hierarquia de funções não concede acesso ascendente, impedindo que gerentes vejam registros de subordinados, a menos que sejam compartilhados explicitamente.

Referência: https://help.salesforce.com/s/articleView?id=sf.security_sharing_owd_custom_objects.htm&type=5
    `
  },
  {
    number: 151,
    question: "The administrator at Cloud Kicks has been asked to change the company’s Shoe Style field to prevent users from selecting more than one style on a record. Which two steps should an administrator do to accomplish this? (Choose 2)",
    options: {
      A: "Reactivate the appropriate Shoe Style values after the field type changes",
      B: "Select the “Choose only one value” checkbox on the picklist field",
      C: "Back up the Shoe Style values in existing records",
      D: "Change the field type from a multi-select picklist to a picklist"
    },
    correct: "B, D",
    explanation_en: `
D: Change the field from Multi-Select Picklist to standard Picklist.  
B: Ensure “Restrict picklist to the values defined in the value set” (or equivalent “Choose only one value”) is selected to enforce single selection.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_picklists.htm&type=5
    `,
    explanation_pt: `
D: Altere o campo de Multi-Select Picklist para Picklist padrão.  
B: Marque “Restrict picklist to the values defined in the value set” (ou equivalente “Escolha apenas um valor”) para forçar seleção única.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_picklists.htm&type=5
    `
  },
  {
    number: 152,
    question: "Universal Containers administrator has been asked to create a many-to-many relationship between two existing custom objects. Which two steps should the administrator take when enabling the many-to-many relationship? (Choose 2)",
    options: {
      A: "Create a junction custom object",
      B: "Create two master-detail relationships on the new object",
      C: "Create two lookup relationships on the new object",
      D: "Create URL fields on a custom object"
    },
    correct: "A, B",
    explanation_en: `
A: Create a junction object to serve as the join.  
B: On that junction object, create two Master-Detail relationships—one to each parent object.

Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_manytomany.htm&type=5
    `,
    explanation_pt: `
A: Crie um objeto de junção (junction) para atuar como ponto de conexão.  
B: Nesse objeto de junção, crie duas master-detail—uma para cada objeto pai.

Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_manytomany.htm&type=5
    `
  },
  {
    number: 153,
    question: "A user at Universal Containers left the company. The administrator needs to create a new user for their replacement but has assigned all available user licenses. What should the administrator do to free up user licenses for the new user?",
    options: {
      A: "Deactivate the former employee’s user record",
      B: "Delete the former employee’s user record",
      C: "Freeze the former employee’s user record",
      D: "Change the former user’s record to the new user"
    },
    correct: "A",
    explanation_en: `
Deactivating a user frees up their license while preserving their activity history. Deleting or freezing does not release the license.

Reference: https://help.salesforce.com/s/articleView?id=sf.admin_usermgmt_licensing.htm&type=5
    `,
    explanation_pt: `
Desativar um usuário libera a licença dele e preserva o histórico de atividade. Excluir ou congelar não libera a licença.

Referência: https://help.salesforce.com/s/articleView?id=sf.admin_usermgmt_licensing.htm&type=5
    `
  },
  {
    number: 154,
    question: "The Events Manager at DreamHouse Realty has a hot lead from a successful open house that needs to become a Contact with an associated Opportunity. How should this be accomplished from the Campaign while keeping the associated campaign member history?",
    options: {
      A: "Delete the lead and create a new Contact and Opportunity",
      B: "Clone the lead and convert the cloned record to a Contact",
      C: "Convert the lead from the Campaign Member detail page",
      D: "Add a Contact from the Campaign Member detail page"
    },
    correct: "C",
    explanation_en: `
Converting the lead from the Campaign Member detail page preserves campaign member history while creating the Account, Contact, and Opportunity.

Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_leads.htm&type=5
    `,
    explanation_pt: `
Converter o lead na página de detalhes do Campaign Member preserva o histórico de participação na campanha e cria Conta, Contato e Oportunidade.

Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_leads.htm&type=5
    `
  },
  {
    number: 155,
    question: "Cloud Kicks has the org-wide sharing default set to Private on the Shoe object. The Sales Manager should be able to view a report containing Shoe records for all sales reps on their team. Which 3 items should the administrator configure to provide appropriate access to the report? (Choose 3)",
    options: {
      A: "Custom Report Type",
      B: "Folder Access",
      C: "Report Subscription",
      D: "Field-Level Security"
    },
    correct: "A, B, D",
    explanation_en: `
A: Ensure a Custom Report Type includes Shoe fields.  
B: Grant the Sales Manager folder access to view/run the report.  
D: Confirm Field-Level Security allows visibility of Shoe fields.

Reference:  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_create_report_type.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.reports_manage_folders.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_fls.htm&type=5
    `,
    explanation_pt: `
A: Garanta que um Custom Report Type inclua os campos de Shoe.  
B: Conceda ao Sales Manager acesso à pasta para visualizar/executar o relatório.  
D: Confirme se a Field-Level Security permite visibilidade dos campos de Shoe.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_create_report_type.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.reports_manage_folders.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_fls.htm&type=5
    `
  },
  {
    number: 156,
    question: "The sales team at Ursa Major Solar has asked the administrator to automate an outbound message. What should the administrator utilize to satisfy the request?",
    options: {
      A: "Process Builder",
      B: "Task Assignment",
      C: "Workflow Rule",
      D: "Flow Builder"
    },
    correct: "C",
    explanation_en: `
Workflow Rules offer an Outbound Message action to send SOAP messages to external endpoints when criteria are met.

References:  
https://help.salesforce.com/s/articleView?id=sf.workflow_define.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_action_outboundmessaging.htm&type=5
    `,
    explanation_pt: `
Workflow Rules oferecem a ação Outbound Message para enviar mensagens SOAP a endpoints externos quando critérios são atendidos.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.workflow_define.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.workflow_action_outboundmessaging.htm&type=5
    `
  },
  {
    number: 157,
    question: "Sales managers want to surface important field values based on the Opportunity stage. Which tool should an administrator use to meet the requirement?",
    options: {
      A: "Dynamic Forms",
      B: "Path Key Fields",
      C: "Opportunity Processes",
      D: "Workflow Rules"
    },
    correct: "B",
    explanation_en: `
Path Key Fields let you highlight stage-specific fields and guidance on the Path component to focus users on critical data per stage.

Reference: https://help.salesforce.com/s/articleView?id=sf.path_key_fields.htm&type=5
    `,
    explanation_pt: `
Path Key Fields permitem destacar campos e orientações específicas de cada estágio no componente Path, focando os usuários em dados críticos por estágio.

Referência: https://help.salesforce.com/s/articleView?id=sf.path_key_fields.htm&type=5
    `
  },
  {
    number: 158,
    question: "Cloud Kicks needs a streamlined solution to update the shipping address on selected Orders when the Account shipping address changes. How should the administrator deliver this requirement?",
    options: {
      A: "An autolaunched flow on Order page that updates all open orders when Account address changes",
      B: "An autolaunched flow on Account page that updates all open orders when Account address changes",
      C: "A screen flow on Order page letting reps choose updated address for open orders",
      D: "A screen flow on Account page letting reps choose updated address for open orders"
    },
    correct: "D",
    explanation_en: `
A Screen Flow on the Account page can prompt reps to select which open Orders to update with the new shipping address, offering control and clarity.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_build_screen.htm&type=5
    `,
    explanation_pt: `
Um Screen Flow na página de Account pode solicitar que os reps selecionem quais Orders em aberto atualizar com o novo endereço de envio, oferecendo controle e clareza.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_build_screen.htm&type=5
    `
  },
  {
    number: 159,
    question: "A screen flow creates Leads; when Lead Source = “Search Engine”, the flow must require selecting a specific search engine picklist; otherwise it should be hidden. How should the administrator complete this requirement?",
    options: {
      A: "Use a Decision element to direct users to a second screen when Lead Source = 'Search Engine'",
      B: "Use an Assignment element for when Lead Source = 'Search Engine' and another for other values",
      C: "Create a picklist for specific search engines and set conditional visibility when Lead Source = 'Search Engine'",
      D: "Use a picklist and a validation rule to conditionally show it when Lead Source = 'Search Engine'"
    },
    correct: "C",
    explanation_en: `
Use conditional visibility on the picklist screen component so it only appears when Lead Source equals 'Search Engine', and mark it required on that screen.

References:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screen_components_picklist.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screen_components_conditional_visibility.htm&type=5
    `,
    explanation_pt: `
Use visibilidade condicional no componente picklist para que ele apareça apenas quando Lead Source for 'Search Engine', e marque-o como obrigatório nessa tela.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screen_components_picklist.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screen_components_conditional_visibility.htm&type=5
    `
  },
  {
    number: 160,
    question: "The administrator is debugging a screen flow that creates Contacts. One of the variables in the flow is missing on the debug screen. What could cause this issue?",
    options: {
      A: "The Available for Input checkbox was unchecked",
      B: "The flow version is inactive",
      C: "The field type is unsupported by debugging",
      D: "The Available for Output checkbox was unchecked"
    },
    correct: "A",
    explanation_en: `
If a variable lacks “Available for Input”, it won’t appear in the Debug dialog for setting test values. Enable that checkbox to see it.

References:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_variables.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_debugging.htm&type=5
    `,
    explanation_pt: `
Se uma variável não tiver “Available for Input” marcada, não aparecerá na tela de Debug para definir valores de teste. Habilite essa opção para visualizá-la.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.flow_ref_variables.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.flow_debugging.htm&type=5
    `
  },
    {
    number: 161,
    question: "Cloud Kicks executives have noticed the Opportunity Expected Revenue field displays incorrect values. How should the administrator correct this?",
    options: {
      A: "Update the Expected Revenue associated with the stage",
      B: "Adjust the Forecast Category associated with the stage",
      C: "Modify the Closed Won value associated with the stage",
      D: "Change the Probability associated with the stage"
    },
    correct: "D",
    explanation_en: `
Expected Revenue = Amount × Probability. Incorrect Expected Revenue means the Probability picklist values per stage need updating to reflect actual win likelihood.

Reference: https://help.salesforce.com/s/articleView?id=sf.forecasts3_expected_revenue.htm&type=5
    `,
    explanation_pt: `
Expected Revenue = Amount × Probability. Expected Revenue incorreto indica que os valores de Probabilidade por estágio devem ser ajustados para refletir a probabilidade real de fechamento.

Referência: https://help.salesforce.com/s/articleView?id=sf.forecasts3_expected_revenue.htm&type=5
    `
  },
  {
    number: 162,
    question: "Users are unable to add recurring tasks in Salesforce. Which two solutions should the administrator use to ensure users can create repeating tasks? (Choose 2)",
    options: {
      A: "Enable creation of Recurring Tasks in Activity Settings",
      B: "Disable Shared Activities",
      C: "Add the 'Create Recurring Series of Tasks' field on Task page layouts",
      D: "Turn on Task Notifications Service"
    },
    correct: "A, C",
    explanation_en: `
A: Enable Recurring Tasks in Setup > Activity Settings.  
C: Add the “Create Recurring Series of Tasks” checkbox field to Task layouts so users can set recurrence.

Reference: https://help.salesforce.com/s/articleView?id=sf.tasks_repeating.htm&type=5
    `,
    explanation_pt: `
A: Habilite Tarefas Recorrentes em Configuração > Activity Settings.  
C: Adicione o campo “Create Recurring Series of Tasks” nos layouts de Task para permitir a recorrência.

Referência: https://help.salesforce.com/s/articleView?id=sf.tasks_repeating.htm&type=5
    `
  },
  {
    number: 163,
    question: "An administrator at Northern Trail Outfitters is unable to add a new user in Salesforce. What could cause this issue?",
    options: {
      A: "The Username is not a corporate email address",
      B: "The Username is less than 80 characters",
      C: "The Username is a fake email address",
      D: "The Username is already in use"
    },
    correct: "D",
    explanation_en: `
Usernames must be globally unique across all Salesforce orgs. If the desired username already exists, the system won’t allow creating a new user with that username.

Reference: https://help.salesforce.com/s/articleView?id=sf.users_add.htm&type=5
    `,
    explanation_pt: `
Usernames devem ser únicos globalmente em todas as orgs Salesforce. Se o username já estiver em uso, não será possível criar um novo usuário com ele.

Referência: https://help.salesforce.com/s/articleView?id=sf.users_add.htm&type=5
    `
  },
  {
    number: 164,
    question: "DreamHouse Realty has a master–detail relationship: Open House (parent) → Visitors (child). What field should the administrator add on Open House to track the number of visitors?",
    options: {
      A: "Roll-Up Summary",
      B: "Multi-Select Picklist",
      C: "Cross-Object Formula Field",
      D: "Indirect Lookup"
    },
    correct: "A",
    explanation_en: `
Roll-up Summary fields on the master can COUNT child records. Use COUNT of Visitors on Open House to display the number of visitor child records.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `,
    explanation_pt: `
Campos Roll-up Summary no objeto mestre podem CONTAR registros filhos. Use COUNT de Visitors em Open House para exibir o número de registros filhos.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&type=5
    `
  },
  {
    number: 165,
    question: "The administrator at Cloud Kicks deleted a custom field but realizes a business unit still uses it. What should the administrator consider when undeleting the field?",
    options: {
      A: "The field must be re-added to reports",
      B: "The field history will remain deleted",
      C: "The field needs to be restored from the Recycle Bin",
      D: "The field needs to be re-added to page layouts"
    },
    correct: "B",
    explanation_en: `
Undeleting within 15 days restores the custom field and its data, but Field History Tracking data for that field is permanently lost.

Reference: https://help.salesforce.com/s/articleView?id=sf.custom_field_delete.htm&type=5
    `,
    explanation_pt: `
Reverter a exclusão dentro de 15 dias recupera o campo e seus dados, mas o histórico de campo desse campo permanece perdido.

Referência: https://help.salesforce.com/s/articleView?id=sf.custom_field_delete.htm&type=5
    `
  },
  {
    number: 166,
    question: "An administrator needs to create a one-to-many relationship between two objects with limited access to child records. Which field type should the administrator use?",
    options: {
      A: "Roll-Up Summary",
      B: "Master-Detail Field",
      C: "Cross-Object Formula",
      D: "Lookup Field"
    },
    correct: "D",
    explanation_en: `
Lookup relationships create one-to-many links while respecting sharing and access—child record visibility remains governed by OWD and sharing.

Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `,
    explanation_pt: `
Lookup cria relacionamentos 1:N mantendo controle de acesso pelos padrões de compartilhamento—visibilidade dos registros filhos continua obedecendo OWD e regras de compartilhamento.

Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `
  },
  {
    number: 167,
    question: "Northern Trail Outfitters wants to use the Contact Hierarchy to display contact associations on Accounts. What should the administrator consider regarding Contact Hierarchy?",
    options: {
      A: "Contacts displayed respect record-level access per user",
      B: "Contact Hierarchy is limited to 3,000 contacts at once",
      C: "Customizing hierarchy columns changes the Recently Viewed Contacts list view",
      D: "Sharing settings are ignored by contacts displayed in the hierarchy"
    },
    correct: "A",
    explanation_en: `
Contact Hierarchy shows only contacts the user has permission to view—record-level sharing is enforced.

Reference: https://help.salesforce.com/s/articleView?id=sf.contacts_hierarchy.htm&type=5
    `,
    explanation_pt: `
A Hierarquia de Contatos exibe apenas os contatos que o usuário tem permissão de ver—compartilhamento em nível de registro é aplicado.

Referência: https://help.salesforce.com/s/articleView?id=sf.contacts_hierarchy.htm&type=5
    `
  },
  {
    number: 168,
    question: "An administrator created a Custom Report Type and a report but users cannot access it. Which two options could cause this issue? (Choose 2)",
    options: {
      A: "The custom report type is in development",
      B: "The users’ profile lacks 'View' access to the report type",
      C: "The org has reached its limit of custom report types",
      D: "The report is saved in a private folder"
    },
    correct: "A, D",
    explanation_en: `
A: Report Types in ‘In Development’ aren’t available to all users until deployed.  
D: Reports in a private folder are only visible to the owner.

Reference:  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_custom_report_types.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_folders.htm&type=5
    `,
    explanation_pt: `
A: Report Types em ‘In Development’ não ficam disponíveis para todos até serem implantados.  
D: Relatórios em pasta privada só são visíveis ao proprietário.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_custom_report_types.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.reports_builder_folders.htm&type=5
    `
  },
  {
    number: 169,
    question: "Sales reps at Ursa Major Solar need help prioritizing deals. Which Einstein feature should the administrator enable?",
    options: {
      A: "Einstein Lead Scoring",
      B: "Einstein Search Personalization",
      C: "Einstein Activity Capture",
      D: "Einstein Opportunity Scoring"
    },
    correct: "D",
    explanation_en: `
Einstein Opportunity Scoring uses AI to assign a win probability score to each Opportunity, helping reps focus on high-value deals.

Reference: https://help.salesforce.com/s/articleView?id=sf.einstein_sales_oppty_scoring.htm&type=5
    `,
    explanation_pt: `
Einstein Opportunity Scoring usa IA para atribuir uma pontuação de probabilidade de sucesso a cada Opportunity, ajudando reps a focar em negócios de alto valor.

Referência: https://help.salesforce.com/s/articleView?id=sf.einstein_sales_oppty_scoring.htm&type=5
    `
  },
  {
    number: 170,
    question: "A user cannot log in to Salesforce. What should the administrator review to identify why the user is unable to log in?",
    options: {
      A: "Security Token",
      B: "Password History",
      C: "Password Policies",
      D: "Login History"
    },
    correct: "D",
    explanation_en: `
Login History shows failed login attempts, error messages, IP, and timestamp—ideal to troubleshoot login failures.

Reference: https://help.salesforce.com/s/articleView?id=sf.monitoring_login_history.htm&type=5
    `,
    explanation_pt: `
O Login History exibe tentativas de login falhas, mensagens de erro, IP e horários—ideal para solucionar falhas de login.

Referência: https://help.salesforce.com/s/articleView?id=sf.monitoring_login_history.htm&type=5
    `
  },
  {
    number: 171,
    question: "Once an Opportunity reaches the Negotiation stage, the Amount field becomes required for Sales Users, but Managers need to move to that stage without entering an Amount. How should the administrator configure this?",
    options: {
      A: "Make the field required for all users",
      B: "Create a formula field to populate Amount for Managers",
      C: "Assign the Manager profile to administrators",
      D: "Configure a validation rule"
    },
    correct: "D",
    explanation_en: `
Use a Validation Rule: IF(StageName='Negotiation' && Amount = null && $Profile.Name <> 'Sales Manager') then error. This enforces Amount only for Sales users.

Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `,
    explanation_pt: `
Use uma Validation Rule: IF(StageName='Negotiation' && ISBLANK(Amount) && $Profile.Name <> 'Sales Manager') ERRO. Isso exige Amount apenas para Sales Users.

Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `
  },
  {
    number: 172,
    question: "Northern Trail Outfitters hired interns to enter Leads and wants to identify those records. What approach should the administrator take?",
    options: {
      A: "Set up a Web-to-Lead form for interns to use",
      B: "Define a Lead Record Type and assign it to interns",
      C: "Create a separate Lead Lightning App",
      D: "Update the active Lead Assignment Rules"
    },
    correct: "B",
    explanation_en: `
Record Types let users select a type on creation. Assigning interns a special Lead record type distinguishes their entries.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Record Types permitem que usuários selecionem um tipo ao criar. Atribuir aos interns um record type específico diferencia suas entradas.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 173,
    question: "The Sales Manager wants insights at the start of each day. Which three standard Lightning components should be added to the homepage? (Choose 3)",
    options: {
      A: "Activities",
      B: "Path",
      C: "Assistant",
      D: "Key Deals",
      E: "Performance Chart"
    },
    correct: "A, C, D",
    explanation_en: `
A: Activities shows tasks/events for the day.  
C: Assistant surfaces AI-driven recommendations.  
D: Key Deals highlights top-scoring Opportunities.

Reference: https://help.salesforce.com/s/articleView?id=sf.home_components.htm&type=5
    `,
    explanation_pt: `
A: Activities exibe tarefas/eventos do dia.  
C: Assistant apresenta recomendações baseadas em IA.  
D: Key Deals destaca as Opportunities com maior pontuação.

Referência: https://help.salesforce.com/s/articleView?id=sf.home_components.htm&type=5
    `
  },
  {
    number: 174,
    question: "What three settings should an administrator configure to make it easy for approvers to respond to approval requests? (Choose 3)",
    options: {
      A: "Allow approvals via Chatter",
      B: "Enable Email Approval Response",
      C: "Specify initial submission actions",
      D: "Add the Items to Approve component to Homepage",
      E: "Create a flow to auto-approve all records"
    },
    correct: "A, B, D",
    explanation_en: `
A: Enables one-click approvals in Chatter feeds.  
B: Allows APPROVE/REJECT via email replies.  
D: Items to Approve component lists pending requests on the Home page.

References:  
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_email.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_one_click.htm&type=5
    `,
    explanation_pt: `
A: Permite aprovações em um clique via Chatter feeds.  
B: Permite APPROVE/REJECT em respostas de e-mail.  
D: O componente Items to Approve lista solicitações pendentes na página inicial.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.approvals_considerations.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_email.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.approvals_one_click.htm&type=5
    `
  },
  {
    number: 175,
    question: "New Leads need to be routed to the correct salesperson based on Lead Address. How should the administrator configure this requirement?",
    options: {
      A: "Create a Formula Field",
      B: "Use Lead Assignment Rules",
      C: "Assign with an Escalation Rule",
      D: "Configure a Validation Rule"
    },
    correct: "B",
    explanation_en: `
Lead Assignment Rules automatically route new Leads to users or queues based on address criteria (city, state, country).

Reference: https://help.salesforce.com/s/articleView?id=sf.leads_assignment_rules.htm&type=5
    `,
    explanation_pt: `
Lead Assignment Rules roteiam automaticamente novos Leads para usuários ou filas com base em critérios de endereço (cidade, estado, país).

Referência: https://help.salesforce.com/s/articleView?id=sf.leads_assignment_rules.htm&type=5
    `
  },
  {
    number: 176,
    question: "An administrator at DreamHouse Realty wants an easier way to assign agent capacity and skill set. Which feature should the administrator enable?",
    options: {
      A: "Knowledge Management",
      B: "Omni-Channel",
      C: "Escalation Rules",
      D: "Territory Management"
    },
    correct: "B",
    explanation_en: `
Omni-Channel routes work items based on agent capacity and skills, ensuring proper distribution.

Reference: https://help.salesforce.com/s/articleView?id=sf.omnichannel_overview.htm&type=5
    `,
    explanation_pt: `
Omni-Channel direciona tarefas com base na capacidade e habilidades do agente, garantindo distribuição adequada.

Referência: https://help.salesforce.com/s/articleView?id=sf.omnichannel_overview.htm&type=5
    `
  },
  {
    number: 177,
    question: "Universal Containers has a Lightning record page component showing LinkedIn data. They want to show it only to Sales Users on mobile. Which component visibility filters should the admin use? (Choose 2)",
    options: {
      A: "Filter: User Profile Name = Sales User",
      B: "Filter: Form Factor = Phone",
      C: "Filter: View = Mobile/Tablet",
      D: "Filter: User Role Name = Sales User"
    },
    correct: "A, B",
    explanation_en: `
A: Restrict to Profile = Sales User.  
B: Restrict Form Factor to Phone to show only on mobile devices.

Reference: https://help.salesforce.com/s/articleView?id=sf.app_builder_page_visibility_rules.htm&type=5
    `,
    explanation_pt: `
A: Restrinja ao Profile = Sales User.  
B: Restrinja Form Factor para Phone para exibir apenas em dispositivos móveis.

Referência: https://help.salesforce.com/s/articleView?id=sf.app_builder_page_visibility_rules.htm&type=5
    `
  },
  {
    number: 178,
    question: "Sales reps use discounts on Opportunities but must manually apply them to related Opportunity Products after closing. How should the administrator automate this?",
    options: {
      A: "Flow Builder",
      B: "Approval Process",
      C: "Prebuilt Macro",
      D: "Formula Field"
    },
    correct: "A",
    explanation_en: `
Use an autolaunched Flow triggered on Closed Won to loop Opportunity Products and update their discount fields automatically.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_build_overview.htm&type=5
    `,
    explanation_pt: `
Use um Flow autoiniciado acionado em Closed Won para iterar pelos Opportunity Products e atualizar automaticamente os campos de desconto.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_build_overview.htm&type=5
    `
  },
  {
    number: 179,
    question: "DreamHouse Realty agents are double-booking Open House event nights. The Events Manager wants a submission process to help agents request event dates. How should the administrator accomplish this?",
    options: {
      A: "Create a Workflow Rule to update Event Date field",
      B: "Create an Approval Process on the Campaign object",
      C: "Create a Sharing Rule so agents can view events",
      D: "Create a Campaign for agents to request event dates"
    },
    correct: "B",
    explanation_en: `
Use an Approval Process on Campaigns (used for events) to let agents submit date requests, route for approval, and prevent double booking.

Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_overview.htm&type=5
    `,
    explanation_pt: `
Use um Approval Process em Campaigns (usado para eventos) para que agents submetam solicitações de data, sejam roteados para aprovação e impeçam double booking.

Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_overview.htm&type=5
    `
  },
  {
    number: 180,
    question: "Cloud Kicks intends to protect data with backups using the Data Export Service. Which two considerations should the administrator remember when scheduling the export? (Choose 2)",
    options: {
      A: "Metadata backups are limited by sandbox refresh intervals",
      B: "Data backups are limited to weekly or monthly intervals",
      C: "Data Export Service should be run from a sandbox",
      D: "Metadata backups must be run via a separate process"
    },
    correct: "B, D",
    explanation_en: `
B: Data Export Service runs only weekly (or monthly for some editions).  
D: Metadata isn’t included—use Metadata API or change sets separately for metadata backups.

Reference: https://help.salesforce.com/s/articleView?id=sf.data_export.htm&type=5
    `,
    explanation_pt: `
B: O Data Export Service executa apenas semanalmente (ou mensalmente em algumas edições).  
D: Metadata não é incluído—use Metadata API ou change sets separadamente para backups de metadata.

Referência: https://help.salesforce.com/s/articleView?id=sf.data_export.htm&type=5
    `
  },
  {
    number: 181,
    question: "Cloud Kicks needs to change the owner of a Case when it has been open for more than 7 days. How should the administrator complete this requirement?",
    options: {
      A: "Auto-Response Rules",
      B: "Validation Rule",
      C: "Escalation Rule",
      D: "Assignment Rule"
    },
    correct: "C",
    explanation_en: `
Case Escalation Rules can reassign Cases based on time triggers (e.g., open >7 days) and send notifications.

Reference: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `,
    explanation_pt: `
Case Escalation Rules podem reatribuir Cases com gatilhos de tempo (ex: >7 dias abertos) e enviar notificações.

Referência: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `
  },
  {
    number: 182,
    question: "When a support agent changes Account Status to 'Audited', the Audited Date field should auto-update to today’s date. Which tool should the administrator use?",
    options: {
      A: "Approval Process",
      B: "Formula Field",
      C: "Flow Builder",
      D: "Validation Rule"
    },
    correct: "B",
    explanation_en: `
A formula field using IF(Status='Audited', TODAY(), null) dynamically displays today’s date when status is 'Audited'.

Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_formulas.htm&type=5
    `,
    explanation_pt: `
Um campo fórmula com IF(Status='Audited', TODAY(), null) exibe dinamicamente a data de hoje quando o status for 'Audited'.

Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_formulas.htm&type=5
    `
  },
  {
    number: 183,
    question: "AW Computing wants to prevent users from updating the Account Annual Revenue to a negative value or above $100 billion. How should the administrator accomplish this?",
    options: {
      A: "Create a Validation Rule that errors if Annual Revenue < 0 or > 100 000 000 000",
      B: "Build a scheduled report displaying invalid revenues",
      C: "Make the Annual Revenue field required on page layouts",
      D: "Enable Annual Revenue limits in Setup with 0 min and 100 billion max"
    },
    correct: "A",
    explanation_en: `
Validation Rule:  
AND( OR(AnnualRevenue < 0, AnnualRevenue > 100000000000), ISCHANGED(AnnualRevenue) )  
throws an error to enforce valid ranges.

Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `,
    explanation_pt: `
Validation Rule:  
AND( OR(AnnualRevenue < 0, AnnualRevenue > 100000000000), ISCHANGED(AnnualRevenue) )  
gera um erro para impor faixas válidas.

Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules.htm&type=5
    `
  },
  {
    number: 184,
    question: "DreamHouse Realty needs a templated mortgage calculator flow from AppExchange to generate loan leads within budget and 30 days. Which AppExchange item should the administrator use?",
    options: {
      A: "Lightning Data",
      B: "Lightning Community",
      C: "Flow Solutions",
      D: "Bolt Solutions"
    },
    correct: "C",
    explanation_en: `
Flow Solutions are prebuilt Screen Flows and automations on AppExchange—ideal for mortgage calculators and lead generation templates.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_solutions.htm&type=5
    `,
    explanation_pt: `
Flow Solutions são Screen Flows e automações pré-construídas no AppExchange—ideais para calculadoras de hipoteca e templates de geração de leads.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_solutions.htm&type=5
    `
  },
  {
    number: 185,
    question: "The Call Center Manager at Ursa Major Solar wants a Case dashboard drillable by Case Origin, Status, and Owner. What should the administrator add to the dashboard to fulfill this request?",
    options: {
      A: "Dashboard Filter",
      B: "Bucket Column",
      C: "Dashboard Component",
      D: "Combination Chart"
    },
    correct: "A",
    explanation_en: `
Add Dashboard Filters for Origin, Status, and Owner—allowing users to drill into any component by those fields without altering reports.

Reference: https://help.salesforce.com/s/articleView?id=sf.dashboards_filters.htm&type=5
    `,
    explanation_pt: `
Adicione Dashboard Filters para Origin, Status e Owner—permitindo que usuários detalhem qualquer componente por esses campos sem alterar relatórios.

Referência: https://help.salesforce.com/s/articleView?id=sf.dashboards_filters.htm&type=5
    `
  },
    {
    number: 186,
    question: "Universal Container wants to prevent its Service team from accessing Deal records. While Service users are unable to access Deal list views, they can still find Deal records via search. Which options should the administrator adjust to fully restrict access?",
    options: {
      A: "Record settings and Search Index",
      B: "Permissions and Tab Visibility",
      C: "App Permissions and Search Terms",
      D: "Page Layouts and Field-Level Security"
    },
    correct: "B",
    explanation_en: `
To completely block access, remove object-level CRUD via Profiles or Permission Sets (Permissions) and hide the Deal tab (Tab Visibility). Without tab visibility and object permissions, search will not return those records.

References:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_permissions.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_tabs.htm&type=5
    `,
    explanation_pt: `
Para bloquear totalmente o acesso, remova o CRUD do objeto via Perfis ou Permission Sets (Permissões) e oculte a guia Deal (Visibilidade da Guia). Sem visibilidade da guia e permissões de objeto, a pesquisa não retornará esses registros.

Referências:
https://help.salesforce.com/s/articleView?id=sf.users_profiles_permissions.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.customize_tabs.htm&type=5
    `
  },
  {
    number: 187,
    question: "Ursa Major Solar wants to share all Cross-Sell Opportunities with a team of subject matter experts. OWD for Opportunities is Private. How should the administrator accomplish this?",
    options: {
      A: "Add experts to a Public Group and use a Criteria-Based Sharing Rule",
      B: "Change OWD to Public Read/Write",
      C: "Enable Territory Management and assign experts to the same territory",
      D: "Create a Role for experts and use an Owner-Based Sharing Rule"
    },
    correct: "A",
    explanation_en: `
Use a Criteria-Based Sharing Rule on Opportunity where Type = 'Cross-Sell', shared with a Public Group of subject matter experts.

References:
https://help.salesforce.com/s/articleView?id=sf.sharing_criteria_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.public_groups.htm&type=5
    `,
    explanation_pt: `
Use uma Criteria-Based Sharing Rule em Opportunity onde Type = 'Cross-Sell', compartilhada com um Public Group de especialistas.

Referências:
https://help.salesforce.com/s/articleView?id=sf.sharing_criteria_rules.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.public_groups.htm&type=5
    `
  },
  {
    number: 188,
    question: "Cloud Kicks has a Screen Flow with two questions on the same screen, but only one is needed at a time. How should the administrator show only the necessary question?",
    options: {
      A: "Use a new version of the flow for each scenario",
      B: "Use a Decision element and a new Screen for each question",
      C: "Use Conditional Visibility to hide the unnecessary question",
      D: "Use branching in the flow screen to show the proper scenario"
    },
    correct: "C",
    explanation_en: `
Conditional Visibility on Screen components can show or hide individual questions based on prior answers without splitting into multiple screens or versions.

Reference: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screencmp.htm&type=5
    `,
    explanation_pt: `
Visibilidade Condicional em componentes de tela permite exibir ou ocultar perguntas individuais com base em respostas anteriores, sem dividir em várias telas ou versões.

Referência: https://help.salesforce.com/s/articleView?id=sf.flow_ref_elements_screencmp.htm&type=5
    `
  },
  {
    number: 189,
    question: "AW Computing wants to improve its Case Lightning Record Page by including: • A filtered component showing a bold message for Critical record types • A quick way to update Account Status from the Case layout. Which two components should the administrator use? (Choose 2)",
    options: {
      A: "Related List",
      B: "Related Record",
      C: "Record Details",
      D: "Rich Text"
    },
    correct: "B, D",
    explanation_en: `
B: Related Record lets users view/edit parent fields (Account Status) inline on the Case page.  
D: Rich Text supports formatted text (bold) and can use conditional visibility for Critical record types.

References:
https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_related_record.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_rich_text.htm&type=5
    `,
    explanation_pt: `
B: Related Record permite visualizar/editar campos do registro pai (Account Status) inline na página de Case.  
D: Rich Text suporta texto formatado (negrito) e visibilidade condicional para tipos de registro Critical.

Referências:
https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_related_record.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_rich_text.htm&type=5
    `
  },
  {
    number: 190,
    question: "The Administrator at Universal Container wants to add branding to Salesforce. Which two considerations should they keep in mind? (Choose 2)",
    options: {
      A: "Only one theme can be active at a time, and it applies org-wide",
      B: "Themes apply to Salesforce Classic and the mobile app",
      C: "Up to 150 custom themes can be created from the built-ins",
      D: "Chatter External users see the built-in Lightning theme only"
    },
    correct: "A, D",
    explanation_en: `
A: Only one active theme at a time, applied across the org.  
D: Chatter External users cannot see custom themes; they remain on the default Lightning look.

Reference: https://help.salesforce.com/s/articleView?id=sf.themes_overview.htm&type=5
    `,
    explanation_pt: `
A: Apenas um tema ativo por vez, aplicado em toda a org.  
D: Chatter External users não veem temas personalizados; permanecem no tema Lightning padrão.

Referência: https://help.salesforce.com/s/articleView?id=sf.themes_overview.htm&type=5
    `
  },
  {
    number: 191,
    question: "An admin supporting a global team has been asked to configure Company Settings. Which two options should they configure? (Choose 2)",
    options: {
      A: "Login Hours",
      B: "Password Policy",
      C: "Default Language",
      D: "Currency Locale"
    },
    correct: "C, D",
    explanation_en: `
C: Default Language sets the UI language org-wide (overridable per user).  
D: Currency Locale controls number and currency formats globally.

References:
https://help.salesforce.com/s/articleView?id=sf.admin_supported_languages.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_supported_currencies.htm&type=5
    `,
    explanation_pt: `
C: Default Language define o idioma da UI na org (substituível por usuário).  
D: Currency Locale controla formatos numéricos e de moeda globalmente.

Referências:
https://help.salesforce.com/s/articleView?id=sf.admin_supported_languages.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.admin_supported_currencies.htm&type=5
    `
  },
  {
    number: 192,
    question: "Cloud Kicks needs to automatically route support Cases—regardless of creation method—to the proper queue based on Case Priority. Which tool should the administrator use?",
    options: {
      A: "Email-to-Case",
      B: "Assignment Rules",
      C: "Auto-Response Rules",
      D: "Web-to-Case"
    },
    correct: "B",
    explanation_en: `
Case Assignment Rules evaluate new Cases (via UI, email, web, API) and assign them to queues or users based on Priority criteria.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `,
    explanation_pt: `
Case Assignment Rules avaliam novos Cases (UI, email, web, API) e os atribuem a filas ou usuários com base em critérios de Priority.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `
  },
  {
    number: 193,
    question: "DreamHouse Realty needs consistent picklist values in the Category field on Accounts and Cases, with values respective to record types. Which two features should the administrator use? (Choose 2)",
    options: {
      A: "Dependent Picklist",
      B: "Global Picklist",
      C: "Multi-Select Picklist",
      D: "Custom Picklist"
    },
    correct: "A, B",
    explanation_en: `
A: Dependent Picklists tailor available values per Record Type selection.  
B: Global Picklist Value Sets ensure consistency across objects.

References:
https://help.salesforce.com/s/articleView?id=sf.fields_about_dependent_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.picklist_global_picklists.htm&type=5
    `,
    explanation_pt: `
A: Dependent Picklists ajustam valores disponíveis conforme Record Type.  
B: Global Picklist Value Sets garantem consistência entre objetos.

Referências:
https://help.salesforce.com/s/articleView?id=sf.fields_about_dependent_picklists.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.picklist_global_picklists.htm&type=5
    `
  },
  {
    number: 194,
    question: "At Universal Containers the Lead has a custom Product Category field. They want this data on the Opportunity after conversion. What action should the administrator take?",
    options: {
      A: "Map the Lead custom field to the Product’s Product Category field",
      B: "Create a Workflow to update Opportunity fields from the Lead",
      C: "Create a custom field on Opportunity and map the two fields",
      D: "Configure the Product Category picklist on Product"
    },
    correct: "C",
    explanation_en: `
Create a matching custom field on Opportunity, then map the Lead’s Product Category to that field under Lead Field Mapping in Setup.

Reference: https://help.salesforce.com/s/articleView?id=sf.leads_customize_map.htm&type=5
    `,
    explanation_pt: `
Crie um campo customizado no Opportunity correspondente e mapear o Product Category do Lead para ele em Lead Field Mapping no Setup.

Referência: https://help.salesforce.com/s/articleView?id=sf.leads_customize_map.htm&type=5
    `
  },
  {
    number: 195,
    question: "Northern Trail Outfitters wants to enforce strong passwords. Which three password policies should the administrator configure? (Choose 3)",
    options: {
      A: "Maximum invalid login attempts",
      B: "Prohibited password values",
      C: "Require use of Password Manager App",
      D: "Password complexity requirements",
      E: "Number of days until expiration"
    },
    correct: "A, D, E",
    explanation_en: `
A: Limits invalid login attempts before lockout.  
D: Enforces length, character variety.  
E: Forces periodic password changes.

Reference: https://help.salesforce.com/s/articleView?id=sf.security_password_policies.htm&type=5
    `,
    explanation_pt: `
A: Limita tentativas de login inválidas antes de bloquear.  
D: Aplica requisitos de comprimento e caracteres.  
E: Obriga mudanças periódicas de senha.

Referência: https://help.salesforce.com/s/articleView?id=sf.security_password_policies.htm&type=5
    `
  },
  {
    number: 196,
    question: "AW Computing needs Report folders: Support Reports with subfolders Helpdesk and R&D. Support Agents can run Helpdesk but not view R&D. Managers can view/edit all. Which two ways should these folders be shared? (Choose 2)",
    options: {
      A: "Share the R&D folder with Support Managers with Edit Access",
      B: "Share the Helpdesk folder with Support Agents with View Access",
      C: "Share the Support Reports folder with Support Managers with Edit Access",
      D: "Share the Support Reports folder with Support Agents with View Access"
    },
    correct: "B, C",
    explanation_en: `
B: Grant Agents View on Helpdesk.  
C: Grant Managers Edit on the parent Support Reports so they inherit access to all subfolders.

Reference: https://help.salesforce.com/s/articleView?id=sf.reports_builder_folders_sharing.htm&type=5
    `,
    explanation_pt: `
B: Conceda View a Agents na Helpdesk.  
C: Conceda Edit a Managers na pasta pai Support Reports para herdarem acesso a todas as subpastas.

Referência: https://help.salesforce.com/s/articleView?id=sf.reports_builder_folders_sharing.htm&type=5
    `
  },
  {
    number: 197,
    question: "The Sales Manager wants a quick way to view/edit Opportunities in their pipeline expected to close in the next 90 days. What should the administrator do?",
    options: {
      A: "Create a scheduled report emailed daily",
      B: "Enable Sales Console with tabs per Opportunity",
      C: "Create an Opportunity List View and use Kanban",
      D: "Build a Dashboard component showing those Opportunities"
    },
    correct: "C",
    explanation_en: `
An Opportunity List View filtered on Close Date within 90 days, with Kanban view enabled, lets reps drag cards between stages to update quickly.

References:  
https://help.salesforce.com/s/articleView?id=sf.lex_list_views.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.kanban_view.htm&type=5
    `,
    explanation_pt: `
Uma List View de Opportunity filtrada em Close Date nos próximos 90 dias, com Kanban habilitado, permite que reps arrastem cards entre estágios para atualização rápida.

Referências:  
https://help.salesforce.com/s/articleView?id=sf.lex_list_views.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.kanban_view.htm&type=5
    `
  },
  {
    number: 198,
    question: "Which two objects are customizable via the Stage Setup Flow?",
    options: {
      A: "Leads",
      B: "Campaigns",
      C: "Opportunities",
      D: "Campaign Members"
    },
    correct: "A, C",
    explanation_en: `
The Stage Setup Flow guides admins to configure Stages for Leads and Opportunities.

Reference: https://help.salesforce.com/s/articleView?id=sf.stages_setup_flow_overview.htm&type=5
    `,
    explanation_pt: `
O Stage Setup Flow orienta admins na configuração de Stages para Leads e Opportunities.

Referência: https://help.salesforce.com/s/articleView?id=sf.stages_setup_flow_overview.htm&type=5
    `
  },
  {
    number: 199,
    question: "Universal Containers has three lines of business, each needing specific fields for Sales and Service teams. How should the administrator configure this?",
    options: {
      A: "Create two Record Types, each with 3 Page Layouts",
      B: "Create one Record Type with six Page Layouts",
      C: "Create three Record Types, each with 2 Page Layouts",
      D: "Create six Record Types, each with 1 Page Layout"
    },
    correct: "C",
    explanation_en: `
Three lines of business → three Record Types; Sales vs. Service layouts → two Page Layouts per Record Type → total six layouts across three types.

Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Três linhas de negócios → três Record Types; layouts Sales vs. Service → dois Page Layouts por Record Type → total de seis layouts em três tipos.

Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 200,
    question: "Universal Containers introduced a new product and wants to automatically share all associated Cases with two lead engineers. OWD is Private. What should the administrator do?",
    options: {
      A: "Create a Queue and a Criteria-Based Sharing Rule",
      B: "Create a Predefined Case Team and an Assignment Rule",
      C: "Create a User-Based Sharing Rule and an ad-hoc Case Team",
      D: "Create an Auto-Response Rule and a Public Group"
    },
    correct: "A",
    explanation_en: `
A queue holds Cases; use an Assignment Rule to route new Cases referencing the product into that queue, then engineers assigned to the queue get read/write access.

References:
https://help.salesforce.com/s/articleView?id=sf.queues_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.sharing_criteria.htm&type=5
    `,
    explanation_pt: `
Uma queue armazena Cases; use uma Assignment Rule para direcionar novos Cases com o produto para essa queue, e os engenheiros nela atribuídos recebem acesso de leitura/escrita.

Referências:
https://help.salesforce.com/s/articleView?id=sf.queues_overview.htm&type=5  
https://help.salesforce.com/s/articleView?id=sf.sharing_criteria.htm&type=5
    `
  },
  {
    number: 201,
    question: "Northern Trail Outfitters has deployed My Domain. The CMO wants users to log in using the branded URL, with a grace period for bookmark updates. How should the administrator configure My Domain policies?",
    options: {
      A: "Set the Login Policy to require login from the My Domain URL",
      B: "Set the Redirect Policy to Do Not Redirect",
      C: "Set the Redirect Policy to 'Redirect with a Warning' within the domain",
      D: "Prevent login from login.salesforce.com via Login Policy"
    },
    correct: "C",
    explanation_en: `
Use "Redirect with a Warning" so users hitting login.salesforce.com are sent to the My Domain URL and see a notice to update bookmarks before enforcement.

Reference: https://help.salesforce.com/s/articleView?id=sf.domain_mgmt_redirect.htm&type=5
    `,
    explanation_pt: `
Use "Redirect with a Warning" para que usuários acessando login.salesforce.com sejam levados à URL My Domain com aviso para atualizar os favoritos antes da aplicação total.

Referência: https://help.salesforce.com/s/articleView?id=sf.domain_mgmt_redirect.htm&type=5
    `
  },
    {
    number: 202,
    question: "Ursa Major Solar has service level agreements (SLAs) routed to support queues. Cases that meet the 24-hour SLA need to be automatically reassigned to the next-tier queue. Which feature should be used to fulfill this requirement?",
    options: {
      A: "Einstein Case Routing",
      B: "Auto-response rule",
      C: "Case assignment rule",
      D: "Case escalation rule"
    },
    correct: "D",
    explanation_en: `
Case Escalation Rules allow you to automatically change the owner (or queue) of cases that meet time-based criteria, such as exceeding a 24-hour SLA, and notify the next-tier support team.  
Reference: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `,
    explanation_pt: `
Regras de Escalonamento de Caso permitem alterar automaticamente o proprietário (ou fila) de casos que atendem critérios baseados em tempo, como ultrapassar um SLA de 24 horas, e notificar a equipe de suporte do próximo nível.  
Referência: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `
  },
  {
    number: 203,
    question: "Cloud Kicks wants to track shoe designs by product. Shoe designs should not be deletable, and there can be multiple designs for one product across various stages. Which two steps should the administrator configure to meet this requirement? (Choose 2)",
    options: {
      A: "Add a custom master-detail field for shoe designs on the Product object",
      B: "Create a custom object for shoe designs",
      C: "Use the standard object for designs",
      D: "Configure a custom lookup field for shoe designs on the Product object"
    },
    correct: "B, D",
    explanation_en: `
B: Creating a custom object for Shoe Design lets you store multiple design records independently of Product.  
D: A lookup field on Shoe Design linking to Product allows many designs per product. Use validation rules or remove delete permission to prevent deletions.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_object_relationships_overview.htm&type=5
    `,
    explanation_pt: `
B: Criar um objeto customizado Shoe Design permite armazenar vários registros de design independentemente do Product.  
D: Um campo de pesquisa (lookup) em Shoe Design ligado a Product permite múltiplos designs por produto. Use regras de validação ou remova permissão de exclusão para impedir deleções.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_object_relationships_overview.htm&type=5
    `
  },
  {
    number: 204,
    question: "Sales reps at Ursa Major Solar are having difficulty managing deals. The leadership team has asked the administrator to help sales reps prioritize and close more deals. Which feature should the administrator configure?",
    options: {
      A: "Einstein Activity Capture",
      B: "Einstein Opportunity Scoring",
      C: "Einstein Search Personalization",
      D: "Einstein Lead Scoring"
    },
    correct: "B",
    explanation_en: `
Einstein Opportunity Scoring uses AI to assign each opportunity a win probability score (1–99), helping reps focus on high-value deals.  
Reference: https://help.salesforce.com/s/articleView?id=sf.einstein_sales_oppty_scoring.htm&type=5
    `,
    explanation_pt: `
Einstein Opportunity Scoring usa IA para atribuir a cada oportunidade uma pontuação de probabilidade de vitória (1–99), ajudando os reps a focar em negócios de alto valor.  
Referência: https://help.salesforce.com/s/articleView?id=sf.einstein_sales_oppty_scoring.htm&type=5
    `
  },
  {
    number: 205,
    question: "Northern Trail Outfitters has hired interns to enter Leads into Salesforce and needs a way to identify these new records from existing leads. What approach should the administrator take to meet this requirement?",
    options: {
      A: "Create a separate Lead Lightning App",
      B: "Define a record type and assign it to the interns",
      C: "Set up Web-to-Lead for the interns' use",
      D: "Update the active Lead Assignment Rules"
    },
    correct: "B",
    explanation_en: `
Defining a distinct Record Type for interns lets them select that type when creating leads, making it easy to filter and identify intern-entered records.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Definir um Record Type distinto para estagiários permite que eles selecionem esse tipo ao criar leads, facilitando filtrar e identificar registros inseridos por eles.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 206,
    question: "Ursa Major Solar has a Path on Case. They want to require users to follow Status values as ordered on the Path. Agents should be prohibited from reverting Cases to a previous Status. Which feature should an administrator use?",
    options: {
      A: "Predefined Field Values",
      B: "Global Value Picklists",
      C: "Dependent Picklists",
      D: "Validation Rules"
    },
    correct: "D",
    explanation_en: `
Validation Rules can compare the prior and new Status values and block changes that move backward along the defined Path sequence.  
Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `,
    explanation_pt: `
Regras de Validação podem comparar os valores anterior e novo de Status e bloquear alterações que revertam ao longo da sequência definida no Path.  
Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `
  },
  {
    number: 207,
    question: "An administrator at Northern Trail Outfitters is unable to add a new user in Salesforce. What could cause this issue?",
    options: {
      A: "The username is already in use in another organization",
      B: "The username is restricted to a domain specific to My Domain",
      C: "The email address used for the username has a contact record",
      D: "The email used for the username is not a corporate email address"
    },
    correct: "A",
    explanation_en: `
Usernames must be globally unique across all Salesforce orgs. If the chosen username already exists elsewhere, it cannot be used again.  
Reference: https://help.salesforce.com/s/articleView?id=sf.admin_usermgmt_add.htm&type=5
    `,
    explanation_pt: `
Usernames devem ser globalmente únicos em todas as orgs Salesforce. Se o nome de usuário já existir em outra org, não poderá ser reutilizado.  
Referência: https://help.salesforce.com/s/articleView?id=sf.admin_usermgmt_add.htm&type=5
    `
  },
  {
    number: 208,
    question: "An administrator at Universal Containers has been asked to prevent users from accessing Salesforce from outside their network. What are two considerations for this configuration? (Choose 2)",
    options: {
      A: "IP address restrictions are set on the profile or globally for the org",
      B: "Assign Single Sign-On to a permission set to allow users to log in when outside the network",
      C: "Enforce Login IP Ranges on Every Request must be selected to enforce IP restrictions",
      D: "Restrict U2F Security Keys on the user's profile to enforce login hours"
    },
    correct: "A, C",
    explanation_en: `
A: IP ranges can be set at profile level (or via Session Settings globally) to define trusted networks.  
C: Enforce Login IP Ranges on Every Request ensures API calls and UI logins respect those ranges.  
Reference: https://help.salesforce.com/s/articleView?id=sf.security_networkaccess.htm&type=5
    `,
    explanation_pt: `
A: Faixas de IP podem ser definidas no nível de perfil (ou globalmente em Session Settings) para delimitar redes confiáveis.  
C: “Enforce Login IP Ranges on Every Request” garante que chamadas API e logins UI respeitem essas faixas.  
Referência: https://help.salesforce.com/s/articleView?id=sf.security_networkaccess.htm&type=5
    `
  },
  {
    number: 209,
    question: "An administrator at Northern Trail Outfitters is creating a validation rule. Which two functions should the administrator configure? (Choose 2)",
    options: {
      A: "Formula return type",
      B: "Error condition formula",
      C: "Error message location",
      D: "Rule active date"
    },
    correct: "B, C",
    explanation_en: `
B: The Error Condition Formula defines when the rule fires (TRUE blocks save).  
C: Error Message Location specifies where the user sees the validation error on the page.  
Reference: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `,
    explanation_pt: `
B: A Fórmula de Condição de Erro define quando a regra dispara (TRUE bloqueia o salvamento).  
C: A Localização da Mensagem de Erro indica onde o usuário vê o erro de validação na página.  
Referência: https://help.salesforce.com/s/articleView?id=sf.validation_rules_overview.htm&type=5
    `
  },
  {
    number: 210,
    question: "An administrator is planning to use Data Loader to mass import new records to a custom object from an external API. What will the administrator need to do to use Data Loader?",
    options: {
      A: "Add a permission set that allows them to import data",
      B: "Append their security token at the end of their password to log in",
      C: "Use the Data Import Wizard to mass import custom object records",
      D: "Reset their password and their security token"
    },
    correct: "B",
    explanation_en: `
When logging in via Data Loader from an untrusted IP, you must append your personal security token to your password.  
Reference: https://help.salesforce.com/s/articleView?id=sf.data_loader.htm&type=5
    `,
    explanation_pt: `
Ao fazer login via Data Loader de um IP não confiável, é necessário concatenar seu security token pessoal ao final da senha.  
Referência: https://help.salesforce.com/s/articleView?id=sf.data_loader.htm&type=5
    `
  },
  {
    number: 211,
    question: "Which setting on a profile makes a tab hidden in the All App Launcher or any app, but still allows a user to view records normally found under that tab?",
    options: {
      A: "Object Permissions",
      B: "App Permissions",
      C: "Org-Wide Defaults",
      D: "Tab Settings"
    },
    correct: "D",
    explanation_en: `
Tab Settings on the profile can be set to Hidden, which removes the tab UI but does not affect underlying object permissions—users can still access records via search or related lists.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_tabs.htm&type=5
    `,
    explanation_pt: `
Configurações de Aba (Tab Settings) no perfil podem ser definidas como Oculto, removendo a aba da UI mas sem afetar permissões de objeto—usuários ainda acessam registros via pesquisa ou listas relacionadas.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_tabs.htm&type=5
    `
  },
  {
    number: 212,
    question: "The administrator for AW Computing is working with a user who is having trouble logging into Salesforce. What should the administrator do to identify why the user is unable to log in?",
    options: {
      A: "Review the Login History for the user",
      B: "Check attempted logins via the Setup Audit Trail",
      C: "Pull the Password History to ensure policy compliance",
      D: "Reset the security token for the profile"
    },
    correct: "A",
    explanation_en: `
Login History shows recent login attempts, statuses (success/failure), IP, and error reasons—key for troubleshooting login issues.  
Reference: https://help.salesforce.com/s/articleView?id=sf.monitoring_login_history.htm&type=5
    `,
    explanation_pt: `
Login History exibe tentativas de login recentes, status (sucesso/falha), IP e motivos de erro—essencial para solucionar problemas de login.  
Referência: https://help.salesforce.com/s/articleView?id=sf.monitoring_login_history.htm&type=5
    `
  },
  {
    number: 213,
    question: "A user at Northern Trail Outfitters is locked out after multiple failed login attempts. Which two actions should the administrator take to help the user regain access? (Choose 2)",
    options: {
      A: "Log in as the user to unlock and reset password",
      B: "Reset the Organization’s password policies",
      C: "Reset the user’s password on their record detail page",
      D: "Use the Unlock button on the user’s record detail page"
    },
    correct: "C, D",
    explanation_en: `
C: Resetting the password sends a new temporary password to the user’s email.  
D: The Unlock button immediately clears the lockout without changing the password.  
Reference: https://help.salesforce.com/s/articleView?id=sf.users_unlock.htm&type=5
    `,
    explanation_pt: `
C: Redefinir senha envia uma senha temporária ao e-mail do usuário.  
D: O botão Desbloquear remove imediatamente o bloqueio sem alterar a senha.  
Referência: https://help.salesforce.com/s/articleView?id=sf.users_unlock.htm&type=5
    `
  },
  {
    number: 214,
    question: "A Sales user is trying to manage Campaign Members for an upcoming networking event. They can view the Campaign but cannot add new members or update statuses. How can an administrator troubleshoot this problem?",
    options: {
      A: "Create a Permission Set to allow editing Campaign Members",
      B: "Provide the user access to both Leads and Contacts",
      C: "Ensure the Marketing User checkbox is enabled on the user record",
      D: "Run a Campaign report and update members via Data Loader"
    },
    correct: "C",
    explanation_en: `
The Marketing User checkbox grants access to create/edit campaigns and manage campaign members. Without it, users cannot modify Campaign Member records.  
Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_enable.htm&type=5
    `,
    explanation_pt: `
A checkbox Marketing User concede acesso para criar/editar campanhas e gerenciar membros de campanha. Sem ela, usuários não podem modificar registros de Campaign Member.  
Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_enable.htm&type=5
    `
  },
  {
    number: 215,
    question: "Ursa Major Solar provides a 1-year warranty on panels, captured on a custom Installation object. If installations are delayed, customers get an extended warranty. How should the administrator configure Salesforce to capture the warranty expiration date automatically?",
    options: {
      A: "Use a formula as the default value of the Warranty Expiration Date field",
      B: "Create a formula field to display one year from the purchase date",
      C: "Add a validation rule to ensure Expiration Date is populated",
      D: "Include the Expiration Date field on the mobile page layout"
    },
    correct: "A",
    explanation_en: `
A default value formula (e.g. DATE(YEAR(Installation_Date__c)+1, MONTH(Installation_Date__c), DAY(Installation_Date__c))) sets Expiration Date one year from Installation Date.  
Reference: https://help.salesforce.com/s/articleView?id=sf.formula_using_date_datetime.htm&type=5
    `,
    explanation_pt: `
Um valor padrão com fórmula (ex.: DATE(YEAR(Installation_Date__c)+1, MONTH(Installation_Date__c), DAY(Installation_Date__c))) define Data de Expiração um ano após a instalação.  
Referência: https://help.salesforce.com/s/articleView?id=sf.formula_using_date_datetime.htm&type=5
    `
  },
  {
    number: 216,
    question: "The IT manager at Universal Containers is auditing the system's security. How should the administrator provide a summary of the org’s security health?",
    options: {
      A: "Change Org-Wide Defaults to Private",
      B: "Turn on Event Monitoring",
      C: "Download six months of login data",
      D: "Run a Health Check to identify vulnerabilities"
    },
    correct: "D",
    explanation_en: `
Health Check compares your security settings against the Salesforce Baseline Standard and highlights mismatches, giving an overall health score and recommendations.  
Reference: https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5
    `,
    explanation_pt: `
Health Check compara suas configurações de segurança com o Salesforce Baseline Standard e destaca incompatibilidades, fornecendo pontuação geral e recomendações.  
Referência: https://help.salesforce.com/s/articleView?id=sf.security_health_check.htm&type=5
    `
  },
  {
    number: 217,
    question: "Cloud Kicks is advertising a new shoe model on TV, radio, print, and social under a single banner 'New Runners.' They need aggregated metrics visible for the entire effort. Which feature should the administrator use?",
    options: {
      A: "Junction object",
      B: "Parent Campaign field",
      C: "Lookup relationship",
      D: "Master-detail relationship"
    },
    correct: "B",
    explanation_en: `
The Parent Campaign field lets you build a campaign hierarchy. Child campaigns (TV, radio, print, social) roll up metrics into the parent 'New Runners' campaign.  
Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_parent.htm&type=5
    `,
    explanation_pt: `
O campo Parent Campaign permite criar hierarquia de campanhas. Campanhas-filhas (TV, rádio, print, social) agregam métricas na campanha pai 'New Runners'.  
Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_parent.htm&type=5
    `
  },
  {
    number: 218,
    question: "AW Computing added a custom text field 'Market Segment' on Lead. When a Lead is converted, this field is not copied to the Account. What should the administrator do to ensure the field is mapped during conversion?",
    options: {
      A: "Ensure the Lead Market Segment field is mapped to the correct Account field",
      B: "Ensure Account has a field with the exact same name",
      C: "Write a Validation Rule to require the field on Account",
      D: "Create a record-triggered Flow to copy the field"
    },
    correct: "A",
    explanation_en: `
Use Lead Field Mapping in Setup → Lead Settings to map custom Lead fields to corresponding Account, Contact, or Opportunity fields for automatic data transfer on conversion.  
Reference: https://help.salesforce.com/s/articleView?id=sf.leads_customize_map.htm&type=5
    `,
    explanation_pt: `
Use Lead Field Mapping em Setup → Lead Settings para mapear campos customizados de Lead aos campos correspondentes de Account, Contact ou Opportunity para transferência automática na conversão.  
Referência: https://help.salesforce.com/s/articleView?id=sf.leads_customize_map.htm&type=5
    `
  },
  {
    number: 219,
    question: "Sales managers want to surface important field values based on the Opportunity stage. Which tool should an administrator use to meet this requirement?",
    options: {
      A: "Opportunity Processes",
      B: "Dynamic Forms",
      C: "Path Key Fields",
      D: "Workflow Rules"
    },
    correct: "C",
    explanation_en: `
Path Key Fields let you display and inline-edit up to five fields per stage on the Opportunity Path component, guiding users to update critical data at each stage.  
Reference: https://help.salesforce.com/s/articleView?id=sf.path_key_fields.htm&type=5
    `,
    explanation_pt: `
Path Key Fields permitem exibir e editar inline até cinco campos por estágio no componente Opportunity Path, orientando usuários a atualizar dados críticos em cada estágio.  
Referência: https://help.salesforce.com/s/articleView?id=sf.path_key_fields.htm&type=5
    `
  },
  {
    number: 220,
    question: "Support reps at Cloud Kicks report that when they try to close a case, the 'Closed' option is missing from the Status picklist. Why can’t they see 'Closed'?",
    options: {
      A: "The Case record type is missing 'Closed' as a picklist value",
      B: "The Close Case page layout must be used to close a case",
      C: "The 'Show Closed Statuses in Case Status Field' checkbox is set to default",
      D: "The Support Process being used omits 'Closed' as a status choice"
    },
    correct: "D",
    explanation_en: `
Support Processes define which Status values are available per Case record type. If 'Closed' isn’t in the selected Support Process, users won’t see it in the picklist.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_support_process.htm&type=5
    `,
    explanation_pt: `
Support Processes definem quais valores de Status estão disponíveis por tipo de registro de Case. Se 'Closed' não estiver no Support Process selecionado, usuários não o verão na picklist.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_support_process.htm&type=5
    `
  },
  {
    number: 221,
    question: "If a user schedules a Chatter post for May 10 but is deactivated before that date, what happens to the pending post?",
    options: {
      A: "The pending Chatter post will be canceled",
      B: "The pending Chatter post will be sent on May 10",
      C: "The pending Chatter post will be paused",
      D: "The pending Chatter post will be sent in 30 days"
    },
    correct: "A",
    explanation_en: `
When a user is deactivated, any scheduled (pending) Chatter posts they created are canceled and never published.  
Reference: https://help.salesforce.com/s/articleView?id=sf.collab_scheduled_posts.htm&type=5
    `,
    explanation_pt: `
Quando um usuário é desativado, quaisquer postagens agendadas (pendentes) que ele criou são canceladas e não são publicadas.  
Referência: https://help.salesforce.com/s/articleView?id=sf.collab_scheduled_posts.htm&type=5
    `
  },
  {
    number: 222,
    question: "The administrator created new users for ten new employees at Northern Trail Outfitters. Why are these users unable to access the Account object in the Salesforce org?",
    options: {
      A: "Users’ profile requires a Sharing Rule for Accounts",
      B: "Users’ profile requires permission to the Account object",
      C: "Users’ roles are low in the Role Hierarchy",
      D: "Organization-Wide Defaults are set to Private"
    },
    correct: "B",
    explanation_en: `
Object Permissions on the profile (Read/Edit) are required to view or interact with the Account tab and records. Without object-level permission, users cannot access Accounts.  
Reference: https://help.salesforce.com/s/articleView?id=sf.users_profiles_permissions.htm&type=5
    `,
    explanation_pt: `
Permissões de Objeto no perfil (Read/Edit) são necessárias para visualizar ou interagir com a guia e registros de Account. Sem permissão de objeto, usuários não acessam Accounts.  
Referência: https://help.salesforce.com/s/articleView?id=sf.users_profiles_permissions.htm&type=5
    `
  },
  {
    number: 223,
    question: "Cloud Kicks stores customer info in Contacts and shoe/accessory data in a custom Merchandise object. How should the administrator represent that a Contact can be interested in multiple Merchandise records?",
    options: {
      A: "Hierarchy column",
      B: "Lookup filter",
      C: "Formula field",
      D: "Junction object"
    },
    correct: "D",
    explanation_en: `
A Junction Object between Contact and Merchandise allows a many-to-many relationship, so each Contact can link to multiple Merchandise records and vice versa.  
Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_manytomany.htm&type=5
    `,
    explanation_pt: `
Um Junction Object entre Contact e Merchandise permite uma relação muitos-para-muitos, para que cada Contact se ligue a vários Merchandise e vice-versa.  
Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_manytomany.htm&type=5
    `
  },
  {
    number: 224,
    question: "Universal Containers created two custom objects: Containers__c and Purchase__c. Management requests that all Container records display on Purchase records. Which relationship type should the administrator use?",
    options: {
      A: "Roll-Up Summary field",
      B: "Formula field",
      C: "Master-detail field",
      D: "Lookup field"
    },
    correct: "D",
    explanation_en: `
A Lookup relationship on Purchase__c to Containers__c lets each Purchase record reference multiple Container records via a related list.  
Reference: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `,
    explanation_pt: `
Uma relação Lookup em Purchase__c para Containers__c permite que cada Purchase referencie vários Containers via lista relacionada.  
Referência: https://help.salesforce.com/s/articleView?id=sf.relationships_lookup.htm&type=5
    `
  },
  {
    number: 225,
    question: "Cloud Kicks stores Campaign Member Status picklist values. Marketing wants to customize these themselves rather than ask the administrator each time. Which two permissions should they have? (Choose 2)",
    options: {
      A: "Create and Edit on the Campaign Member object",
      B: "Marketing User feature license",
      C: "Customize Application permission",
      D: "Edit permission on Campaigns"
    },
    correct: "B, D",
    explanation_en: `
B: The Marketing User checkbox/license enables campaign creation and member management.  
D: Edit permission on Campaigns allows them to modify the Campaign Member Status values tied to each campaign.  
Reference: https://help.salesforce.com/s/articleView?id=sf.campaigns_enable.htm&type=5
    `,
    explanation_pt: `
B: A licença Marketing User habilita criação de campanhas e gerenciamento de membros.  
D: Permissão de Edit em Campaigns permite alterar valores de Campaign Member Status vinculados a cada campanha.  
Referência: https://help.salesforce.com/s/articleView?id=sf.campaigns_enable.htm&type=5
    `
  },
  {
    number: 226,
    question: "Universal Containers wants to give reseller partners discounted product prices. How should the administrator configure this requirement?",
    options: {
      A: "Add a Partner_Discount__c field to Opportunity",
      B: "Build separate reseller partner products",
      C: "Use a different Opportunity Record Type",
      D: "Create a separate Price Book for reseller partners"
    },
    correct: "D",
    explanation_en: `
A separate Price Book with partner-specific discounted prices lets you assign that Price Book to reseller partners, ensuring they see only their discounted rates.  
Reference: https://help.salesforce.com/s/articleView?id=sf.pricebook_overview.htm&type=5
    `,
    explanation_pt: `
Um Price Book separado com preços com desconto para parceiros permite atribuí-lo aos revendedores, garantindo que eles vejam apenas suas tarifas especiais.  
Referência: https://help.salesforce.com/s/articleView?id=sf.pricebook_overview.htm&type=5
    `
  },
    {
    number: 227,
    question: "Ursa Major classifies its accounts as Silver, Gold, or Platinum Level. When a new case is created for a Silver or Gold partner, it should go to the Regular Support Queue. When an account is Platinum Level, it should automatically go to the Priority Support Queue. What should the administrator use to achieve this?",
    options: {
      A: "Assignment Rules",
      B: "Case Rules",
      C: "Workflow Rules",
      D: "Escalation Rules"
    },
    correct: "A",
    explanation_en: `
Assignment Rules let you automatically route cases to different queues based on criteria such as account level. You can create rule entries for Silver/Gold → Regular Support and Platinum → Priority Support.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `,
    explanation_pt: `
Regras de Atribuição permitem rotear casos automaticamente para diferentes filas com base em critérios como nível de conta. Crie entradas para Silver/Gold → Regular Support e Platinum → Priority Support.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `
  },
  {
    number: 228,
    question: "The standard Lead Rating field has picklist values of Hot, Warm, and Cold. A list of new leads was imported successfully even though several records had the value 'Unrated' in the Rating field. How were these records added without error?",
    options: {
      A: "The Restricted picklist checkbox was unchecked",
      B: "Field-level security was set to Visible for all profiles",
      C: "A global picklist value set was used to populate the picklist",
      D: "The Add to All Record Types checkbox was selected"
    },
    correct: "A",
    explanation_en: `
When a picklist’s “Restrict picklist to the values defined in the value set” box is unchecked, imports can include values not defined in the picklist (like “Unrated”) without error.  
Reference: https://help.salesforce.com/s/articleView?id=sf.picklist_limitations.htm&type=5
    `,
    explanation_pt: `
Quando a opção “Restrict picklist to the values defined in the value set” não está marcada, importações podem incluir valores não definidos (como “Unrated”) sem erro.  
Referência: https://help.salesforce.com/s/articleView?id=sf.picklist_limitations.htm&type=5
    `
  },
  {
    number: 229,
    question: "The administrator at AW Consulting created a custom picklist field. Business users requested that it be a text field. The administrator attempts to change the field type but is unable because it is referenced by other functionalities. Which functionality is preventing the field type from being changed?",
    options: {
      A: "Formula fields",
      B: "Record types",
      C: "Visualforce",
      D: "JavaScript"
    },
    correct: "A",
    explanation_en: `
If a picklist is referenced in a formula field, Salesforce prevents changing its data type to avoid breaking the formula. You must remove those references first.  
Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_formulas.htm&type=5
    `,
    explanation_pt: `
Se um picklist for referenciado em um campo de fórmula, o Salesforce impede a mudança de tipo para não quebrar a fórmula. Remova essas referências primeiro.  
Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_formulas.htm&type=5
    `
  },
  {
    number: 230,
    question: "What data loss considerations should an administrator keep in mind when changing a custom field type from Text to Picklist? (Choose 2)",
    options: {
      A: "There will be no data loss with use of a global value set",
      B: "Assignment and escalation rules may be affected",
      C: "Auto updates will be made to Visualforce references to prevent data loss",
      D: "Any list view based on the custom field is deleted"
    },
    correct: "B, D",
    explanation_en: `
B: Rules that reference text values may break if those values aren’t valid picklist entries.  
D: List views using the old text field filters are removed when the field becomes a picklist.  
Reference: https://help.salesforce.com/s/articleView?id=sf.fields_changing_type_considerations.htm&type=5
    `,
    explanation_pt: `
B: Regras que referenciam valores de texto podem falhar se esses valores não existirem no picklist.  
D: Visualizações de lista que usam o campo de texto são excluídas quando ele se torna um picklist.  
Referência: https://help.salesforce.com/s/articleView?id=sf.fields_changing_type_considerations.htm&type=5
    `
  },
  {
    number: 231,
    question: "Marketing users at Cloud Kicks should be able to view and edit converted leads. The administrator has assigned them a permission set with the 'View and Edit Converted Leads' permission. Which two ways can the marketing users now access converted leads for editing? (Choose 2)",
    options: {
      A: "Find them in the global search results",
      B: "Search the Recent Records component on the homepage",
      C: "Utilize a list view where Lead Status equals Qualified",
      D: "Use the Data Import Wizard"
    },
    correct: "A, C",
    explanation_en: `
A: Converted leads appear in global search when users have the permission.  
C: You can build a Lead list view filtering on Status = Qualified (converted leads retain that status).  
Reference: https://help.salesforce.com/s/articleView?id=sf.leads_view_converted.htm&type=5
    `,
    explanation_pt: `
A: Leads convertidos aparecem na pesquisa global quando o usuário tem permissão.  
C: Crie uma lista de visualização de Lead com Filtro Status = Qualified (leads convertidos mantêm esse status).  
Referência: https://help.salesforce.com/s/articleView?id=sf.leads_view_converted.htm&type=5
    `
  },
  {
    number: 232,
    question: "Universal Containers has a private sharing model for Opportunities and uses Opportunity Teams and criteria-based sharing rules. A sales rep leaves, is deactivated, then rehired by activating their old user record. Though added to the same default Opportunity teams, they're no longer able to access records they worked on before. What is the likely cause?",
    options: {
      A: "The stage of the Opportunity records was changed to Closed Lost",
      B: "Permission sets were removed when the user was deactivated",
      C: "The record type of the Opportunity records was changed",
      D: "The records were manually shared with the user"
    },
    correct: "D",
    explanation_en: `
Manual sharing entries are deleted when a user is deactivated. Reactivating does not restore manual shares, so the user no longer has access to those records.  
Reference: https://help.salesforce.com/s/articleView?id=sf.sharing_manual.htm&type=5
    `,
    explanation_pt: `
Entradas de compartilhamento manual são excluídas quando um usuário é desativado. Reactivar não as restaura, então o usuário perde acesso a esses registros.  
Referência: https://help.salesforce.com/s/articleView?id=sf.sharing_manual.htm&type=5
    `
  },
  {
    number: 233,
    question: "Ursa Major Solar wants its sales reps to be aware when they are working with high-profile customers. Which two options should be added to the Lightning record pages to achieve this? (Choose 2)",
    options: {
      A: "Custom Component",
      B: "Highlight Panel",
      C: "Actions & Recommendations",
      D: "Component Visibility Filter",
      E: "Rich Text Area"
    },
    correct: "A, D",
    explanation_en: `
A: A Custom Lightning Component can display a badge or alert based on a high-profile flag.  
D: Component Visibility Filters can show that component only when the record meets high-profile criteria.  
Reference: https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_dynamic.htm&type=5
    `,
    explanation_pt: `
A: Um Componente Lightning Customizado pode exibir um badge ou alerta com base em um indicador de alto perfil.  
D: Filtros de Visibilidade de Componente mostram esse componente apenas quando o registro atender ao critério de alto perfil.  
Referência: https://help.salesforce.com/s/articleView?id=sf.lightning_page_components_dynamic.htm&type=5
    `
  },
  {
    number: 234,
    question: "What should an administrator use as an identifier when importing and updating records from a separate system?",
    options: {
      A: "Rich Text field",
      B: "Record ID",
      C: "Auto-Number field",
      D: "External ID"
    },
    correct: "D",
    explanation_en: `
External ID fields are custom fields marked for upsert matching during data import. They let you match on business identifiers rather than Salesforce record IDs.  
Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_field_types.htm&type=5
    `,
    explanation_pt: `
Campos External ID são campos personalizados marcados para correspondência em upsert durante importação de dados. Permitem usar identificadores de negócio em vez de Record IDs.  
Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_field_types.htm&type=5
    `
  },
  {
    number: 235,
    question: "The CTO of AW Computing has defined a new policy for cases: All cases with Reason = Installation must be acknowledged immediately via email and assigned to the appropriate agents. Any cases still in New status after 4 hours must be escalated to support management. What case management tools need to be utilized for this requirement?",
    options: {
      A: "Auto-response rules, Macros, Entitlements",
      B: "Auto-response rules, Queues, Macros",
      C: "Auto-response rules, Queues, Escalation Rules",
      D: "Auto-response rules, Entitlements, Escalation Rules"
    },
    correct: "C",
    explanation_en: `
Use Auto-Response Rules for immediate email acknowledgment, Queues for assignment to the correct agent group, and Escalation Rules to escalate New cases after 4 hours.  
Reference: https://help.salesforce.com/s/articleView?id=sf.case_autoresponse.htm&type=5
    `,
    explanation_pt: `
Use Regras de Auto-Resposta para reconhecimento imediato por e-mail, Filas para atribuição ao grupo correto de agentes e Regras de Escalonamento para casos em New após 4 horas.  
Referência: https://help.salesforce.com/s/articleView?id=sf.case_autoresponse.htm&type=5
    `
  },
  {
    number: 236,
    question: "Cloud Kicks generates leads for different product categories via many sources. Some sources are for all categories; others are specific to one. The VP of Marketing requests that only the proper lead sources display based on the product category chosen. How should the administrator configure Salesforce to meet this requirement?",
    options: {
      A: "Create page layouts per category and filter Lead Source on layout",
      B: "Create a dependency between the Product Category field and Lead Source field",
      C: "Create business processes and record types for each category",
      D: "Create a single business process, then record types per category"
    },
    correct: "B",
    explanation_en: `
Picklist Dependencies let you show Lead Source values dynamically based on the selected Product Category.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_dependent.htm&type=5
    `,
    explanation_pt: `
Dependências de Picklist permitem exibir valores de Lead Source dinamicamente com base no Product Category selecionado.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_dependent.htm&type=5
    `
  },
  {
    number: 237,
    question: "Cloud Kicks needs a new sales app. The administrator found a package on AppExchange and wants to test it in a sandbox. What are two considerations when installing a managed package in a sandbox? (Choose 2)",
    options: {
      A: "Any metadata changes to the package must be recreated in Production",
      B: "The install link must be modified to test.salesforce.com",
      C: "Install for Admins Only will be the only Install option available",
      D: "The package is removed whenever the sandbox is refreshed"
    },
    correct: "B, D",
    explanation_en: `
B: Use the sandbox install URL (test.salesforce.com), not production's login.salesforce.com.  
D: Sandboxes reset to production metadata on refresh—any managed packages installed only in the sandbox are removed.  
Reference: https://help.salesforce.com/s/articleView?id=sf.distribution_installing_packages.htm&type=5
    `,
    explanation_pt: `
B: Use a URL de instalação de sandbox (test.salesforce.com), não login.salesforce.com da produção.  
D: Sandboxes são substituídos pela produção ao refresh—pacotes gerenciados instalados somente no sandbox são removidos.  
Referência: https://help.salesforce.com/s/articleView?id=sf.distribution_installing_packages.htm&type=5
    `
  },
  {
    number: 238,
    question: "The administrator at Northern Trail Outfitters has been using a spreadsheet to track assigned licenses and permission sets. What feature can be used to track this in Salesforce?",
    options: {
      A: "Login History",
      B: "Lightning Usage App",
      C: "User Report",
      D: "Permission Set Groups"
    },
    correct: "C",
    explanation_en: `
The standard “User” report type lets you report on user records, including fields for Profile, License Type, Permission Set License Assignments, and Permission Set Assignments.  
Reference: https://help.salesforce.com/s/articleView?id=sf.reports_report_types_standard_user.htm&type=5
    `,
    explanation_pt: `
O tipo de relatório padrão “User” permite relatórios sobre usuários, incluindo Perfil, Tipo de Licença, Atribuições de Licença de Conjunto de Permissões e Conjunto de Permissões.  
Referência: https://help.salesforce.com/s/articleView?id=sf.reports_report_types_standard_user.htm&type=5
    `
  },
  {
    number: 239,
    question: "Customer service accesses articles with the Knowledge Lightning component on the Service Cloud Console. Billing department users want similar functionality on the Case record without using the console. How should the administrator configure this request?",
    options: {
      A: "Add the Knowledge component to the page layout",
      B: "Add the Knowledge component list to the page layout",
      C: "Add the Knowledge related list to the page layout",
      D: "Add the Knowledge related list to the record page"
    },
    correct: "C",
    explanation_en: `
The Knowledge Related List on the page layout displays articles linked to the case in any UI (console or standard).  
Reference: https://help.salesforce.com/s/articleView?id=sf.knowledge_related_list.htm&type=5
    `,
    explanation_pt: `
A Lista Relacionada de Knowledge no layout exibe artigos vinculados ao caso em qualquer UI (console ou padrão).  
Referência: https://help.salesforce.com/s/articleView?id=sf.knowledge_related_list.htm&type=5
    `
  },
  {
    number: 240,
    question: "Brokers at DreamHouse Realty need to see certain case details (Case Name, Case ID, Customer Name, Reason, Status, Creation Date) when viewing a Contact record. Which two changes in Setup should the administrator make? (Choose 2)",
    options: {
      A: "Use the page layout editor to change the related list type to Enhanced List",
      B: "Edit the Related List component in Lightning App Builder and choose Related List as the type",
      C: "Edit the Related List component in Lightning App Builder and choose Enhanced List as the type",
      D: "Use the page layout editor to include the appropriate columns in the Cases related list"
    },
    correct: "B, D",
    explanation_en: `
B: In the Lightning App Builder, ensure the “Related List” component is used (not just default related list).  
D: On the Contact page layout, edit the Cases related list and add columns for Name, ID, Customer (Account Name), Reason, Status, and Created Date.  
Reference: https://help.salesforce.com/s/articleView?id=sf.lex_related_lists_component.htm&type=5
    `,
    explanation_pt: `
B: No Lightning App Builder, certifique-se de usar o componente “Related List” corretamente.  
D: No layout de página de Contato, edite a lista relacionada de Casos e adicione colunas para Nome, ID, Cliente (Nome da Conta), Motivo, Status e Data de Criação.  
Referência: https://help.salesforce.com/s/articleView?id=sf.lex_related_lists_component.htm&type=5
    `
  },
  {
    number: 241,
    question: "DreamHouse Realty requires that house showings be scheduled within the current year to prevent too many future showings. How can they ensure the 'Showing Date' is only populated with a date this year?",
    options: {
      A: "Sync the users' Showing Calendar to Salesforce and filter to this year",
      B: "Create a report highlighting Showing Dates outside this year for manual cleanup",
      C: "Add Help Text instructing users to enter only current-year dates",
      D: "Create a validation rule that ensures Showing Date falls within the current year"
    },
    correct: "D",
    explanation_en: `
A Validation Rule comparing YEAR(Showing_Date__c) to YEAR(TODAY()) enforces that the date must be in the current calendar year.  
Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Regra de Validação comparando YEAR(Showing_Date__c) com YEAR(TODAY()) garante que a data esteja no ano corrente.  
Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `
  },
  {
    number: 242,
    question: "The administrator at Cloud Kicks writes an assignment rule to send all cases created via email or web to the Automated Cases Queue. Any manually created cases should be owned by the agent creating them, but currently manually created cases show the administrator as owner. What will the administrator find when troubleshooting?",
    options: {
      A: "An escalation rule is changing owner on case creation",
      B: "The 'Assign using active assignment rules' checkbox is selected by default",
      C: "Another assignment rule is assigning to the administrator",
      D: "The Owner field is missing on the web form and email template"
    },
    correct: "B",
    explanation_en: `
When manually creating cases, if “Assign using active assignment rules” is checked by default, assignment rules apply to manual cases too. Uncheck this default.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `,
    explanation_pt: `
Ao criar casos manualmente, se “Assign using active assignment rules” estiver marcado por padrão, as regras de atribuição se aplicam também. Desmarque esse padrão.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_casesupport_assign.htm&type=5
    `
  },
  {
    number: 243,
    question: "Cloud Kicks captures whether an Opportunity needs engineering review with a checkbox 'Needs Review' and has a 'Product Type' picklist. When saving an Opportunity, the user must select Product Type OR check Needs Review. What should an administrator use to accomplish this?",
    options: {
      A: "Before-save Flow",
      B: "Validation Rule",
      C: "Workflow Rule",
      D: "Required fields"
    },
    correct: "B",
    explanation_en: `
A Validation Rule with formula ` + "`ISBLANK(Product_Type__c) && NOT(Needs_Review__c)`" + ` prevents save unless one is provided.  
Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `,
    explanation_pt: `
Uma Regra de Validação com fórmula ` + "`ISBLANK(Product_Type__c) && NOT(Needs_Review__c)`" + ` impede o salvamento a menos que um seja preenchido.  
Referência: https://help.salesforce.com/s/articleView?id=sf.fields_about_validation_rules.htm&type=5
    `
  },
  {
    number: 244,
    question: "Support reps at Cloud Kicks prefer split list views on the Case homepage. Occasionally, they view Shipments from another support application. What should the administrator configure to allow the team to use the split list view for cases?",
    options: {
      A: "Filter by a single Shipment record type in the list view",
      B: "Include the Shipments tab on the app's navigation bar",
      C: "Split views are only available on standard objects",
      D: "Add the Manage List Views permission for support users"
    },
    correct: "C",
    explanation_en: `
Split views are available only on standard object home pages (e.g., Cases, Contacts). Custom objects like Shipments do not support split view.  
Reference: https://help.salesforce.com/s/articleView?id=sf.lex_split_view.htm&type=5
    `,
    explanation_pt: `
Split views estão disponíveis apenas em páginas iniciais de objetos padrão (por ex., Cases, Contacts). Objetos personalizados como Shipments não suportam split view.  
Referência: https://help.salesforce.com/s/articleView?id=sf.lex_split_view.htm&type=5
    `
  },
  {
    number: 245,
    question: "DreamHouse Realty regularly holds open houses for houses and condominiums. For condominium open houses, extra steps (HOA approvals) are required. How can the administrator ensure these extra steps appear only for condominium records?",
    options: {
      A: "Create one page layout and use record types to control Status picklist values",
      B: "Create two page layouts and use business processes plus record types to display appropriate picklists",
      C: "Create one page layout and use business processes to control Status picklist values",
      D: "Create two page layouts, one with House Status and another with Condominium Status field"
    },
    correct: "B",
    explanation_en: `
Use Record Types (House vs. Condo) + Business Processes to define different picklist values and assign two page layouts with HOA steps on the Condo layout only.  
Reference: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `,
    explanation_pt: `
Use Record Types (Casa vs. Condo) + Business Processes para definir picklists diferentes e atribua dois layouts de página, com etapas de HOA apenas no layout de Condo.  
Referência: https://help.salesforce.com/s/articleView?id=sf.customize_recordtype.htm&type=5
    `
  },
  {
    number: 246,
    question: "An administrator at Ursa Major Solar just learned about the AppExchange. Which two actions can be accomplished via AppExchange? (Choose 2)",
    options: {
      A: "Find certified developers and consultants",
      B: "Download the Data Loader tool",
      C: "Install industry-specific solution templates",
      D: "Download standard Lightning components"
    },
    correct: "A, C",
    explanation_en: `
A: You can find certified consultants on AppExchange.  
C: You can install prebuilt industry-specific solution templates (Managed Packages).  
Reference: https://appexchange.salesforce.com/
    `,
    explanation_pt: `
A: Você pode encontrar consultores certificados no AppExchange.  
C: Você pode instalar templates de solução específicos para indústrias (Managed Packages).  
Referência: https://appexchange.salesforce.com/
    `
  },
  {
    number: 247,
    question: "An administrator is building a Lightning app and sees a message that My Domain must be set up first. What should the administrator consider when enabling My Domain?",
    options: {
      A: "Single sign-on must be disabled prior to implementing My Domain",
      B: "The login for all internal and external users changes to the My Domain URL",
      C: "A deployed My Domain is irreversible and cannot be renamed",
      D: "The URL instance for a My Domain stays the same across releases"
    },
    correct: "B",
    explanation_en: `
Enabling My Domain changes user login URLs to <yourDomain>.my.salesforce.com for all users (internal and external).  
Reference: https://help.salesforce.com/s/articleView?id=sf.domain_name_overview.htm&type=5
    `,
    explanation_pt: `
Habilitar My Domain muda as URLs de login para <suaDomain>.my.salesforce.com para todos os usuários (internos e externos).  
Referência: https://help.salesforce.com/s/articleView?id=sf.domain_name_overview.htm&type=5
    `
  },
  {
    number: 248,
    question: "Ursa Major Solar has SLAs routed to support queues. Cases that meet the 24-hour SLA need to be automatically reassigned to the next-tier queue. Which feature should be used?",
    options: {
      A: "Einstein Case Routing",
      B: "Auto-response rule",
      C: "Case assignment rule",
      D: "Case escalation rule"
    },
    correct: "D",
    explanation_en: `
Escalation Rules can reassign cases when time thresholds (e.g., 24 hours) are met, moving them to next-tier queues.  
Reference: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
    `,
    explanation_pt: `
Regras de Escalonamento podem reatribuir casos quando limites de tempo (ex.: 24 horas) são atingidos, movendo-os para filas seguintes.  
Referência: https://help.salesforce.com/s/articleView?id=sf.case_escalation.htm&type=5
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