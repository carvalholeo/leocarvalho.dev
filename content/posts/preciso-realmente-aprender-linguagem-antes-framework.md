---
title: Eu realmente preciso aprender a linguagem antes do framework?
date: 2020-02-16T00:00:00Z
categories:
  - Por onde começar
tags:
  - programacao
  - dicas
  - iniciantes
  - linguagens
  - frameworks
thumbnailImage: /images/uploads/planta.webp
---
## Introdução

Por vezes, no grupo da faculdade ou outras comunidades, me deparo com a pergunta: “*Devo começar aprendendo o framework A ou B?*”. Quase sempre, minha resposta é: “*Quanto você sabe da linguagem base do framework?*”. E também, quase sempre, a resposta é “pouco” ou “quase nada”. Entender isso é a diferença entre começar a construir uma casa pelo telhado ou pela fundação. *(Spoiler:* usarei *essa analogia durante todo o texto. **Analogia is my passion**)*.

Na maior parte das vezes, nós queremos construir programas e sites em uma velocidade extremamente rápida, para entregá-los também rapidamente, para gerar valor para o cliente e nos trazer o retorno financeiro que queremos. Isso é extremamente válido, não me interprete mal. O ponto que trago é: como você saberá se está fazendo algo certo, se não sabe como é o “certo”? Como saber se esse “certo” é o jeito mais atual da linguagem ou o melhor caminho para não haver gargalos na sua aplicação?

