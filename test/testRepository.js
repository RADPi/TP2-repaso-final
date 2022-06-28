const { assert } = require('chai')
const { Repository } = require('../db/models')
const axios = require('axios')

axiosClient = axios.create({
	baseURL: `http://${process.env.HOST}:${process.env.PORT}`,
})

describe('Test repositorios', () => {
	it('Cuando se consulta un repositorio por ID, y sea privado, se debe devolver un codigo de estado 403', async () => {
		let repo
		try {
			repo = await Repository.create({
				name: 'Test',
				visibility: false,
				user: 1,
			})
			await axiosClient.get(`/repositories/${repo.id}`)
		} catch (error) {
			assert.equal(error.response.status, 403)
			await repo.destroy()
		}
	})

	it('Cuando se consulta un repositorio por ID, y no sea privado, se debe devolver un codigo de estado 200', async () => {
		let repo
		try {
			repo = await Repository.create({
				name: 'Test',
				visibility: true,
				user: 1,
			})
			const response = await axiosClient.get(`/repositories/${repo.id}`)
			assert.equal(response.status, 200)
			await repo.destroy()
		} catch (error) {
			assert.equal(error.response.status, '')
		}
	})
})
