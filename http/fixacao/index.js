const express = require('express')
const app = express()
const port = 3001

app.use(express.json());

let drinks = [
  { id: 1, name: 'Refrigerante Lata', price: 5.0 },
  { id: 2, name: 'Refrigerante 600ml', price: 8.0 },
  { id: 3, name: 'Suco 300ml', price: 4.0 },
  { id: 4, name: 'Suco 1l', price: 10.0 },
  { id: 5, name: 'Cerveja Lata', price: 4.5 },
  { id: 6, name: 'Água Mineral 500 ml', price: 5.0 },
];


// 1 - CRIE UMA ROTA QUE BUSQUE TODOS OS DRINKS
app.get('/drinks', (_req, res) => {
  res.status(200).json(drinks);
})

// 2 - CRIE UMA ROTA QUE RETORNE OS DRINKS FILTRADOS POR NOME, PREÇO MÁXIMO E PREÇO MÍNIMO. ESSES PARÂMETROS DEVEM SER RECEBIDOS ATRAVÉS DA QUERY STRING
app.get('/drinks/search', (req, res) => {
  const { name, maxPrice, minPrice } = req.query;
  const filteredDrinks = drinks.filter((drink) => drink.name.includes(name) && drink.price < parseFloat(maxPrice, 1) && drink.price > parseFloat(minPrice, 1));
  res.status(200).json(filteredDrinks);
})


// 3 - CRIE UMA ROTA QUE BUSQUE O DRINK PELO ID
app.get('/drinks/:id', (req, res) => {
  const { id } = req.params;
  const filteredDrink = drinks.find((drink) => drink.id === parseInt(id));
  if(!filteredDrink) return res.status(404).json({ message: 'Not Found' });

  res.status(200).json(filteredDrink);

})

// 4 - CRIE UMA ROTA QUE ADICIONE UM NOVO DRINK
app.post('/drinks', (req, res) => {
  const { id, name, price } = req.body;
  drinks.push({id, name, price});
  // drinks = [...drinks, { id, name, price }];
  return res.status(201).json({ message: "Created successfull"})
})


// 5 - CRIE UMA ROTA QUE ATUALIZE UM DRINK PELO ID
app.put('/drinks', (req, res) => {
  const { id, name, price } = req.body;
  const index = drinks.findIndex((drink) => drink.id === parseInt(id));
  drinks[index] = { id, name, price }
  return res.status(201).json({ message: 'Ok' })
})


// 6 - CRIE UMA ROTA QUE DELETE UM DRINK PELO ID
app.delete('/drinks/:id', (req, res) => {
  const { id } = req.params;
  const drinkIndex = drinks.findIndex((drink) => drink.id === parseInt(id));
  drinks.splice(drinks[drinkIndex], 1);
  if(drinkIndex === -1) return res.status(404).json({ message: 'Not Found' })
  res.status(200).json({ message: 'Deleted' })
})

app.listen(port, () => console.log(`Example app listening on port port!`))