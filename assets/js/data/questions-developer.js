window.questionBanks = window.questionBanks || {};
window.questionBanks.developer = [
  {
    number: 1,
    question: "A company's engineering department is conducting a month-long test on the scalability of an in-house-developed software that requires a cluster of 100 or more servers. Which of the following models is the best to use?",
    options: {
      A: "PaaS",
      B: "SaaS",
      C: "BaaS",
      D: "IaaS"
    },
    correct: "D",
    explanation_en: "Infrastructure as a Service (IaaS) provides on-demand access to fundamental computing resources like physical or virtual servers. Example for a child: Imagine you want to build a giant Lego castle but don't have enough bricks. IaaS is like a store that rents you all the plastic blocks you need so you can build whatever you want, and you give them back when you're done testing.",
    explanation_pt: "Infrastructure as a Service (IaaS) fornece acesso sob demanda a recursos básicos de computação, como servidores físicos ou virtuais. Exemplo para uma criança: Imagine que você quer construir um castelo de Lego gigante, mas não tem peças suficientes. IaaS é como uma loja que aluga todos os blocos de plástico que você precisa para construir o que quiser, e você os devolve quando terminar de testar."
  },
  {
    number: 2,
    question: "What are three characteristics of change set deployments?",
    options: {
      A: "Change sets can deploy custom settings data",
      B: "Change sets can only be used between related organizations",
      C: "Deployment is done in a one-way, single transaction",
      D: "Sending a change set between two orgs requires a deployment connection",
      E: "Change sets can be used to transfer records"
    },
    correct: "BCD",
    explanation_en: "Change sets are for metadata, not data (records). They require a trust link between related orgs. Example for a child: It's like a secret tunnel between your house and your cousin's house. You can send blueprints for new toys (metadata) through it, but only because your parents already agreed to connect the houses, and everything travels in one single box.",
    explanation_pt: "Change sets serve para metadados, não dados (registros). Eles exigem um link de confiança entre orgs relacionadas. Exemplo para uma criança: É como um túnel secreto entre a sua casa e a casa do seu primo. Você pode enviar desenhos de brinquedos novos (metadados) por ele, mas só porque seus pais já concordaram em conectar as casas, e tudo viaja em uma única caixa."
  },
  {
    number: 3,
    question: "Universal Containers wants to ensure that all new leads created in the system have a valid email address. They want an additional layer of validation using automation. What would be the best solution?",
    options: {
      A: "Submit a REST API Callout with a JSON payload",
      B: "Use a before-save Apex trigger on the Lead object",
      C: "Use a custom Lightning Web component to make a callout",
      D: "Use an Approval Process to enforce the completion"
    },
    correct: "B",
    explanation_en: "A before-save trigger is the most efficient programmatic way to validate data before it hits the database. Example for a child: It's like a guard standing at the entrance of a party. Before you can even step inside (be saved to the database), the guard checks your ticket (email) to see if it's real. If it's not, he won't let you in!",
    explanation_pt: "Um trigger before-save é a maneira programática mais eficiente de validar dados antes que cheguem ao banco de dados. Exemplo para uma criança: É como um guarda parado na entrada de uma festa. Antes de você sequer entrar (ser salvo no banco de dados), o guarda confere seu convite (e-mail) para ver se é de verdade. Se não for, ele não deixa você entrar!"
  },
  {
    number: 4,
    question: "Which statement should be used to allow some of the records in a list of records to be inserted if others fail to be inserted?",
    options: {
      A: "Database.insert(records, true)",
      B: "insert records",
      C: "insert(records, false)",
      D: "Database.insert(records, false)"
    },
    correct: "D",
    explanation_en: "The 'false' parameter in Database methods means 'allOrNone = false', allowing partial success. Example for a child: Imagine you are carrying a tray with 10 cupcakes. If one cupcake falls on the floor, the 'allOrNone=false' rule means you still deliver the other 9. If the rule was 'true', you would have to throw all 10 away just because of one mistake!",
    explanation_pt: "O parâmetro 'false' nos métodos Database significa 'allOrNone = false', permitindo sucesso parcial. Exemplo para uma criança: Imagine que você está levando uma bandeja com 10 cupcakes. Se um bolinho cair no chão, a regra 'false' permite que você entregue os outros 9. Se a regra fosse 'true', você teria que jogar todos os 10 fora só por causa de um erro!"
  },
  {
    number: 5,
    question: "A developer identifies several separate triggers on the Expense__c object. Which two techniques ensure trigger best practices?",
    options: {
      A: "Unify all triggers in a single trigger on the object that includes all events",
      B: "Unify insert and update triggers and use Flow for delete",
      C: "Create helper classes to execute the appropriate logic",
      D: "Maintain all three triggers but move the logic out"
    },
    correct: "AC",
    explanation_en: "Best practices recommend one trigger per object and delegating logic to helper classes. Example for a child: Imagine a classroom with 3 teachers shouting different orders at the same time. It's confusing! It's better to have one Teacher (one trigger) who reads a list of tasks and asks specific Helpers (helper classes) to do each job quietly.",
    explanation_pt: "As melhores práticas recomendam um gatilho por objeto e delegar a lógica para classes auxiliares. Exemplo para uma criança: Imagine uma sala de aula com 3 professores gritando ordens diferentes ao mesmo tempo. É uma confusão! É melhor ter apenas um Professor (um trigger) que lê a lista de tarefas e pede para Ajudantes específicos (classes auxiliares) fazerem cada trabalho calmamente."
  },
  {
    number: 6,
    question: "Which statement generates a list of Leads and Contacts that have a field with the phrase 'ACME'?",
    options: {
      A: "List<List <sObject>> searchList = [SELECT Name, ID FROM Contact, Lead WHERE Name like 'ACME%']",
      B: "List<List <sObject>> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead]",
      C: "Map <sObject> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead]",
      D: "List <sObject> searchList = [FIND 'ACME' IN ALL FIELDS RETURNING Contact, Lead]"
    },
    correct: "B",
    explanation_en: "SOSL (FIND) is used to search across multiple objects and returns a List of Lists. Example for a child: SOQL is like looking in your 'Toy Box' for a specific blue car. SOSL is like shouting 'Who has a blue car?' in a huge playground where there are Toy Boxes, Backpacks, and Cubbies. It checks everywhere at once!",
    explanation_pt: "SOSL (FIND) é usado para pesquisar em vários objetos e retorna uma Lista de Listas. Exemplo para uma criança: SOQL é como procurar na sua 'Caixa de Brinquedos' por um carrinho azul específico. SOSL é como gritar 'Quem tem um carrinho azul?' em um parquinho enorme onde existem caixas, mochilas e armários. Ele procura em tudo ao mesmo tempo!"
  },
  {
    number: 7,
    question: "A developer creates an LWC that imports an Apex method. Which two options are parts of the Controller in MVC architecture?",
    options: {
      A: "HTML file",
      B: "Apex class",
      C: "JavaScript file",
      D: "XML file"
    },
    correct: "BC",
    explanation_en: "In LWC, the JavaScript file is the client-side controller, and the Apex class is the server-side controller. Example for a child: Imagine a robot. The HTML is the robot's shiny skin. The JavaScript is its brain telling it to move its arms, and the Apex class is the library where the robot goes to get smart information it doesn't know yet.",
    explanation_pt: "No LWC, o arquivo JavaScript é o controlador do lado do cliente, e a classe Apex é o controlador do lado do servidor. Exemplo para uma criança: Imagine um robô. O HTML é a carcaça brilhante dele. O JavaScript é o cérebro dizendo para ele mexer os braços, e a classe Apex é a biblioteca onde o robô vai buscar informações inteligentes que ele ainda não sabe."
  },
  {
    number: 8,
    question: "What are two use cases for executing Anonymous Apex code?",
    options: {
      A: "To schedule an Apex class to run periodically",
      B: "To delete 15,000 inactive Accounts in a single transaction after a deployment",
      C: "To run a batch Apex class to update all Contacts",
      D: "To add unit test code coverage to an org"
    },
    correct: "BC",
    explanation_en: "Anonymous Apex is for one-off tasks like manual cleanup or manual triggering of batches. Example for a child: Anonymous Apex is like a 'One-Time Magic Wand'. You don't use it to build a permanent house, you use it to quickly poof away a mess on the floor or to start a big cleaning machine (Batch) just this once.",
    explanation_pt: "Apex Anônimo serve para tarefas únicas, como limpeza manual ou disparar batches manualmente. Exemplo para uma criança: O Apex Anônimo é como uma 'Varinha de Condão de uso único'. Você não a usa para construir uma casa permanente, você a usa para fazer sumir rapidinho uma bagunça no chão ou para ligar uma máquina de limpeza gigante (Batch) só desta vez."
  },
  {
    number: 9,
    question: "A developer created a statuscomponent LWC. Which two things should the developer do to make this component available on an Account record page?",
    options: {
      A: "Add <target>lightning_RecordPage</target> to the JS file",
      B: "Add <target>lightning__RecordPage</target> to the meta-xml file",
      C: "Set isExposed to true in the meta-xml file",
      D: "Add <masterLabel>Account</masterLabel> to the meta-xml file"
    },
    correct: "BC",
    explanation_en: "To show a component in the UI, you must expose it and define its targets in the configuration file. Example for a child: If you build a cool toy, you need to put a 'Welcome' sign on your door (isExposed = true) and tell everyone that the toy belongs in the 'Playroom' (target = RecordPage). Otherwise, nobody will find it!",
    explanation_pt: "Para mostrar um componente na interface, você deve expô-lo e definir seus alvos no arquivo de configuração. Exemplo para uma criança: Se você construir um brinquedo legal, você precisa colocar uma placa de 'Bem-vindo' na sua porta (isExposed = true) e avisar que o brinquedo deve ficar na 'Sala de Jogos' (target = RecordPage). Senão, ninguém vai achar!"
  },
  {
    number: 10,
    question: "A developer creates a batch Apex job that is timing out. What is the first step towards troubleshooting?",
    options: {
      A: "Check the asynchronous job monitoring page to view job status and logs",
      B: "Check the debug logs for the batch job",
      C: "Disable the batch job and recreate it",
      D: "Decrease the batch size to reduce the load"
    },
    correct: "A",
    explanation_en: "The first step in any async error is to check the job's status in the setup monitoring. Example for a child: If your remote-control car stops working, the first thing you do is look at the little light on the car (Job Monitoring) to see if it's blinking red or if it's off. You check the signal before taking the car apart!",
    explanation_pt: "O primeiro passo em qualquer erro assíncrono é verificar o status do trabalho no monitoramento de configuração. Exemplo para uma criança: Se o seu carrinho de controle remoto parar de funcionar, a primeira coisa que você faz é olhar para a luzinha do carro (Monitoramento) para ver se está piscando vermelho ou se apagou. Você checa o sinal antes de desmontar o carro!"
  },
  {
    number: 11,
    question: "What are two benefits of using declarative customizations over code?",
    options: {
      A: "Declarative customizations automatically update with each Salesforce release",
      B: "Declarative customizations automatically generate test classes",
      C: "Declarative customizations cannot generate run time errors",
      D: "Declarative customizations generally require less maintenance"
    },
    correct: "AD",
    explanation_en: "Declarative tools (point-and-click) are maintained by Salesforce and don't need test classes. Example for a child: It's like playing with a toy house that is already built. When the company makes the house better, yours gets better too (Auto-update), and you don't have to fix broken parts yourself because the toy is made to be simple and sturdy (Less maintenance).",
    explanation_pt: "Ferramentas declarativas (clicar e configurar) são mantidas pelo Salesforce e não precisam de classes de teste. Exemplo para uma criança: É como brincar com uma casinha de brinquedo que já vem montada. Quando a fábrica melhora o modelo da casinha, a sua melhora junto (Atualização automática), e você não precisa consertar as peças porque ela foi feita para ser simples e não quebrar (Menos manutenção)."
  },
  {
    number: 12,
    question: "Given an Anonymous block that updates up to 50,000 cases in one transaction: What should a developer consider for an environment that has over 10,000 Case records?",
    options: {
      A: "The transaction will succeed and changes will be committed",
      B: "The try-catch block will handle exceptions thrown by governor limits",
      C: "The transaction will fail due to exceeding the governor limit",
      D: "The try-catch block will handle any DML exceptions thrown"
    },
    correct: "C",
    explanation_en: "Salesforce has a 'Governor Limit' of 10,000 records per DML statement. If you try to update 50,000 at once, it stops everything. Example for a child: Imagine you are a small robot that can only carry 10,000 blocks at a time. If someone piles 50,000 blocks on you, you will fall over and stop working because it's too much weight for one trip!",
    explanation_pt: "O Salesforce tem um 'Limite do Governador' de 10.000 registros por instrução DML. Se tentar atualizar 50.000 de uma vez, ele para tudo. Exemplo para uma criança: Imagine que você é um robozinho que só consegue carregar 10.000 pecinhas de uma vez. Se alguém colocar 50.000 pecinhas em cima de você, você vai cair e parar de funcionar porque é peso demais para uma única viagem!"
  },
  {
    number: 13,
    question: "A developer is building a custom LWC to collect Contact information with security requirements for different users. What should the developer use in their LWC to support these security requirements?",
    options: {
      A: "aura-input-failed",
      B: "lightning-input-field",
      C: "ui-input-failed",
      D: "lightning-input-failed"
    },
    correct: "B",
    explanation_en: "The 'lightning-input-field' component automatically respects the user's field-level security. Example for a child: It's like a magic notebook. If a child looks at it, they only see drawings. If a teacher looks at it, they see grades. The notebook is smart and knows what each person is allowed to see without you doing anything!",
    explanation_pt: "O componente 'lightning-input-field' respeita automaticamente a segurança de nível de campo do usuário. Exemplo para uma criança: É como um caderno mágico. Se uma criança olha, ela só vê desenhos. Se a professora olha, ela vê as notas. O caderno é esperto e sabe o que cada pessoa pode ver sem você precisar fazer nada!"
  },
  {
    number: 14,
    question: "Which three Salesforce resources can be accessed from a Lightning web component?",
    options: {
      A: "Static resources",
      B: "All external libraries",
      C: "SVG resources",
      D: "Third-party web components",
      E: "Content asset files"
    },
    correct: "ACE",
    explanation_en: "LWCs can pull in files you uploaded as Static Resources, Content Assets, or SVGs for icons. Example for a child: Imagine your LWC is a toy box. You can put special stickers (SVGs), books (Content assets), or spare batteries (Static resources) inside it to use whenever you want.",
    explanation_pt: "LWCs podem buscar arquivos que você enviou como Recursos Estáticos, Ativos de Conteúdo ou SVGs para ícones. Exemplo para uma criança: Imagine que seu LWC é uma caixa de brinquedos. Você pode colocar adesivos especiais (SVGs), livrinhos (Ativos de conteúdo) ou pilhas extras (Recursos estáticos) dentro dela para usar quando quiser."
  },
  {
    number: 15,
    question: "A developer must create a DrawList class that provides capabilities defined in Sortable and Drawable interfaces. Which is the correct implementation?",
    options: {
      A: "public class DrawList extends Sortable, Drawable { ... }",
      B: "public class DrawList implements Sortable, Drawable { ... }",
      C: "public class DrawList extends Sortable implements Drawable { ... }",
      D: "public class DrawList implements Sortable extends Drawable { ... }"
    },
    correct: "B",
    explanation_en: "To use interfaces, you use the keyword 'implements' and you can have more than one. Example for a child: Imagine 'Sortable' is a rule that says 'You must know how to line up' and 'Drawable' says 'You must know how to draw'. If you want to be a 'DrawList' student, you must follow (implements) both rules!",
    explanation_pt: "Para usar interfaces, usamos a palavra-chave 'implements' e podemos ter mais de uma. Exemplo para uma criança: Imagine que 'Sortable' é uma regra que diz 'Você deve saber fazer fila' e 'Drawable' diz 'Você deve saber desenhar'. Se você quer ser um aluno 'DrawList', você precisa seguir (implements) as duas regras!"
  },
  {
    number: 16,
    question: "A developer is creating a Lightning web component to show sales records. Sales Reps see commissions, but Assistants should not. How should this be enforced without errors?",
    options: {
      A: "Use WITH SECURITY_ENFORCED in SOQL",
      B: "Use Security.stripInaccessible to remove fields",
      C: "Use Lightning Locker Service",
      D: "Use Lightning Data Service"
    },
    correct: "B",
    explanation_en: "Security.stripInaccessible removes fields a user isn't allowed to see so the code doesn't break. Example for a child: Imagine a tray of snacks. If you aren't allowed to have chocolate, the 'Magic Server' (Security class) hides the chocolate before showing you the tray. You don't even know it was there, so you aren't sad or confused!",
    explanation_pt: "Security.stripInaccessible remove campos que o usuário não tem permissão para ver, evitando que o código dê erro. Exemplo para uma criança: Imagine uma bandeja de lanches. Se você não pode comer chocolate, o 'Garçom Mágico' (classe Security) esconde o chocolate antes de te mostrar a bandeja. Você nem fica sabendo que ele estava lá, então não fica triste nem confuso!"
  },
  {
    number: 17,
    question: "A code snippet updates LeadSource inside a loop for leads. In an environment with >2,000 records, which limit will be exceeded?",
    options: {
      A: "Total number of SOQL queries issued",
      B: "Total number of DML statements issued",
      C: "Total number of records processed as a result of DML statements",
      D: "Total stack depth for any Apex invocation"
    },
    correct: "B",
    explanation_en: "You are only allowed 150 DML statements (like 'update') in one transaction. Putting 'update' inside a loop with 2,000 records is too many. Example for a child: Imagine you want to put 2,000 toys away. If you put them in one by one (inside a loop), you will get tired after 150 (the limit). It's better to put them all in a big box and move the box once!",
    explanation_pt: "Você só pode fazer 150 comandos DML (como o 'update') por vez. Colocar o 'update' dentro de um loop com 2.000 registros ultrapassa esse limite. Exemplo para uma criança: Imagine que você quer guardar 2.000 brinquedos. Se você guardar um por um (dentro do loop), você vai cansar depois de 150 (o limite). O certo é colocar todos numa caixa grande e levar a caixa uma vez só!"
  },
  {
    number: 18,
    question: "A developer is asked to write helper methods that create test data. What should be changed so they are only usable by unit test methods?",
    options: {
      A: "Add @isTest above the method definition",
      B: "Add @isTest above the class definition",
      C: "Change public to private on the class",
      D: "Remove static from the method"
    },
    correct: "B",
    explanation_en: "Adding @isTest to the class tells Salesforce this is for testing only and doesn't count against your code limit. Example for a child: It's like putting a 'For Practice Only' sticker on your toy tools. You can use them to learn, but they don't go in the real toolbox used to fix the house.",
    explanation_pt: "Adicionar @isTest na classe avisa ao Salesforce que aquilo é só para testes e não conta no limite de código real. Exemplo para uma criança: É como colocar um adesivo de 'Apenas para Treinar' nas suas ferramentas de brinquedo. Você pode usá-las para aprender, mas elas não ficam na caixa de ferramentas de verdade que conserta a casa."
  },
  {
    number: 19,
    question: "A business process requires Opportunity values to be sent via HTTP REST callout when a custom button is pressed in Lightning. Which two methods should the developer implement?",
    options: {
      A: "Visualforce quick action that performs the callout",
      B: "Remote Action on the Opportunity object",
      C: "Lightning component quick action that performs the callout",
      D: "After update trigger using @future(Callout=true)"
    },
    correct: "AC",
    explanation_en: "To make a button do something in Lightning, you use Quick Actions (Visualforce or LWC/Aura). Example for a child: It's like a doorbell. When you press the 'REST button', you need a wire (Quick Action) that connects the button to a loud speaker (the callout) so the other system hears you.",
    explanation_pt: "Para fazer um botão funcionar no Lightning, usamos as 'Ações Rápidas' (Quick Actions) via Visualforce ou LWC. Exemplo para uma criança: É como uma campainha. Quando você aperta o 'botão REST', você precisa de um fio (Quick Action) que conecte o botão a um alto-falante (o callout) para que o outro sistema te escute."
  },
  {
    number: 20,
    question: "A developer needs a variable 'maxAttempts' to preserve its value for the length of a transaction and share it between trigger executions. How should it be declared?",
    options: {
      A: "Declare maxAttempts as a constant using static and final",
      B: "Declare maxAttempts as a member variable on the trigger",
      C: "Declare maxAttempts as a static variable on a helper class",
      D: "Declare maxAttempts as a private static variable on a helper class"
    },
    correct: "C",
    explanation_en: "A 'static' variable in a class lives as long as the whole transaction, even if the trigger runs multiple times. Example for a child: Imagine a classroom chalkboard. Even if students come in and out (trigger executions), the number written on the board (static variable) stays there for the whole day (the transaction) until the teacher erases it at the end.",
    explanation_pt: "Uma variável 'static' em uma classe vive por toda a transação, mesmo que o gatilho rode várias vezes. Exemplo para uma criança: Imagine o quadro negro da sala. Mesmo que os alunos entrem e saiam (execuções do gatilho), o número escrito no quadro (variável estática) continua lá o dia todo (a transação) até o professor apagar no final."
  },
  {
    number: 21,
    question: "The following Apex method is part of the ContactService class that is called from a trigger: public static void setBusinessUnitToEMEA (Contact thisContact) { thisContact.Business_Unit__c = 'EMEA'; update thisContact; } How should the developer modify the code to ensure best practices are met?",
    options: {
      A: "public static void setBusinessUnitToEMEA (List<Contact> contacts) { for (Contact c : contacts) { c.Business_Unit__c = 'EMEA'; } update contacts; }",
      B: "public static void setBusinessUnitToEMEA (Contact thisContact) { List<Contact> contacts = new List<Contact>(); contacts.add(thisContact); update contacts; }",
      C: "public static void setBusinessUnitToEMEA (List<Contact> contacts) { for (Contact c : contacts) { c.Business_Unit__c = 'EMEA'; update c; } }",
      D: "Maintain the code as it is but call it from an @future method."
    },
    correct: "A",
    explanation_en: `The best practice in Salesforce is 'Bulkification'. This means your code should handle many records at once. Example for a child: Imagine you have 10 letters to take to the post office. Instead of walking to the post office 10 times (once for each letter), you put all 10 letters in one bag and go only once. It's much faster and uses less energy!`,
    explanation_pt: `A melhor prática no Salesforce é a 'Bulkificação'. Isso significa que seu código deve lidar com muitos registros de uma vez. Exemplo para uma criança: Imagine que você tem 10 cartas para levar ao correio. Em vez de caminhar até o correio 10 vezes (uma para cada carta), você coloca as 10 cartas em uma única sacola e vai apenas uma vez. É muito mais rápido e gasta menos energia!`
  },
  {
    number: 22,
    question: "A developer deployed a trigger to update the status__c of Assets related to an Account when the Account's status changes and a nightly integration that updates Accounts in bulk has started to fail with limit failures. What should the developer change about the code to address the failure?",
    options: {
      A: "Move all of the logic to a Queueable class.",
      B: "Add a LIMIT clause to the SOQL query inside the loop.",
      C: "Use a try-catch block around the DML statement.",
      D: "Change the method to process all Accounts in one call and call it outside of the for loop."
    },
    correct: "D",
    explanation_en: `The failure happens because the code is trying to 'talk' to the database too many times inside a loop. Example for a child: If you want to give candies to 100 friends, don't go to the kitchen 100 times to get one candy each time. Go once, grab the whole jar, and then give them out. This prevents you from getting too tired (hitting limits).`,
    explanation_pt: `A falha ocorre porque o código tenta 'falar' com o banco de dados muitas vezes dentro de um loop. Exemplo para uma criança: Se você quer dar doces para 100 amigos, não vá à cozinha 100 vezes para pegar um doce de cada vez. Vá uma vez só, pegue o pote inteiro e depois distribua. Isso evita que você fique cansado demais (atingindo os limites).`
  },
  {
    number: 23,
    question: "Universal Containers wants to implement global addresses to allow multiple Accounts to share a default pickup address. Which field should the developer add to create the most efficient model?",
    options: {
      A: "Add a master-detail field on the Global Address object to the Account object.",
      B: "Add a lookup field on the Global Address object to the Account object.",
      C: "Add a lookup field on the Account object to the Global Address object.",
      D: "Add a master-detail field on the Account object to the Global Address object."
    },
    correct: "D",
    explanation_en: `In this model, the Global Address is the 'parent' and the Account is the 'child'. Example for a child: Think of a school bus (Global Address) and the students (Accounts). Many students belong to one bus. Each student needs to have a 'tag' (field) saying which bus they belong to so they know where to go.`,
    explanation_pt: `Neste modelo, o Endereço Global é o 'pai' e a Conta é o 'filho'. Exemplo para uma criança: Pense em um ônibus escolar (Endereço Global) e nos alunos (Contas). Muitos alunos pertencem a um único ônibus. Cada aluno precisa ter uma 'etiqueta' (campo) dizendo a qual ônibus ele pertence para saber para onde ir.`
  },
  {
    number: 24,
    question: "UC stores the availability date on each Order Line Item. Orders are only shipped when all items are available. Which method should be used to calculate the estimated ship date for an Order?",
    options: {
      A: "Use a LATEST formula on each field.",
      B: "Use a CEILING formula on each field.",
      C: "Use a DAYS formula and a COUNT Roll-Up.",
      D: "Use a MAX Roll-Up Summary field on the latest availability date fields."
    },
    correct: "D",
    explanation_en: `A MAX Roll-Up Summary finds the biggest (latest) value in a list. Example for a child: Imagine a group of friends walking together. The group only 'arrives' when the slowest person (the one with the latest time) gets there. The MAX tells us exactly when that last person arrives.`,
    explanation_pt: `Um Roll-Up Summary de MAX encontra o maior (último) valor em uma lista. Exemplo para uma criança: Imagine um grupo de amigos caminhando juntos. O grupo só 'chega' quando a pessoa mais lenta (aquela com o horário mais tardio) chegar. O MAX nos diz exatamente quando essa última pessoa chega.`
  },
  {
    number: 25,
    question: "Universal Containers (UC) uses out-of-the-box order management... [Duplicate of Q24 in document]. Which method should be used to calculate the estimated ship date for an Order?",
    options: {
      A: "Use a LATEST formula on each field.",
      B: "Use a CEILING formula on each field.",
      C: "Use a DAYS formula and a COUNT Roll-Up.",
      D: "Use a MAX Roll-Up Summary field on the latest availability date fields."
    },
    correct: "D",
    explanation_en: `This is identical to the previous concept: to find the final date, you look for the 'latest' one using MAX. Example for a child: If you are waiting for 5 toys to arrive in the mail, you can only play with all of them when the very last toy arrives. The MAX date is the day that last toy gets to your house.`,
    explanation_pt: `Isto é idêntico ao conceito anterior: para encontrar a data final, você procura a 'última' usando MAX. Exemplo para uma criança: Se você está esperando 5 brinquedos chegarem pelo correio, você só pode brincar com todos eles quando o primeiríssimo último brinquedo chegar. A data MAX é o dia em que esse último brinquedo chega na sua casa.`
  },
  {
    number: 26,
    question: "Universal Containers has an order system that uses an Order Number to identify an order. Order records will be imported into Salesforce. How should the Order Number field be defined?",
    options: {
      A: "Indirect Lookup",
      B: "Direct Lookup",
      C: "External ID and Unique",
      D: "Lookup"
    },
    correct: "C",
    explanation_en: `An External ID is like a bridge between two systems, and Unique ensures no two orders have the same number. Example for a child: It's like your name tag at school. It's 'Unique' because only you have that exact tag, and it's an 'ID' so the teachers know exactly who you are even if you come from a different school.`,
    explanation_pt: `Um ID Externo é como uma ponte entre dois sistemas, e 'Unique' garante que dois pedidos não tenham o mesmo número. Exemplo para uma criança: É como o seu crachá na escola. É 'Único' porque só você tem aquele crachá exato, e é um 'ID' para que os professores saibam exatamente quem você é, mesmo que você venha de uma escola diferente.`
  },
  {
    number: 27,
    question: "In terms of the MVC paradigm, what are two advantages of implementing the view layer using LWC over Visualforce?",
    options: {
      A: "Rich component ecosystem",
      B: "Log capturing via Debug Logs",
      C: "Built-in standard controllers",
      D: "Self-contained and reusable units"
    },
    correct: "AD",
    explanation_en: `LWC is modern and uses 'components'. Example for a child: Imagine building a castle with Legos (LWC) instead of drawing it on paper (Visualforce). With Legos, you can use the same tower block (reusable unit) for many different castles and you have a giant box of different shapes to choose from (rich ecosystem).`,
    explanation_pt: `LWC é moderno e usa 'componentes'. Exemplo para uma criança: Imagine construir um castelo com Legos (LWC) em vez de desenhá-lo no papel (Visualforce). Com Legos, você pode usar o mesmo bloco de torre (unidade reutilizável) para muitos castelos diferentes e tem uma caixa gigante de formas diferentes para escolher (ecossistema rico).`
  },
  {
    number: 28,
    question: "What are two ways a developer can get the status of an enqueued job for a class that implements the queueable interface?",
    options: {
      A: "View the Apex Status page",
      B: "View the Apex Jobs page",
      C: "Query the AsyncApexJob object",
      D: "View the Apex Flex Queue"
    },
    correct: "BC",
    explanation_en: `To check on a background task, you can look at a specific list or ask the system. Example for a child: Imagine you asked your mom to bake cookies. To see if they are ready, you can either look at the 'Kitchen Timer' (Apex Jobs page) or ask her directly: 'Are they done yet?' (Querying AsyncApexJob).`,
    explanation_pt: `Para verificar uma tarefa em segundo plano, você pode olhar uma lista específica ou perguntar ao sistema. Exemplo para uma criança: Imagine que você pediu para sua mãe assar biscoitos. Para ver se estão prontos, você pode olhar para o 'Cronômetro da Cozinha' (página Apex Jobs) ou perguntar diretamente para ela: 'Já estão prontos?' (Consultando AsyncApexJob).`
  },
  {
    number: 29,
    question: "Which statement describes the execution order when triggers are associated to the same object and event?",
    options: {
      A: "Triggers are executed in the order they are modified.",
      B: "Trigger execution order cannot be guaranteed.",
      C: "Triggers are executed alphabetically by name.",
      D: "Triggers are executed in the order they are created."
    },
    correct: "B",
    explanation_en: `Salesforce does not promise which trigger runs first if you have many on the same event. Example for a child: Imagine 5 kids all trying to run through a door at the same time. You don't know who will get through first; it's a bit of a surprise every time! That's why it's better to have only one kid (one trigger) at the door.`,
    explanation_pt: `O Salesforce não promete qual gatilho será executado primeiro se você tiver vários no mesmo evento. Exemplo para uma criança: Imagine 5 crianças tentando correr por uma porta ao mesmo tempo. Você não sabe quem passará primeiro; é uma surpresa a cada vez! Por isso é melhor ter apenas uma criança (um gatilho) na porta.`
  },
  {
    number: 30,
    question: "A developer created a child LWC nested inside a parent LWC. The parent needs to pass a string value to the child. In which two ways can this be accomplished?",
    options: {
      A: "The parent component can invoke a public method in the child component.",
      B: "The parent component can use a public property to pass data to the child.",
      C: "The parent can use the Apex controller class to send data.",
      D: "The parent component can use a custom event to pass data."
    },
    correct: "AB",
    explanation_en: `Communication from Parent to Child happens through 'API' properties or methods. Example for a child: Imagine a mom (Parent) giving a toy to her son (Child). She can either put the toy directly into his backpack (Public Property) or tell him: 'Hey, catch this toy!' (Public Method).`,
    explanation_pt: `A comunicação do Pai para o Filho ocorre através de propriedades ou métodos 'API'. Exemplo para uma criança: Imagine uma mãe (Pai) dando um brinquedo para seu filho (Filho). Ela pode colocar o brinquedo diretamente na mochila dele (Propriedade Pública) ou dizer a ele: 'Ei, pegue este brinquedo!' (Método Público).`
  },
  {
    number: 31,
    question: "Based on the following code, what is the value of x? \nBoolean isOK; \ninteger x; \nString theString = 'Hello'; \nif (isOK == false && theString == 'Hello') { x=1; } \nelse if (isOK == true && theString == 'Hello') { x=2; } \nelse if (isOK != null && theString == 'Hello') { x=3; } \nelse { x=4; }",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    },
    correct: "D",
    explanation_en: "In Apex, a Boolean variable that is declared but not initialized is 'null'. It is not 'false' or 'true'. Therefore, all 'if' and 'else if' conditions that check for true, false, or not null will fail, leading the code to the 'else' block where x becomes 4. Example: Imagine you have a box for a toy. If you haven't put anything in it yet, the box is empty (null). You can't say it has a red toy (true) or a blue toy (false) until you actually put one there!",
    explanation_pt: "No Apex, uma variável Booleana declarada mas não inicializada é 'null'. Ela não é 'false' nem 'true'. Portanto, todas as condições 'if' e 'else if' que verificam por true, false ou não-nulo falharão, levando o código para o bloco 'else', onde x se torna 4. Exemplo: Imagine que você tem uma caixa de brinquedos. Se você ainda não colocou nada nela, ela está vazia (null). Você não pode dizer que ela tem um carrinho (true) nem que tem uma boneca (false) até que você realmente coloque algo lá!"
  },
  {
    number: 32,
    question: "A developer completed modifications comprised of an Apex trigger and a Trigger handler class. What are two factors that the developer must take into account to properly deploy them to production?",
    options: {
      A: "Apex classes must have at least 75% code coverage org-wide",
      B: "At least one line of code must be executed for the Apex trigger",
      C: "Test methods must be declared with the testMethod keyword",
      D: "All methods in the test classes must use @isTest"
    },
    correct: "AB",
    explanation_en: "To move code to Production, Salesforce requires that all your combined code has at least 75% coverage (A) and every trigger must have at least one line tested (B). Example: It's like building a new bike. Before you can ride it on the street (Production), a safety inspector checks that 75% of the parts work perfectly, and they must at least try to pedal (the trigger) once to see if it moves!",
    explanation_pt: "Para mover código para a Produção, o Salesforce exige que todo o seu código somado tenha pelo menos 75% de cobertura (A) e cada gatilho (trigger) deve ter pelo menos uma linha testada (B). Exemplo: É como construir uma bicicleta nova. Antes de poder usá-la na rua (Produção), um inspetor de segurança verifica se 75% das peças funcionam perfeitamente, e ele precisa pelo menos tentar pedalar (o trigger) uma vez para ver se ela se move!"
  },
  {
    number: 33,
    question: "How does the Lightning Component framework help developers implement solutions faster?",
    options: {
      A: "By providing device-awareness for mobile and desktops",
      B: "By providing an Agile process with default steps",
      C: "By providing change history and version control",
      D: "By providing code review standards and processes"
    },
    correct: "A",
    explanation_en: "The framework is designed to automatically know if you are using a phone or a computer (device-awareness), so you don't have to write different code for each. Example: It's like a magical book that automatically grows big letters if a giant is reading it, or tiny letters if an ant is reading it. You only write the book once, and it fixes itself for everyone!",
    explanation_pt: "O framework foi projetado para saber automaticamente se você está usando um celular ou um computador (consciência de dispositivo), então você não precisa escrever códigos diferentes para cada um. Exemplo: É como um livro mágico que aumenta as letras sozinho se um gigante estiver lendo, ou diminui se uma formiguinha estiver lendo. Você escreve o livro só uma vez e ele se ajusta para todos!"
  },
  {
    number: 34,
    question: "A developer wants to send an outbound message when a record meets a specific criteria. Which two features satisfy this use case?",
    options: {
      A: "Flow Builder",
      B: "Approval Process",
      C: "Entitlement Process",
      D: "Next Best Action"
    },
    correct: "AB",
    explanation_en: "Both Flow Builder and Approval Processes can trigger outbound messages (sending info to another system) without writing code. Example: Imagine a doorbell that automatically sends a message to your phone when someone stands on the mat. Flow Builder is like the sensor on the mat, and the Approval Process is like a guard who checks if the person is allowed before sending the message.",
    explanation_pt: "Tanto o Flow Builder quanto os Processos de Aprovação podem disparar mensagens de saída (enviar informações para outro sistema) sem precisar escrever código. Exemplo: Imagine uma campainha que envia uma mensagem para o seu celular automaticamente quando alguém pisa no tapete. O Flow Builder é como o sensor no tapete, e o Processo de Aprovação é como um guarda que verifica se a pessoa pode entrar antes de mandar o aviso."
  },
  {
    number: 35,
    question: "Universal Containers builds a custom search page for Accounts based on Name, Description, and comments. Which consideration should the developer be aware of when deciding between SOQL and SOSL?",
    options: {
      A: "SOSL is faster for text searches",
      B: "SOQL is able to return more records",
      C: "SOQL is faster for text searches",
      D: "SOSL is able to return more records"
    },
    correct: "AB",
    explanation_en: "SOSL is optimized for searching text across multiple fields and is generally faster for that (A). SOQL is better for precise queries but has lower limits on how many records it can look through in a search context compared to SOSL. Example: SOQL is like looking for a specific toy in a toy box (you know exactly where to look). SOSL is like shouting 'Who has a ball?' in a big playground; it's much faster to find anyone who has it anywhere!",
    explanation_pt: "O SOSL é otimizado para pesquisar texto em vários campos e geralmente é mais rápido para isso (A). O SOQL é melhor para consultas precisas, mas tem limites menores de quantos registros pode percorrer em um contexto de pesquisa em comparação ao SOSL. Exemplo: O SOQL é como procurar um brinquedo específico numa caixa (você sabe exatamente onde olhar). O SOSL é como gritar 'Quem tem uma bola?' num parquinho enorme; é muito mais rápido para achar qualquer um que tenha uma em qualquer lugar!"
  },
  {
    number: 36,
    question: "What is an example of a polymorphic lookup field in Salesforce?",
    options: {
      A: "The ParentId field on the standard Account object",
      B: "A custom field, Link__c, on the Contact object",
      C: "The WhatId field on the standard Event object",
      D: "The LeadId and ContactId fields on the Campaign Member object"
    },
    correct: "C",
    explanation_en: "A polymorphic field is a lookup that can point to different types of objects (like an Account OR a Opportunity). 'WhatId' on Events is a classic example. Example: It's like a 'Best Friend' sticker. You can stick it on your dog, or your brother, or your favorite teddy bear. The sticker doesn't care what it's on; it works for many types of friends!",
    explanation_pt: "Um campo polimórfico é uma pesquisa (lookup) que pode apontar para diferentes tipos de objetos (como uma Conta OU uma Oportunidade). O 'WhatId' em Eventos é um exemplo clássico. Exemplo: É como um adesivo de 'Melhor Amigo'. Você pode colar no seu cachorro, ou no seu irmão, ou no seu ursinho favorito. O adesivo não se importa com o que é; ele serve para vários tipos de amigos!"
  },
  {
    number: 37,
    question: "A developer has a Visualforce page and custom controller. How can the developer make sure that validation rule violations are displayed to the user?",
    options: {
      A: "Add custom controller attributes to display the message",
      B: "Use a try/catch with a custom exception class",
      C: "Include <apex:messages> on the Visualforce page",
      D: "Perform the DML using the database.insert() method"
    },
    correct: "C",
    explanation_en: "The <apex:messages> component is specifically designed to catch and show errors from the system, like validation rules, on the page. Example: Imagine you are drawing a picture and your teacher (the Validation Rule) says you can't use purple. The <apex:messages> is like a sticky note that appears on your paper saying: 'Oops! No purple allowed!'",
    explanation_pt: "O componente <apex:messages> foi projetado especificamente para capturar e mostrar erros do sistema, como regras de validação, na página. Exemplo: Imagine que você está fazendo um desenho e sua professora (a Regra de Validação) diz que não pode usar roxo. O <apex:messages> é como um bilhetinho que aparece no seu papel dizendo: 'Ops! Não pode usar roxo!'"
  },
  {
    number: 38,
    question: "Which code displays the contents of a Visualforce page as a PDF?",
    options: {
      A: "<apex:page contentType='application/pdf'>",
      B: "<apex:page contentType='pdf'>",
      C: "<apex:page renderAs='pdf'>",
      D: "<apex:page renderAs='application/pdf'>"
    },
    correct: "C",
    explanation_en: "The attribute 'renderAs' set to 'pdf' tells Salesforce to turn the web page into a PDF document. Example: It's like having a magic camera. Usually, it shows you a live movie on the screen (HTML), but if you click the 'PDF button', it prints out a beautiful, still photograph of that movie that you can keep!",
    explanation_pt: "O atributo 'renderAs' definido como 'pdf' diz ao Salesforce para transformar a página da web em um documento PDF. Exemplo: É como ter uma câmera mágica. Normalmente, ela te mostra um filme ao vivo na tela (HTML), mas se você apertar o 'botão PDF', ela imprime uma foto linda e parada daquele filme para você guardar!"
  },
  {
    number: 39,
    question: "Universal Containers wants Opportunities to no longer be editable when they reach the Closed/Won stage. Which two strategies can a developer use?",
    options: {
      A: "Use a validation rule",
      B: "Use an auto-response rule",
      C: "Use a before-save Apex trigger",
      D: "Use an automatically launched Approval Process"
    },
    correct: "AC",
    explanation_en: "A validation rule (A) can stop changes by throwing an error if the stage is Closed/Won. A before-save trigger (C) can also check the state and prevent the save. Example: It's like a piggy bank. Once you put the 'Winner' sticker on it (Closed/Won), the Validation Rule is like a lock that won't let anyone open it, and the Trigger is like a guard who stops your hand before you even touch the lid!",
    explanation_pt: "Uma regra de validação (A) pode impedir alterações lançando um erro se o estágio for 'Fechado/Ganho'. Um trigger before-save (C) também pode verificar o estado e impedir a gravação. Exemplo: É como um cofrinho. Depois que você cola o adesivo de 'Vencedor' nele (Fechado/Ganho), a Regra de Validação é como uma tranca que não deixa ninguém abrir, e o Trigger é como um guarda que para a sua mão antes de você sequer encostar na tampa!"
  },
  {
    number: 40,
    question: "Which approach should the developer use to be sure that the Apex class is working according to requirements specified by the business?",
    options: {
      A: "Include a savepoint and database.rollback()",
      B: "Include a try/catch block to the Apex class",
      C: "Run the code in an Execute Anonymous block",
      D: "Create a test class to execute the business logic and run the test"
    },
    correct: "D",
    explanation_en: "Creating a test class is the only way to officially verify that your code does what it is supposed to do in various scenarios. Example: Imagine you built a robot to clean your room. To be sure it works, you don't just hope it's okay; you create a 'practice room' (test class) with some mess and watch the robot clean it up to make sure it follows your rules!",
    explanation_pt: "Criar uma classe de teste é a única maneira de verificar oficialmente se o seu código faz o que deveria fazer em vários cenários. Exemplo: Imagine que você construiu um robô para limpar seu quarto. Para ter certeza de que funciona, você não apenas torce para dar certo; você cria um 'quarto de mentirinha' (classe de teste) com bagunça e observa o robô limpar tudo para garantir que ele segue as suas ordens!"
  },
  {
    number: 41,
    question: "Which code in a Visualforce page and/or controller might present a security vulnerability?",
    options: {
      A: "<apex:outputText value='{!CurrentPage.parameters.userInput}' />",
      B: "<apex:outputText escape='false' value='{!CurrentPage.parameters.userInput}' />",
      C: "<apex:outputField value='{!ctrl.userInput}' />",
      D: "<apex:outputField value='{!ctrl.userInput}' rendered='{!isEditable}' />"
    },
    correct: "B",
    explanation_en: "Setting 'escape=false' allows the browser to run scripts hidden in the text (Cross-Site Scripting). Example: It's like receiving a letter and just reading it aloud, but the letter has a secret command that makes you throw your cake away. If you don't 'escape' (check) the letter, the trick works!",
    explanation_pt: "Configurar 'escape=false' permite que o navegador execute scripts escondidos no texto (Cross-Site Scripting). Exemplo: É como receber uma carta e apenas lê-la em voz alta, mas a carta tem um comando secreto que faz você jogar seu bolo fora. Se você não 'escapar' (verificar) a carta, o truque funciona!"
  },
  {
    number: 42,
    question: "What should a developer use to script the deployment and unit test execution as part of continuous integration?",
    options: {
      A: "VS Code",
      B: "Execute Anonymous",
      C: "Salesforce CLI",
      D: "Developer Console"
    },
    correct: "C",
    explanation_en: "Salesforce CLI is a command-line tool perfect for automating tasks. Example: Instead of clicking every button to tidy your room, you have a magic remote control where you just type 'Clean' and it does everything perfectly every time.",
    explanation_pt: "O Salesforce CLI é uma ferramenta de linha de comando perfeita para automatizar tarefas. Exemplo: Em vez de clicar em cada botão para arrumar seu quarto, você tem um controle remoto mágico onde apenas digita 'Arrumar' e ele faz tudo sozinho perfeitamente todas as vezes."
  },
  {
    number: 43,
    question: "The Job_Application__c object has a master-detail relationship to Contact (master). What is the most efficient SOQL to retrieve Contacts in 'Technology' and their related Job_Applications__c?",
    options: {
      A: "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Account.Industry = 'Technology']",
      B: "[SELECT Id, (SELECT Id FROM Job_Applications__c) FROM Contact WHERE Account.Industry = 'Technology']",
      C: "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Accounts.Industry = 'Technology']",
      D: "[SELECT Id, (SELECT Id FROM Job_Application__c) FROM Contact WHERE Account.Industry = 'Technology']"
    },
    correct: "A",
    explanation_en: "This uses a 'Left Outer Join' to get parents and their children. Example: Imagine asking for a list of all Dads (Contacts) who work with robots, and for each Dad, also list all the toys (Job_Applications) they brought home.",
    explanation_pt: "Isso usa um 'Left Outer Join' para buscar os pais e seus filhos. Exemplo: Imagine pedir uma lista de todos os Papais (Contacts) que trabalham com robôs e, para cada Papai, listar também todos os brinquedos (Job_Applications) que eles trouxeram para casa."
  },
  {
    number: 44,
    question: "Universal Containers wants to back up all data and attachments in its Salesforce org once a month. Which approach should a developer use?",
    options: {
      A: "Schedule a report.",
      B: "Use the Data Loader command line.",
      C: "Define a Data Export scheduled job.",
      D: "Create a Schedulable Apex class."
    },
    correct: "C",
    explanation_en: "Data Export is the built-in way to get a full copy of your data. Example: It's like a giant photocopier that once a month takes a picture of every single page in your notebook and saves it in a safe box for you.",
    explanation_pt: "O Data Export é a forma nativa de obter uma cópia completa dos seus dados. Exemplo: É como uma copiadora gigante que, uma vez por mês, tira uma foto de cada página do seu caderno e guarda em um cofre para você."
  },
  {
    number: 45,
    question: "Which two are phases in the Aura application event propagation framework?",
    options: {
      A: "Control",
      B: "Default",
      C: "Bubble",
      D: "Emit"
    },
    correct: "BC",
    explanation_en: "Aura events use Bubble and Capture (Default) phases. Example: Imagine throwing a ball into a pool. The ball goes down to the bottom (Capture) and then floats back up to the surface (Bubble).",
    explanation_pt: "Eventos Aura usam as fases Bubble (bolha) e Capture (captura/default). Exemplo: Imagine jogar uma bola em uma piscina. A bola desce até o fundo (Captura) e depois boia de volta até a superfície (Bolha)."
  },
  {
    number: 46,
    question: "A company wants to report on which Accounts have reported which Bugs__c (many-to-many). What is needed?",
    options: {
      A: "Roll-up summary field of Bug__c on Account",
      B: "Master-detail field on Bug__c to Account",
      C: "Lookup field on Bug__c to Account",
      D: "Junction object between Bug__c and Account"
    },
    correct: "D",
    explanation_en: "A Junction Object creates a bridge between two objects. Example: Imagine you have many students and many clubs. A student can join many clubs, and a club has many students. To link them, you need a 'Membership Card' (Junction Object) for each student in each club.",
    explanation_pt: "Um Objeto de Junção cria uma ponte entre dois objetos. Exemplo: Imagine que você tem muitos alunos e muitos clubes. Um aluno pode entrar em vários clubes, e um clube tem vários alunos. Para ligá-los, você precisa de uma 'Carteirinha' (Objeto de Junção) para cada aluno em cada clube."
  },
  {
    number: 47,
    question: "An ISV partner is developing a managed package. Which modifier ensures a method is accessible outside the package namespace?",
    options: {
      A: "global",
      B: "public",
      C: "private",
      D: "protected"
    },
    correct: "A",
    explanation_en: "The 'global' modifier makes the code visible to everyone, even outside your own 'box'. Example: If you build a toy in your house, 'public' means your family can play. 'Global' means the kids next door can also play with it through the window.",
    explanation_pt: "O modificador 'global' torna o código visível para todos, mesmo fora da sua própria 'caixa'. Exemplo: Se você constrói um brinquedo na sua casa, 'public' significa que sua família pode brincar. 'Global' significa que as crianças da vizinhança também podem brincar com ele pela janela."
  },
  {
    number: 48,
    question: "A developer sees the error 'Maximum trigger depth exceeded'. What is a possible cause?",
    options: {
      A: "Incorrect user permissions.",
      B: "Trigger is too long.",
      C: "Insufficient code coverage.",
      D: "The trigger is getting executed multiple times (recursion)."
    },
    correct: "D",
    explanation_en: "This usually happens when a trigger updates a record, which fires the same trigger again, forever. Example: It's like a robot that is told 'Whenever you see a dirty plate, clean it and put it back'. But when it puts it back, it sees it again and tries to clean it again, over and over, until it gets dizzy!",
    explanation_pt: "Isso geralmente acontece quando um gatilho atualiza um registro, o que dispara o mesmo gatilho de novo, para sempre. Exemplo: É como um robô que ouve: 'Sempre que ver um prato sujo, limpe-o e coloque-o de volta'. Mas quando ele coloca de volta, ele o vê de novo e tenta limpar de novo, repetidamente, até ficar tonto!"
  },
  {
    number: 49,
    question: "Recruiters want to see if Contact's Mailing State matches a value on Job_Application__c and keep it in sync. What is the recommended tool?",
    options: {
      A: "Apex trigger",
      B: "Roll-up summary field",
      C: "Record-triggered flow",
      D: "Validation rule"
    },
    correct: "C",
    explanation_en: "Record-triggered flows are the modern, low-code way to update records automatically. Example: It's like a smart light that turns on automatically the moment you walk into the room. You don't have to flip the switch yourself; the house just 'knows' and does it for you.",
    explanation_pt: "Fluxos acionados por registro (Record-triggered flows) são a forma moderna e sem código de atualizar registros automaticamente. Exemplo: É como uma luz inteligente que acende sozinha no momento em que você entra no quarto. Você não precisa apertar o interruptor; a casa apenas 'sabe' e faz por você."
  },
  {
    number: 50,
    question: "How can a developer check the test coverage of autolaunched Flows before deploying?",
    options: {
      A: "Use the ApexTestResult class.",
      B: "Use the Flow Properties page.",
      C: "Use SOQL and the Tooling API.",
      D: "Use the Code Coverage Setup page."
    },
    correct: "C",
    explanation_en: "The Tooling API allows you to query detailed metadata, including flow coverage. Example: It's like having a special X-ray machine that looks inside your school bag to see exactly which pages of your homework are actually finished.",
    explanation_pt: "A Tooling API permite consultar metadados detalhados, incluindo a cobertura de fluxos. Exemplo: É como ter uma máquina de raio-X especial que olha dentro da sua mochila para ver exatamente quais páginas do seu dever de casa estão realmente prontas."
  },
  {
    number: 51,
    question: "A developer created three Rollup Summary fields in the custom object, Project__c: Total_Timesheets__c, Total_Approved_Timesheets__c, and Total_Rejected_Timesheet__c. The developer is asked to create a new field that shows the ratio between rejected and approved timesheets for a given project. Which should the developer use to implement the business requirement in order to minimize maintenance overhead?",
    options: {
      A: "Formula field",
      B: "Record-triggered flow",
      C: "Roll-up summary field",
      D: "Apex trigger"
    },
    correct: "A",
    explanation_en: "A Formula field is the most efficient choice here. Since the 'ingredients' (the Rollup fields) already exist, the formula simply calculates the result on the fly without storing extra data or needing code. Example for a child: Imagine you have two jars, one with red marbles and one with blue. To know if you have more red than blue, you don't need a robot (Trigger) to count them every time; you just look at the labels on the jars and do a quick math in your head!",
    explanation_pt: "Um campo de Fórmula é a escolha mais eficiente aqui. Como os 'ingredientes' (os campos de Rollup) já existem, a fórmula simplesmente calcula o resultado na hora, sem armazenar dados extras ou precisar de código. Exemplo para uma criança: Imagine que você tem dois potes, um com bolinhas vermelhas e outro com azuis. Para saber se você tem mais vermelhas que azuis, você não precisa de um robô (Trigger) para contar toda vez; você apenas olha os números nos potes e faz uma conta rápida de cabeça!"
  },
  {
    number: 52,
    question: "What is a consideration for running a flow in debug mode?",
    options: {
      A: "When debugging a schedule-triggered flow, the flow starts only for one record.",
      B: "Clicking Pause allows an element to be replaced in the flow.",
      C: "DML operations will be rolled back when the debugging ends.",
      D: "Callouts to external systems are not allowed when debugging a flow."
    },
    correct: "C",
    explanation_en: "When you debug a flow, Salesforce can 'roll back' any changes made to records so you don't accidentally mess up your real data. Example for a child: It's like playing a video game with a 'Practice Mode'. You can jump, run, and break things to see how it works, but once you turn off the game, everything goes back to exactly how it was before you started!",
    explanation_pt: "Ao depurar um fluxo, o Salesforce pode 'reverter' (roll back) qualquer alteração feita nos registros para que você não estrague seus dados reais sem querer. Exemplo para uma criança: É como jogar um videogame no 'Modo Treino'. Você pode pular, correr e quebrar coisas para ver como funciona, mas assim que desliga o jogo, tudo volta a ser exatamente como era antes de você começar!"
  },
  {
    number: 53,
    question: "What are two ways for a developer to execute tests in an org?",
    options: {
      A: "Tooling API",
      B: "Metadata API",
      C: "Bulk API",
      D: "Developer Console"
    },
    correct: "AD",
    explanation_en: "The Developer Console is the standard UI tool for running tests, while the Tooling API allows external programs to run tests. Example for a child: To see if your drawing is good, you can either show it to your teacher in class (Developer Console) or send a digital photo of it to a judge through a special app (Tooling API).",
    explanation_pt: "O Developer Console é a ferramenta visual padrão para rodar testes, enquanto a Tooling API permite que programas externos executem esses testes. Exemplo para uma criança: Para saber se o seu desenho está bonito, você pode mostrá-lo para a professora na sala (Developer Console) ou enviar uma foto dele para um juiz através de um aplicativo especial (Tooling API)."
  },
  {
    number: 54,
    question: "A developer needs to allow users to complete a form on an Account record that will create a record for a custom object. The form needs to display different fields depending on the user's job role. The functionality should only be available to a small group of users. Which three things should the developer do?",
    options: {
      A: "Create a Dynamic Form.",
      B: "Create a Custom Permission for the users.",
      C: "Add a Dynamic Action to the Users' assigned Page Layouts.",
      D: "Add a Dynamic Action to the Account Record Page."
    },
    correct: "ABD",
    explanation_en: "Dynamic Forms allow fields to change based on conditions, Custom Permissions restrict who sees the button, and Dynamic Actions control button visibility on the Lightning page. Example for a child: Imagine a magic toy box (Account). Only kids with a 'Golden Key' (Custom Permission) see the 'Create Toy' button. When they press it, the box shows different tools depending on if the kid is a builder or an artist (Dynamic Form).",
    explanation_pt: "Formulários Dinâmicos permitem que campos mudem conforme condições, Permissões Personalizadas restringem quem vê o botão, e Ações Dinâmicas controlam a visibilidade do botão na página. Exemplo para uma criança: Imagine uma caixa de brinquedos mágica (Account). Apenas crianças com uma 'Chave de Ouro' (Custom Permission) veem o botão 'Criar Brinquedo'. Quando apertam, a caixa mostra ferramentas diferentes dependendo se a criança é um construtor ou um artista (Dynamic Form)."
  },
  {
    number: 55,
    question: "Refer to the following Apex code: Integer x = 0; do { x = 1; x++; } while (x < 1); System.debug(x); What is the value of x when it is written to the debug log?",
    options: {
      A: "0",
      B: "1",
      C: "2",
      D: "4"
    },
    correct: "C",
    explanation_en: "In a 'do-while' loop, the code inside the 'do' block runs at least once before checking the condition. Here, x becomes 1, then increments to 2. Since 2 is NOT less than 1, the loop stops. Example for a child: Imagine I tell you: 'Eat a cookie, then add one more to your plate. Now, check if you have less than 1 cookie. If yes, repeat.' You eat 1, add 1 (total 2), check the rule (2 is more than 1), so you stop and stay with 2 cookies!",
    explanation_pt: "Em um loop 'do-while', o código dentro do bloco 'do' roda pelo menos uma vez antes de checar a condição. Aqui, x vira 1, depois aumenta para 2. Como 2 NÃO é menor que 1, o loop para. Exemplo para uma criança: Imagine que eu te diga: 'Coma um biscoito e depois coloque mais um no prato. Agora, veja se você tem menos de 1 biscoito. Se sim, repita.' Você come 1, coloca +1 (total 2), olha a regra (2 é maior que 1), então você para e fica com 2 biscoitos!"
  },
  {
    number: 56,
    question: "A development team wants to use a deployment script to automatically deploy to a sandbox during their development cycles. Which two tools can they use?",
    options: {
      A: "SFDX CLI",
      B: "Developer Console",
      C: "Change Sets",
      D: "Ant Migration Tool"
    },
    correct: "AD",
    explanation_en: "SFDX CLI and the Ant Migration Tool are command-line tools that support scripting and automation. Example for a child: Instead of carrying your toys to the sandbox one by one (Change Sets), you use a conveyor belt (CLI/Ant) that moves everything automatically whenever you press a button on your computer.",
    explanation_pt: "O SFDX CLI e a Ant Migration Tool são ferramentas de linha de comando que suportam scripts e automação. Exemplo para uma criança: Em vez de carregar seus brinquedos para a caixa de areia um por um (Change Sets), você usa uma esteira rolante (CLI/Ant) que leva tudo sozinho sempre que você aperta um botão no computador."
  },
  {
    number: 57,
    question: "A developer must provide custom user interfaces when users edit a Contact in either Salesforce Classic or Lightning Experience. What should the developer use to override the Contact's Edit button?",
    options: {
      A: "A Lightning component in Classic and a Lightning component in Lightning.",
      B: "A Lightning page in Classic and a Visualforce page in Lightning.",
      C: "A Visualforce page in Classic and a Lightning page in Lightning.",
      D: "A Visualforce page in Classic and a Lightning component in Lightning Experience."
    },
    correct: "D",
    explanation_en: "Classic requires Visualforce for overrides, while Lightning Experience can use Lightning Components (Aura/LWC). Example for a child: If you want to change how you open a door, in an old castle (Classic) you need an old-fashioned heavy key (Visualforce). in a futuristic spaceship (Lightning), you use a high-tech fingerprint scanner (Lightning Component).",
    explanation_pt: "O Classic exige Visualforce para sobreposições, enquanto o Lightning Experience pode usar Componentes Lightning (Aura/LWC). Exemplo para uma criança: Se você quiser mudar o jeito de abrir uma porta, num castelo antigo (Classic) você precisa de uma chave pesada de ferro (Visualforce). Numa nave espacial futurista (Lightning), você usa um scanner de digital moderno (Componente Lightning)."
  },
  {
    number: 58,
    question: "Which annotation should a developer use on an Apex method to make it available to be wired to a property in a Lightning web component?",
    options: {
      A: "@AuraEnabled(cacheable=true)",
      B: "@RemoteAction(cacheable=true)",
      C: "@RemoteAction",
      D: "@AuraEnabled"
    },
    correct: "A",
    explanation_en: "To '@wire' an Apex method in LWC, it must be '@AuraEnabled' and 'cacheable=true' so the component can store the results for performance. Example for a child: It's like having a snack drawer. Instead of asking your mom for a snack (Apex) every 5 minutes, she puts a box of snacks in your room (cacheable=true) so you can just grab one whenever you want without bothering her!",
    explanation_pt: "Para usar o '@wire' em um método Apex no LWC, ele deve ser '@AuraEnabled' e 'cacheable=true' para que o componente possa guardar os resultados e ser mais rápido. Exemplo para uma criança: É como ter uma gaveta de lanches. Em vez de pedir um biscoito para a mamãe (Apex) a cada 5 minutos, ela deixa uma caixa no seu quarto (cacheable=true) para você pegar quando quiser sem precisar chamá-la toda hora!"
  },
  {
    number: 59,
    question: "When using Salesforce DX, what does a developer need to enable to create and manage scratch orgs?",
    options: {
      A: "Sandbox",
      B: "Environment Hub",
      C: "Production",
      D: "Dev Hub"
    },
    correct: "D",
    explanation_en: "The Dev Hub is the central 'control center' that creates and manages temporary Scratch Orgs. Example for a child: Imagine you want to build a sandcastle that disappears at the end of the day. The Dev Hub is like the 'Magic Sand Bucket' that you use to create as many little castles (Scratch Orgs) as you want!",
    explanation_pt: "O Dev Hub é o 'centro de controle' que cria e gerencia as Scratch Orgs temporárias. Exemplo para uma criança: Imagine que você quer construir um castelinho de areia que some no final do dia. O Dev Hub é como o 'Balde de Areia Mágico' que você usa para criar quantos castelinhos (Scratch Orgs) você quiser!"
  },
  {
    number: 60,
    question: "An Apex method, getAccounts, that returns a list of Accounts given a searchTerm, is available for LWC. What is the correct definition of a Lightning Web Component property that uses the getAccounts method?",
    options: {
      A: "@wire(getAccounts, 'searchTerm') accountList;",
      B: "@AuraEnabled(getAccounts, 'searchTerm') accountList;",
      C: "@AuraEnabled(getAccounts, { searchTerm: 'searchTerm' }) accountList;",
      D: "@wire(getAccounts, { searchTerm: '$searchTerm' }) accountList;"
    },
    correct: "D",
    explanation_en: "The syntax for @wire uses an object with keys matching parameters, and '$' makes the parameter reactive. Example for a child: Imagine a robot that fetches toys. You tell it: 'Go get the toy that matches this name: [Name]'. The '$' is like a string tied to your hand—whenever you change the name on your hand, the robot immediately knows and goes to get the new toy!",
    explanation_pt: "A sintaxe do @wire usa um objeto com chaves que batem com os parâmetros, e o '$' torna o parâmetro reativo. Exemplo para uma criança: Imagine um robô que busca brinquedos. Você diz: 'Busque o brinquedo que combina com este nome: [Nome]'. O '$' é como um barbante amarrado na sua mão—sempre que você muda o nome escrito na sua mão, o robô sabe na hora e corre buscar o brinquedo novo!"
  }
];
