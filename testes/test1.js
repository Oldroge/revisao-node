function positivoNegativo(num) {
  if (num > 0) {
    return 'Positivo'
  } else if (num < 0) {
    return 'Negativo'
  } else if (typeof num !== 'number') {
    return 'o valor deve ser um número'
  }
  return 'Neutro';
}
console.log(positivoNegativo('0'))

module.exports = positivoNegativo;
