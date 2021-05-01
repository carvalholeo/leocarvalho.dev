---
title: Usando blocklist para validar dados de formulários
date: 2021-04-30T23:58:55.027Z
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

Vamos pensar num formulário que precisa recebe um nome de usuário para cadastrar no sistema. Você pode querer impedir que o usuário se cadastre como "root", "admin", "super", "superuser". Também poder ter uma lista de palavras impróprias, que você não queira que sejam os nomes de usuários do sistema.

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
    .includes(texto);
}
```

Qual é a ideia aqui? Fazer uma pesquisa em um array de palavras bloqueadas e dizer se o texto passado como parâmetro da função é permitido ou não. Isso é feito por meio do método `includes` de Array, que retorna `true `se o valor está permitido e `false `se o valor está bloqueado, por meio da negação do resultado no `return`.

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