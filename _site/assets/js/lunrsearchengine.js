
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 A página acessada não existe!Você se perdeu na galáxia, por favor cheque o endereço que acessou pagina inicial! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "Sobre mim",
    "body": "Sou desenvolvedor de software, professor de filosofia em formação, crossfiteiro, preguiçoso nato e um amante de música brega. Iniciei na área de infra-estrutura com servidores Linux e Windows, migrando para suporte à sistemas, testes, e desenvolvimento. Nesse blog pretendo compartilhar um pouco do meu conhecimento e conseguir colaborar um pouco para quem chegar até aqui. Contato: Botemos trocar uma ideia! me manda um emailhere. "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Recentes:                                                                                                                                                                                                           Vulnerabilidade de injection de SQL no Spring                              :               Entre as várias ameaças à segurança, a injeção de consultas emerge como uma das vulnerabilidades mais comuns e perigosas enfrentadas por sistemas online. Neste artigo,. . . :                                                                                                                                                                       Murilo Eduardo                                02 Apr 2024                                                                                                                                                                                                                                                                                                                  Map Struct - Criando objetos DTOs de forma mais elegante                              :               Neste artigo será apresentado a biblioteca Map Struct que permite criar objetos dtos e serializa-los de forma mais elegante, simples e prática. :                                                                                                                                                                       Murilo Eduardo                                11 Feb 2022                                                                                                                                                                                                                                                                                                                  @RepositoryRestResource - Entendendo o uso dessa annotation                              :               Neste artigo iremos trocar uma ideia sobre annotation @RepositoryRestResource, por meio dela podemos criar API HATEOAS em poucos minutos!:                                                                                                                                                                       Murilo Eduardo                                22 Jan 2022                                                                                                                      Todas as postagens:             "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/owasp-spring-pratica/",
    "title": "Vulnerabilidade de injection de SQL no Spring",
    "body": "2024/04/02 - Entre as várias ameaças à segurança, a injeção de consultas emerge como uma das vulnerabilidades mais comuns e perigosas enfrentadas por sistemas online. Neste artigo, exploraremos em detalhes a vulnerabilidade de injeção de consultas, com foco especial em como ela afeta aplicações desenvolvidas com o framework Spring. Começaremos definindo o que é a injeção de consultas e como ela pode ser explorada por invasores para comprometer a integridade e a segurança dos dados de uma aplicação. Em seguida, examinaremos diferentes cenários de injeção de consultas em interfaces e consultas anotadas com @Query e nativeQuery = true em aplicações Spring. Além disso, discutiremos as melhores práticas para prevenir e mitigar essas vulnerabilidades, destacando o uso de consultas parametrizadas, frameworks de segurança e outras técnicas de proteção. Disclaimer: Artigo foi criado e adaptado com base na cartilha OWASP Top 10 - 2017 The Ten Most Critical Web Application Security Risks, a consulta original pode ser feita aqui. Sobre a vulnerabilidade: A documentação original menciona que As falhas de injeção, como injeção de SQL, NoSQL, SO e LDAP, ocorrem quando dados não confiáveis são enviados a um intérprete como parte de um comando ou consulta. Esse conceito se aplica a uma ampla variedade de sistemas e tecnologias, incluindo bancos de dados relacionais, bancos de dados NoSQL, sistemas operacionais e serviços de diretório LDAP. Vamos decorrer um pouco sobre o tema: as vulnerabilidades de injeções representam uma ameaça significativa em sistemas web e aplicativos, especialmente aqueles que interagem com bancos de dados. Essas falhas ocorrem quando os dados fornecidos pelo usuário são inseridos diretamente em uma consulta ou comando executado por um sistema. Isso pode acontecer em vários contextos, como a construção de uma consulta SQL dinâmica, a montagem de uma string de comandos em um sistema operacional, ou até mesmo a criação de uma consulta LDAP. O perigo reside no fato de que, se os dados do usuário não forem adequadamente tratados ou sanitizados, um invasor pode manipulá-los de forma maliciosa, inserindo caracteres especiais ou instruções que alteram o comportamento esperado do sistema. Isso pode levar a uma variedade de ataques, desde a recuperação não autorizada de informações confidenciais até a execução de comandos indesejados no sistema. É importante ressaltar que essas vulnerabilidades são especialmente prevalentes em cenários onde há concatenação de strings para formar consultas ou comandos. Esse método de construção de consultas é propenso a erros devido à natureza dinâmica e imprevisível dos dados fornecidos pelos usuários. Ao entender as vulnerabilidades de injeção de consultas e os riscos associados, os desenvolvedores podem adotar práticas seguras de codificação e implementar medidas de segurança adequadas para proteger seus sistemas contra essas ameaças. Exemplo prático: Para este exemplo, vamos imaginar uma API usando Spring Boot onde ela recebe um objeto por meio do corpo da requisição. A classe abaixo representa a nosso controlador. Temos uma classe que representa a entidade do banco de dados, a classe User contém algumas propriedades que facilmente podemos achar em ambientes de produção, pré-prod, homologação e assim por diante. No repositório, temos a seguinte lógica, onde recebemos o nome do usuário e realizamos a busca, a consulta foi montada em JHQL, nela incluímos uma concatenação desnecessária, o uso das '' não é necessário pois o JPA consegue interpretar o valor ?1: Atualmente as informações são obtidas conforme request http://localhost:8080/api/user/search?name=Pedro, onde o critério de busca vem por meio da QueryString. Paralelamente, foi criado um console application onde injetará mais de mil string maliciosas: Após o teste de estresse, as consultas montadas mantiveram o padrão, de forma nativa o spring conseguiu sanitizar todos os ataques. Hibernate:  /* dynamic native SQL query */ SELECT    *  FROM    User  WHERE    name = '?1' Vamos trocar uma ideia sobre esse comportamento;    Por padrão, o tomcat-embed-core já bloqueia cenários mínimos de ataques, com a mensagem Invalid character found in the HTTP protocol [' ].     Ao usar o JpaRepository, as consultas são tratadas automaticamente para evitar vulnerabilidades de injeção de SQL. Significando que as consultas são parametrizadas por padrão.  Em outras palavras, isso significa que os parâmetros são tratados separadamente da consulta SQL e não são concatenados diretamente na consulta. Assim protege contra a maioria dos ataques de injeção de SQL, pois os valores dos parâmetros não são interpretados como parte do comando SQL. A partir do momento que usamos ela, o Spring Data JPA já realiza esse tratamento para nós.    O tratamento automático introduziu essas funcionalidades de segurança desde suas primeiras versões, e desde então vem se aprimorando vide os bugs aberto pela comunidade (https://spring. io/security/cve-2016-6652).     Sobre o uso do @RequestParam no controladores Spring, ao não adotá-lo, a request vai bater no repositório como '= or'. A partir do momento que adotar o seu uso, o comportamento é o mesmo. Como uma alternativa, pode ser usado StringEscapeUtils. escapeSql() do pacote Apache Commons Lang. Pode ser consultado em commons-lang3.     Sobre o uso do @Param em consultas JPA, honestamente, se voltarmos para o início da lista, veremos que ele não é obrigatório/necessário, creio que o uso dele visá tornar o código mais legível ou para manter uma consistência entre os diferentes métodos de consulta, fica a gosto do cliente o seu uso.  Encerramento: A injeção de consultas, como a injeção de SQL, representa uma ameaça significativa à segurança das aplicações web. Essas falhas ocorrem quando dados não confiáveis são inseridos em um sistema e interpretados como parte de um comando ou consulta. Isso pode levar a ações não intencionadas, como acesso não autorizado a dados ou até mesmo corrupção de dados. No contexto do Spring Data JPA, descobrimos que o tratamento automático de consultas introduzido desde suas primeiras versões protege efetivamente contra a maioria dos ataques de injeção de SQL. Consultas parametrizadas são usadas por padrão, o que separa os parâmetros da consulta SQL e evita a interpretação de dados de entrada como parte do comando SQL. Em resumo, é crucial estar ciente das vulnerabilidades de injeção de consultas e implementar medidas adequadas para mitigar esses riscos, garantindo assim a segurança e integridade de suas aplicações web. Código fonte: O código fonte está disponibilizado aqui. A lista de sql injection pode ser consulta aqui, deixando claro os seus créditos aos autores swissky e payloadbox. "
    }, {
    "id": 6,
    "url": "http://localhost:4000/mapstruct-criando-dto-de-forma-mais-elegante/",
    "title": "Map Struct - Criando objetos DTOs de forma mais elegante",
    "body": "2022/02/11 - Neste artigo será apresentado a biblioteca Map Struct que permite criar objetos dtos e serializa-los de forma mais elegante, simples e prática. Data Transfer Object, comumente conhecido como DTO é um padrão de projetos muito utilizado em várias linguagens de programação. É destinado para o transporte de dados entre diferentes camadas do sistema. A proposta é possuir uma classe mais simples e leve para melhorar a comunicação e otimizar o processamento. Sobre sua aplicabilidade: O padrão DTO, resolver vários problemas, um deles é onde possuirmos o cadastro de uma entidade, mas algumas informações não necessariamente são obrigatórias ou necessárias, nesse caso, podemos criar uma classe secundária onde tenha os campos necessários e depois realizarmos a conversão/mapeamento para a entidade. Se procurarmos algum exemplo especificamente com Java, nos deparamos com os seguintes exemplos. Onde existe uma classe DTO e dentro dela, temos um construtor fazendo o de-para. Exemplo prático: Para este exemplo, vamos imaginar que o nosso sistema é composto por uma tela de um sistema de cadastro de usuários, no módulo de cadastro de usuário, certos campos não são obrigatórios no envio da requisição. A classe abaixo representa a entidade User. Contudo, o sistema não necessita que no momento de criação seja informado o id do cliente e se o usuário está ativo ou não, para isso criamos um DTO, um objeto mais simples para representar o nosso cadastro. A classe abaixo representa o nosso UserDTO. Bom, na teoria, o nosso DTO está funcional e atendendo a necessidade de cadastro de usuários, mas em uma ensolarada manhã, a necessidade do cliente muda e o Product Owner chega na sua mesa informando que nesta tela, onde temos o cadastro de usuário torna-se necessário informar mais informações do cliente, como número do pedido, cidade e estado. Agora temos um cenário onde toda e qualquer alteração precisa incrementar o nosso construtor UserDTO convertToUser(User user). Nesse cenário, temos seis propriedades, até aí tudo bem. Mas se considerarmos, a tendência do software de ir mudando a necessidade da tela de cadastro de usuário ficará muito inviável manter esse construtor, pois ele não irá parar de crescer ferido o princípio SOLID Open-closed principle, onde define que uma entidade deverá estar aberta para extensão, mas fechada para modificação. Nessa parte que entra a lib MapStruct, a proposta dela é simplificar a implementação de mapeamento entre tipos. É rápido, seguro e fácil de implementar e entender. A utilização e serialização de DTO/Entidades é simplificada com o uso dessa dependência. Para iniciar a implementação, é necessário importa-la ao projeto na documentação oficial é demostrado essa inclusão; 1234567dependencies {  . . .   implementation 'org. mapstruct:mapstruct:1. 4. 2. Final'   annotationProcessor 'org. mapstruct:mapstruct-processor:1. 4. 2. Final'}Uma abordagem que particularmente eu curto é a utilização de static factory method juntamente com uma classe abstract, onde a conversão ficaria da seguinte forma; Assim a nossa classe de serviço terá uma única instância do Mapper e a leitura fica bem mais agradável; Essa implementação pode ser utilizada em várias camadas e tornará esse tipo de conversão muito fácil. Encerramento: Foi apresentado a utilização do MapStruct para mapeamento de DTOs com o uso de static factory method. Com essa abordagem, se surgir a necessidade de aumentar as propriedades da nossa tela de cadastro basta incluir as propriedades nas classes User e UserDTO. O construtor que poderia se tornar um godzilla já não existe nessa cenário. Ficando mais limpa e prática. Na sequência, abordaremos um comparativo entre MapStruct e a biblioteca ModelMapper. Código fonte: O código fonte está disponibilizado aqui. "
    }, {
    "id": 7,
    "url": "http://localhost:4000/repository-rest-resource/",
    "title": "@RepositoryRestResource - Entendendo o uso dessa annotation",
    "body": "2022/01/22 - Neste artigo iremos trocar uma ideia sobre annotation @RepositoryRestResource, por meio dela podemos criar API HATEOAS em poucos minutos! Em um cenário comum, considerando uma aplicação Spring Boot, temos a nossa camada de repositório que no caso é uma interface que estenderia do JpaRepository, uma camada de serviço e no controlador e retornando algumas ações, nesse ponto nada fora do padrão. Sobre @RepositoryRestSource: Na prática, o que Spring fez aqui, é que permite que você exponha os seus endpoints por meio das suas interfaces (repositórios) são geralmente chamadas GET/POST/PUT e outros verbos HTTP para manipular a sua entidade. Uma das vantagens dessa annotation é que dispensa a necessidade de criar a camada de serviço e controladores. Uma das vantagens é que será criado seguindo a restrição HATEOAS, onde os clientes poderão facilmente consumir a sua API. Ao anotar a nossa interface de repositório com @RepositoryRestResource , precisamos informar mais dois parâmetros, sendo eles : A) Path : Indica qual o recurso importado, no nosso exemplo corresponderá ao path da aplicação, no nosso cenário/cliente Exemplo prático: O modelo criado é referenciado como CustomerRepository e Customer, onde o CustomerRepository é composto por uma interface usando a annotation @RepositoryRestResource, conforme o exemplo abaixo: A classe Customer representa o nosso modelo de negócio. Ao subir a aplicação e acessar o path localhost:8080/customer nos deparamos com o seguinte retorno: E voilà em questão de minutos montamos a nossa API seguindo o padrão HATEOAS seguindo uma série de especificações, como, por exemplo a RFC 5988 que define como os links deverão ser implementados. Podemos confirmar o funcionamento de alguns endpoints pelos testes de integração abaixo: Usar essa categoria de abordagem possui uma série de benefícios para quem for utilizá-la, onde com poucas linhas de códigos poderá criar uma API, evita o trabalho de criar a camada de serviços e controladores além de permitir o desenvolvimento de testes de integração. Algumas desvantagens do uso dessa annotation é a falta de controle sobre a criação/retorno de status codes e headers. Encerramento: Foi apresentado a annotation RepositoryRestResource, ela fornece a oportunidade de expormos facilmente os nossos endpoints usando somente a camada de repositório, evitando a criação dos Controllers. Você poderá avaliar o seu uso nos seus projetos para otimizar tempo e trabalho na criação de APIs. Ps. Ela é importada do pacote spring-boot-starter-data-rest. Código fonte: O código fonte está disponibilizado aqui. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});