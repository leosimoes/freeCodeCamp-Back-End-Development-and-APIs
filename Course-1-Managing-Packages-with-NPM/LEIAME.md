# freeCodeCamp - Gerenciamento de pacotes com o NPM

O npm (Node Package Manager) é uma ferramenta de linha de comando para instalar, criar e compartilhar pacotes 
de código JavaScript escritos para Node.js. Há muitos pacotes de código aberto disponíveis no npm. 
Então, antes de iniciar um projeto, explore os pacotes que já existem para que você não acabe recriando do zero coisas 
como trabalhar com datas ou buscar dados de uma API.

Neste curso, você aprenderá o básico sobre como usar o npm, incluindo como trabalhar com o package.json e como 
gerenciar suas dependências instaladas.


## Utilizar o package.json, o centro de qualquer projeto do Node.js ou pacote npm
O arquivo `package.json` é o centro de qualquer projeto do Node.js ou pacote do npm. 
Ele armazena informações sobre seu projeto, de modo semelhante ao que a seção head de um documento HTML usa para 
descrever o conteúdo de uma página da web. 
Ele consiste em um único objeto JSON, onde as informações são armazenadas em pares de chave-valor. 
Existem apenas dois campos obrigatórios: name e version. 
Porém, é uma boa prática fornecer informações adicionais sobre o seu projeto que possam ser úteis para futuros usuários
ou mantenedores.

Se você olhar a árvore de arquivos do projeto, você encontrará o arquivo package.json no nível superior da árvore. 
Este é o arquivo que você vai melhorar nos próximos desafios.

Uma das informações mais comuns neste arquivo é o campo author. Especifica quem criou o projeto e pode consistir em uma 
string ou um objeto com detalhes de contato ou outros. 
Um objeto é recomendado para projetos maiores, mas uma string simples como o exemplo a seguir já servirá para este 
projeto. `"author": "Jane Doe",`

**Adicione seu nome como o author do projeto no arquivo package.json.**

