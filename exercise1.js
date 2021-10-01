function exercise1(n1, n2, n3) {
  const promise = new Promise((resolve, reject) => {
    if((typeof (n1 && n2 && n3)) !== 'number') {
      return reject("Informe apenas números")
    };

    const resultado = (n1 + n2) * n3
    if (resultado < 50) return reject(new Error('Valor muito baixo')); // ({ message: 'Valor muito baixo' })
    
    resolve(resultado);
  })
  return promise;
}

// exercise1(2, 3, 40)
//   .then((response) => console.log(response))
//   .catch((erro) => console.log(erro));
module.exports = exercise1;