Para este artigo, utilizarei como exemplo o [PHP](https://www.php.net/), linguagem que eu mais domino e tenho mais intimidade (enquanto escrevo este artigo, nunca sabemos do futuro). No entanto, os conceitos que mostrarei se aplicam a todas as outras linguagens de programação.

## A lógica por trás de tudo

Comecemos por onde todos em programação deveriam começar: lógica de programação. Não importa se você aprenderá através de [fluxogramas](https://pt.wikipedia.org/wiki/Fluxograma), [Portugol](http://lite.acad.univali.br/portugol/) ou [VisualG](http://visualg3.com.br/), você PRECISA saber lógica, obrigatoriamente. Não é necessário ser um expert em matemática, como muitas pessoas pensam que nós, pessoas desenvolvedoras somos. Mas precisamos, sim, saber lógica. Pensar como dar ordens ao computador, de forma que ele nos entenda e consiga resolver aqueles problemas passados. Estruturar ideias de um jeito que tenham começo, meio e fim para a máquina.

Sem ela, seus programas poderão não funcionar da forma que se espera e você, muito provavelmente, estará fadado a viver perguntando nos fóruns o motivo de uma variável `string` não estar funcionando como `int`. Tipos, para ficar em apenas um ponto, faz parte das bases de todas as linguagens e deveria estar na mente de qualquer pessoa desenvolvedora. Se você está iniciando, aprenda isso o quanto antes. É imperativo! Não que você vá programar nas linguagens acima, elas são apenas um estímulo para você entender como a programação com códigos reais funcionam.

Abuse de exemplos e de testes de lógica no [pseudocódigo](https://pt.wikipedia.org/wiki/Pseudoc%C3%B3digo). Quanto mais você praticar, mais conseguirá criar programas reais, que resolvem problemas da realidade. Aliás, desde já saiba: desenvolvedores são resolvedores de problemas. Pegamos problemas que alguém já desistiu de resolver manualmente e automatizamos a solução, usando código. *Coffee in, code out*.

Agora imagine, usando a analogia que dei anteriormente, que o pseudocódigo seja a planta de uma casa. Você até pode construir o imóvel sem a planta baixa. Eu já morei em casas construídas assim. Mas, dificilmente você conseguirá alcançar o melhor do terreno, uso de materiais e solo, além de poder cometer erros graves de engenharia, tentando reinventar a roda em coisas que já foram resolvidas e poderiam ser utilizadas, se você tivesse conhecimento da base da construção civil.

## Paradigmas são paredes

Agora tenha em mente os códigos usados em produção. Pense neles como a fundação e as paredes da casa. Construir código loucamente não é o suficiente, você também precisa dos paradigmas de programação (podemos dizer que seriam como as colunas e vigas de sustentação). São eles que darão sustentação para que seu código funcione. Você pode escolher entre vários tipos e até mesmo combinar os paradigmas diferentes, só não conseguirá construir um código sem um.

Todos nós sempre começamos com o [paradigma estruturado](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_estruturada), com variáveis globais que podem ser alteradas em qualquer lugar do código. Depois, podemos ir para a [Programação Orientada a Objetos](https://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos), [Programação Funcional](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional) ou [algum outro paradigma](https://pt.wikipedia.org/wiki/Paradigma_de_programa%C3%A7%C3%A3o). De qualquer forma, você acabará trabalhando com um deles, se não por interesse pessoal, por imposição da linguagem/framework.

Você consegue imaginar uma casa sem essas colunas ou ferragens de sustentação? Eu também não. Certamente cairiam nos dias de chuva e vento forte.

## Infraestrutura da casa (ou do código?)

Pensemos nas ligações de água e esgoto, eletricidade e comunicações dessa casa. Não tenho dúvidas que a empresa fornecedora desses serviços não sabe como é realizada a ligação interna, apenas entrega o serviço próximo ao seu portão e dali para dentro, é SUA responsabilidade fazer chegar nos lugares desejados.

Posso dizer que a comunicação com o banco de dados também é assim. O banco não deve saber como mostrar os dados armazenados na tela para o usuário, isso é responsabilidade sua. Não importa o quanto você queira, o banco não precisa saber disso. É como se a companhia de água olhasse para a torneira da sua casa e dissesse: “essa torneira não está nos nossos padrões, por isso não forneceremos água para você”.

Aqui começam a entrar os [ORMs](https://pt.wikipedia.org/wiki/Mapeamento_objeto-relacional), que são uma camada de abstração para acesso ao banco de dados. Na sua casa, não importa se a energia da tomada está vindo de uma fonte solar ou da concessionária: apenas que tem energia com tensão e corrente suficientes. O mesmo se aplica aos bancos de dados; sua aplicação deve ser agnóstica de banco de dados (não só o banco de dados, como quaisquer serviços externos, como logs, cache, mensageria, etc), de forma que se você precisar trocar o provedor, não impactará o usuário ou mesmo sua aplicação no geral. Mas isso é assunto para outro [artigo desse blog](https://leocarvalho.dev/posts/orm-melhorando-consultas-ao-db/).

## Conclusão

Observe a quantidade de coisas de base que falei, sem mencionar outras coisas, como [memória RAM](https://pt.wikipedia.org/wiki/Mem%C3%B3ria_(inform%C3%A1tica)), [Design Patterns](https://pt.wikipedia.org/wiki/Padr%C3%A3o_de_projeto_de_software), princípios do [SOLID](https://pt.wikipedia.org/wiki/SOLID), [algoritmos de busca, seleção e ordenação](https://pt.wikipedia.org/wiki/Algoritmo_de_busca), [estruturas de dados](http://calhau.dca.fee.unicamp.br/wiki/images/0/01/EstruturasDados.pdf)... Essas são coisas que, muito provavelmente, estão abstraídas no framework que você quer aprender, mas essenciais para seu aprendizado e para que seu sistema não seja refém do desenvolvedor do framework. Não digo que conheço tudo isso, mas diariamente procuro me atualizar e conhecer essas bases. Dito isso, não recomendo à ninguém estudar coisas avançadas sem conhecer as básicas.

“*Mas Léo, onde posso conseguir a planta baixa para o meu conhecimento?*”

Há um site muito legal com diversas “plantas” que vão dar um caminho de pedras para caminhar. Se chama [roadmap.sh](https://roadmap.sh/) e pode te dar uma visão do que estudar e qual a sequência, dependendo do caminho que você quer seguir em desenvolvimento de software.

### Analogia final

Se seu conhecimento fosse essa construção, certamente você não teria muito sucesso em começar a construção pelo telhado antes das paredes ou em colocar fiação elétrica e encanamento primeiro e a fundação depois.

Pode ser que você consiga tudo isso, desse jeito. Com certeza, não é o mais fácil.

### Analogia final 2

Se aprender a linguagem e suas bases é como construir uma casa do zero, então os frameworks, que tem muitos conceitos que citei abstraídos, podem ser comparados a uma construção pré-moldada, onde, como num [Lego](https://pt.wikipedia.org/wiki/Lego), você encaixa os blocos que quer usar e brincar, apenas alterando o formato e a posição das paredes/peças.

- - -

E então, qual sua opinião? Deixa aqui nos comentários e vamos debater esse assunto!