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
function textoEstaPermitido (nome) {
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
  
  const textoImproprio = blocklist
    .includes(nome)
    .find(elemento => elemento)
  
  return textoImproprio ? true : false;
}
```