Observação: lembre-se de que você está escrevendo JSON. 
Então, todos os nomes de campos devem usar aspas duplas (") e ser separados por uma vírgula (,).
```json
{
  "name": "fcc-learn-npm-package-json",
  "version": "1.0.0",
  "author": "Leonardo Simões"
}
```

Testes:
- O package.json deve ter uma chave "author" válida


## Adicionar uma descrição ao package.json
A próxima parte de um bom arquivo package.json é o campo description. 
É aqui que você deve colocar uma descrição curta, mas informativa, do projeto.

Se você planeja publicar um pacote no npm, esta é a string que deve vender a ideia ao usuário para que ele decida se 
deseja instalar o pacote ou não. No entanto, esse não é o único caso de uso para a descrição. 
Ela é uma ótima maneira de resumir o que um projeto faz. 
Também é importante, em qualquer projeto do Node.js, ajudar outros desenvolvedores, futuros mantenedores ou, até mesmo, 
seu futuro eu a entender rapidamente o projeto.

Independentemente do que você planeja para seu projeto, uma descrição é definitivamente recomendada. 
Exemplo: `"description": "A project that does something awesome",`

**Adicione uma description ao arquivo package.json do projeto.**

Observação: lembre-se de usar aspas duplas para nomes de campo (") e vírgulas (,) para separar os campos.
```json
{
  "description": "freeCodeCamp Project - Package Management with NPM"
}
```

Testes:
- O package.json deve ter uma chave "description" válida


## Adicionar palavras-chave ao seu package.json
O campo `keywords` é onde você pode descrever seu projeto usando palavras-chave relacionadas. 
Exemplo: `"keywords": [ "descriptive", "related", "words" ]`,
Como você pode ver, este campo está estruturado como um array de frases cercadas por aspas duplas.

**Adicione uma array de strings adequadas para o campo keywords no arquivo package.json do seu projeto.**

Uma das palavras-chave deve ser "freecodecamp".
```json
{
  "keywords": ["freecodecamp", "nodejs", "npm"]
}
```

Testes:
- package.json deve ter uma chave "keywords" válida
- O campo "keywords" deve ser um array
- O campo "keywords" devem incluir "freecodecamp"


## Adicionar uma licença ao package.json
O campo `license` é onde você informa aos usuários o que eles têm permissão para fazer com o seu projeto.

Algumas licenças comuns para projetos de código aberto incluem a MIT e a BSD. 
Informações de licença não são necessárias. 
As leis de direitos autorais na maioria dos países lhe darão a propriedade do que você criou por padrão. 
No entanto, é sempre uma boa prática indicar explicitamente o que os usuários podem e não podem fazer. 
Aqui está um exemplo do campo license: `"license": "MIT",`

**Preencha o campo `license` no arquivo package.json do seu projeto conforme achar adequado.**
```json
{
  "license": "MIT"
}
```

Testes:
- O package.json deve ter uma chave "license" válida


## Adicionar uma versão ao package.json
Um dos campos obrigatórios do seu arquivo package.json é o version.
Este campo descreve a versão atual do seu projeto. 
Exemplo: `"version": "1.2.0",`

**Adicione uma version ao arquivo package.json do projeto.**
```json
{
  "version": "1.0.0"
}
```

Testes:
- O package.json deve ter uma chave "version" válida


## Expandir seu projeto com pacotes externos do npm
Uma das maiores razões para usar um gerenciador de pacotes é a sua poderosa gestão de dependências. 
Em vez de ter que garantir manualmente que tem todas as dependências sempre que você configurar um projeto em um novo 
computador, o npm instala tudo automaticamente para você. 
Mas como o npm pode saber exatamente de que seu projeto precisa? 
Conheça a seção dependencies do seu arquivo package.json.

Nesta seção, pacotes de que seu projeto necessita são armazenados usando o seguinte formato:
```json
{
  "dependencies": {
    "package-name": "version",
    "express": "4.14.0"
  }
}
```

**Adicione a versão 1.1.0 do pacote @freecodecamp/example ao campo dependencies do arquivo package.json.**

Observação: @freecodecamp/example é um pacote falso usado como ferramenta de aprendizagem.
```json
{
  "dependencies" : {
    "@freecodecamp/example": "1.1.0"
  }
}
```

Testes:
- "dependencies" deve incluir "@freecodecamp/example".
- A versão de "@freecodecamp/example" deve ser a "1.1.0".


## Gerenciar dependências do npm entendendo o versionamento semântico
As Versions (versões) dos pacotes do npm na seção de dependências do seu arquivo package.json seguem o que chamamos de 
Semantic Versioning (SemVer), um padrão do setor para versionamento de software, com o objetivo de facilitar o 
gerenciamento de dependências. 

Bibliotecas, frameworks ou outras ferramentas publicadas no npm devem usar o SemVer para comunicar claramente que tipo 
de mudanças os projetos podem esperar caso eles atualizem.

Conhecer o SemVer pode ser útil quando você desenvolve um software que usa dependências externas (algo que você faz 
quase sempre). 
Um dia, seu entendimento desses números vai evitar que você introduza acidentalmente alterações que causem problemas 
em seu projeto, sem compreender por que as coisas que funcionaram ontem, de repente, não funcionam hoje. 

É assim que o Versionamento Semântico funciona de acordo com o site oficial: `"package": "MAJOR.MINOR.PATCH"`
- A versão MAJOR (principal) deve incrementar quando você fizer alterações incompatíveis na API. 
- A versão MINOR (secundária) deve incrementar quando adicionar funcionalidades retrocompatíveis.
- A versão PATCH deve incrementar quando você fizer consertos de bugs retrocompatíveis. 
Isso significa que PATCHes são correções de bugs e MINORs adicionam novas funcionalidades, 
mas nenhum deles quebra o que funcionava antes. Por fim, as MAJORs adicionam alterações que não funcionarão com 
versões anteriores.

**Na seção de dependências do arquivo package.json, altere a versão de @freecodecamp/example para que corresponda à 
versão MAJOR 1, à versão MINOR 2 e à versão PATCH 13.**
```json
{
  "version": "1.2.13"
}
```

Testes:
- "dependencies" deve incluir "@freecodecamp/example".
- A versão de "@freecodecamp/example" deve ser a "1.2.13".


## Usar o til para usar sempre a última versão de patch de uma dependência
No último desafio, você disse ao npm para incluir apenas uma versão específica de um pacote. 
Essa é uma maneira útil de congelar suas dependências, caso você precise garantir que diferentes partes do seu projeto 
permaneçam compatíveis entre si. 

Mas, na maioria dos casos de uso, você não quer perder as correções de erros, já que elas geralmente incluem correções 
de segurança importantes e (esperamos que) não quebrem nada ao fazer isso.

Para permitir que uma dependência do npm atualize para a última versão de PATCH, você pode prefixar a versão da 
dependência com o caractere de til (~). Aqui está um exemplo de como permitir atualizações para qualquer versão 1.3.x.
`"package": "~1.3.8"`

No arquivo package.json, a regra atual de como o npm pode atualizar @freecodecamp/example é usar uma versão específica 
(1.2.13). Mas agora, você deseja permitir a última versão de 1.2.x.

**Use o til (~) para prefixar a versão de @freecodecamp/example nas dependências e permitir que o npm atualize o pacote 
para qualquer nova versão patch.**

Observação: os números da versão em si não devem ser alterados.

```json
{
  "version": "~1.2.13"
}
```

Testes
- "dependencies" deve incluir "@freecodecamp/example".
- A versão de "@freecodecamp/example" deve corresponder a "~1.2.13".


## Usar o circunflexo para usar a última versão secundária de uma dependência
Da mesma forma que o til, que aprendemos no último desafio e que permite que o npm instale o último PATCH de uma 
dependência, o circunflexo (^) permite que o npm instale atualizações futuras também. 
A diferença é que o circunflexo permitirá tanto atualizações MINOR quanto PATCHes.

Sua versão atual de @freecodecamp/example deve ser ~1.2.13, o que permitirá que o npm instale a versão 1.2.x mais
recente. 
Se você usasse o circunflexo (^) como um prefixo de versão, o npm teria permissão para atualizar para qualquer versão 
1.x.x.
```json
{
  "package": "^1.3.8"
}
```
Isso permitiria atualizações para qualquer versão 1.x.x do pacote.
**Use o circunflexo (^) para prefixar a versão de @freecodecamp/example em suas dependências e permitir que o npm atualize 
para qualquer versão MINOR.**

Observação: os números da versão em si não devem ser alterados.

```json
{
  "version": "^1.2.13"
}
```

Testes:
- "dependencies" deve incluir "@freecodecamp/example".
- A versão de "@freecodecamp/example" deve corresponder a "^1.x.x".


## Remover um pacote de suas dependências
Você agora já testou algumas maneiras de gerenciar as dependências do seu projeto usando a seção de dependências do 
package.json. 
Você também incluiu pacotes externos, adicionando-os ao arquivo e até dizendo ao npm quais tipos de versões você quer, 
usando caracteres especiais como o til ou o circunflexo.

Mas e se você quisesse remover um pacote externo do qual você não precisa mais? Você já deve ter adivinhado: apenas 
remova o par chave-valor correspondente a esse pacote das dependências.

Este mesmo método também se aplica à remoção de outros campos no seu package.json.

**Remova o pacote @freecodecamp/example das dependências.**

Observação: certifique-se de que você tem a quantidade certa de vírgulas depois de removê-lo.

```json
{
  "dependencies" : {
  }
}
```

Testes:
- "dependencies" não deve incluir "@freecodecamp/example".


## Referências
https://www.freecodecamp.org/portuguese/learn/back-end-development-and-apis/#managing-packages-with-npm 
, acessado em 01/02/2023.

https://github.com/freeCodeCamp/boilerplate-npm/ , acessado em 01/02/2023.