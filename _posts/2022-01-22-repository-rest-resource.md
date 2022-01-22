---
layout: post
title:  "@RepositoryRestResource - Entendendo o uso dessa annotation"
author: murilo
categories: [ springboot, annotations ]
image: assets/images/spring-boot-2.jpg
featured: true
hidden: true
---
Neste artigo iremos trocar uma ideia sobre annotation @RepositoryRestResource, por meio dela podemos criar API HATEOAS em poucos minutos!

Em um cenário comum, considerando uma aplicação Spring Boot, temos a nossa camada de repositório que no caso é uma interface que estenderia do JpaRepository, uma camada de serviço e no controlador e retornando algumas ações, nesse ponto nada fora do padrão.

### Sobre @RepositoryRestSource

Na prática, o que  Spring fez aqui, é que permite que você exponha os seus endpoints por meio das suas interfaces (repositórios) são geralmente chamadas GET/POST/PUT e outros verbos HTTP para manipular a sua entidade. Uma das vantagens dessa annotation é que dispensa a necessidade de criar a camada de serviço e controladores. Uma das vantagens é que será criado seguindo a restrição HATEOAS, onde os clientes poderão facilmente consumir a sua API.

Ao anotar a nossa interface de repositório com @RepositoryRestResource , precisamos informar mais dois parâmetros, sendo eles : 

A) Path : Indica qual o recurso importado, no nosso exemplo corresponderá ao path da aplicação, no nosso cenário/cliente

### Exemplo prático

O modelo criado é referenciado como CustomerRepository e Customer, onde o CustomerRepository é composto por uma interface usando a annotation @RepositoryRestResource, conforme o exemplo abaixo:

<script src="https://gist.github.com/httpmurilo/112ad35ce6ab5ddb869eacbb6bcafc73.js"></script>

A classe Customer representa o nosso modelo de negócio.

<script src="https://gist.github.com/httpmurilo/8e111550c19541e641ad6e9c57191607.js"></script>

Ao subir a aplicação e acessar o path `localhost:8080/customer` nos deparamos com o seguinte retorno:

<script src="https://gist.github.com/httpmurilo/f6384c323a45cd978a05a20d7d027091.js"></script>


E voilà em questão de minutos montamos a nossa API seguindo o padrão HATEOAS seguindo uma série de especificações, como, por exemplo a RFC 5988 que define como os links deverão ser implementados.

Podemos confirmar o funcionamento de alguns endpoints pelos testes de integração abaixo:

<script src="https://gist.github.com/httpmurilo/43165e9b53292171def2aa7013e91b63.js"></script>

Usar essa categoria de abordagem possui uma série de benefícios para quem for utilizá-la, onde com poucas linhas de códigos poderá criar uma API, evita o trabalho de criar a camada de serviços e controladores além de permitir o desenvolvimento de testes de integração. Algumas desvantagens do uso dessa annotation é a falta de controle sobre a criação/retorno de status codes e headers.

### Encerramento

Foi apresentado a annotation RepositoryRestResource, ela fornece a oportunidade de expormos facilmente os nossos endpoints usando somente a camada de repositório, evitando a criação dos Controllers. Você poderá avaliar o seu uso nos seus projetos para otimizar tempo e trabalho na criação de APIs.

Ps. Ela é importada do pacote `spring-boot-starter-data-rest`.

### Código fonte 

O código fonte está disponibilizado [aqui](https://github.com/httpmurilo/artigo-repository-rest-resource).