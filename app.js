require('dotenv').config()
const { Repository } = require('./db/models')
const express = require('express')

const app = express()

app.set('port', process.env.PORT || 2999)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/repositories', async function (req, res) {
	try {
		const repositories = await Repository.findAll({
			limit: 100,
		})
		res.status(200).json({ repositories })
	} catch (error) {
		console.error(error)
		res.status(422).send('Hubo un error')
	}
})

app.get('/repositories/:id', async function (req, res) {
	try {
		const repository = await Repository.findByPk(req.params.id)
		if (repository) {
			if (repository.visibility) {
				res.status(200).json({ repository })
			} else {
				res.status(403).send('Acceso restringido')
			}
		} else res.status(404).send('No encontrado')
	} catch (error) {
		console.error(error)
		res.status(422).send('Hubo un error')
	}
})

app.post('/repositories', async function (req, res) {
	try {
		const { dataValues: repository } = await Repository.create(req.body)
		res.status(201).json({ repository })
	} catch (error) {
		console.error(error)
		res.status(422).send('Hubo un error')
	}
})

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}!`)
})
