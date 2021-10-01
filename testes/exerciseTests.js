// Exercício 1 : Estruture os testes utilizando mocha e chai para um função que irá dizer se um número é "positivo", "negativo" ou "neutro":
// Essa função irá receber um número como parâmetro e retornar uma string como resposta;
// Quando o número passado for maior que 0 deverá retornar "positivo", quando for menor que 0 deverá retornar "negativo" e quando igual a 0 deverá retornar "neutro";
// Descreva todos os cenário de teste utilizando describes ;
// Descreva todos os testes que serão feitos utilizando its ;
// Crie as asserções validando se os retornos de cada cenário tem o tipo e o valor esperado.

// Exercício 2 : Implemente a função apresentada no exercício 1, garantindo que ela irá passar em todos os testes que você escreveu.
// DICA : Lembre-se de adicionar o script de test no package.json e de instalar as dependências.
const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');

const positivoNegativo = require('./test1.js');
const writeFile = require('./test2.js');

describe('Testa se número é positivo, negativo ou neutro', () => {
  describe('Se número maior que zero', () => {
    it('É positivo', () => {
      const funcao = positivoNegativo(2);
      expect(funcao).equals('Positivo'); 
    });
  });
  describe('Se número menor que zero', () => {
    it('É negativo', () => {
      const funcao = positivoNegativo(-1);
      expect(funcao).equals('Negativo'); 
    })
  })
  describe('Se número igual a zero', () => {
    it('É neutro', () => {
      const funcao = positivoNegativo(0);
      expect(funcao).equals('Neutro'); 
    })
  })
});


// Exercício 3 Adicione à função um tratamento para casos em que o parâmetro informado não seja do tipo Number .
// Adicione o cenário em seu arquivo de testes, passando um valor de tipo diferente a Number para a função;
// Adicione uma asserção para esperar que o valor retornado para esse caso seja igual uma string "o valor deve ser um número";
// Implemente em sua função tal validação para que o teste passe.
describe('Verificar se é do tipo Number', () => {
  it('Deve aparecer uma mensagem', () => {
    const string = positivoNegativo('a');
    expect(string).equals('o valor deve ser um número');
  })
});

// Exercício 4 Crie testes para uma função que escreverá um conteúdo em um arquivo específico.
// Essa função deverá receber dois parâmetros: o nome do arquivo e o conteúdo desse arquivo.
// Após concluir a escrita do arquivo ela deverá retornar um ok .
// Descreva todos os cenários de teste utilizando describes ;
// Descreva todos os testes que serão feitos utilizando its ;
// Crie as asserções validando se o retorno da função possui o valor e tipo esperado.

// Exercício 5 Implemente a função descrita no exercício 4.
// Crie a função descrita no exercício 4 utilizando o módulo fs do node.
// Adapte os testes adicionando stub ao módulo utilizado do fs , isolando assim o teste.
// Garanta que todos os testes escritos no exercício 4 irão passar com sucesso.
describe('Cria e escreve em arquivos', () => {
  before(() => {
    sinon.stub(fs, 'writeFileSync')
      .returns('ok');
  });
  after(() => {
    fs.writeFileSync.restore();
  });
  it('Precisa criar arquivo', () => {
    const read = writeFile('text.txt', 'ok');
    expect(read).to.be.equals('ok');
  })
})