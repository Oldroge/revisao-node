const exercise1 = require('./exercise1');


// exercise1(2, 3, '40')
//   .then((response) => console.log(response))
//   .catch((erro) => console.log(erro));


function geraNumerosAleatorios(numeroMaximo) {
  if (typeof numeroMaximo !== 'number') {
    return 'parâmetro deve ser um número';
  }

  return Array.from({ length: 3 }).map(() => Math.ceil(Math.random() * numeroMaximo))
  
  // let numerosAleatorios = [];

  // for (index = 0; index < 3; index += 1) {
  //   numerosAleatorios.push(Math.ceil(Math.random() * numeroMaximo))
  // }

  // return numerosAleatorios;
};

exercise1(...geraNumerosAleatorios(10))
  .then((response) => console.log(response)).catch((err) => console.log(err));
