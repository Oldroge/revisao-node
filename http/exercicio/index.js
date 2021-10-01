const express = require('express')
const app = express()
const port = 3001
const simpsons = require('./fs-utils')
const rescue = require('express-rescue');
const generateToken = require('./generateToken');

app.use(express.json());

// 1- Crie uma rota GET /ping
//Sua rota deve retornar o seguinte JSON: { message: 'pong' }


app.post('/ping', (req, res) => {
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })

  res.json({ message: 'pong' })
})

// 2- Crie uma rota POST /hello
// Sua rota deve receber, no body da requisição, o seguinte JSON: { "name": "<nome do usuário>" }
// Sua rota deve retornar o seguinte JSON: { "message": "Hello, <nome do usuário>!" } .
app.post('/hello', (req, res) => {
  const { name } = req.body;
  res.status(200).json({ message: `Hello, ${name}` })
})


// 3- Crie uma rota POST /greetings
// Sua rota deve receber o seguinte JSON: { "name": "<nome do usuário>", "age": <idade do usuário> } .
// Caso a pessoa usuária tenha idade superior a 17 anos, devolva o JSON { "message": "Hello, <nome do usuário>!" } com o status code 200 - OK .
// Caso a pessoa usuária tenha 17 anos ou menos, devolva o JSON { "message": "Unauthorized" } com o status code 401 - Unauthorized .
app.post('/greetings', (req, res) => {
  const { name, age } = req.body;
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })
  console.log(typeof age)
  if(age > 17) {
    res.status(200).json({ message: `Hello, ${name}` })
  }
  res.status(401).json({ message: 'Unauthorized' })
})

// 4- Crie uma rota PUT /users/:name/:age .
// Sua rota deve retornar o seguinte JSON: { "message": "Seu nome é <name> e você tem <age> anos de idade" } .
app.put('/users/:name/:age', (req, res) => {
  const { name, age } = req.params;
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })
  console.log(typeof age)
  res.status(200).json({ message: `Seu nome é ${name} e você tem ${age} anos de idade` })
})


// 5- Crie uma API de dados das personagens de Simpsons que estará no arquivo simpsons.json
// Utilize o modulo fs do Node para ler/escrever arquivos.
// Caso algum erro ocorra, deve ser retornado um código 500 (Internal Server Error).
// Caso dê tudo certo, a resposta deve voltar com status 200 OK .
// Para testar sua API durante o desenvolvimento, utilize ferramentas que permitem fazer requisições HTTP, como Postman , Insomnia ou httpie .



// 6- Crie um endpoint GET /simpsons
// O endpoint deve retornar um array com todos os simpsons.
app.get('/simpsons', async (req, res) => {
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })
  const allSimpsons = await simpsons.getSimpsons();
  res.status(200).json(allSimpsons);
})


// 7- Crie um endpoint GET /simpsons/:id
// O endpoint deve retornar o personagem com o id informado na URL da requisição.
// Caso não exista nenhum personagem com o id especificado, retorne o JSON { message: 'simpson not found' } com o status 404 - Not Found .
app.get('/simpsons/:id', async (req, res) => {
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })
  const { id } = req.params;
  const allSimpsons = await simpsons.getSimpsons();
  const simpson = allSimpsons.find((simpson) => simpson.id === id)
  if(!simpson) return res.status(404).json({ message: 'simpson not found' });
  res.status(200).json(simpson);
})

// 8- Crie um endpoint POST /simpsons .
// Este endpoint deve cadastrar novos personagens.
// O corpo da requisição deve receber o seguinte JSON: { id: <id-da-personagem>, name: '<nome-da-personagem>' } .
// Caso já exista uma personagem com o id informado, devolva o JSON { message: 'id already exists' } com o status 409 - Conflict .
// Caso a personagem ainda não exista, adicione-a ao arquivo simpsons.json e devolva um body vazio com o status 204 - No Content . Para encerrar a request sem enviar nenhum dado, você pode utilizar res.status(204).end();

app.post('/simpsons', rescue( async (req, res) => {
  const { token } = req.headers
  if(!token || token.length !== 16) return res.status(404).json({ message: 'Token inválido!' })
  const { name, id } = req.body;
  const allSimpsons = await simpsons.getSimpsons();
  const simpson = allSimpsons.find((simpson) => simpson.id === id)
  if(simpson) return res.status(409).json({ message: 'id already exists' });
  allSimpsons.push({ name, id })
  await simpsons.setSimpsons(allSimpsons);
  res.status(204).end();  
}));

// BÔNUS
// 1- Adicione autenticação a todos os endpoints.
// O token deve ser enviado através do header Authorization .
// O token deve ter exatamente 16 caracteres.
// Caso o token seja inválido ou inexistente, a resposta deve possuir o status 401 - Unauthorized e o JSON { message: 'Token inválido!' } .

// 2- Crie uma rota POST /signup
// A rota deve receber, no body da requisição, os campos email , password , firstName e phone .
// Caso algum dos campos não esteja preenchido, a response deve possuir status 401 - Unauthorized e o JSON { message: 'missing fields' } .
// Caso todos os parâmetros estejam presentes, a rota deve gerar um token aleatório válido, e a resposta deve conter o status 200 - OK , e o JSON { token: '<token-aleatorio>' } .
app.post('/signup', (req, res) => {
  const { email , password , firstName, phone} = req.body;
  if([email, password, firstName, phone].includes(undefined)) {
    return res.status(401).json({ message: 'missing fields' })
  }
  const token = generateToken()
  res.status(200).json({ token: token })

})

app.listen(port, () => console.log(`Example app listening on port port!`))