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
    "question": "A developer identifies the following triggers on the Expense_c object:<br><br><pre><code>deleteExpense,\napplyDefaultsToExpense,\nvalidateExpenseUpdate;</code></pre><br>The triggers process before delete, before insert, and before update events respectively. Which two techniques should the developer implement to to ensure trigger best practices are followed? Choose 2 answers",
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
      "A": "<pre><code>List<List <sobject>> searchList = [SELECT Name, ID FROM Contact, Lead WHERE Name like '%ACME%'];</code></pre>",
      "B": "<pre><code>List List <sobject>> searchList = [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];</code></pre>",
      "C": "<pre><code>Map <sObject> searchList = [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];</code></pre>",
      "D": "<pre><code>List <sobject> searchList [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];</code></pre>"
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
  "question": "Given the following Anonymous block:<br><pre><code>List<Case> casesToUpdate = new List<Case>();\nfor (Case thisCase : [SELECT Id, Status FROM Case LIMIT 50000]) {\n    thisCase.Status = 'Working';\n    casesToUpdate.add(thisCase);\n}\ntry {\n    Database.update(casesToUpdate, false);\n} catch (Exception e) {\n    System.debug(e.getMessage());\n}</code></pre><br>What should a developer consider for an environment that has over 10,000 Case records?",
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
    "question": "A developer must create a DrawList class that provides capabilities defined in the Sortable and Drawable interfaces.<br><pre><code>public interface Sortable {\n    void sort();\n}\n\npublic interface Drawable {\n    void draw();\n}</code></pre><br>Which is the correct implementation?",
    "options": {
      "A": "<pre><code>public void sort() { /*implementation*/ }\npublic void draw() { /*implementation*/ }\n</code></pre>",
      "B": "<pre><code>public class DrawList implements Sortable, Drawable {\n    public void sort() { /*implementation*/ }\n    public void draw() { /*implementation*/ }\n}</code></pre>",
      "C": "<pre><code>public class Drawlist extends Sortable, Drawable {\n    public void sort() { /*implementation*/ }\n    public void draw() { /*implementation*/ }\n}</code></pre>",
      "D": "<pre><code>public class Drawlist extends Sortable, extends Drawable {\n    public void sort() { /*implementation*/ }\n    public void draw() { /*implementation*/ }\n}</code></pre>"
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
    "question": "The following code snippet is executed by a Lightning web component in an environment with more than 2,000 lead records:<br><pre><code>@AuraEnabled\npublic void static updateLeads() {\n    for (Lead thisLead : [SELECT Origin_c FROM Lead]) {\n        thisLead.LeadSource = thisLead.Origin_c;\n        update thisLead;\n    }\n}</code></pre><br>Which governor limit will likely be exceeded within the Apex transaction?",
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
    "question": "A developer is asked to write helper methods that create test data for unit tests.<br><pre><code>01: public TestUtils {\n03: public static Account createAccount() {\n04:     Account act = new Account();\n05:     //...set some fields on acct...\n06:     return act;\n07: }\n08: //...other methods...\n09: )</code></pre><br>What should be changed in the Testutils class so that its methods are only usable by unit test methods?",
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
    "question": "Universal Containers recently transitioned from Classic to Lightning Experience. One of its business processes requires certain values from the Opportunity object to be sent via an HTTP REST callout to its external order management system when the user presses a custom button on the Opportunity detail page. Example values are as follows:<br>* Name<br>* Amount<br>* Account<br>Which two methods should the developer implement to fulfill the business requirement? Choose 2 answers",
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
  },
  {
    "number": 21,
    "question": "The following Apex method is part of the ContactService class that is called from a trigger:<br><pre><code>public static void setBusinessUnitToEMEA(Contact thisContact) {\n    thisContact.Business_Unit__c = 'EMEA';\n    update thisContact;\n}</code></pre><br>How should the developer modify the code to ensure best practices are met?",
    "options": {
      "A": "<pre><code>public static void setBusinessUnitToEMEA(List<Contact> contacts) {\n    for (Contact thisContact : contacts) {\n        thisContact.Business_Unit__c = 'EMEA';\n    }\n    update contacts;\n}</code></pre>",
      "B": "<pre><code>public static void setBusinessUnitToEMEA(Contact thisContact) {\n    List<Contact> contacts = new List<Contact>();\n    contacts.add(thisContact.Business_Unit__c = 'EMEA');\n    update contacts;\n}</code></pre>",
      "C": "<pre><code>public static void setBusinessUnitToEMEA(List<Contact> contacts) {\n    for (Contact thisContact : contacts) {\n        thisContact.Business_Unit__c = 'EMEA';\n        update contacts[0];\n    }\n}</code></pre>"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 22,
    "question": "A developer deployed a trigger to update the status_c of Assets related to an Account when the Account's status changes and a nightly integration that updates Accounts in bulk has started to fail with limit failures.<br><pre><code>01: trigger AccountTrigger on Account (after update) {\n02:     List<Asset> assetsToUpdate = new List<Asset>();\n03:     for (Account newA : Trigger.new) {\n04:         Account oldA = Trigger.oldMap.get(newA.Id);\n05:         if (oldA.Status__c != newA.Status__c) {\n06:             assetsToUpdate.addAll( AccountHelper.getAssetsToUpdate(newA) );\n07:         }\n08:     }\n09:     update assetsToUpdate;\n10: }\n\n25:     }\n26: }</code></pre><br>What should the developer change about the code to address the failure while still having the code update all of the Assets correctly?",
    "options": {
      "A": "Move all of the logic to a Queveable class that queries for and updates the Assets and call it from the trigger.",
      "B": "Add List<asset> assets = [SELECT id, Status_C FROM WHERE AccountId : acctld] to line 14 and iterate over the assets list in the for loop on line 15.",
      "C": "Add a LIMIT clause to the SOQL query on line 16 to limit the number of Assets queried for an Account.",
      "D": "Change the getAssets ToUpdate method to process all Accounts in one call and call it outside of the for loop that starts on line 03."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 23,
    "question": "Universal Containers (UC) wants to lower its shipping cost while making the shipping process more efficient. The Distribution Officer advises UC to implement global addresses to allow multiple Accounts to share a default pickup address. The developer is tasked to create the supporting object and relationship for this business requirement and uses the Setup Menu to create a custom object called \"Global Address\". Which field should the developer add to create the most efficient model that supports the business need?",
    "options": {
      "A": "Add a master-detail field on the Global Address object to the Account object.",
      "B": "Add a lookup field on the Global Address object to the Account object.",
      "C": "Add a lookup field on the Account object to the Global Address object.",
      "D": "Add a master-detail field on the Account object to the Global Address object."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 24,
    "question": "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item. UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available. Which method should be used to calculate the estimated ship date for an Order?",
    "options": {
      "A": "Use a LATEST formula on each of the latest availability date fields.",
      "B": "Use a CEILING formula on each of the latest availability date fields.",
      "C": "Use a DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
      "D": "Use a MAX Roll-Up Summary field on the latest availability date fields."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 25,
    "question": "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item. UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available. Which method should be used to calculate the estimated ship date for an Order?",
    "options": {
      "A": "Use 2 LATEST formula on each of the latest availability date fields.",
      "B": "Use a CEILING formula on each of the latest availability date fields.",
      "C": "Use @ DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
      "D": "Use a MAX Roll-Up Summary field on the latest availability date fields."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 26,
    "question": "Universal Containers has an order system that uses an Order Number to identify an order for customers and service agents. Order records will be imported into Salesforce. How should the Order Number field be defined in Salesforce?",
    "options": {
      "A": "Indirect Lockup",
      "B": "Direct Lookup",
      "C": "External ID and Unique",
      "D": "Lookup"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 27,
    "question": "In terms of the MVC paradigm, what are two advantages of implementing the view layer of a Salesforce application using Lightning Web Component-based development over Visualforce? Choose 2 answers",
    "options": {
      "A": "Rich component ecosystem",
      "B": "Leg capturing via the Debug Logs Setup page",
      "C": "Built-in standard and custom set controllers",
      "D": "Self-contained and reusable units of an application"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 28,
    "question": "What are two ways a developer can get the status of an enqueued job for a class that implements the queueable interface? Choose 2 answers",
    "options": {
      "A": "View the Apex Status page",
      "B": "View the Apex Jobs page",
      "C": "Query the AsyncApexJob object",
      "D": "View the Apex Flex Queue"
    },
    "correct": "C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 29,
    "question": "Which statement describes the execution order when triggers are associated to the same object and event?",
    "options": {
      "A": "Triggers are executed in the order they are modified.",
      "B": "Trigger execution order cannot be guaranteed.",
      "C": "Triggers are executed alphabetically by trigger name.",
      "D": "Triggers are executed in the order they are created."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 30,
    "question": "A developer created a child Lightning web component nested inside a parent Lightning web component. The parent component needs to pass a string value to the child component. In which two ways can this be accomplished? Choose 2 answers",
    "options": {
      "A": "The parent component can invoke a public method in the child component.",
      "B": "The parent component can use a public property to pass the data to the child component,",
      "C": "The parent can use the Apex controller class to send data to the child component.",
      "D": "The parent component can use a custom event to pass the data to the child component."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 31,
    "question": "Provide question feedback here (optional):<br><pre><code>Boolean isOK;\nInteger x;\nString theString = 'Hello';\n\nif (isOK == false && theString == 'Hello') {\n    x = 1;\n} else if (isOK == true && theString == 'Hello') {\n    x = 2;\n} else if (isOK != null && theString == 'Hello') {\n    x = 3;\n} else {\n    x = 4;\n}</code></pre><br>Based on this code, what is the value of x?",
    "options": {
      "A": "4",
      "B": "1",
      "C": "2",
      "D": "3"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 32,
    "question": "A developer completed modifications feature that is comprised of two elements:<br>* Apex trigger<br>* Trigger handler Apex class<br>What are two factors that the developer must take into account to properly deploy them to the production environment?<br>Choose 2 answers",
    "options": {
      "A": "Apex classes must have at least 75% code coverage org-wide.",
      "B": "All methods in the test classes must use @istest.",
      "C": "At least one line of code must be executed for the Apex trigger.",
      "D": "Test methods must be declared with the testMethod keyword."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 33,
    "question": "How does the Lightning Component framework help developers implement solutions faster?",
    "options": {
      "A": "By providing device-awareness for mobile and desktops",
      "B": "By providing an Agile process with default steps",
      "C": "By providing change history and version control",
      "D": "By providing code review standards and processes"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 34,
    "question": "A developer wants to send an outbound message when a record meets a specific criteria. Which two features satisfy this use case?",
    "options": {
      "A": "Flow Builder can be used to check the record criteria and send an outbound message.",
      "B": "Approval Process can be used to check the record criteria and send an outbound message without Apex code.",
      "C": "Entitlement Process can be used to check the record criteria and send an outbound message without Apex code.",
      "D": "Next Best Action can be used to check the record criteria and send an outbound message."
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 35,
    "question": "Universal Containers hires a developer to build a custom search page to help users find the Accounts they want. Users will be able to search on Name, Description, and a custom comments field. Which consideration should the developer be aware of when deciding between SOQL and SOSL? Choose 2 answers",
    "options": {
      "A": "SOSL is faster for text searches.",
      "B": "SOQL is able to return more records",
      "C": "SOQL Is faster for text searches.",
      "D": "SOSL is able to return more records."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 36,
    "question": "What is an example of a polymorphic lookup field in Salesforce?",
    "options": {
      "A": "The Parentid field on the standard Account object",
      "B": "A custom field, Link_c, on the standard Contact object that looks up to an Account or a Campaign",
      "C": "The Whatld field on the standard Event object",
      "D": "The Leadid and Contactid fields on the standard Campaign Member object"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 37,
    "question": "A developer has a Visualforce page and custom controller to save Account records. The developer wants to display any validation rule violations to the user. How can the developer make sure that validation rule violations are displayed?",
    "options": {
      "A": "Add custom controller attributes to display the message.",
      "B": "Use a try/catch with a custom exception class.",
      "C": "Include <apex:messages> on the Visualforce page.",
      "D": "Perform the DML using the database.unsert() method,"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 38,
    "question": "Which code displays the contents of a Visualforce page as a PDF?",
    "options": {
      "A": "<pre><code><apex:page contentType=\"application/pdf\"></code></pre>",
      "B": "<pre><code><apex:page contentType=\"pdf\"></code></pre>",
      "C": "<pre><code><apex:page renderAs=\"pdf\"></code></pre>",
      "D": "<pre><code><apex:page renderAs=\"application/pdf\"></code></pre>"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 39,
    "question": "Universal Containers wants Opportunities to no longer be editable when it reaches the Closed/Won stage. Which two strategies can a developer use to accomplish this? Choose 2 answers",
    "options": {
      "A": "Use a validation rule.",
      "B": "Use an auto-response rule.",
      "C": "Use a before-save Apex trigger,",
      "D": "Use an automatically launched Approval Process."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 40,
    "question": "While writing an Apex class, a developer wants to make sure that all functionality being developed is handled as specified by the requirements. Which approach should the developer use to be sure that the Apex class is working according to specifications?",
    "options": {
      "A": "Include a savepoint and pacabase.rollback().",
      "B": "Include a try/catch block to the Apex class.",
      "C": "Run the code in an Execute Anonymous block in the Developer Console.",
      "D": "Create a test class to execute the business logic and run the test in the Developer Console."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 41,
    "question": "Which code in a Visualforce page and/or controller might present a security vulnerability?",
    "options": {
      "A": "<apex:outputText value=\"(  CurrentPage.parameters.userInput)\" />",
      "B": "<apex:outputText escape=\"false\" value=\"(  CurrentPage.parameters.userInput)\" />",
      "C": "<apex:outputField value=\"(Ictrl.userInput)\" />",
      "D": "<apex:outputField value=\" lctrl.userInput)\" rendered-\"(lisEditable\" />"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 42,
    "question": "What should a developer use to script the deployment and unit test execution as part of continuous integration?",
    "options": {
      "A": "VS Code",
      "B": "Execute Anonymous",
      "C": "Salesforce CLI",
      "D": "Developer Console"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 43,
    "question": "The Job_Application_c custom object has a field that is a master-detail relationship to the Contact object, where the Contact object is the master. As part of a feature implementation, a developer needs to retrieve a list containing all Contact records where the related Account Industry is 'Technology', while also retrieving the Contact's Job_Application_c records. Based on the object's relationships, what is the most efficient statement to retrieve the list of Contacts?",
    "options": {
      "A": "SELECT id, (SELECT id FROM Job_Applications_2) FROM Contact WHERE Account.Industry -> \"Technology'l",
      "B": "(SELECT Ed, (SELECT IS FROM Job Applications c) FROM Contact WHERE Accounts. Industry- \"Technology'l",
      "C": "[SELECT id, (SELECT id FROM Job_Applications_2) FROM Contact WHERE Accounts. Industry 'Technology 1",
      "D": "(SELECT  , (SELECT Id FROM Job_Application c) FROM Contact WHERE Account. Industry 'Technology'];"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 44,
    "question": "Universal Containers wants to back up all of the data and attachments in its Salesforce org once a month. Which approach should a developer use to meet this requirement?",
    "options": {
      "A": "Schedule a report.",
      "B": "Use the Data Loader command line.",
      "C": "Define a Data Export scheduled job.",
      "D": "Create a Schedulable Apex class."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 45,
    "question": "Which two are phases in the Aura application event propagation framework? Choose 2 answers",
    "options": {
      "A": "Control",
      "B": "default",
      "C": "Buddle",
      "D": "Emit"
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 46,
    "question": "A software company is using Salesforce to track the companies they sell their software to in the Account object. They also use Salesforce to track bugs in their software with a custom object, Bug_c. As part of a process improvement initiative, they want to be able to report on which companies have reported which bugs. Each company should be able to report multiple bugs and bugs can also be reported by multiple companies. What is needed to allow this reporting?",
    "options": {
      "A": "Roll-up summary field of Bug_c on Account",
      "B": "Master-detail field on Bug_c to Account",
      "C": "Lookup field on Bug_c to Account",
      "D": "Function object between Bug_c and Account"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 47,
    "question": "Cloud Kicks Fitness, an ISV Salesforce partner, is developing a managed package application. One of the application modules allows the user to calculate body fat using the Apex class, Bodyfat, and its method, calculateBodyFat (). The product owner wants to ensure this method is accessible by the consumer of the application when developing customizations outside the ISV's package namespace. Which approach should a developer take to ensure calculateBodyFat () is accessible outside the package namespace?",
    "options": {
      "A": "Declare the class and method using the global access modifier.",
      "B": "Declare the class and method using the public access modifier.",
      "C": "Declare the class as public and use the global access modifier on the method.",
      "D": "Declare the class as global and use the public access modifier on the method."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 48,
    "question": "A developer created a trigger on the Account object. While testing the trigger, the developer sees the error message 'Maximum trigger depth exceeded'. What could be the possible causes?",
    "options": {
      "A": "The developer does not have the correct user permission.",
      "B": "The trigger is too long and should be refactored into a helper class.",
      "C": "The trigger does not have sufficient code coverage.",
      "D": "The trigger is getting executed multiple times."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 49,
    "question": "Universal Hiring uses Salesforce to capture job applications. A salesforce administrator created two custom objects; Job_c acting as the master object, to Application_c acting as the detail. Within the Job_c object, a custom multi-select picklist, preferred_Locations_c, contains a list of approved states for the position. Each Job_Application_c record relates to a Contact within the system through a master-detail relationship. Recruiters have requested the ability to view whether the Contact's Mailing State value matches a value selected on the Preferred Locations_c field, within the Job_Application_c record. Recruiters would like this value to be kept in sync if changes occur to the Contact's Mailing State. What is the recommended tool a developer should use to meet the business requirement?",
    "options": {
      "A": "Apex trigger",
      "B": "Roll-up summary field",
      "C": "Record-triggered flow"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 50,
    "question": "How can a developer check the test coverage of autolaunched Flows before deplovin change set?",
    "options": {
      "A": "Use the ApextestResult class.",
      "B": "Use the Flow Properties page.",
      "C": "Use SOQL and the Tooling API.",
      "D": "Use the Code Coverage Setup page,"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 51,
    "question": "A developer created these three Rollup Summary fields in the custom object, Project_c:\nTotal_Timesheets_c\nTotal_Approved_Timesheets_c\nTotal_Rejected_Timesheet_c\nThe developer is asked to create a new field that shows the ratio between rejected and approved timesheets for a given project. Which should the developer use to implement the business requirement in order to minimize maintenance overhead?",
    "options": {
      "A": "Formula field",
      "B": "Record-triggered flow",
      "C": "Roll-up summary field",
      "D": "Apex trigger"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 52,
    "question": "What is a considerations for running a flow in debug mode?",
    "options": {
      "A": "When debugging a schedule-triggered flow, the flow starts only for one record.",
      "B": "Clicking Pause allows an element to be replaced in the flow.",
      "C": "DML operations will be rolled back when the debugging ends.",
      "D": "Callouts to external are not when debugging a flow."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 53,
    "question": "What are two ways for a developer to execute tests in an org? Choose 2 answers",
    "options": {
      "A": "Tooling API",
      "B": "Metadata API",
      "C": "Bulk API",
      "D": "Developer Console"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 54,
    "question": "A developer needs to allow users to complete a form on an Account record that will create a record for a custom object. The form needs to display different fields depending on the user's job role, The functionality should only be available to a small group of users. Which three things should the developer do to satisfy these requirements? Choose 3 answers",
    "options": {
      "A": "Create a Dynamic Form.",
      "B": "Create a Custom Permission for the users.",
      "C": "Add a Dynamic Action to the Users' assigned Page Layouts.",
      "D": "Add a Dynamic Action to the Account Record Page."
    },
    "correct": "A, B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 55,
    "question": "Refer to the following Apex code:<br><pre><code>Integer x=0 ;\ndo {\n    x=1;\n    x++;\n} while (x < 1);\nSystem.debug(x);</code></pre><br>What is the value of x when it is written to the debug log?",
    "options": {
      "A": "0",
      "B": "1",
      "C": "2",
      "D": "4"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 56,
    "question": "A development team wants to use a deployment script to automatically deploy to a sandbox during their development cycles. Which two tools can they use to run a script that deploys to a sandbox? Choose 2 answers",
    "options": {
      "A": "SFDX CLI",
      "B": "Developer Console",
      "C": "Change Sets",
      "D": "Ant Migration Tool"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 57,
    "question": "A developer must provide custom user interfaces when users edit a Contact in either Salesforce Classic or Lightning Experience. What should the developer use to override the Contact's Edit button and provide this functionality?",
    "options": {
      "A": "A Lightning component in Salesforce Classic and a Lightning component in Lightning Experience",
      "B": "A Lightning page in Salesforce Classic and a Visualforce page in Lightning Experience",
      "C": "A Visualforce page in Salesforce Classic and a Lightning page in Lightning Experience",
      "D": "A Visualforce page in Salesforce Classic and a Lightning component in Lightning Experience"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 58,
    "question": "Which annotation should a developer use on an Apex method to make it available to be wired to a property in a Lightning web component?",
    "options": {
      "A": "@AuraEnabled(cacneable=true)",
      "B": "@RemoteAction (cacheable-true)",
      "C": "@RemoteAction",
      "D": "@AuraEnabled"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 59,
    "question": "When using Salesforce DX, what does a developer need to enable to create and manage scratch orgs?",
    "options": {
      "A": "Sandbox",
      "B": "Environment Hub",
      "C": "Production",
      "D": "Dev Hub"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 60,
    "question": "An Apex method, getAccounts, that returns a list of Accounts given a searchTerm, is available for Lightning Web Components to use. What is the correct definition of a Lightning Web Component property that uses the getAccounts method?",
    "options": {
      "A": "@wire (getAccounts, ' searchTerm\") accountList;",
      "B": "@AuraEnabled(getAccounts, ' searchTerm\") accountList",
      "C": "AuraEnabled(getAccounts, ( searchTerm: ' searchTerm accountList;",
      "D": "@wire(getAccounts, (searchTerm: \"SearchTerm\" }} accountList;"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 61,
    "question": "Flow Builder uses an Apex action to provide additional information about multiple Contacts, stored in a custom class, Contactinfo. Which is the correct definition of the Apex method that gets the additional information?",
    "options": {
      "A": "@invocablenetnod (label='Additional Info') public static contactinfo getinfolid contactid) (/implementation/1",
      "B": "@InvocableMethod (label='Additional Info ) public List<ContactInfo> getInfo (List<Id> contactIds) { /*implementation*/ }",
      "C": "@InvocableMethod (label='Additional Info') public static List<ContactInfo> getInfo (List<Id> contactIds) (/*implementation*/ }",
      "D": ""
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 62,
    "question": "Consider the following code snippet for a Visualforce page that is launched using a Custom Button on the Account detail page layout.<br><pre><code><apex:page standardController=\"Account\">\n\n<apex:commandButton action=\"{!save}\" value=\"Save\"/>\n</apex:page></code></pre><br>When the Save button is pressed the developer must perform a complex validation that involves multiple objects and, upon success, redirect the user to another Visualforce page. What can the developer use to meet this business requirement?",
    "options": {
      "A": "Apex trigger",
      "B": "Controller extension",
      "C": "Standard Controller",
      "D": "Custom Controller"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 63,
    "question": "A developer is migrating a Visualforce page into a Lightning web component. The Visualforce page shows information about a single record. The developer decides to use Lightning Data Service to access record data. Which security consideration should the developer be aware of?",
    "options": {
      "A": "Lightning Data Service ignores field-level security.",
      "B": "The with sharing keyword must be used to enforce sharing rules.",
      "C": "Lightning Data Service handles sharing rules and field-level security.",
      "D": "The isAccessible () method must be used for field-level access checks."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 64,
    "question": "A developer creates a custom exception as shown below:<br><pre><code>public class ParityException extends Exception {}</code></pre><br>What are two ways the developer can fire the exception in Apex?",
    "options": {
      "A": "throw new ParityException ();",
      "B": "throw new parityException ('parity does not match');",
      "C": "new ParityException ();",
      "D": "new ParityException('parity does not match');"
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 65,
    "question": "A developer needs to have records with specific field values in order to test a new Apex class. What should the developer do to ensure the data is available to the test?",
    "options": {
      "A": "Use SOQL to query the org for the required data.",
      "B": "Use Test.loadData() and reference a CSV file in a static resource.",
      "C": "Use Anonymous Apex to create the required data.",
      "D": "Use Test. Data() and reference a JSON file in Documents."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 66,
    "question": "A software company uses the following objects and relationships:\n* Case: to handle customer support issues\n* Defect_c: a custom object to represent known issues with the company's software\n* Case Defect_c a junction object between Case and Defect c to represent that a defect is a cause of a customer issue\nCase and Defect_c have Private organization-wide defaults. What should be done to share a specific Case_Defect_c record with a user?",
    "options": {
      "A": "Share the parent Case record and Defect_c records.",
      "B": "Share the parent Case and record_c record.",
      "C": "Share the parent Defect_c record.",
      "D": "Share the case_Defect_c record."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 67,
    "question": "A developer creates a new Apex trigger with a helper class, and writes a test class that only exercises 95% coverage of the new Apex helper class. Change Set deployment to production fails with the test coverage warning:\n\"Test coverage of selected Apex Trigger is 0%, at least 1% test coverage is required.\"\nWhat should the developer do to successfully deploy the new Apex trigger and helper class?",
    "options": {
      "A": "Run the tests using the Run All Tests' method.",
      "B": "Remove the failing test methods from the test class",
      "C": "Create a test class and methods to cover the Apex trigger.",
      "D": "Increase the test class coverage on the helper class."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 68,
    "question": "Consider the following code snippet:<br><pre><code>public class with sharing AccountController {\n    @AuraEnabled\n    public List<Account> getAllAccounts() {\n        return [Select Id, Name, Industry FROM Account];\n    }\n}\n\n@isTest\nprivate class AccountControllerTest {\n    @isTest\n    static void testGetAllAccounts() {\n        // implementation\n    }\n}</code></pre><br>When the test class runs, the assertion fails. Which change should the developer implement in the Apex test method to ensure the test executes successfully?",
    "options": {
      "A": "Query the Administrator use into memory and enclose lines within the system.runAs(user); method.",
      "B": "Query the Standard User into memory and enclose lines within the method test.startTest(); and system.runAs();",
      "C": "Add @isTest(seeAllData=true) and enclose lines within Test.startTest();",
      "D": "Add System.runAs(User); to line 14 and enclose line Test.startTest(); and Test.stopTest(); within"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 69,
    "question": "Refer to the component code and requirements below:<br><pre><code><lightning:layout multipleRows=\"true\">\n    <lightning:layoutItem size=\"12\">\n        {!v.account.Name}\n    </lightning:layoutItem>\n    <lightning:layoutItem size=\"12\">\n        {!v.account.AccountNumber}\n    </lightning:layoutItem>\n    <lightning:layoutItem size=\"12\">\n        {!v.account.Industry}\n    </lightning:layoutItem>\n</lightning:layout></code></pre><br>Requirements\n* For mobile devices, the information should display in three rows.\n* For desktops and tablets, the information should display in a single row.\nRequirement 2 is not displaying as desired. Which option has the correct component code to meet the requirements for desktops and tablets?",
    "options": {
      "A": "Option A (Using largeDeviceSize=\"4\" and mediumDeviceSize=\"4\")",
      "B": "Option B (Using mediumDeviceSize=\"12\")",
      "C": "Option C (Using size=\"12\" and largeDeviceSize=\"4\" or mediumDeviceSize=\"4\")",
      "D": "Option D"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 70,
    "question": "Universal Containers (UC) processes orders in Salesforce in a custom object, Order_c. They also allow sales reps to upload CSV files with thousands of orders at a time. A developer is tasked with integrating orders placed in Salesforce with UC's enterprise resource planning (ERP) system. After the status for an Order_c is first set to 'Placed', the order information must be sent to a REST endpoint in the ERP system that can process one order at a time. What should the developer implement to accomplish this?",
    "options": {
      "A": "Callout from a Queueable class called from a trigger",
      "B": "Callout from a Batchable class called from a scheduled job",
      "C": "Flow with a callout from an invocable method",
      "D": "Callout from an @future method called from a trigger"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 71,
    "question": "When a user edits the Postal Code on an Account, a custom Account text field named \"Timezone\" must be updated based on the values in a Postal Code_To_Timezone__c custom object. Which two automation tools can be used to implement this feature? Choose 2 answers",
    "options": {
      "A": "Quick actions",
      "B": "Approval process",
      "C": "Account trigger",
      "D": "Fast Field Updates record-triggered flow"
    },
    "correct": "C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 72,
    "question": "As part of new feature development, a developer is asked to build a responsive application capable of responding to touch events, that will be executed on stateful clients. Which two technologies are built on a framework that fully supports the business requirement? Choose 2 answers",
    "options": {
      "A": "Lightning Web Components",
      "B": "Visualforce Components",
      "C": "Visualforce Pages",
      "D": "Aura Components"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 73,
    "question": "A developer has the following requirements:\n• Calculate the total amount on an Order.\n• Calculate the line amount for each Line Item based on quantity selected and price.\n• Move Line Items to a different Order if a Line Item is not in stock.\nWhich relationship implementation supports these requirements on its own?",
    "options": {
      "A": "Line Item has a re-parentable master-detail field to Order.",
      "B": "Line Item has a re-parentable lookup field to Order.",
      "C": "Order has a re-parentable lookup field to Line Item.",
      "D": "Order has are-parentable master-detail field to Line Item."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 74,
    "question": "A developer needs to implement a custom SOAP Web Service that is used by an external Web Application. The developer chooses to include helper methods that are not used by the Web Application in the implementation of the Web Service Class. Which code segment shows the correct declaration of the class and methods?",
    "options": {
      "A": "global class WebServiceClass private static Boolean helperMethod()  (/ implementation global String updateRecords() (/ implementation ... /1 )",
      "B": "webservice class WebServiceClass private static Boolean helperMethod() { / implementation... */ global static String updateRecords() (  implementation ...",
      "C": "webservice class class WebServiceClass ( private static Boolean helperMethod()  / implementation...  / } webservice static String updateRecords() { / implementation...  /",
      "D": "global class WebServiceClass { private static Boolean helperMethod() { /* implementation ... */ } webservice static String updateRecords() { /* implementation... */ } }"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 75,
    "question": "The value of the account type field is not being displayed correctly on the page. Assuming the custom controller is properly referenced on the Visualforce page, what should the developer do to correct the problem?",
    "options": {
      "A": "Add a getter method for the actType attribute.",
      "B": "Change theAccount attribute to public.",
      "C": "Add with sharing to the custom controller.",
      "D": "Convert theAccount.Type to a String."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 76,
    "question": "A developer needs to make a custom Lightning Web Component available in the Salesforce Classic user interface Which approach can be used to accomplish this?",
    "options": {
      "A": "Embed the Lightning Web Component is a Visualforce Component and add directly to the page layout.",
      "B": "Use the Lightning Out JavaScript library to embed the Lightning Web Component in a Visualforce page and add to the page layout.",
      "C": "Use a Visualforce page with a custom controller to invoke the Lightning Web Component using a call to an Apex method.",
      "D": "Wrap the Lightning Web Component in an Aura Component and surface the Aura Component as a Visualforce tab."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 77,
    "question": "What can be used to override the Account's standard Edit button for Lightning Experience?",
    "options": {
      "A": "Lightning action",
      "B": "Lightning page",
      "C": "Lightning component",
      "D": "Lightning flow"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 78,
    "question": "A developer created this Apex trigger that calls MyClass.myStaticMethod:<br><pre><code>trigger myTrigger on Contact (before insert) {\n    MyClass.myStaticMethod (trigger.new); \n}</code></pre><br>The developer creates a test class with a test method that calls MyClass.myStaticMethod directly, resulting in 81% overall code coverage. What happens when the developer tries to deploy the trigger and two classes to production, assuming no other code exists?",
    "options": {
      "A": "The deployment passes because both classes and the trigger were included in the deployment.",
      "B": "The deployment fails because no assertions were made in the test method.",
      "C": "The deployment passes because the Apex code has the required >75% code coverage.",
      "D": "The deployment fails because the Apex trigger has no code coverage."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 79,
    "question": "A developer needs to create a baseline set of data (Accounts, Contacts, Products, Assets) for an entire suite of Apex tests allowing them to test isolated requirements for various types of Salesforce cases. Which approach can efficiently generate the required data for each unit test?",
    "options": {
      "A": "Create a mock using the HttpcalloutMock interface.",
      "B": "Use @TestSetup with a void method.",
      "C": "Add @IsTest (seeAllData=true) at the start of the unit test class.",
      "D": "Create test data before Test.startTest() in the unit test."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 80,
    "question": "A developer must troubleshoot to pinpoint the causes of performance issues when a custom page loads in their org. Which tool should the developer use to troubleshoot query performance?",
    "options": {
      "A": "Setup Menu",
      "B": "Visual Studio Code IDE",
      "C": "AppExchange",
      "D": "Developer Console"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 81,
    "question": "A company has a custom object, Order__c, that has a required, unique external ID field called order_Number__c. Which statement should be used to perform the DML necessary to insert new records and update existing records in a list of Order__c records using the external ID field?",
    "options": {
      "A": "merge orders;",
      "B": "merge orders order_Number__c;",
      "C": "upsert orders order_Number__c;",
      "D": "upsert orders;"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 82,
    "question": "An org has an existing flow that edits an Opportunity with an Update Records element. A developer must update the flow to also create a Contact and store the created Contact's ID on the Opportunity. Which update must the developer make in the flow?",
    "options": {
      "A": "Add a new Update Records element.",
      "B": "Add a new Roll Back Records element.",
      "C": "Add a new Create Records element.",
      "D": "Add a new Get Records element."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 83,
    "question": "Which Lightning Web Component custom event property settings enable the event to bubble up the containment hierarchy and cross the Shadow DOM boundary?",
    "options": {
      "A": "bubbles: true, composed: false",
      "B": "bubbles: false, composed: false",
      "C": "bubbles: true, composed: true",
      "D": "bubbles: false, composed: true"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 84,
    "question": "Universal Containers needs to create a custom user interface component that allows users to enter information about their accounts. The component should be able to validate the user input before saving the information to the database. What is the best technology to create this component?",
    "options": {
      "A": "Flow",
      "B": "Lightning Web Components",
      "C": "Visualforce",
      "D": "VUE JavaScript framework"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 85,
    "question": "How should a developer write unit tests for a private method in an Apex class?",
    "options": {
      "A": "Use the SeeAllData annotation.",
      "B": "Add a test method in the Apex class.",
      "C": "Mark the Apex class as global.",
      "D": "Use the @TestVisible annotation."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 86,
    "question": "Assuming that name is a String obtained by an tag on a Visualforce page, which two SOQL queries performed are safe from SOQL injection? Choose 2 answers\nA) String query = '%' + name;\nList<Account> results = [SELECT ID FROM Account WHERE Name LIKE :query];\nB) String query = 'SELECT ID FROM Account WHERE Name LIKE \\'' + name.noQuotes() + '\\'';\nList<Account> results = Database.query(query);\nC) String query = 'SELECT ID FROM Account WHERE Name LIKE \\'%' + String.escapeSingleQuotes(name) + '\\'';\nList<Account> results = Database.query(query);\nD) String query = 'SELECT id FROM Account WHERE Name LIKE \\'' + name + '\\'';\nList<Account> results = Database.query(query);",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 87,
    "question": "Universal Containers has implemented an order management application. Each Order can have one or more Order Line items. The Order Line object is related to the Order via a master-detail relationship. For each Order Line item, the total price is calculated by multiplying the Order Line item price with the quantity ordered. What is the best practice to get the sum of all Order Line item totals on the Order record?",
    "options": {
      "A": "Roll-up summary field",
      "B": "Formula field",
      "C": "Apex trigger",
      "D": "Quick action"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 88,
    "question": "Refer to the following Apex code:<br><pre><code>Integer x=0;\ndo {\n    x=1;\n    x++;\n} while (x<1);\nSystem.debug(x);</code></pre><br>What is the value of x when it is written to the debug log?",
    "options": {
      "A": "0",
      "B": "1",
      "C": "2",
      "D": "3"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 89,
    "question": "While developing an Apex class with custom search functionality that will be launched from a Lightning Web Component, how can the developer ensure only records accessible to the currently logged in user are displayed?",
    "options": {
      "A": "Use the WITH SECURITY_ENFORCED clause within the SOQL.",
      "B": "Use the inherited sharing keyword.",
      "C": "Use the with sharing keyword.",
      "D": "Use the without sharing keyword."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 90,
    "question": "What can be easily developed using the Lightning Component framework?",
    "options": {
      "A": "Salesforce Classic user interface pages",
      "B": "Lightning Pages",
      "C": "Customized JavaScript buttons",
      "D": "Salesforce integrations"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 91,
    "question": "While working in a sandbox, an Apex test fails when run in the Test Runner. However, executing the Apex logic in the Execute Anonymous window succeeds with no exceptions or errors. Why did the method fail in the sandbox test framework but succeed in the Developer Console?",
    "options": {
      "A": "The test method does not use system.runAs to execute as a specific user.",
      "B": "The test method is calling an @future method.",
      "C": "The test method relies on existing data in the sandbox.",
      "D": "The test method has a syntax error in the code."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 92,
    "question": "How many Accounts will be inserted by the following block of code?<br><pre><code>for (Integer i=0 ; i < 500; i++) {\n    Account a = new Account (Name = 'New Account' + i);\n    insert a;\n}</code></pre>",
    "options": {
      "A": "100",
      "B": "0",
      "C": "150",
      "D": "500"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 93,
    "question": "Which two characteristics are true for Lightning Web Component custom events? Choose 2 answers",
    "options": {
      "A": "Data may be passed in the payload of a custom event using @wire decorated properties.",
      "B": "Data may be passed in the payload of a custom event using a property called detail.",
      "C": "By default a custom event only propagates to its immediate container and to its immediate child component.",
      "D": "By default a custom event only propagates to its immediate container."
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 94,
    "question": "Cloud Kicks has a multi-screen flow that its call center agents use when handling inbound service desk calls. At one of the steps in the flow, the agents should be presented with a list of order numbers and dates that are retrieved from an external order management system in real time and displayed on the screen. What should a developer use to satisfy this requirement?",
    "options": {
      "A": "An outbound message",
      "B": "An Apex REST class",
      "C": "An Apex controller",
      "D": "An invocable method"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 95,
    "question": "Where are two locations a developer can look to find information about the status of batch or future methods? Choose 2 answers",
    "options": {
      "A": "Developer Console",
      "B": "Apex Jobs",
      "C": "Paused Flow Interviews component",
      "D": "Apex Flex Queue"
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 96,
    "question": "A lead developer creates a virtual class called \"OrderRequest\". Consider the following code snippet:<br><pre><code>public class CustomerOrder{\n    //code implementation\n}</code></pre><br>How can a developer use the OrderRequest class within the CustomerOrder class?",
    "options": {
      "A": "Extends (class=\"OrderRequest\") public class CustomerOrder",
      "B": "public class CustomerOrder implements Order",
      "C": "public class CustomerOrder extends OrderRequest",
      "D": "@Implements (class=\"OrderRequest\") public class CustomerOrder"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 97,
    "question": "What is the value of the Trigger.old context variable in a before insert trigger?",
    "options": {
      "A": "An empty list of sObjects",
      "B": "Undefined",
      "C": "null",
      "D": "A list of newly created sobjects without IDs"
    },
    "correct": "C",
    "explanation_en": "Trigger.old in a before insert trigger: The Trigger.old context variable contains the old version of the records being processed in the trigger. In a before insert trigger, the records being processed are new and have no prior state in the database, so Trigger.old is null. This behavior is specific to insert triggers because there is no \"old\" record to reference before the record is created. Why is it null? The Trigger.old variable is only populated for triggers that handle updates or deletions (e.g., before update, after update, before delete, after delete). For insert operations, no previous state of the record exists. Why not the other options? A. An empty list of sObjects: This is incorrect because Trigger.old is not initialized as an empty list for insert triggers-it is simply null. B. Undefined: Trigger.old is defined in the trigger context, but it is null for insert operations. Undefined is not a valid Apex state. D. A list of newly created sObjects without IDs: This describes Trigger.new in a before insert trigger, not Trigger.old. Trigger.new contains the new records being inserted. Reference: Apex Triggers Documentation Trigger Context Variables",
    "explanation_pt": "Trigger.old em um trigger before insert: A variável de contexto Trigger.old contém a versão antiga dos registros que estão sendo processados no trigger. Em um trigger before insert, os registros sendo processados são novos e não têm estado anterior no banco de dados, então o Trigger.old é nulo. Este comportamento é específico para triggers de inserção porque não há um registro \"antigo\" para referenciar antes da criação do registro. Por que é nulo? A variável Trigger.old é preenchida apenas para triggers que lidam com atualizações ou exclusões (por exemplo, before update, after update, before delete, after delete). Para operações de inserção, nenhum estado anterior do registro existe. Por que não as outras opções? A. Uma lista vazia de sObjects: Isso é incorreto porque o Trigger.old não é inicializado como uma lista vazia para triggers de inserção - ele é simplesmente nulo. B. Indefinido: Trigger.old é definido no contexto do trigger, mas é nulo para operações de inserção. Undefined (Indefinido) não é um estado válido no Apex. D. Uma lista de sObjects recém-criados sem IDs: Isso descreve Trigger.new em um trigger before insert, não o Trigger.old. Trigger.new contém os novos registros que estão sendo inseridos. Referência: Documentação de Triggers Apex, Variáveis de Contexto de Trigger."
  },
  {
    "number": 98,
    "question": "<pre><code>public static void insertAccounts(List<Account> theseAccounts) {\n    for (Account thisAccount : theseAccounts) {\n        if (thisAccount.website == null) {\n            thisAccount.website = 'https://www.demo.com';\n        }\n    }\n    update theseAccounts;\n}</code></pre><br>When the code executes, a DML exception is thrown. How should a developer modify the code to ensure exceptions are handled gracefully?",
    "options": {
      "A": "Implement the upsert DML statement.",
      "B": "Implement Change Data Capture.",
      "C": "Implement a try/catch block for the DML.",
      "D": "Remove null items from the list of Accounts."
    },
    "correct": "C",
    "explanation_en": "Why a try/catch block is required: In Salesforce, DML operations such as insert, update, delete, and upsert can throw exceptions due to issues like validation rule violations, field constraints, or sharing rule restrictions. Using a try/catch block ensures that these exceptions are caught and handled gracefully, preventing the entire transaction from failing. How to modify the code: The update statement in the code can be wrapped in a try/catch block to catch and handle any exceptions that occur. For example:\npublic static void insertAccounts (List<Account> theseAccounts) {\n    try {\n        for (Account thisAccount: theseAccounts) {\n            if (thisAccount.website == null) {\n                thisAccount.website = 'https://www.demo.com';\n            }\n        }\n        update theseAccounts;\n    } catch (DmlException e) {\n        System.debug('DML Exception: ' + e.getMessage());\n    }\n}\nWhy not the other options? A. Implement the upsert DML statement: upsert is used to either insert or update records based on an external ID or primary key. It does not inherently handle exceptions. B. Implement Change Data Capture: Change Data Capture (CDC) is used for tracking changes to data in real time and is unrelated to handling DML exceptions. D. Remove null items from the list of Accounts: While cleaning the input data is a good practice, it does not address the need for exception handling during DML operations. Reference: Apex Error Handling, DML Operations in Apex",
    "explanation_pt": "Por que um bloco try/catch é necessário: No Salesforce, operações DML como insert, update, delete e upsert podem lançar exceções devido a problemas como violações de regras de validação, restrições de campo ou restrições de regras de compartilhamento (sharing rules). O uso de um bloco try/catch garante que essas exceções sejam capturadas e tratadas de forma elegante, evitando que a transação inteira falhe. Como modificar o código: A instrução update no código pode ser envolvida em um bloco try/catch para capturar e lidar com quaisquer exceções que ocorram. Exemplo:\npublic static void insertAccounts (List<Account> theseAccounts) {\n    try {\n        for (Account thisAccount: theseAccounts) {\n            if (thisAccount.website == null) {\n                thisAccount.website = 'https://www.demo.com';\n            }\n        }\n        update theseAccounts;\n    } catch (DmlException e) {\n        System.debug('DML Exception: ' + e.getMessage());\n    }\n}\nPor que não as outras opções? A. Implementar a instrução DML upsert: upsert é usado para inserir ou atualizar registros com base em um ID externo ou chave primária. Ele não trata exceções inerentemente. B. Implementar o Change Data Capture (CDC): O Change Data Capture é usado para rastrear alterações de dados em tempo real e não está relacionado ao tratamento de exceções DML. D. Remover itens nulos da lista de Contas: Embora a limpeza dos dados de entrada seja uma boa prática, ela não aborda a necessidade de tratamento de exceções durante as operações DML. Referência: Tratamento de Erros Apex, Operações DML no Apex."
  },
  {
    "number": 99,
    "question": "A developer wants to import 500 Opportunity records into a sandbox. Why should the developer choose to use Data Loader instead of Data Import Wizard?",
    "options": {
      "A": "Data Loader automatically relates Opportunities to Accounts.",
      "B": "Data Loader runs from the developer's browser.",
      "C": "Data Import Wizard does not support Opportunities.",
      "D": "Data Import Wizard can not import all 500 records."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 100,
    "question": "A Next Best Action strategy uses an Enhance element that invokes an Apex method to determine a discount level for a Contact, based on a number of factors. What is the correct definition of the Apex method?",
    "options": {
      "A": "@InvocableMethod\nglobal List<List<Recommendation>> getLevel (List<ContactWrapper> input)",
      "B": "@InvocableMethod\nglobal Recommendation getLevel (ContactWrapper input)",
      "C": "@InvocableMethod\nglobal static List<Recommendation> getLevel (List<ContactWrapper> input)",
      "D": "@InvocableMethod\nglobal static List<List<Recommendation>> getLevel (List<ContactWrapper> input)"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 101,
    "question": "Universal Containers decided to transition from Classic to Lightning Experience. They asked a developer to replace a JavaScript button that was being used to create records with prepopulated values. What can the developer use to accomplish this?",
    "options": {
      "A": "Validation rules",
      "B": "Apex triggers",
      "C": "Record triggered flows",
      "D": "Quick Actions"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 102,
    "question": "Universal Containers has developed custom Apex code and Lightning Components in a Sandbox environment. They need to deploy the code and associated configurations to the Production environment. What is the recommended process for deploying the code and configurations to Production?",
    "options": {
      "A": "Use the Force.com IDE to deploy the Apex code and Lightning Components.",
      "B": "Use the Ant Migration Tool to deploy the Apex cade and Lightning Components.",
      "C": "Use a change set to deploy the Apex code and Lightning Components.",
      "D": "Use Salesforce CLI to deploy the Apex code and Lightning Components."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 103,
    "question": "In the following example, which sharing context will myMethod execute when it is invoked?<br><pre><code>public Class myClass {\n    public void myMethod() { /* implementation */ }\n}</code></pre>",
    "options": {
      "A": "Sharing rules will be enforced by the instantiating class.",
      "B": "Sharing rules will be enforced for the running user.",
      "C": "Sharing rules will not be enforced for the running user.",
      "D": "Sharing rules will be inherited from the calling context"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 104,
    "question": "What are two considerations for deploying from a sandbox to production? Choose 2 answers",
    "options": {
      "A": "At least 75% of Apex code must be covered by unit tests.",
      "B": "Unit tests must have calls to the System.assert method.",
      "C": "Should deploy during business hours to ensure feedback can be quickly addressed.",
      "D": "All triggers must have at least one line of test coverage."
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 105,
    "question": "Universal Containers has a Visualforce page that displays a table of every Container_c being rented by a given Account. Recently this page is failing with a view state limit because some of the customers rent over 10,000 containers. What should a developer change about the Visualforce page to help with the page load errors?",
    "options": {
      "A": "Implement pagination with an OffsetController.",
      "B": "Implement pagination with a StandardSetController.",
      "C": "Use JavaScript remoting with SOQL Offset.",
      "D": "Use lazy loading and a transient List variable."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 106,
    "question": "Universal Containers decides to use purely declarative development to build out a new Salesforce application. Which two options can be used to build out the business logic layer for this application? Choose 2 answers",
    "options": {
      "A": "Record-Triggered Flow",
      "B": "Batch Jobs",
      "C": "Remote Actions",
      "D": "Validation Rules"
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 107,
    "question": "A custom object Trainer_c has a a lookup field to another custom object Gym_c. Which SOQL query will get the record for the Viridian City Gym and all it's trainers?",
    "options": {
      "A": "SELECT ID FROM Trainer_c WHERE Gym_r.Name = 'Viridian City Gym'",
      "B": "SELECT Id, (SELECT ID FROM Trainer_c FROM Gym_c WHERE Name = 'Viridian City Gym'",
      "C": "SELECT Id, (SELECT ID FROM Trainers_r) FROM Gym_c WHERE Name = 'Viridian City Gym'",
      "D": "SELECT Id, (SELECT ID FROM Trainers_c) FROM Gym_c WHERE Name = 'Viridian City Gym'"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 108,
    "question": "Which three resources in an Aura component can contain JavaScript functions? Choose 3 answers",
    "options": {
      "A": "Style",
      "B": "Renderer",
      "C": "Controller",
      "D": "Design",
      "E": "Helper"
    },
    "correct": "B, C, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 109,
    "question": "A developer created a custom order management app that uses an Apex class. The order is represented by an Order object and an Orderlitem object that has a master-detail relationship to Order. During order processing, an order may be split into multiple orders. What should a developer do to allow their code to move some existing Orderltem records to a new Order record?",
    "options": {
      "A": "Add without sharing to the Apex class declaration.",
      "B": "Change the master-detail relationship to an external lookup relationship.",
      "C": "Create a junction object between Orderltem and Order.",
      "D": "Select the Allow reparenting option on the master-detail relationship."
    },
    "correct": "D",
    "explanation_en": "Allow Reparenting in Master-Detail Relationships: In a master-detail relationship, the child record (in this case, Orderltem) is tightly bound to the parent record (Order). By default, child records cannot be reassigned to a different parent record in master-detail relationships. However, enabling the \"Allow Reparenting\" option on the master-detail field allows the child record (Orderltem) to be reparented to a different master record (Order). This is the correct solution as it ensures that Orderltem records can be reassigned to a new Order without changing the structure of the relationship.\nWhy not the other options?\nA. Add without sharing to the Apex class declaration: Adding without sharing modifies sharing rules but does not affect the ability to reparent child records. This is unrelated to the issue described.\nB. Change the master-detail relationship to an external lookup relationship: Changing the relationship type is not necessary. Additionally, doing so could introduce unintended side effects, as master-detail relationships have features like roll-up summaries that are lost with a lookup relationship.\nC. Create a junction object between Orderltem and Order: Introducing a junction object is not required. This adds unnecessary complexity and deviates from the intended use of master-detail relationships.",
    "explanation_pt": "Permitir Reatribuição (Allow Reparenting) em Relacionamentos Master-Detail: Em um relacionamento master-detail, o registro filho (neste caso, Orderltem) está fortemente vinculado ao registro pai (Order). Por padrão, registros filhos não podem ser reatribuídos a um registro pai diferente em relacionamentos master-detail. No entanto, habilitar a opção \"Allow Reparenting\" no campo master-detail permite que o registro filho (Orderltem) seja reparentado para um registro mestre diferente (Order). Esta é a solução correta, pois garante que os registros Orderltem possam ser reatribuídos a uma nova Order sem alterar a estrutura do relacionamento.\nPor que não as outras opções?\nA. Adicionar without sharing à declaração da classe Apex: Adicionar without sharing modifica as regras de compartilhamento, mas não afeta a capacidade de reatribuir registros filhos. Isso não está relacionado ao problema descrito.\nB. Alterar o relacionamento master-detail para um external lookup: Alterar o tipo de relacionamento não é necessário. Além disso, fazer isso poderia introduzir efeitos colaterais indesejados, pois relacionamentos master-detail possuem recursos como roll-up summaries que são perdidos com um relacionamento de lookup.\nC. Criar um objeto de junção entre Orderltem e Order: Introduzir um objeto de junção não é necessário. Isso adiciona complexidade desnecessária e desvia do uso pretendido de relacionamentos master-detail."
  },
  {
    "number": 110,
    "question": "Which three statements are accurate about debug logs? Choose 3 answers",
    "options": {
      "A": "Debug logs can be set for specific users, classes, and triggers.",
      "B": "System debug logs are retained for 24 hours.",
      "C": "Only the 20 most recent debug logs for a user are kept.",
      "D": "Debug log levels are cumulative, where FINE log level includes all events logged at the DEBUG, INFO, WARN, and ERROR levels.",
      "E": "The maximum size of a debug log is 5 MB."
    },
    "correct": "A, B, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 111,
    "question": "What does the Lightning Component framework provide to developers?",
    "options": {
      "A": "Support for Classic and Lightning Uls",
      "B": "Prebuilt components that can be reused",
      "C": "Templates to create custom components",
      "D": "Extended governor limits for applications"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 112,
    "question": "An Opportunity needs to have an amount rolled up from a custom object that is not in a master-detail relationship. How can this be achieved?",
    "options": {
      "A": "Write a trigger on the Opportunity object and use tree sorting to sum the amount for all related child objects under the Opportunity.",
      "B": "Use the Streaming API to create real-time roll-up summaries.",
      "C": "Write a trigger on the child object and use an aggregate function to sum the amount for all related child objects under the Opportunity.",
      "D": "Use the Metadata API to create real-time roll-up summaries."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 113,
    "question": "Which two actions may cause triggers to fire? Choose 2 answers",
    "options": {
      "A": "Changing a user's default division when the transfer division option is checked",
      "B": "Updates to FeedItem",
      "C": "Cascading delete operations",
      "D": "Renaming or replacing a picklist entry"
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 114,
    "question": "A developer created a trigger on a custom object. This custom object also has some dependent pick lists. According to the order of execution rules, which step happens first?",
    "options": {
      "A": "The original record is loaded from the database.",
      "B": "System validation is run for maximum field lengths.",
      "C": "Old values are overwritten with the new record values.",
      "D": "JavaScript validation is run in the browser,"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 115,
    "question": "Universal Containers implemented a private sharing model for the Account object. A custom Account search tool was developed with Apex to help sales representatives find accounts that match multiple criteria they specify. Since its release, users of the tool report they can see Accounts they do not own. What should the developer use to enforce sharing permissions for the currently logged in user while using the custom search tool?",
    "options": {
      "A": "Use the with sharing keyword on the class declaration.",
      "B": "Use the without sharing keyword on the class declaration.",
      "C": "Use the userInfo Apex class to filter all SOQL queries to returned records owned by the logged-in user.",
      "D": "Use the schema describe calls to determine if the logged-in user has access to the Account object."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 116,
    "question": "Universal Containers has a support process that allows users to request support from its engineering team using a custom object, Engineering Support_c. Users should be able to associate multiple Engineering Support_c records to a single Opportunity record. Additionally, aggregate information about the Engineering Support_c records should be shown on the Opportunity record. Which relationship field should be implemented to support these requirements?",
    "options": {
      "A": "Lookup field from Opportunity to Engineering_support_c",
      "B": "Master-detail field from Engineering Support_c to Opportunity",
      "C": "Master-detail field from Opportunity to Engineering Support_c",
      "D": "Lookup field from Engineering Support_c to Opportunity"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 117,
    "question": "A developer is creating an app that contains multiple Lightning web components. One of the child components is used for navigation purposes. When a user clicks a button called Next in the child component, the parent component must be alerted so it can navigate to the next page. How should this be accomplished?",
    "options": {
      "A": "Update a property on the parent.",
      "B": "Call a method in the Apex controller.",
      "C": "Fire a notification.",
      "D": "Create a custom event."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 118,
    "question": "Which annotation exposes an Apex class as a RESTful web service?",
    "options": {
      "A": "@RemoteAction",
      "B": "@RestResource (urlMapping='/myService/*\"\")",
      "C": "@HttpInvocable",
      "D": "@Aurabnabled(cacheable=true)"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 119,
    "question": "Universal Containers is building a recruiting app with an Applicant object that stores information about an individual person and a Job object that represents a job. Each applicant may apply for more than one job. What should a developer implement to represent that an applicant has applied for a job?",
    "options": {
      "A": "Junction object between Applicant and Job",
      "B": "Lookup field from Applicant to Job",
      "C": "Master-detail field from Applicant to Job",
      "D": "Formula field on Applicant that references Job"
    },
    "correct": "A",
    "explanation_en": "A. Junction object between Applicant and Job: Since an Applicant can apply for multiple Jobs and each Job can have multiple Applicants, this is a many-to-many relationship. Salesforce requires a junction object to represent many-to-many relationships. The junction object will have two master-detail relationships: one to the Applicant object and one to the Job object. The junction object could be named something like JobApplication_c, which would represent the specific instance of an applicant applying for a particular job.\nWhy this is the correct approach?\nA junction object allows for robust data management and reporting capabilities in a many-to-many relationship. This design ensures that each combination of applicant and job is captured as a unique record in the JobApplication_c junction object. It also allows storing additional details about the application, such as application date, status, and feedback.\nWhy not the other options?\nB. Lookup field from Applicant to Job: A lookup field creates a one-to-many relationship. While an Applicant could reference one Job, it does not support the many-to-many relationship required in this scenario.\nC. Master-detail field from Applicant to Job: A master-detail relationship is a one-to-many relationship, which is unsuitable for a many-to-many relationship. Additionally, you cannot have two master-detail fields on a single object to connect Applicant and Job directly.\nD. Formula field on Applicant that references Job: A formula field cannot establish relationships between records or represent a many-to-many relationship. It is only for computed fields.",
    "explanation_pt": "A. Objeto de junção (Junction object) entre Applicant e Job: Como um Applicant pode se candidatar a vários Jobs e cada Job pode ter vários Applicants, trata-se de um relacionamento muitos-para-muitos. O Salesforce exige um objeto de junção para representar relacionamentos muitos-para-muitos. O objeto de junção terá dois relacionamentos master-detail: um para o objeto Applicant e outro para o objeto Job. O objeto de junção poderia ser nomeado algo como JobApplication_c, que representaria a instância específica de um candidato se candidatando a uma vaga específica.\nPor que essa é a abordagem correta?\nUm objeto de junção permite gerenciamento robusto de dados e recursos de relatórios em um relacionamento muitos-para-muitos. Esse design garante que cada combinação de candidato e vaga seja capturada como um registro único no objeto de junção JobApplication_c. Também permite armazenar detalhes adicionais sobre a candidatura, como data de inscrição, status e feedback.\nPor que não as outras opções?\nB. Campo de pesquisa (Lookup field) de Applicant para Job: Um campo lookup cria um relacionamento um-para-muitos. Embora um Applicant pudesse referenciar um Job, isso não suporta o relacionamento muitos-para-muitos necessário neste cenário.\nC. Campo Master-detail de Applicant para Job: Um relacionamento master-detail é um relacionamento um-para-muitos, o que é inadequado para um relacionamento muitos-para-muitos. Além disso, não é possível ter dois campos master-detail em um único objeto para conectar Applicant e Job diretamente.\nD. Campo de fórmula em Applicant que referencia Job: Um campo de fórmula não pode estabelecer relacionamentos entre registros ou representar um relacionamento muitos-para-muitos. Serve apenas para campos calculados."
  },
  {
    "number": 120,
    "question": "A developer is implementing an Apex class for a financial system. Within the class, the variables 'creditAmount' and 'debitAmount' should not be able to change once a value is assigned. In which two ways can the developer declare the variables to ensure their value can only be assigned one time? Choose 2 answers",
    "options": {
      "A": "Use the static keyword and assign its value in a static initializer.",
      "B": "Use the final keyword and assign its value in the class constructor.",
      "C": "Use the final keyword and assign its value when declaring the variable.",
      "D": "Use the static keyword and assign its value in the class constructor."
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 121,
    "question": "Which scenario is valid for execution by unit tests?",
    "options": {
      "A": "Execute anonymous Apex as a different user.",
      "B": "Generate a Visualforce PDF with getcontentaAsPDF ().",
      "C": "Load data from a remote site with a callout.",
      "D": "Set the created date of a record using a system method."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 122,
    "question": "Developers at Universal Containers (UC) use version control to share their code changes, but they notice that when they deploy their code to different environments they often have failures. They decide to set up Continuous Integration (CI). What should the UC development team use to automatically run tests as part of their Cl process?",
    "options": {
      "A": "Salesforce CLI",
      "B": "Visual Studio Code",
      "C": "Force.com Toolkit",
      "D": "Developer Console"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 123,
    "question": "A developer is asked to prevent anyone other than a user with Sales Manager profile from changing the Opportunity Status to Closed Lost if the lost reason is blank. Which automation allows the developer to satisfy this requirement in the most efficient manner?",
    "options": {
      "A": "An Apex trigger on the Opportunity object",
      "B": "An error condition formula on a validation rule on Opportunity",
      "C": "A record trigger flow on the Opportunity object",
      "D": "An approval process on the Opportunity object"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 124,
    "question": "A developer created a trigger on the Account object and wants to test if the trigger is properly bulkified. The developer team decided that the trigger should be tested with 200 account records with unique names. What two things should be done to create the test data within the unit test with the least amount of code? Choose 2 answers",
    "options": {
      "A": "Use the @isTest (seeAllData=true) annotation in the test class.",
      "B": "Use the @isTest (isParallel=true) annotation in the test class.",
      "C": "Create a static resource containing test data.",
      "D": "Use Test.loadData() to populate data in your test methods."
    },
    "correct": "C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 125,
    "question": "A business has a proprietary Order Management System (OMS) that creates orders from its website and fulfills the orders. When the order is created in the OMS, an integration also creates an order record in Salesforce and relates it to the contact as identified by the email on the order. As the order goes through different stages in the OMS, the integration also updates it in Salesforce. The business notices that each update from the OMS creates a new order record in Salesforce. Which two actions should prevent the duplicate order records from being created in Salesforce? Choose 2 answers",
    "options": {
      "A": "Use the order number from the OMS as an external ID.",
      "B": "Ensure that the order number in the OMS is unique.",
      "C": "Use the email on the contact record as an external ID.",
      "D": "Write a trigger on the Order object to delete the duplicates."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 126,
    "question": "Which three data types can a SOQL query return? Choose 3 answers",
    "options": {
      "A": "Double",
      "B": "Long",
      "C": "sObject",
      "D": "Integer",
      "E": "List"
    },
    "correct": "C, D, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 127,
    "question": "A developer created a new after insert trigger on the Lead object that creates Task records for each Lead. After deploying to production, an existing outside integration that inserts Lead records in batches to Salesforce is occasionally reporting total batch failures being caused by the Task insert statement. This causes the integration process in the outside system to stop, requiring a manual restart. Which change should the developer make to allow the integration to continue when some records in a batch cause failures due to the Task insert statement, so that manual restarts are not needed?",
    "options": {
      "A": "Use the Database method with allow one set to false.",
      "B": "Deactivate the trigger before the integration runs.",
      "C": "Remove the Apex class from the integration user's profile.",
      "D": "Use a try-catch block after the insert statement."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 128,
    "question": "Which two statements are true about using the @testSetup annotation in an Apex test class? Choose 2 answers",
    "options": {
      "A": "Records created in the test setup method cannot be updated in individual test methods.",
      "B": "In a test setup method, test data is inserted once and made available for all test methods In the test class.",
      "C": "A method defined with the @testSetup annotation executes once for each test method in the test class and counts towards system limits.",
      "D": "The @testSetup annotation is not supported when the @isTest(SeeAllData=True) annotation is used."
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 129,
    "question": "A Salesforce administrator used Flow Builder to create a flow named \"accountOnboarding\". The flow must be used inside an Aura component. Which tag should a developer use to display the flow in the component?",
    "options": {
      "A": "lightning:flow",
      "B": "lightning-low",
      "C": "aura-flow",
      "D": "aura:flow"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 130,
    "question": "A developer is alerted to an issue with a custom Apex trigger that is causing records to be duplicated. What is the most appropriate debugging approach to troubleshoot the issue?",
    "options": {
      "A": "Review the Historical Event logs to identify the source of the issue.",
      "B": "Add system.debug statements to the code to track the execution flow and identify the issue.",
      "C": "Use the Apex Interactive Debugger to step through the code and identify the issue.",
      "D": "Disable the trigger in production and test to see if the issue still occurs."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 131,
    "question": "Managers at Universal Containers want to ensure that only decommissioned containers are able to be deleted in the system. To meet the business requirement a Salesforce developer adds \"Decommissioned\" as a picklist value for the Status_c custom field within the Container_c object. Which two approaches could a developer use to enforce only Container records with a status of \"Decommissioned\" can be deleted? Choose 2 answers",
    "options": {
      "A": "Before record-triggered flow",
      "B": "Apex trigger",
      "C": "After record-triggered flow",
      "D": "Validation rule"
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 132,
    "question": "A team of developers is working on a source-driven project that allows them to work independently, with many different org configurations. Which type of Salesforce orgs should they use for their development?",
    "options": {
      "A": "Developer sandboxes.",
      "B": "Full Copy sandboxes",
      "C": "Developer orgs",
      "D": "Scratch orgs"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 133,
    "question": "A developer needs to prevent the creation of Request_c records when certain conditions exist in the system. A RequestLogic class exists that checks the conditions. What is the correct implementation?",
    "options": {
      "A": "trigger RequestTrigger on Request_c (after insert) { RequestLogic.validateRecords (trigger.new); }",
      "B": "trigger RequestTrigger on Request_c (before insert) { RequestLogic.validateRecords (trigger.new); }",
      "C": "trigger RequestTrigger on Request_c (before insert) { if (RequestLogic.isValid(Request_c)) { Request.addError('Your request cannot be created at this time.'); } }",
      "D": "trigger RequestTrigger on Request_c (after insert) { if (RequestLogic.isValid(Request_c)) { Request.addError('Your request cannot be created at this time.'); } }"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 134,
    "question": "A company decides to implement a new process where every time an Opportunity is created, a follow up Task should be created and assigned to the Opportunity Owner. What is the most efficient way for a developer to implement this?",
    "options": {
      "A": "Apex trigger on Task",
      "B": "Task actions",
      "C": "Auto-launched flow on Task",
      "D": "Record-triggered flow on Opportunity"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 135,
    "question": "A developer is creating a page that allows users to create multiple Opportunities. The developer is asked to verify the current user's default Opportunity record type, and set certain default values based on the record type before inserting the record. How can the developer find the current user's default record type?",
    "options": {
      "A": "Create the opportunity and check the opportunity.recordtype, which will have the record ID of the current user's default record type, before inserting.",
      "B": "Query the Profile where the ID equals userinfo.getprofileID () and then use the profile opportunity.getdefaultresoratype () method.",
      "C": "Use the schema.UserInfo.Opportunity.getDefaultRecordType() method.",
      "D": "Use Opportunity.SObjectType.getDescribe().getRecordTypeInfos() to get a list of record types, and iterate through them until isDefaultRecordtypeMapping() is true."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 136,
    "question": "The Account object in an organization has a master-detail relationship to a child object called Branch. The following automations exist:\n* Roll-up summary fields\n* Custom validation rules\n* Duplicate rules\nA developer created a trigger on the Account object. Which two things should the developer consider while testing the trigger code? Choose 2 answers",
    "options": {
      "A": "Rollup summary fields can cause the parent record to go through Save.",
      "B": "Duplicate rules are executed once all DML operations commit to the database.",
      "C": "The trigger may fire multiple times during a transaction.",
      "D": "The validation rules will cause the trigger to fire again."
    },
    "correct": "A, C",
    "explanation_en": "A. Roll-up summary fields can cause the parent record to go through Save: When a roll-up summary field on a parent object (like Account) is updated due to changes in child records (like Branch), the parent record (Account) is implicitly saved again. This can result in the execution of the trigger on the parent object. Developers must consider this behavior to avoid unintended recursion or infinite loops.\nReference: Roll-Up Summary Field Considerations\nC. The trigger may fire multiple times during a transaction: Triggers can execute multiple times within a single transaction, especially when there are operations such as updates to the parent record caused by roll-up summary fields or workflows. Developers should implement logic to ensure that the trigger handles multiple executions correctly (e.g., using a static variable to prevent recursion).\nReference: Apex Trigger Best Practices\nWhy not the other options?\nB. Duplicate rules are executed once all DML operations commit to the database: This is incorrect because duplicate rules execute before the DML operation is committed. Duplicate rules prevent duplicate records from being created or updated before the database operation occurs.\nReference: Duplicate Rules Execution\nD. The validation rules will cause the trigger to fire again: This is incorrect because validation rules do not cause triggers to fire again. Validation rules validate the record and may prevent DML operations, but they do not independently re-trigger the Apex trigger.",
    "explanation_pt": "A. Campos de resumo de totalização (Roll-up summary fields) podem fazer com que o registro pai passe pelo processo de Save: Quando um campo de resumo de totalização em um objeto pai (como Account) é atualizado devido a alterações nos registros filhos (como Branch), o registro pai (Account) é implicitamente salvo novamente. Isso pode resultar na execução do trigger no objeto pai. Os desenvolvedores devem considerar esse comportamento para evitar recursões não intencionais ou loops infinitos.\nReferência: Considerações sobre Campo de Resumo de Totalização\nC. O trigger pode ser acionado várias vezes durante uma transação: Triggers podem ser executados várias vezes dentro de uma única transação, especialmente quando há operações como atualizações no registro pai causadas por campos de resumo de totalização ou workflows. Os desenvolvedores devem implementar lógica para garantir que o trigger lide com várias execuções corretamente (por exemplo, usando uma variável estática para evitar recursão).\nReferência: Melhores Práticas de Triggers Apex\nPor que não as outras opções?\nB. As regras de duplicação são executadas quando todas as operações DML são confirmadas (commit) no banco de dados: Isso está incorreto porque as regras de duplicação são executadas antes de a operação DML ser confirmada. As regras de duplicação impedem a criação ou atualização de registros duplicados antes da operação no banco de dados ocorrer.\nReferência: Execução de Regras de Duplicação\nD. As regras de validação farão com que o trigger dispare novamente: Isso está incorreto porque as regras de validação não fazem com que os triggers disparem novamente. Regras de validação validam o registro e podem impedir as operações DML, mas elas não reacionam independentemente o trigger Apex."
  },
  {
    "number": 137,
    "question": "A Primaryld_c custom field exists on the Candidate_cc custom object. The field is used to store each candidate's id number and is marked as Unique in the schema definition. As part of a data enrichment process, Universal Containers has a CSV file that contains updated data for all candidates in the system. The file contains each Candidate's primary ID as a data point. Universal Containers wants to upload this information into Salesforce, while ensuring all data rows are correctly mapped to a candidate in the system. Which technique should the developer implement to streamline the data upload?",
    "options": {
      "A": "Upload the CSV into a custom object related to Candidate_c.",
      "B": "Create a before insert trigger to correctly map the records.",
      "C": "Update the PrimaryId_c field definition to mark it as an External Id.",
      "D": "Create a before save flow to correctly map the records."
    },
    "correct": "C",
    "explanation_en": "C. Update the Primaryld c field definition to mark it as an External Id: Marking Primaryld_c as an External Id allows Salesforce to use this field to match records during the data import process, streamlining the process of mapping CSV rows to existing Candidate_c records. External Id fields are indexed and can be used in tools like Data Loader, Data Import Wizard, or API-based upserts to ensure that records are matched correctly based on the value of the external ID field. In this case, since Primaryld_c is unique, marking it as an external ID eliminates the need for custom triggers or flows.\nWhy this is the best solution?\nThis technique leverages built-in Salesforce capabilities (no need for custom code or automation). It ensures accurate record matching and is the standard approach for data enrichment tasks involving unique identifiers.\nWhy not the other options?\nA. Upload the CSV into a custom object related to Candidate_c: This approach unnecessarily introduces another object, adding complexity. The goal is to update existing Candidate_c records, not store the data in a separate object.\nB. Create a before insert trigger to correctly map the records: Using triggers for this purpose is overengineering. Salesforce already provides tools like upsert for this exact use case. Writing a trigger would require additional effort and could introduce unintended errors or performance issues.\nD. Create a before save flow to correctly map the records: While flows are powerful, they are not the optimal solution for this use case. Data mapping is better handled using an external ID during import to ensure proper matching and updates.",
    "explanation_pt": "C. Atualizar a definição do campo Primaryld_c para marcá-lo como um External Id: Marcar Primaryld_c como um External Id permite que o Salesforce use este campo para fazer a correspondência de registros durante o processo de importação de dados, simplificando o processo de mapeamento de linhas CSV para registros Candidate_c existentes. Campos External Id são indexados e podem ser usados em ferramentas como Data Loader, Data Import Wizard ou upserts baseados em API para garantir que os registros sejam correspondidos corretamente com base no valor do campo de ID externo. Neste caso, como o Primaryld_c é único, marcá-lo como ID externo elimina a necessidade de triggers ou flows personalizados.\nPor que essa é a melhor solução?\nEsta técnica aproveita os recursos nativos do Salesforce (sem necessidade de código personalizado ou automação). Garante a correspondência precisa de registros e é a abordagem padrão para tarefas de enriquecimento de dados envolvendo identificadores exclusivos.\nPor que não as outras opções?\nA. Carregar o CSV em um objeto personalizado relacionado a Candidate_c: Essa abordagem introduz desnecessariamente outro objeto, adicionando complexidade. O objetivo é atualizar os registros Candidate_c existentes, não armazenar os dados em um objeto separado.\nB. Criar um before insert trigger para mapear os registros corretamente: O uso de triggers para esse fim é um excesso de engenharia. O Salesforce já fornece ferramentas como upsert para esse caso de uso exato. Escrever um trigger exigiria esforço adicional e poderia introduzir erros ou problemas de desempenho indesejados.\nD. Criar um before save flow para mapear os registros corretamente: Embora os flows sejam poderosos, eles não são a solução ideal para esse caso de uso. O mapeamento de dados é melhor tratado usando um ID externo durante a importação para garantir a correspondência e as atualizações adequadas."
  },
  {
    "number": 138,
    "question": "A Developer Edition org has five existing accounts. A developer wants to add 10 more accounts for testing purposes. The following code is executed in the Developer Console using the Execute Anonymous window:<br><pre><code>Account myAccount = new Account (Name = 'MyAccount');\ninsert myAccount;\nInteger x=1;\nList<Account> newAccounts = new List<Account>();\ndo {\n    Account acct = new Account (Name = 'New Account' + x);\n    newAccounts.add(acct);\n    x++;\n} while (x<10);\ninsert newAccounts;</code></pre><br>How many total accounts will be in the org after this code is executed?",
    "options": {
      "A": "5",
      "B": "6",
      "C": "10",
      "D": "15"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 139,
    "question": "A developer wants to get access to the standard price book in the org while writing a test class that covers an OpportunityLineltem trigger. Which method allows access to the price book?",
    "options": {
      "A": "Use Test.getStandardPricebookId() to get the standard price book ID.",
      "B": "Use @isTest (SeeAllData=true) and delete the existing standard price book.",
      "C": "Use @Testvisible to allow the test method to see the standard price book.",
      "D": "Use Test.loadData() and a static resource to load a standard price book."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 140,
    "question": "A developer must create a Lightning component that allows users to input Contact record information to create a Contact record, including a Salary__c custom field. What should the developer use, along with a lightning-record-edit-form, so that Salary__c field functions as a currency input and is only viewable and editable by users that have the correct field level permissions on Salary__c?",
    "options": {
      "A": "<lightning-input-currency value=\"salary__c\"></lightning-input-currency>",
      "B": "<lightning-formatted-number value=\"salary__c\" format-style=\"currency\"></lightning-formatted-number>",
      "C": "<lightning-input-field field-name=\"Salary__c\"></lightning-input-field>",
      "D": "<lightning-input type=\"number\" value=\"salary__c\" formatter=\"currency\"></lightning-input>"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 141,
    "question": "What is the result of the following code snippet?<br><pre><code>public void doWork(Account acct) {\n    for (Integer i = 0; i <= 200; i++) {\n        insert acct;\n    }\n}</code></pre>",
    "options": {
      "A": "Accounts are inserted.",
      "B": "Account is inserted.",
      "C": "200 Accounts are inserted.",
      "D": "201 Accounts are inserted."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 142,
    "question": "If Apex code executes inside the execute() method of an Apex class when implementing the Batchable interface, which two statements are true regarding governor limits? Choose 2 answers",
    "options": {
      "A": "The Apex governor limits are reset for each iteration of the execute () method.",
      "B": "The Apex governor limits cannot be exceeded due to the asynchronous nature of the transaction.",
      "C": "The Apex governor limits will use the asynchronous limit levels.",
      "D": "The Apex governor limits are omitted while calling the constructor of the Apex class."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 143,
    "question": "A developer must perform a complex SOQL query that joins two objects in a Lightning component. How can the Lightning component execute the query?",
    "options": {
      "A": "Write the query in a custom Lightning web component wrapper and invoke from the Lightning component.",
      "B": "Invoke an Apex class with the method annotated as @AuraEnabled to perform the query.",
      "C": "Use the Salesforce Streaming API to perform the SOQL query.",
      "D": "Create a flow to execute the query and invoke from the Lightning component."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 144,
    "question": "Which two operations affect the number of times a trigger can fire? Choose 2 answers",
    "options": {
      "A": "Criteria-based sharing calculations",
      "B": "Email messages",
      "C": "Roll-up summary fields",
      "D": "After-save record-triggered flow"
    },
    "correct": "C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 145,
    "question": "Which two are best practices when it comes to Aura component and application event handling? Choose 2 answers",
    "options": {
      "A": "Try to use application events as opposed to component events.",
      "B": "Reuse the event logic in a component bundle, by putting the logic in the helper.",
      "C": "Use component events to communicate actions that should be handled at the application level.",
      "D": "Handle low-level events in the event handler and re-fire them as higher-level events."
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 146,
    "question": "What are three considerations when using the @InvocableMethod annotation in Apex? Choose 3 answers",
    "options": {
      "A": "Only one method using the @InvocableMethod annotation can be defined per Apex class.",
      "B": "A method using the @InvocableMethod annotation can have multiple input parameters.",
      "C": "A method using the @InvocableMethod annotation must be declared as static.",
      "D": "A method using the @InvocableMethod annotation must define a return value.",
      "E": "A method using the @InvocableMethod annotation can be declared as Public or Global."
    },
    "correct": "A, C, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 147,
    "question": "Which two settings must be defined in order to update a record of a junction object? Choose 2 answers",
    "options": {
      "A": "Read/Write access on the secondary relationship",
      "B": "Read/Write access on the primary relationship",
      "C": "Read/Write access on the junction object",
      "D": "Read access on the primary relationship"
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 148,
    "question": "A developer wrote Apex code that calls out to an external system using REST API. How should a developer write the test to prove the code is working as intended?",
    "options": {
      "A": "Write a class that implements HttpCalloutMock.",
      "B": "Write a class that extends WebServiceMock.",
      "C": "Write a class that implements WebServiceMock.",
      "D": "Write a class that extends HttpCalloutMock."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 149,
    "question": "Universal Containers wants to assess the advantages of declarative development versus programmatic customization for specific use cases in its Salesforce implementation. What are two characteristics of declarative development over programmatic customization? Choose 2 answers",
    "options": {
      "A": "Declarative development does not require Apex test classes.",
      "B": "Declarative development has higher design limits and query limits.",
      "C": "Declarative development can be done using the Setup menu.",
      "D": "Declarative code logic does not require maintenance or review."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 150,
    "question": "How is a controller and extension specified for a custom object named \"Notice\" on a Visualforce page?",
    "options": {
      "A": "<apex:page standardController=\"Notice__c\" extensions=\"myControllerExtension\">",
      "B": "<apex:page controllers=\"Notice__c, myControllerExtension\">",
      "C": "<apex:page Notice extends=\"myControllerExtension\">",
      "D": "<apex:page extensions=\"myControllerExtension\">"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 151,
    "question": "Universal Containers wants a list button to display a Visualforce page that allows users to edit multiple records. Which Visualforce feature supports this requirement?",
    "options": {
      "A": "Standard Controller with Custom List Controller extension",
      "B": "Custom List Controller with recordSetVar page attribute",
      "C": "Controller Extension and <apex:listButton> tag",
      "D": "Standard controller and the recordSetVar page attribute"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 152,
    "question": "A team of many developers work in their own individual orgs that have the same configuration as the production org. Which type of org is best suited for this scenario?",
    "options": {
      "A": "Developer Sandbox",
      "B": "Full Sandbox",
      "C": "Developer Edition",
      "D": "Partner Developer Edition"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 153,
    "question": "Which code statement includes an Apex method named updateAccounts in the class AccountController for use in a Lightning web component?",
    "options": {
      "A": "import updateAccounts from \"AccountController\";",
      "B": "import updateAccounts from \"Salesforce/apex/AccountController\";",
      "C": "import updateAccounts from \"AccountController.updateAccounts\";",
      "D": "import updateAccounts from \"@salesforce/apex/AccountController.updateAccounts\";"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 154,
    "question": "For which three items can a trace flag be configured? Choose 3 answers",
    "options": {
      "A": "Apex Class",
      "B": "Flow",
      "C": "User",
      "D": "Visualforce",
      "E": "Apex Trigger"
    },
    "correct": "A, C, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 155,
    "question": "Which exception type cannot be caught?",
    "options": {
      "A": "Custom exception",
      "B": "LimitException",
      "C": "NoAccessException",
      "D": "CalloutException"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 156,
    "question": "What should a developer do to check the code coverage of a class after running all tests?",
    "options": {
      "A": "View the code coverage percentage for the class using the Overall Code Coverage panel in the Developer Console Tests tab.",
      "B": "View the Class Test Percentage tab on the Apex Class list view in Salesforce Setup.",
      "C": "Select and run the class on the Apex Test Execution page in the Developer Console.",
      "D": "View the Code Coverage column in the list view on the Apex Classes page."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 157,
    "question": "What are three capabilities of the <ltng:require> tag when loading JavaScript resources in Aura components? Choose 3 answers",
    "options": {
      "A": "One-time loading for duplicate scripts",
      "B": "Loading scripts in parallel",
      "C": "Loading Files from Documents",
      "D": "Specifying loading order",
      "E": "Loading externally hosted scripts"
    },
    "correct": "A, B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 158,
    "question": "A custom picklist field, Pool_Preference__c, exists on a custom object. The picklist contains the following options: 'Vegan', 'Kosher', 'No Preference'. The developer must ensure a value is populated every time a record is created or updated. What is the optimal way to ensure a value is selected every time a record is saved?",
    "options": {
      "A": "Set \"Use the first value in the list as the default value\" to True.",
      "B": "Write an Apex trigger to ensure a value is selected.",
      "C": "Mark the field as Required on the object's page layout.",
      "D": "Mark the field as Required on the field definition."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 159,
    "question": "A developer is tasked to perform a security review of the ContactSearch Apex class that exists in the system. Within the class, the developer identifies the following method as a security threat:\nList<Contact> performSearch (String lastName) {\n    return Database.query('SELECT Id, FirstName, LastName FROM Contact WHERE LastName Like \\'%' + lastName + '%\\'');\n}\nWhat are two ways the developer can update the method to prevent a SOQL injection attack? Choose 2 answers",
    "options": {
      "A": "Use variable binding and replace the dynamic query with a static SOQL.",
      "B": "Use the escapeSingleQuotes method to sanitize the parameter before its use.",
      "C": "Use the @Readonly annotation and the with sharing keyword on the class.",
      "D": "Use a regular expression on the parameter to remove special characters."
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 160,
    "question": "What are two benefits of using External IDs? Choose 2 answers",
    "options": {
      "A": "An External ID field can be used to reference an ID from another external system.",
      "B": "An External ID can be a formula field to help create a unique key from two fields in Salesforce.",
      "C": "An External ID can be used with Salesforce Mobile to make external data visible.",
      "D": "An External ID is indexed and can improve the performance of SOQL queries."
    },
    "correct": "A, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 161,
    "question": "What are two characteristics related to formulas? Choose 2 answers",
    "options": {
      "A": "Formulas are calculated at runtime and are not stored in the database.",
      "B": "Formulas can reference themselves.",
      "C": "Formulas can reference values in related objects.",
      "D": "Fields that are used in a formula field can be deleted or edited without editing the formula."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 162,
    "question": "What is the result of the following code?<br><pre><code>Account a = new Account();\nDatabase.insert(a, false);</code></pre>",
    "options": {
      "A": "The record will not be created and an exception will be thrown.",
      "B": "The record will not be created and no error will be reported.",
      "C": "The record will be created and no error will be reported.",
      "D": "The record will be created and a message will be in the debug log."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 163,
    "question": "A developer has a single custom controller class that works with a Visualforce Wizard to support creating and editing multiple sObjects. The wizard accepts data from user inputs across multiple Visualforce pages and from a parameter on the initial URL. Which three statements are useful inside the unit test to effectively test the custom controller? Choose 3 answers",
    "options": {
      "A": "String nextPage = controller.save().getUrl();",
      "B": "ApexPages.currentPage().getParameters().put('input', 'TestValue');",
      "C": "insert pageRef;",
      "D": "public ExtendedController (ApexPages.StandardController cntrl) {}",
      "E": "Test.setCurrentPage(pageRef);"
    },
    "correct": "A, B, E",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 164,
    "question": "A developer is designing a new application on the Salesforce platform and wants to ensure it can support multiple tenants effectively. Which design framework should the developer consider to ensure scalability and maintainability?",
    "options": {
      "A": "Waterfall Model",
      "B": "Flux (view, action, dispatcher, and store)",
      "C": "Model-View-Controller (MVC)",
      "D": "Agile Development"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 165,
    "question": "A developer at AW Computing is tasked to create the supporting test class for a programmatic customization that leverages records stored within the custom object, Pricing_Structure__c. AW Computing has a complex pricing structure for each item on the store, spanning more than 500 records. Which two approaches can the developer use to ensure Pricing_Structure__c records are available when the test class is executed? Choose 2 answers",
    "options": {
      "A": "Use a Test Data Factory class.",
      "B": "Use the @isTest(SeeAllData=true) annotation.",
      "C": "Use the Test.loadData() method.",
      "D": "Use without sharing on the class declaration."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 166,
    "question": "Given the following Apex statement:<br><pre><code>Account myAccount = [SELECT Id, Name FROM Account];</code></pre><br>What occurs when more than one Account is returned by the SOQL query?",
    "options": {
      "A": "The variable, myAccount, is automatically cast to the List data type.",
      "B": "An unhandled exception is thrown and the code terminates.",
      "C": "The query fails and an error is written to the debug log.",
      "D": "The first Account returned is assigned to myAccount."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 167,
    "question": "What should a developer use to fix a Lightning web component bug in a sandbox?",
    "options": {
      "A": "Developer Console",
      "B": "Force.com IDE",
      "C": "Execute Anonymous",
      "D": "VS Code"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 168,
    "question": "A developer must write an Apex method that will be called from a Lightning component. The method may delete an Account stored in the accountRec variable. Which method should a developer use to ensure only users that should be able to delete Accounts can successfully perform deletions?",
    "options": {
      "A": "accountRec.isDeletable()",
      "B": "Schema.sObjectType.Account.isDeletable()",
      "C": "accountRec.sObjectType.isDeletable()",
      "D": "Account.isDeleteable"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 169,
    "question": "A lead developer creates an Apex interface called Laptop. Consider the following code snippet:<br><pre><code>public class SilverLaptop {\n    //code implementation\n}</code></pre><br>How can a developer use the Laptop interface within the SilverLaptop class?",
    "options": {
      "A": "public class SilverLaptop implements Laptop",
      "B": "public class SilverLaptop extends Laptop",
      "C": "@Extends (class=\"Laptop\") public class SilverLaptop",
      "D": "@Interface (class=\"Laptop\") public class SilverLaptop"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 170,
    "question": "What should a developer use to obtain the Id and Name of all the Leads, Accounts, and Contacts that have the company name \"Universal Containers\"?",
    "options": {
      "A": "FIND 'Universal Containers' IN CompanyName Fields RETURNING lead(id, name), account(id, name), contact(id, name)",
      "B": "SELECT Lead.id, Lead.Name, Account.Id, Account.Name, Contact.id, Contact.Name FROM Lead, Account, Contact WHERE CompanyName = 'Universal Containers'",
      "C": "FIND 'Universal Containers' IN Name Fields RETURNING lead(id, name), account(id, name), contact(id, name)",
      "D": "SELECT lead(id, name), account(id, name), contact(id, name) FROM Lead, Account, Contact WHERE Name = 'Universal Containers'"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 171,
    "question": "A credit card company needs to implement the functionality for a service agent to process damaged or stolen credit cards. When the customers call in, the service agent must gather many pieces of information. A developer is tasked to implement this functionality. What should the developer use to satisfy this requirement in the most efficient manner?",
    "options": {
      "A": "Screen-based flow",
      "B": "Approval process",
      "C": "Apex trigger",
      "D": "Lightning Component"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 172,
    "question": "A custom Visualforce controller calls the ApexPages.addMessage() method, but no messages are rendering on the page. Which component should be added to the Visualforce page to display the message?",
    "options": {
      "A": "<apex:message for=\"info\"/>",
      "B": "<apex:pageMessages />",
      "C": "<apex:pageMessage severity=\"info\" />",
      "D": "<apex:facet name=\"messages\" />"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 173,
    "question": "Since Aura application events follow the traditional publish-subscribe model, which method is used to fire an event?",
    "options": {
      "A": "fire()",
      "B": "SegdetesEvent ()",
      "C": "FireEvent()",
      "D": "emit()"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 174,
    "question": "A developer considers the following snippet of code:<br><pre><code>Boolean isOK;\nInteger x;\nString theString = 'Hello';\nif (isOK == false && theString == 'Hello') {\n    x = 1;\n} else if (isOK == true && theString == 'Hello') {\n    x = 2;\n} else if (isOK != null && theString == 'Hello') {\n    x = 3;\n} else {\n    x = 4;\n}</code></pre><br>Based on this code, what is the value of x?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 175,
    "question": "Universal Containers wants to automatically assign new cases to the appropriate support representative based on the case origin. They have created a custom field on the Case object to store the support representative name. What is the best solution to assign the case to the appropriate support representative?",
    "options": {
      "A": "Use a trigger on the Case object.",
      "B": "Use a formula field on the Case object.",
      "C": "Use a validation rule on the Case object.",
      "D": "Use an Assignment Flow element."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 176,
    "question": "When importing and exporting data into Salesforce, which two statements are true? Choose 2 answers",
    "options": {
      "A": "Bulk API can be used to bypass the storage limits when importing large data volumes in development environments.",
      "B": "Data import wizard is an application that is installed on your computer",
      "C": "Bulk API can be used to import large data volumes in development environments without bypassing the storage limits.",
      "D": "Developer and Developer Pro sandboxes have different storage limits."
    },
    "correct": "B, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 177,
    "question": "A developer must implement a CheckPaymentProcessor class that provides check processing payment capabilities that adhere to what is defined for payments in the PaymentProcessor interface.<br><pre><code>public interface PaymentProcessor {\n    void pay(Decimal amount);\n}</code></pre><br>Which implementation is correct to use the PaymentProcessor interface class?",
    "options": {
      "A": "public class CheckPaymentProcessor implements PaymentProcessor { public void pay(Decimal amount); }",
      "B": "public class CheckPaymentProcessor extends PaymentProcessor { public void pay (Decimal amount) { // functional code here } }",
      "C": "public class CheckPaymentProcessor implements PaymentProcessor { public void pay(Decimal amount) { //functional code here } }",
      "D": "public class CheckPaymentProcessor extends PaymentProcessor { public void pay(Decimal amount); }"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 178,
    "question": "Universal Containers decides to use exclusively declarative development to build out a new Salesforce application. Which three options should be used to build out the database layer for the application? Choose 3 answers",
    "options": {
      "A": "Custom objects and fields",
      "B": "Triggers",
      "C": "Roll-up summaries",
      "D": "Relationships",
      "E": "Flows"
    },
    "correct": "A, C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 179,
    "question": "The sales management team at Universal Containers requires that the Lead Source field of the Lead record be populated when a Lead is converted. What should be done to ensure that a user populates the Lead Source field prior to converting a Lead?",
    "options": {
      "A": "Create an after trigger on Lead.",
      "B": "Use Lead Conversion field mapping.",
      "C": "Use a formula field.",
      "D": "Use a validation rule."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 180,
    "question": "A developer has identified a method in an Apex class that performs resource intensive actions in memory by iterating over the result set of a SOQL statement on the account. The method also performs a DML statement to save the changes to the database. Which two techniques should the developer implement as a best practice to ensure transaction control and avoid exceeding governor limits? Choose 2 answers",
    "options": {
      "A": "Use the @ReadOnly annotation to bypass the number of rows returned by a SOQL.",
      "B": "Use partial DML statements to ensure only valid data is committed.",
      "C": "Use the System.limit class to monitor the current CPU governor limit consumption.",
      "D": "Use the Database.Savepoint method to enforce database integrity."
    },
    "correct": "C, D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 181,
    "question": "Universal Containers has a large number of custom applications that were built using a third-party JavaScript framework and exposed using Visualforce pages. The company wants to update these applications to apply styling that resembles the look and feel of Lightning Experience. What should the developer do to fulfill the business request in the quickest and most effective manner?",
    "options": {
      "A": "Rewrite all Visualforce pages as Lightning components.",
      "B": "Set the attribute enableLightning to true in the definition.",
      "C": "Enable Available for Lightning Experience, Lightning Communities, and the mobile app on Visualforce pages used by the custom application.",
      "D": "Incorporate the Salesforce Lightning Design System CSS stylesheet Into the JavaScript applications."
    },
    "correct": "D",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 182,
    "question": "The values 'High', 'Medium', and 'Low' are identified as common values for multiple picklists across different objects. What is an approach a developer can take to streamline maintenance of the picklists and their values, while also restricting the values to the ones mentioned above?",
    "options": {
      "A": "Create the Picklist on each object and use a Global Picklist Value Set containing the values.",
      "B": "Create the Picklist on each object as a required field and select \"Display values alphabetically, not in the order entered\".",
      "C": "Create the Picklist on each object and add a validation rule to ensure data integrity.",
      "D": "Create the Picklist on each object and select \"Restrict picklist to the values defined in the value set\"."
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 183,
    "question": "Universal Containers is developing a new Lightning web component for their marketing department. They want to ensure that the component is fine-tuned and provides a seamless user experience. What are some benefits of using the Lightning Component framework?",
    "options": {
      "A": "Better performance due to client-side rendering",
      "B": "Automatic support for accessibility standards",
      "C": "Compatibility with all web browsers",
      "D": "Easy integration with third-party libraries"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 184,
    "question": "The OrderHelper class is a utility class that contains business logic for processing orders. Consider the following code snippet:<br><pre><code>public class without sharing OrderHelper{\n    //code implementation\n}</code></pre><br>A developer needs to create a constant named DELIVERY_MULTIPLIER with a value of 4.15. The value of the constant should not change at any time in the code. How should the developer declare the delivery multiplier constant to meet the business objectives?",
    "options": {
      "A": "static decimal DELIVERY_MULTIPLIER = 4.15;",
      "B": "constant decimal DELIVERY_MULTIPLIER = 4.15;",
      "C": "static final decimal DELIVERY_MULTIPLIER = 4.15;",
      "D": "decimal DELIVERY_MULTIPLIER = 4.15;"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 185,
    "question": "Consider the following code snippet:<br><pre><code>public static List<Lead> obtainAllFields (Set<Id> leadIds) {\n    List<Lead> result = new List<Lead>();\n    for (Id leadId: leadIds) {\n        result.add([SELECT FIELDS(STANDARD) FROM Lead WHERE Id = :leadId]);\n    }\n    return result;\n}</code></pre><br>Given the multi-tenant architecture of the Salesforce platform, what is a best practice a developer should implement and ensure successful execution of the method?",
    "options": {
      "A": "Avoid using variables as query filters.",
      "B": "Avoid returning an empty List of records.",
      "C": "Avoid performing queries inside for loops.",
      "D": "Avoid executing queries without a limit clause."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 186,
    "question": "A developer wants to mark each Account in a List<Account> as either Active or Inactive, based on the value in the LastModified each Account being greater than 90 days in the past. Which Apex technique should the developer use?",
    "options": {
      "A": "An if-else statement, with a for loop inside",
      "B": "A switch statement, with a for loop inside",
      "C": "A for loop, with an if or if/else statement inside",
      "D": "A for loop, with a switch statement inside"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 187,
    "question": "Which three steps allow a custom Scalable Vector Graphic (SVG) to be included in a Lightning web component? Choose 3 answers",
    "options": {
      "A": "Import the static resource and provide a JavaScript property for it.",
      "B": "Upload the SVG as a static resource.",
      "C": "Reference the import in the HTML template.",
      "D": "Import the SVG as a content asset file.",
      "E": "Reference the property in the HTML template."
    },
    "correct": "A, B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 188,
    "question": "What should be used to create scratch orgs?",
    "options": {
      "A": "Salesforce CLI",
      "B": "Sandbox refresh",
      "C": "Developer Console",
      "D": "Workbench"
    },
    "correct": "A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 189,
    "question": "A developer writes a trigger on the Account object on the before update event that increments a count field. A record triggered flow also increments the count field every time that an Account is created or updated. What is the value of the count field if an Account is inserted with an initial value of zero, assuming no other automation logic is implemented on the Account?",
    "options": {
      "A": "4",
      "B": "2",
      "C": "1",
      "D": "3"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 190,
    "question": "Universal Containers (UC) uses a custom object called Vendor. The Vendor custom object has a master-detail relationship with the standard Account object. Based on some internal discussions, the UC administrator tried to change the master-detail relationship to a lookup relationship, but was not able to do so. What is a possible reason that this change was not permitted?",
    "options": {
      "A": "Some of the Vendor records have null for the Account field.",
      "B": "The Account object has a roll up summary field on the Vendor object.",
      "C": "The Account object does not allow changing a field type for a custom field.",
      "D": "The organization wide default for the Vendor object is Public Read/Write."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 191,
    "question": "Which three code lines are required to create a Lightning component on a Visualforce page? Choose 3 answers",
    "options": {
      "A": "<apex:includeLightning/>",
      "B": "$Lightning.createComponent",
      "C": "$Lightning.use",
      "D": "<apex:slds/>",
      "E": "$Lightning.useComponent"
    },
    "correct": "A, B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 192,
    "question": "Universal Containers (UC) is developing a process for their sales teams that requires all sales reps to go through a set of scripted steps with each new customer they create. In the first step of collecting information, UC's ERP system must be checked via a REST endpoint to see if the customer exists. If the customer exists, the data must be presented to the sales rep in Salesforce. Which two should a developer implement to satisfy the requirements? Choose 2 answers",
    "options": {
      "A": "Flow",
      "B": "Invocable method",
      "C": "Future method",
      "D": "Trigger"
    },
    "correct": "A, B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 193,
    "question": "What is a benefit of developing applications on the Salesforce platform?",
    "options": {
      "A": "Enforced unit testing and code coverage best practices",
      "B": "Access to predefined computing resources",
      "C": "Preconfigured storage for big data",
      "D": "Unlimited processing power and memory"
    },
    "correct": "N/A",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 194,
    "question": "Management asked for opportunities to be automatically created for accounts with annual revenue greater than $1,000,000. A developer created the following trigger on the Account object to satisfy this requirement.<br><pre><code>for (Account a : Trigger.new) {\n    if(a.AnnualRevenue > 1000000) {\n        List<Opportunity> opplist = [SELECT Id FROM Opportunity WHERE accountId = :a.Id];\n        if (opplist.size() == 0) {\n            Opportunity oppty = new Opportunity(Name = a.Name, StageName = 'Prospecting', CloseDate = System.today().addDays(30));\n            insert oppty;\n        }\n    }\n}</code></pre><br>Users are able to update the account records via the UI and can see an opportunity created for high annual revenue accounts. However, when the administrator tries to upload a list of 179 accounts using Data Loader, it fails with system.Exception errors. Which two actions should the developer take to fix the code segment shown above? Choose 2 answers",
    "options": {
      "A": "Query for existing opportunities outside the for loop.",
      "B": "Check if all the required fields for Opportunity are being added on creation.",
      "C": "Move the DML that saves opportunities outside the for loop.",
      "D": "Use Database query to query the opportunities."
    },
    "correct": "A, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 195,
    "question": "Which action causes a before trigger to fire by default for Accounts?",
    "options": {
      "A": "Renaming or replacing picklists",
      "B": "updating addresses using Mass Address updated tool",
      "C": "Importing data using the Data Loader and the Bulk API",
      "D": "Converting Leads to Contacts"
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 196,
    "question": "Which Apex class contains methods to return the amount of resources that have been used for a particular governor, such as the number of DML statements?",
    "options": {
      "A": "OrgLimits",
      "B": "Limits",
      "C": "Messaging",
      "D": "Exception"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 197,
    "question": "A developer is working on a project to import data from an external system into Salesforce. The data contains sensitive information that should not be visible to all users in Salesforce. What should the developer do to ensure that the data is secure?",
    "options": {
      "A": "Use a third-party tool to encrypt the sensitive data before importing it into Salesforce.",
      "B": "Use the Apex Data Loader to import the data and write Apex code to handle security and access control.",
      "C": "Use the Data Import Wizard to import the data and set up field-level security to restrict access to sensitive fields.",
      "D": "Use the Salesforce CLI to import the data and set up user permissions to restrict access to sensitive data."
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 198,
    "question": "A developer needs to confirm that a Contact trigger works correctly without changing the organization's data. What should the developer do to test the Contact trigger?",
    "options": {
      "A": "Use Deploy from the VSCode IDE to deploy an 'insert Contact' Apex class.",
      "B": "Use the New button on the Salesforce Contacts Tab to create a new Contact record.",
      "C": "Use the Test menu on the Developer Console to run all test classes for the Contact trigger.",
      "D": "Use the Open Execute Anonymous feature on the Developer Console to run an 'insert Contact' DML statement."
    },
    "correct": "C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 199,
    "question": "A developer is integrating with a legacy on-premise SQL database. What should the developer use to ensure the data being integrated is matched to the right records in Salesforce?",
    "options": {
      "A": "External Object",
      "B": "External ID field",
      "C": "Formula field",
      "D": "Lookup field"
    },
    "correct": "B",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 200,
    "question": "Which two events need to happen when deploying to a production org? Choose 2 answers",
    "options": {
      "A": "All custom objects must have visibility set to a value other than in Development.",
      "B": "All Apex code must have at least 75% test coverage.",
      "C": "All triggers must have some test coverage",
      "D": "All Visual flows must have at least 1% test coverage."
    },
    "correct": "B, C",
    "explanation_en": "",
    "explanation_pt": ""
  },
  {
    "number": 201,
    "question": "A developer is tasked with building a custom Lightning Web Component (LWC) to collect Contact information. The form will be shared among different types of users in the org. There are security requirements stating that only certain fields should be editable and visible to certain groups of users. What should the developer use in their Lightning Web Component to support the security requirements?",
    "options": {
      "A": "lightning-input-field",
      "B": "force:inputField",
      "C": "aura:input",
      "D": "ui:inputField"
    },
    "correct": "A",
    "explanation_en": "A (Correct): lightning-input-field is part of Lightning Data Service (LDS), and it automatically enforces field-level security (FLS) and CRUD rules. This is the best practice for handling sensitive data in LWC forms and ensures compliance with user-level permissions.\n\nIncorrect options:\nB: force:inputField is used in Aura, not in Lightning Web Components.\nC/D: These are deprecated or older framework components that do not inherently enforce FLS.\n\nReference: LWC Developer Guide - lightning-input-field\n\nThis topic relates to User Interface (25%) and security in LWC development, a key concept in the PD1 exam.",
    "explanation_pt": "A (Correto): lightning-input-field faz parte do Lightning Data Service (LDS) e impõe automaticamente a segurança em nível de campo (FLS) e as regras CRUD. Esta é a melhor prática para lidar com dados confidenciais em formulários LWC e garante a conformidade com as permissões de nível de usuário.\n\nOpções incorretas:\nB: force:inputField é usado no Aura, não em Lightning Web Components.\nC/D: Estes são componentes de framework mais antigos ou obsoletos que não impõem FLS inerentemente.\n\nReferência: LWC Developer Guide - lightning-input-field.\n\nEste tópico está relacionado a Interface de Usuário (25%) e segurança no desenvolvimento LWC, um conceito-chave no exame PD1."
  }
];
