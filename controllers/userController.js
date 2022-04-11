const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(15);

const userController = {
	register: async function (req, res) {
		if (await User.findOne({ email: req.body.email }))
			return res.status(400).send('Email já existe!');

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, salt),
		});

		try {
			const savedUser = await user.save();
			res.type('json');
			res.send(savedUser);
		} catch (error) {
			res.status(400).send(error);
			console.log(error);
		}
	},

	login: async function (req, res) {
		const selectedUser = await User.findOne({ email: req.body.email });
		if (!selectedUser)
			return res.status(400).send('Email ou senha incorreta!');

		try {
			const passwordAndUserMatch = bcryptjs.compareSync(
				req.body.password,
				selectedUser.password
			);
			if (!passwordAndUserMatch)
				return res.status(400).send('Email ou senha incorreta!');

			res.send(`${selectedUser.name} logado com sucesso!`);
		} catch (error) {
			res.send(error);
		}
	},
};

module.exports = userController;
