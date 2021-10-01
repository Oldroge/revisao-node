function exercise1(n1, n2, n3) {
  const promise = new Promise((resolve, reject) => {
    if(typeof (n1 || n2 || n3) !== 'number' ) {
      reject("Informe apenas números")
    };
    resolve((n1 + n2) * n3)
  })
  return promise;
}
exercise1(2, 3, '4')
  .then((response) => console.log(response))
  .catch((erro) => console.log(erro));
