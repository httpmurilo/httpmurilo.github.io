---
layout: post
title:  "Vulnerabilidade de injection de SQL no Spring"
author: murilo
categories: [ springboot, owasp ]
image: assets/images/sql-injection.png
featured: true
hidden: true
---
Entre as várias ameaças à segurança, a injeção de consultas emerge como uma das vulnerabilidades mais comuns e perigosas enfrentadas por sistemas online. Neste artigo, exploraremos em detalhes a vulnerabilidade de injeção de consultas, com foco especial em como ela afeta aplicações desenvolvidas com o framework Spring.

Começaremos definindo o que é a injeção de consultas e como ela pode ser explorada por invasores para comprometer a integridade e a segurança dos dados de uma aplicação. Em seguida, examinaremos diferentes cenários de injeção de consultas em interfaces e consultas anotadas com @Query e nativeQuery = true em aplicações Spring.

Além disso, discutiremos as melhores práticas para prevenir e mitigar essas vulnerabilidades, destacando o uso de consultas parametrizadas, frameworks de segurança e outras técnicas de proteção.

Disclaimer: Artigo foi criado e adaptado com base na cartilha OWASP Top 10 - 2017 The Ten Most Critical Web Application Security Risks, a consulta original pode ser feita [aqui](https://owasp.org/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf).

### Sobre a vulnerabilidade

A documentação original menciona que As falhas de injeção, como injeção de SQL, NoSQL, SO e LDAP, ocorrem quando dados não confiáveis são enviados a um intérprete como parte de um comando ou consulta. Esse conceito se aplica a uma ampla variedade de sistemas e tecnologias, incluindo bancos de dados relacionais, bancos de dados NoSQL, sistemas operacionais e serviços de diretório LDAP.

Vamos decorrer um pouco sobre o tema: as vulnerabilidades de injeções representam uma ameaça significativa em sistemas web e aplicativos, especialmente aqueles que interagem com bancos de dados. Essas falhas ocorrem quando os dados fornecidos pelo usuário são inseridos diretamente em uma consulta ou comando executado por um sistema. Isso pode acontecer em vários contextos, como a construção de uma consulta SQL dinâmica, a montagem de uma string de comandos em um sistema operacional, ou até mesmo a criação de uma consulta LDAP.

O perigo reside no fato de que, se os dados do usuário não forem adequadamente tratados ou sanitizados, um invasor pode manipulá-los de forma maliciosa, inserindo caracteres especiais ou instruções que alteram o comportamento esperado do sistema. Isso pode levar a uma variedade de ataques, desde a recuperação não autorizada de informações confidenciais até a execução de comandos indesejados no sistema.

É importante ressaltar que essas vulnerabilidades são especialmente prevalentes em cenários onde há concatenação de strings para formar consultas ou comandos. Esse método de construção de consultas é propenso a erros devido à natureza dinâmica e imprevisível dos dados fornecidos pelos usuários.

Ao entender as vulnerabilidades de injeção de consultas e os riscos associados, os desenvolvedores podem adotar práticas seguras de codificação e implementar medidas de segurança adequadas para proteger seus sistemas contra essas ameaças.


### Exemplo prático

Para este exemplo, vamos imaginar uma API usando Spring Boot onde ela recebe um objeto por meio do corpo da requisição. A classe abaixo representa a nosso controlador.

<script src="https://gist.github.com/httpmurilo/e7f29bfb97a7284b8ed1cc6fbec000be.js"></script>


Temos uma classe que representa a entidade do banco de dados, a classe `User` contém algumas propriedades que facilmente podemos achar em ambientes de produção, pré-prod, homologação e assim por diante.

<script src="https://gist.github.com/httpmurilo/85efcca52da7953b48a8f1f7046dbc75.js"></script>

No repositório, temos a seguinte lógica, onde recebemos o nome do usuário e realizamos a busca, a consulta foi montada em JHQL, nela incluímos uma concatenação desnecessária, o uso das `''` não é necessário pois o JPA consegue interpretar o valor `?1`:

<script src="https://gist.github.com/httpmurilo/f37551991cae80fb6479312c833ac470.js"></script>

Atualmente as informações são obtidas conforme request `http://localhost:8080/api/user/search?name=Pedro`, onde o critério de busca vem por meio da QueryString.

Paralelamente, foi criado um console application onde injetará mais de mil string maliciosas:

<script src="https://gist.github.com/httpmurilo/e744e3b096d695e92c4253b33830d882.js"></script>

Após o teste de estresse, as consultas montadas mantiveram o padrão, de forma nativa o spring conseguiu sanitizar todos os ataques.

`Hibernate:
    /* dynamic native SQL query */ SELECT
        *
    FROM
        User
    WHERE
        name = '?1'
`

Vamos trocar uma ideia sobre esse comportamento;

- Por padrão, o `tomcat-embed-core` já bloqueia cenários mínimos de ataques, com a mensagem `Invalid character found in the HTTP protocol [' ]`.

- Ao usar o JpaRepository, as consultas são tratadas automaticamente para evitar vulnerabilidades de injeção de SQL. Significando que as consultas são parametrizadas por padrão.

Em outras palavras, isso significa que os parâmetros são tratados separadamente da consulta SQL e não são concatenados diretamente na consulta. Assim protege contra a maioria dos ataques de injeção de SQL, pois os valores dos parâmetros não são interpretados como parte do comando SQL. A partir do momento que usamos ela, o Spring Data JPA já realiza esse tratamento para nós.

- O tratamento automático introduziu essas funcionalidades de segurança desde suas primeiras versões, e desde então vem se aprimorando vide os bugs aberto pela comunidade (`https://spring.io/security/cve-2016-6652`).

- Sobre o uso do @RequestParam no controladores Spring, ao não adotá-lo, a request vai bater no repositório como `'="or'`. A partir do momento que adotar o seu uso, o comportamento é o mesmo. Como uma alternativa, pode ser usado `StringEscapeUtils.escapeSql()` do pacote `Apache Commons Lang`. Pode ser consultado em [commons-lang3](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3).

- Sobre o uso do @Param em consultas JPA, honestamente, se voltarmos para o início da lista, veremos que ele não é obrigatório/necessário, creio que o uso dele visá tornar o código mais legível ou para manter uma consistência entre os diferentes métodos de consulta, fica a gosto do cliente o seu uso.

### Encerramento

A injeção de consultas, como a injeção de SQL, representa uma ameaça significativa à segurança das aplicações web. Essas falhas ocorrem quando dados não confiáveis são inseridos em um sistema e interpretados como parte de um comando ou consulta. Isso pode levar a ações não intencionadas, como acesso não autorizado a dados ou até mesmo corrupção de dados.

No contexto do Spring Data JPA, descobrimos que o tratamento automático de consultas introduzido desde suas primeiras versões protege efetivamente contra a maioria dos ataques de injeção de SQL. Consultas parametrizadas são usadas por padrão, o que separa os parâmetros da consulta SQL e evita a interpretação de dados de entrada como parte do comando SQL.

Em resumo, é crucial estar ciente das vulnerabilidades de injeção de consultas e implementar medidas adequadas para mitigar esses riscos, garantindo assim a segurança e integridade de suas aplicações web.


### Código fonte 

O código fonte está disponibilizado [aqui](https://github.com/httpmurilo/basic-injection-example).

A lista de sql injection pode ser consulta [aqui](https://gist.github.com/httpmurilo/4579669be1d2e562eb82a0b7e0fd8424), deixando claro os seus créditos aos autores [swissky](https://swisskyrepo.github.io/PayloadsAllTheThingsWeb/SQL%20Injection/) e [payloadbox](https://github.com/payloadbox).