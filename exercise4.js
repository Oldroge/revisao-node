const fs = require('fs').promises;

// async function imprimePersonagens() {
//   try {
//     const personagens = await fs.readFile('./simpsons.json', 'utf-8');
//     const parsedPersonagens = JSON.parse(personagens);
  
//     return parsedPersonagens.map(({ id, name }) => `${id} - ${name}`)
//   } catch (error) {
//     return error
//   }
// };

// async function consoleAsync() {
//   console.log(await imprimePersonagens());
// }
// consoleAsync();

// imprimePersonagens().then((resultado) => console.log(resultado));



// Crie uma função que receba o id de uma personagem como parâmetro e retorne uma Promise que é resolvida com os dados da personagem que possui o id informado. Caso não haja uma personagem com o id informado, rejeite a Promise com o motivo "id não encontrado".
// async function imprimePersonagensPorId(personagemId) {
//   const personagens = fs
//     .readFile('./simpsons.json', 'utf-8')
//     .then((resp) => JSON.parse(resp))
//     .then((result) => {
//       const personagemFiltrado = result.find(({ id }) => parseInt(id) === personagemId)
//       if (!personagemFiltrado) return Error('Personagem não encontrado')
//       return personagemFiltrado
//     })
//     .catch(() => console.log('meu erro'))

  // Para executar o find com uma promise, é necessário colocar o await antes da função fs.readFile
  // const personagemFiltrado = personagens.find(({ id }) => parseInt(id) === personagemId);
  // return personagemFiltrado;
  // if (personagemFiltrado)
  // return personagens;
// };


// imprimePersonagensPorId(10)
//   .then((resultado) => console.log(resultado))
//   .catch(err => console.log(err))

// Crie uma função que altere o arquivo simpsons.json retirando os personagens com id 10 e 6.

// async function filtraPersonagens() {
//   const personagens = await fs
//     .readFile('./simpsons.json', 'utf-8')
//     .then((resp) => JSON.parse(resp))
//     .then((result) => result.filter(({ id }) => id !== '10' && id !== '6'))
//     .catch(() => console.log('meu erro'))

//   await fs.writeFile('./simpsons.json', JSON.stringify(personagens));
//   return personagens
// }

// filtraPersonagens()
//   .then((resultado) => console.log(resultado))
//   .catch(err => console.log(err))

// Crie uma função que leia o arquivo simpsons.json e crie um novo arquivo, chamado simpsonFamily.json , contendo as personagens com id de 1 a 4.
// async function filtraPersonagens() {
//     const personagens = await fs
//       .readFile('./simpsons.json', 'utf-8')
//       .then((resp) => JSON.parse(resp))
//       .then((result) => result.filter(({ id }) => id >= '1' && id <= '4'))
//       .catch(() => console.log('meu erro'))
  
//     await fs.writeFile('./simpsonFamily.json', JSON.stringify(personagens));
//     return personagens
//   }

// filtraPersonagens()
//   .then((resultado) => console.log(resultado))
//   .catch(err => console.log(err))

// Crie uma função que adicione ao arquivo simpsonFamily.json o personagem Nelson Muntz .
// async function adicionaPersonagem() {
//   const simpsonsFamily = await fs
//     .readFile('./simpsonFamily.json', 'utf-8')
//     .then((resp) => JSON.parse(resp))
//     .catch(() => console.log('meu erro'))

//   simpsonsFamily.push({ id: '8', name: 'Nelson Muntz' })
//   await fs.writeFile('./simpsonFamily.json', JSON.stringify(simpsonsFamily));
//   return simpsonsFamily
// }

// adicionaPersonagem()
//   .then((resultado) => console.log(resultado))
//   .catch(err => console.log(err))

// Crie uma função que substitua o personagem Nelson Muntz pela personagem Maggie Simpson no arquivo simpsonFamily.json .

async function substituiPersonagem() {
  const newSimpsonFamily = await fs
    .readFile('./simpsonFamily.json', 'utf-8')
    .then((resp) => JSON.parse(resp))
    .catch(() => console.log('meu erro'))

  // newSimpsonFamily.splice(newSimpsonFamily.indexOf({ "id":"8","name":"Nelson Muntz" }), 1, {"id":"5","name":"Maggie Simpson"})

  const index = newSimpsonFamily.findIndex(({ id }) => id === '8');
  
  newSimpsonFamily[index] = {"id":"5","name":"Maggie Simpson"};
 
  // const updateSimpsonFamily = newSimpsonFamily.map((simpson) => {
  //   if (simpson.id === '8') {
  //     return {...simpson, id: '5', name: 'Maggie Simpson'}
  //   }
  //   return simpson;
  // });

  await fs.writeFile('./simpsonFamily.json', JSON.stringify(newSimpsonFamily));
  return newSimpsonFamily
}

substituiPersonagem()
  .then((resultado) => console.log(resultado))
  .catch(err => console.log(err))