// Só preciso executar esse metodo !!
// Esse parada serve para eu colocar as variáveis do sitema em um arquivo separado!
require('dotenv').config();

const express = require('express');
const userRouter = require('./routers/userRouter');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_URL, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Mongo conected');
	}
});

app.use('/user', express.json(), userRouter);

app.listen(process.env.PORT, () => {
	console.log(`Tudo certo rodando`);
});
