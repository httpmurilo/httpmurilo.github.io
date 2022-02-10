---
layout: post
title:  "Map Struct - Criando objetos DTOs de forma mais elegante"
author: murilo
categories: [ springboot, mapstruct, dto ]
image: assets/images/map-struct.png
featured: true
hidden: true
---
Neste artigo será apresentado a biblioteca Map Struct que permite criar objetos dtos e serializa-los de forma mais elegante, simples e prática.

Data Transfer Object, comumente conhecido como DTO é um padrão de projetos muito utilizado em várias linguagens de programação. É destinado para o transporte de dados entre diferentes camadas do sistema. A proposta é possuir uma classe mais simples e leve para melhorar a comunicação e otimizar o processamento.

### Sobre sua aplicabilidade

O padrão DTO, resolver vários problemas, um deles, é onde possuimos o cadastro de uma entidade, mas algumas informações não necessariamente são obrigatórias ou necessárias, nesse caso, podemos criar uma classe secundário, onde tenha os campos necessários e depois realizarmos a conversão/mapeamento para a entidade. Se procurarmos algum exemplo especificamente com Java, nos deparamos com os seguintes exemplos. Onde possuimos uma classe DTO e dentro dela, temos um construtor fazendo o de-para.

### Exemplo prático

Para este exemplo, vamos imaginar que possuimos uma tela de um sistema de cadastro de usuários, no módulo de cadastro de usuário algumas campos não são obrigatório no envio do cadastro. A classe abaixo representa a entidade User.

<script src="https://gist.github.com/httpmurilo/3a35ab40250072200914639e81b58498.js"></script>


Contudo, o sistema não necessita que no momento de criação seja informado uma ID e se o usuário está ativo ou não, para isso criamos um DTO, um objeto mais simples para representar o nosso cadastro. A classe abaixo representa o nosso UserDTO.

<script src="https://gist.github.com/httpmurilo/3e8ccddff78e2e0694d4152d743fd649.js"></script>

Bom, na teoria, o nosso DTO está funcional e atendendo a necessidade de cadastro de usuários, mas em uma ensolarada manhã, a necessidade do cliente muda e o Product Owner chega na sua mesa informando que nesta tela, onde possuimos o cadastro de usuário torna-se necessário informar mais informações do cliente, como número do pedido, cidade e estado.

Agora temos um cenário onde toda e qualquer alteração precisamos incrementar o nosso construtor `UserDTO convertToUser(User user)`. Nesse cenário, temos 6 propriedades até nesse ponto OK. Mas se levarmos em consideração, a tendência do software de ir mudando a necessidade da tela de cadastro de usuário ficará muito inviável manter esse construtor, pois ele não irá parar de crescer ferido o princípio SOLID Open-closed principle, onde define que uma entidade deverá está aberta para extensão, mas fechada para modificação.

<script src="https://gist.github.com/httpmurilo/d296cc8f2f539541798aeb4ac827df40.js"></script>

Nessa parte que entra a lib `MapStruct`, a proposta dela é simplificar a implementação de mapeamento entre tipos. É rápido, seguro e fácil de implementar e entender. A utilização e serialização de DTO/Entidades é simplificado com o uso dessa dependência.

Para iniciar a implementação, é necessário importá-lo ao projeto na [documentação oficial](https://mapstruct.org/documentation/installation/) é demostrado essa inclusão;

```properties
dependencies {
    ...
    implementation 'org.mapstruct:mapstruct:1.4.2.Final'
 
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.4.2.Final'
}

```

Uma abordagem que particulamente eu curto é a utilização de `static factory method` juntamente com uma classe `abstract`, onde a conversão ficaria da seguinte forma;

<script src="https://gist.github.com/httpmurilo/8d651463987e9cf73daf19af9940e8c1.js"></script>

Assim a nossa classe de serviço terá uma única instância do Mapper e a leitura fica bem mais agradável;

<script src="https://gist.github.com/httpmurilo/32b134fef6e8a29565dd8aee76720c5d.js"></script>

Essa implementação pode ser utilizada em várias camadas e tornará esse tipo de conversão muito fácil.

### Encerramento

Foi apresentado a utilização do `MapStruct` para mapeamento de DTOs juntamente com o uso de `static factory method`. Com essa abordagem, se surgir a necessidade de aumentar as propriedades da nossa tela de cadastro basta incluir as propriedades nas classes `User` e `UserDTO`. O construtor que poderia se tornar um godzilla já não existe nessa implementação. Ficando mais limpa e prática.

Na sequência, abordaremos um comparativo entre `MapStruct` e a biblioteca `ModelMapper`.

### Código fonte 

O código fonte está disponibilizado [aqui](https://github.com/httpmurilo/basic-map-struct).