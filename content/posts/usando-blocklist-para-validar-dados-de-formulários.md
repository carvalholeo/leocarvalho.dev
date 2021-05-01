---
title: Usando blocklist para validar dados de formulários
date: 2021-04-30T23:58:55.027Z
categories:
  - Tutorial
  - Código
  - Javascript
tags:
  - exemplo
  - blocklist
  - palavrão
  - validação
keywords:
  - lista
  - bloqueio
  - blocklist
  - validar
  - regex
  - array
autoThumbnailImage: false
thumbnailImagePosition: top
thumbnailImage: /images/uploads/proibido.png
coverImage: ""
---
Ao receber dados de formulários, sempre precisamos fazer validações, dos mais variados tipos:

* Tamanho mínimo
* Tamanho máximo
* Campo vazio
* Campo obrigatório
* Tipos dos dados

Muitas vezes, podemos querer realizar algum tipo de validação, também, de termos digitados nos campos dos formulários.

Vamos pensar num formulário que recebe um nome de usuário para cadastrar no sistema. Você pode querer impedir que o usuário se cadastre como "root", "admin", "super", "superuser". Também poder ter uma lista de palavras impróprias, que você não queira que sejam os nomes de usuários do sistema.

Então, o que fazer?

É sempre bom lembrar: validações devem ser feitas no front e no backend. Sempre.

## Construindo a lógica

Vamos começar construindo uma função, que recebe o valor a ser analisado e retorna um booleano.

```javascript
function textoEstaPermitido (texto) {
  const blocklist = [
    'admin',
    'root',
    'super',
    'superuser',
    'user',
    'manager',
    'gerente',
    'ceo',
    'outros nomes aqui'
  ];
  
  return !blocklist
    .includes(texto.toLowerCase());
}

```

Qual é a ideia aqui? Fazer uma pesquisa em um array de palavras bloqueadas e dizer se o texto passado como parâmetro da função é permitido ou não. Isso é feito por meio do método `includes` de Array, que retorna `true` se o valor está permitido e `false` se o valor está bloqueado, por meio da negação do resultado no `return`.

Então, bastaria chamar a função para cada um dos campos que você quer validar e fazer um `if`, para confirmar se o texto está liberado ou não.

```javascript
// seu código

const estaValido = textoEstaPermitido('nome completo');

if (!estaValido) {
  alert('O nome digitado não é aceito pelo sistema');
  return;
}

```

Assim, a validação estaria completada e o nosso trabalho concluído, certo? Errado.

## Campos com espaços

Para os casos em que o usuário colocar um texto, a técnica acima não vai funcionar. Isso porque nossa função está procurando pro uma palavra em específico. Então, se o usuário colocar um espaço no antes, durante ou depois, a função acima não vai pegar. Pra resolver isso, vamos fazer algumas alterações.

```javascript
function textoEstaPermitido (texto) {
  const blocklist = [
    'admin',
    'root',
    'super',
    'superuser',
    'user',
    'manager',
    'gerente',
    'ceo',
    'outros nomes aqui'
  ];
  
  const regex = new RegExp(' ', 'g');
  
  const textoParaArray = texto
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(palavra => palavra !== '' || !regex.test(palavra));
  
  return !blocklist
    .map(bloqueada => textoParaArray.includes(bloqueada))
    .includes(true);
}

```

Vamos por partes.

A constante `textoParaArray` recebe a execução de vários métodos sobre a string original, e o retorno de cada um, serve de insumo para o próximo método.

1. O método `trim()` é um método de String e serve pra tirar os espaços no começo e no fim dela.
2. O resultado disso, é jogado para o próximo método, o `toLowerCase`, vai transformar toda a string em minúsculo. Isso é necessário pra garantir que a comparação do `includes` aconteça corretamente e sem ele, se o usuário colocar qualquer caractere em maiúsculo, a nossa lista deixa de ser efetiva e ele burla o bloqueio.

   * Esses dois métodos precisam vir primeiro, pois vamos trabalhar primeiro com a string que passado para a função
3. Logo em seguida, transformamos a string em array, através do método `split`. Isso acontece com porque separamos cada string por um, e somente um, único espaço.
4. Por fim, usamos o filter para criar um array somente com palavras, retirando os espaços a mais entre as palavras e que tenham se transformado em uma string separada no array.

A seguir, no `return`, fazemos uma pequena alteração. Como agora transformamos em uma array, vamos executar o método `map`, para ele passar por cada um dos itens da lista de bloqueio e usar cada uma das palavras como fonte de entrada para o método `includes` da constante `textoParaArray`. Isso vai retornar um array de `true` ou `false`. Por fim, executamos o método `includes`, usando como argumento o `true`, para verificar se alguma palavra bloqueada foi encontrada no `textoParaArray`.

O `return` vai negar o retorno, ou seja: se o usuário passar um texto válido, o `includes` vai retornar `false`, o que significa que o texto é válido e a resposta para o ponto de chamada da função é `true`.

## "Ai que burro, é mais fácil de fazer isso com Regex"

De fato, o uso de Expressões Regulares poderia reduzir esse código. Poderíamos, inclusive, verificar se a palavra está no meio do texto, ao invés de procurar pela palavra inteira (muito comum quando tentam burlar esse esquema de bloqueio, como, por exemplo, em sistemas de comentários).

Por exemplo, para fins **DIDÁTICOS**, consideremos que, por algum motivo, o nome do ex-presidente Lula estivesse bloqueado. Uma pessoa que quisesse burlar, poderia colocar nos comentários, ao invés de "Lula", os termos "Lulaa", "LLula" ou outras variações pejorativas. O uso do Regex poderia contornar isso e pegar os termos bloqueados de toda forma.

Mas isso também tem um ônus: bloquear palavras legítimas que tenham um fragmento do termo. Por exemplo, se entre as palavras bloqueadas, você tiver o termo "c*" (sim, o palavrão que se refere ao ânus), com alguma variação. Se a pessoa colocar no comentário os termos "cueca", "cuíca" ou "cuscuz", eles serão considerados impróprios e o texto será bloqueado, já que elas contêm o termo bloqueado (no caso de "cuscuz", aparece duas vezes).

Por isso, essa técnica deve ser usada com cuidado, para não haver efeitos colaterais indesejados.

## Conclusão

Durante esse texto, desconsiderei propositalmente complexidade de algoritmo e a Big O Notation. Sim, eu sei que do jeito que está atualmente, ter uma grande lista de bloqueios ou um texto muito grande a ser testado pode gerar fazer com que o sistema gaste muitos recursos computacionais e isso pode ser melhorado.

A ideia aqui foi de mostrar como podemos trabalhar com listas de bloqueio de termos no sistema, testando uma string pequena contra essa lista.

Então, agora quero saber, o que você achou? Onde esse código poderia melhorar? Deixa aqui nos comentários!