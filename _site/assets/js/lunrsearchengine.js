
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/index/404.html",
    "title": "404",
    "body": "404 A página acessada não existe!Você se perdeu na galáxia, por favor cheque o endereço que acessou pagina inicial! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/index/about",
    "title": "Sobre mim",
    "body": "Sou desenvolvedor de software, professor de filosofia em formação, crossfiteiro, preguiçoso nato e um amante de música brega. Iniciei na área de infra-estrutura com servidores Linux e Windows, migrando para suporte à sistemas, testes, e desenvolvimento. Nesse blog pretendo compartilhar um pouco do meu conhecimento e conseguir colaborar um pouco para quem chegar até aqui. Contato: Botemos trocar uma ideia! me manda um emailhere. "
    }, {
    "id": 2,
    "url": "http://localhost:4000/index/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/index/",
    "title": "Home",
    "body": "      Recentes:                                                                                                                                                                                                           @RepositoryRestResource - Entendendo o uso dessa annotation                              :               Neste artigo iremos trocar uma ideia sobre annotation @RepositoryRestResource, por meio dela podemos criar API HATEOAS em poucos minutos!:                                                                                                                                                                       Murilo Eduardo                                22 Jan 2022                                                                                                                      Todas as postagens:             "
    }, {
    "id": 4,
    "url": "http://localhost:4000/index/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/index/repository-rest-resource/",
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