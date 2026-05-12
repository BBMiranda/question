window.questionBanks = window.questionBanks || {};
window.questionBanks.developer = [
  {
    "number": 1,
    "question": "A company's engineering department is conducting a month-long test on the scalability of an in-house-developed software that requires a cluster of 100 or more servers. Which of the following models is the best to use?",
    "options": {
      "A": "PaaS",
      "B": "SaaS",
      "C": "BaaS",
      "D": "laaS"
    },
    "correct": "D",
    "explanation_en": "Infrastructure as a Service (laaS) is the best model for the scenario described because it provides on-demand access to compute, storage, and networking resources that are ideal for a scalable server cluster. laas allows the engineering team to rent infrastructure resources without having to invest in physical hardware, making it perfect for temporary or fluctuating workloads, such as scalability testing. Key Characteristics of laas: Full control over the operating systems and applications running on the servers. Flexible resource allocation to support high scalability. Ideal for custom software testing where specific server configurations may be needed. Why not the other options? PaaS (Platform as a Service): While PaaS is excellent for application development and deployment, it abstracts the infrastructure layer, which would limit the engineering team's control over the cluster's configuration. SaaS (Software as a Service): SaaS delivers fully managed applications, not infrastructure or testing environments. It's irrelevant for this use case. BaaS (Backend as a Service): BaaS is tailored to mobile or web application backend development, providing APIs and pre-built services, not infrastructure for a server cluster. Platform Developer Reference: While this question is broader than Salesforce-specific concepts, understanding laas vs. PaaS is relevant when working with Salesforce development. For example: Salesforce operates as a PaaS (e.g., Force.com platform), allowing developers to build and deploy applications without managing underlying servers. Testing scalability and performance at an infrastructure level (as in the question) would fall under laas concepts, which Salesforce developers might encounter when integrating external services or infrastructure like AWS, Azure, or Google Cloud. This foundational knowledge complements your understanding of cloud services in the Salesforce ecosystem.",
    "explanation_pt": "Infraestrutura como Serviço (IaaS) é o melhor modelo para o cenário descrito porque fornece acesso sob demanda a recursos de computação, armazenamento e rede que são ideais para um cluster de servidores escalável. O IaaS permite que a equipe de engenharia alugue recursos de infraestrutura sem precisar investir em hardware físico, tornando-o perfeito para cargas de trabalho temporárias ou flutuantes, como testes de escalabilidade. Principais Características do IaaS: Controle total sobre os sistemas operacionais e aplicações em execução nos servidores. Alocação flexível de recursos para suportar alta escalabilidade. Ideal para testes de software personalizados onde configurações de servidor específicas podem ser necessárias. Por que não as outras opções? PaaS (Plataforma como Serviço): Embora o PaaS seja excelente para desenvolvimento e implantação de aplicações, ele abstrai a camada de infraestrutura, o que limitaria o controle da equipe de engenharia sobre a configuração do cluster. SaaS (Software como Serviço): O SaaS fornece aplicativos totalmente gerenciados, não infraestrutura ou ambientes de teste. É irrelevante para este caso de uso. BaaS (Backend como Serviço): O BaaS é adaptado para o desenvolvimento de backend de aplicativos web ou móveis, fornecendo APIs e serviços pré-construídos, não infraestrutura para um cluster de servidores. Referência de Desenvolvedor da Plataforma: Embora esta questão seja mais ampla do que conceitos específicos do Salesforce, entender IaaS vs. PaaS é relevante ao trabalhar com desenvolvimento Salesforce. Por exemplo: O Salesforce opera como um PaaS (ex. plataforma Force.com), permitindo que os desenvolvedores criem e implantem aplicações sem gerenciar os servidores subjacentes. Testar escalabilidade e desempenho em um nível de infraestrutura (como na questão) se enquadraria nos conceitos de IaaS, que os desenvolvedores do Salesforce podem encontrar ao integrar serviços externos ou infraestrutura como AWS, Azure ou Google Cloud. Esse conhecimento fundamental complementa sua compreensão sobre serviços em nuvem no ecossistema Salesforce."
  },
  {
    "number": 2,
    "question": "What are three characteristics of change set deployments? Choose 3 answers Sending a change set between two orgs requires a deployment connection.",
    "options": {
      "A": "Change sets can deploy custom settings data.",
      "B": "Change sets can only be used between related organizations.",
      "C": "Deployment is done in a one-way, single transaction.",
      "D": "Sending a change set between two orgs requires a deployment connection.",
      "E": "Change sets can be used to transfer records."
    },
    "correct": "B, C, D",
    "explanation_en": "Change sets can only be used between related organizations: Change sets require a relationship between the source and target Salesforce orgs, such as a production org and its sandboxes. You cannot use change sets between unrelated Salesforce orgs. Reference: Salesforce Change Set Overview. Deployment is done in a one-way, single transaction: When a change set is deployed, it is applied to the target org as a single transaction. If there are any errors in the deployment, the entire transaction is rolled back. Reference: Apex Development Guide. Sending a change set between two orgs requires a deployment connection: Before sending or deploying a change set, a deployment connection must be established between the source and target orgs. This connection is configured in the setup menu under 'Deployment Connections.' Reference: Trailhead: Deployment Connections. Incorrect Options: A. Change sets can deploy custom settings data: Change sets cannot deploy data, including custom settings data. They only move metadata. E. Change sets can be used to transfer records: Records (data) are not supported by change sets; they only facilitate metadata migration.",
    "explanation_pt": "Conjuntos de alterações (Change sets) só podem ser usados entre organizações relacionadas: Os conjuntos de alterações exigem um relacionamento entre as organizações Salesforce de origem e de destino, como uma organização de produção e suas sandboxes. Você não pode usar conjuntos de alterações entre organizações Salesforce não relacionadas. Referência: Visão Geral de Change Set do Salesforce. A implantação é feita em uma transação única e unidirecional: Quando um conjunto de alterações é implantado, ele é aplicado à organização de destino como uma transação única. Se houver algum erro na implantação, toda a transação será revertida (roll back). Referência: Guia de Desenvolvimento Apex. O envio de um conjunto de alterações entre duas organizações requer uma conexão de implantação: Antes de enviar ou implantar um conjunto de alterações, uma conexão de implantação deve ser estabelecida entre as organizações de origem e de destino. Esta conexão é configurada no menu de configuração em 'Conexões de Implantação'. Referência: Trailhead: Deployment Connections. Opções Incorretas: A. Conjuntos de alterações podem implantar dados de configurações personalizadas: Conjuntos de alterações não podem implantar dados, incluindo dados de configurações personalizadas. Eles apenas movem metadados. E. Conjuntos de alterações podem ser usados para transferir registros: Registros (dados) não são suportados por conjuntos de alterações; eles apenas facilitam a migração de metadados."
  },
  {
    "number": 3,
    "question": "Universal Containers wants to ensure that all new leads created in the system have a valid email address. They have already created a validation rule to enforce this requirement, but want to add an additional layer of validation using automation. What would be the best solution for this requirement?",
    "options": {
      "A": "Submit a REST API Callout with a JSON payload and validate the fields on a third party system",
      "B": "Use a before-save Apex trigger on the Lead object to validate the email address and display an error message if it is invalid",
      "C": "Use a custom Lightning Web component to make a callout to validate the fields on a third party system.",
      "D": "Use an Approval Process to enforce the completion of a valid email address using an outbound message action."
    },
    "correct": "B",
    "explanation_en": "Before-save Apex Trigger: This is the best solution because a before-save trigger runs before the record is saved to the database, providing an opportunity to validate or modify the data. In this case, the Apex trigger can validate the email address using a regular expression or a third-party API call to ensure the email address is valid. If the email is invalid, an error message can be displayed using addError(). Why not the other options? A. Submit a REST API Callout with a JSON payload: REST callouts are more complex and generally not recommended for simple validation tasks like email format validation. Additionally, callouts cannot be performed directly in a before-save trigger. C. Use a custom Lightning Web Component (LWC): LWCs are primarily for UI interactions and should not be used to enforce data validations that are server-side requirements. D. Use an Approval Process: Approval Processes are for managing the approval flow of records, not for real-time validations. They cannot enforce email validation directly. Reference: Apex Triggers Documentation Trigger Context Variables",
    "explanation_pt": "Trigger Apex Before-save: Esta é a melhor solução porque uma trigger before-save é executada antes que o registro seja salvo no banco de dados, fornecendo a oportunidade de validar ou modificar os dados. Neste caso, a trigger Apex pode validar o endereço de e-mail usando uma expressão regular ou uma chamada de API de terceiros para garantir que o endereço de e-mail seja válido. Se o e-mail for inválido, uma mensagem de erro pode ser exibida usando addError(). Por que não as outras opções? A. Enviar um Callout de API REST com um payload JSON: Callouts REST são mais complexos e geralmente não recomendados para tarefas simples de validação, como validação de formato de e-mail. Além disso, callouts não podem ser executados diretamente em uma trigger before-save. C. Usar um Componente Lightning Web (LWC) customizado: LWCs servem principalmente para interações de interface de usuário (UI) e não devem ser usados para impor validações de dados que são requisitos do lado do servidor. D. Usar um Processo de Aprovação: Processos de Aprovação são para gerenciar o fluxo de aprovação de registros, não para validações em tempo real. Eles não podem impor a validação de e-mail diretamente. Referência: Documentação de Apex Triggers, Variáveis de Contexto de Trigger."
  },
  {
    "number": 4,
    "question": "Which statement should be used to allow some of the records in a list of records to be inserted if others fail to be inserted?",
    "options": {
      "A": "Database. insert (records, true)",
      "B": "insert records",
      "C": "insert (records, false)",
      "D": "Database. insert (records, false)"
    },
    "correct": "D",
    "explanation_en": "Database.insert(records, false): The Database.insert() method with the allOrNone parameter set to false allows for partial success. If some records in the list fail due to validation rules, triggers, or other errors, the method will still attempt to insert the remaining valid records. The false parameter ensures that records that fail will not roll back the transaction for the others. Why not the other options? A. Database.insert(records, true): The true parameter makes the operation transactional (all or none). If any record fails, all records will roll back. B. insert records: The insert DML statement behaves like Database.insert(records, true) by default and rolls back all records if any error occurs. C. insert(records, false): This syntax is invalid in Apex. Reference: Apex DML Operations Documentation Database Methods",
    "explanation_pt": "Database.insert(records, false): O método Database.insert() com o parâmetro allOrNone definido como false permite o sucesso parcial. Se alguns registros na lista falharem devido a regras de validação, triggers ou outros erros, o método ainda tentará inserir os registros válidos restantes. O parâmetro false garante que os registros que falharem não reverterão a transação para os outros. Por que não as outras opções? A. Database.insert(records, true): O parâmetro true torna a operação transacional (tudo ou nada). Se algum registro falhar, todos os registros sofrerão rollback. B. insert records: A instrução DML insert comporta-se como Database.insert(records, true) por padrão e reverte todos os registros se ocorrer algum erro. C. insert(records, false): Esta sintaxe é inválida no Apex. Referência: Documentação de Operações DML do Apex, Métodos de Banco de Dados."
  },
  {
    "number": 5,
    "question": "A developer identifies the following triggers on the Expense_c object: \ndeleteExpense, \napplyDefaultsToExpense, \nvalidateExpenseUpdate; The triggers process before delete, before insert, and before update events respectively. Which two techniques should the developer implement to to ensure trigger best practices are followed? Choose 2 answers",
    "options": {
      "A": "Unity all three triggers In a single trigger on the Expense_c object that Includes all events.",
      "B": "Unify the before insert and before update triggers and use Flow for the delete action.",
      "C": "Create helper classes to execute the appropriate logic when a record is saved.",
      "D": "Maintain all three triggers on the Expense_c object, but move the Apex logic out of the trigger definition."
    },
    "correct": "A, C",
    "explanation_en": "A. Unify all three triggers in a single trigger on the Expense_c object that includes all events: Salesforce best practices recommend having only one trigger per object to avoid redundancy and conflicts. By combining all the events (before delete, before insert, and before update) into a single trigger, the developer can manage the logic in an organized and maintainable manner. This also simplifies debugging and ensures that the trigger logic executes in a predictable order. C. Create helper classes to execute the appropriate logic when a record is saved: Using helper classes allows for a clean separation of concerns. The trigger becomes a dispatcher that delegates logic to dedicated classes. For example, you can create methods like applyDefaultsToExpense(), validateExpenseUpdate(), and deleteExpense() in a helper class and invoke them from the trigger. This improves reusability, readability, and testability of the code. Why not the other options? B. Unify the before insert and before update triggers and use Flow for the delete action: While Flow is a powerful tool, it is not ideal for deleting records or replacing Apex trigger functionality, especially when triggers already exist for other events. D. Maintain all three triggers on the Expense_c object but move the Apex logic out of the trigger definition: Maintaining multiple triggers on the same object can lead to conflicts and execution order issues, even if the logic is moved to helper classes. Reference: Trigger Best Practices Trigger Design Patterns",
    "explanation_pt": "A. Unificar todos os três triggers em um único trigger no objeto Expense_c que inclui todos os eventos: As melhores práticas do Salesforce recomendam ter apenas um trigger por objeto para evitar redundância e conflitos. Ao combinar todos os eventos (before delete, before insert e before update) em um único trigger, o desenvolvedor pode gerenciar a lógica de maneira organizada e sustentável. Isso também simplifica a depuração e garante que a lógica do trigger seja executada em uma ordem previsível. C. Criar classes auxiliares (helper classes) para executar a lógica apropriada quando um registro é salvo: O uso de classes auxiliares permite uma separação limpa de responsabilidades. O trigger se torna um despachante (dispatcher) que delega a lógica para classes dedicadas. Por exemplo, você pode criar métodos como applyDefaultsToExpense(), validateExpenseUpdate() e deleteExpense() em uma classe auxiliar e invocá-los do trigger. Isso melhora a reutilização, legibilidade e testabilidade do código. Por que não as outras opções? B. Unificar os triggers before insert e before update e usar Flow para a ação de deleção: Embora o Flow seja uma ferramenta poderosa, ele não é ideal para excluir registros ou substituir a funcionalidade de triggers Apex, especialmente quando já existem triggers para outros eventos. D. Manter todos os três triggers no objeto Expense_c, mas mover a lógica Apex para fora da definição do trigger: Manter vários triggers no mesmo objeto pode levar a conflitos e problemas de ordem de execução, mesmo se a lógica for movida para classes auxiliares. Referência: Melhores Práticas de Trigger, Padrões de Design de Trigger."
  },
  {
    "number": 6,
    "question": "Which statement generates a list of Leads and Contacts that have a field with the phrase 'ACME'?",
    "options": {
      "A": "Option A: List<List <sobject>> searchList = [SELECT Name, ID FROM Contact, Lead WHERE Name like '%ACME%'];",
      "B": "Option B: List List <sobject>> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead];",
      "C": "Option C: Map <sObject> searchList = [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];",
      "D": "Option D: List <sobject> searchList [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];"
    },
    "correct": "B",
    "explanation_en": "Correct Syntax for SOSL Query: Option B uses SOSL (Salesforce Object Search Language) to find records where the phrase 'ACME' appears in any field across multiple objects (Contact and Lead). Syntax used in Option B: List<List<SObject>> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead]; This query retrieves a list of SObject lists, where each inner list contains the results for a specific object (e.g., Contact or Lead). Why not the other options? A. Option A: This uses SOQL (Salesforce Object Query Language), not SOSL. SOQL cannot search across multiple objects or fields. The syntax provided is invalid because SOQL doesn't support \"multi-object WHERE conditions.\" C. Option C: The Map<SObject> syntax is incorrect for SOSL queries. SOSL queries return a List<List<SObject>>, not a Map<SObject>. D. Option D: The syntax List<SObject> for SOSL is incorrect. SOSL must return List<List<SObject>> since the results are grouped by object types. Reference: SOSL Queries in Apex SOQL vs SOSL",
    "explanation_pt": "Sintaxe correta para consulta SOSL: A opção B usa SOSL (Salesforce Object Search Language) para encontrar registros onde a frase 'ACME' aparece em qualquer campo em vários objetos (Contato e Lead). Sintaxe usada na Opção B: List<List<SObject>> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead]; Essa consulta recupera uma lista de listas SObject, onde cada lista interna contém os resultados para um objeto específico (ex: Contato ou Lead). Por que não as outras opções? A. Opção A: Utiliza SOQL (Salesforce Object Query Language), não SOSL. SOQL não pode pesquisar em vários objetos ou campos ao mesmo tempo. A sintaxe fornecida é inválida porque SOQL não suporta \"condições WHERE de múltiplos objetos\". C. Opção C: A sintaxe Map<SObject> está incorreta para consultas SOSL. As consultas SOSL retornam um List<List<SObject>>, não um Map<SObject>. D. Opção D: A sintaxe List<SObject> para SOSL está incorreta. SOSL deve retornar List<List<SObject>> uma vez que os resultados são agrupados por tipos de objeto. Referência: Consultas SOSL no Apex, SOQL vs SOSL."
  },
  {
    "number": 7,
    "question": "A developer creates a Lightning web component that imports a method within an Apex class. When a Validate button is pressed, the method runs to execute complex validations. In this implementation scenario, which two options are.. of the Controller according to the MVC architecture? Choose 2 answers",
    "options": {
      "A": "HTML file",
      "B": "Apex class",
      "C": "JavaScript file",
      "D": "XML file"
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 8,
    "question": "What are two use cases for executing Anonymous Apex code? Choose 2 answers",
    "options": {
      "A": "schedule an Apex class to run periodically",
      "B": "To delete 15,000 inactive Accounts in a single transaction after a deployment",
      "C": "To run a batch Apex class to update all Contacts",
      "D": "To add unit test code coverage to an org"
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 9,
    "question": "A developer created a Lightning web component called statuscomponent to be Inserted into the Account record page. Which two things should the developer do to make this component available? Choose 2 answers",
    "options": {
      "A": "Add <targer>lightning_Recordpage</target> to the statuscomponent. js file,",
      "B": "Add <target>lightning RecordPage</target> to the statusComp.js-meta.xml file.",
      "C": "Set isExposes to true In the statuscomponent.js-meta.xml file.",
      "D": "Add <mastertabel>Account</masterLabel> to the statusComponent. js-meta.xm1 file."
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 10,
    "question": "A developer creates a batch Apex job to update a large number of records, and receives reports of the job timing out and not completing. What is the first step towards troubleshooting the issue?",
    "options": {
      "A": "Check the asynchronous job monitoring page to view the job status and logs.",
      "B": "Check the debug logs for the batch job.",
      "C": "Disable the batch job and recreate it with a smaller number of records.",
      "D": "Decrease the batch size to reduce the load on the system."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 11,
    "question": "What are two benefits of using declarative customizations over code? Choose 2 answer",
    "options": {
      "A": "Declarative customizations automatically update with each Salesforce release.",
      "B": "Declarative customizations automatically generate test classes.",
      "C": "Declarative customizations cannot generate run time errors",
      "D": "Declarative customizations generally require less maintenance"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
{
    "number": 12,
    "question": "Given the following Anonymous block:\nList<Case> casesToUpdate = new List<Case>();\nfor(Case thisCase : [SELECT Id, Status FROM Case LIMIT 50000]){\n    thisCase.Status = 'Working';\n    casesToUpdate.add(thisCase);\n}\ntry{\n    Database.update(casesToUpdate,false);\n}catch(Exception e){\n    System.debug(e.getMessage());\n}\nWhat should a developer consider for an environment that has over 10,000 Case records?\n\n    casesToUpdate.add(thisCase);\n}\ntry{\n    Database.update(casesToUpdate, false);\n}catch(Exception e){\n    System.debug(e.getMessage());\n}\nWhat should a developer consider for an environment that has over 10,000 Case records?",
    "options": {
      "A": "The transaction will succeed and changes will be committed.",
      "B": "The try-catch block will handle exceptions thrown by governor limits.",
      "C": "The transaction will fail due to exceeding the governor limit.",
      "D": "The try-catch block will handle any DML exceptions thrown,"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 13,
    "question": "A developer is tasked with building a custom Lightning web component to collect Contact information. The form will be shared among many different types of users in the org. There are security requirements that only certain fields should be edited and viewed by certain groups of users. What should the developer use in their Lightning Web Component to support the security requirements?",
    "options": {
      "A": "aura-input-failed",
      "B": "force-input-failed",
      "C": "ui-input-failed",
      "D": "lightning-input-failed"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 14,
    "question": "Which three Salesforce resources can be accessed from a Lightning web component? Choose 3 answers",
    "options": {
      "A": "Static resources",
      "B": "All external libraries",
      "C": "SVG resources",
      "D": "Third-party web components",
      "E": "Content asset files"
    },
    "correct": "A, C, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 15,
    "question": "A developer must create a DrawList class that provides capabilities defined in the Sortable and Drawable interfaces.\npublic interfaces Sortable{\nvoid sort();} \npublic interface Drawable {\nvoid draw()};\nWhich is the correct implementation?",
    "options": {
      "A": "Option A: public void sort() { /*implementation*\"/) public void draw() { /*implementation\"/)",
      "B": "Option B: public class DrawList implements Sortable, Drawable ( public void sort() { /*implementation*/ public void draw() /*implementation*/)",
      "C": "Option C: public class Drawlist extends Sortable, Drawable ( public void sort()  /*implementation\"/ public void draw() { /*implementation\"/)",
      "D": "Option D: public class Drawlist extends Sortable, extends Drawable public void sort()  /*implementation*/) public void draw() { /*implementation /)"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 16,
    "question": "A developer is creating a Lightning web component to show a list of sales records. The Sales Representative user should be able to see the commission field on each record. The Sales Assistant user should be able to see all fields on the record except the commission field. How should this be enforced so that the component works for both users without showing any errors?",
    "options": {
      "A": "Use WITH SECURITY_ENFORCED In the SOQL that fetches the data for the component,",
      "B": "Use Security.stripInaccessible Le to remove fields inaccessible to the current user.",
      "C": "Use Lightning Locker Service to enforce sharing rules and field-level security.",
      "D": "Use Lightning Data Service to get the collection of sales records."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 17,
    "question": "The following code snippet is executed by a Lightning web component in an environment with more than 2,000 lead records:\n@AuraEnabled\npublic void static updateLeads() {\nfor (Lead thisLead: [SELECT Origin_c FROM Lead])\nthisLead.LeadSource update thisLead;\nthisLead.Origin_c;\nupdate thisLead;}}\nWhich governor limit will likely be exceeded within the Apex transaction?",
    "options": {
      "A": "Total number of SOOL quires issued",
      "B": "Total number of DML statements issued",
      "C": "Total number of records processed as a result of DML statements"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 18,
    "question": "A developer is asked to write helper methods that create test data for unit tests.\n01: public TestUtils {\n03: public static Account createAccount() {\n04: Account act = new Account();\n05: //...set some fields on acct...\n06: return act;\n07: }\n08: //...other methods...\n09: )\nWhat should be changed in the Testutils class so that its methods are only usable by unit test methods?",
    "options": {
      "A": "@isTest above line 03.",
      "B": "Add @istest above line 01.",
      "C": "Change public to private on line 01.",
      "D": "Remove static from line 03."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 19,
    "question": "Universal Containers recently transitioned from Classic to Lightning Experience. One of its business processes requires certain values from the Opportunity object to be sent via an HTTP REST callout to its external order management system when the user presses a custom button on the Opportunity detail page. Example values are as follows:\n- Name\n- Amount\n- Account\nWhich two methods should the developer implement to fulfill the business requirement? Choose 2 answers",
    "options": {
      "A": "Create a custom Visualforce quick action that performs the HTTP REST callout, and use a Visualforce quick action to expose the component on the Opportunity detail page.",
      "B": "Create a Remote Action on the Opportunity object that executes an Apex immediate action to perform the HTTP REST callout whenever the Opportunity is updated.",
      "C": "Create a Lightning component quick action that performs the HTTP REST callout, and use a Lightning Action to expose the component on the Opportunity detail page.",
      "D": "Create an after update trigger on the Opportunity object that calls a helper method using @future (Callout=true) to perform the HTTP REST callout."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 20,
    "question": "A developer has an integer variable called maxAttempts. The developer needs to ensure that once maxAttempts is initialized, it preserves its value for the length of the Apex transaction; while being able to share the variable's state between trigger executions. How should the developer declare maxAttempts to meet these requirements?",
    "options": {
      "A": "Declare maxattempts as a constant using the static and final keywords.",
      "B": "Declare maxattempts as a member variable on the trigger definition.",
      "C": "Declare maxattempts as a variable on a helper class.",
      "D": "Declare maxAttempts as a private static variable on a helper class."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  }
];
