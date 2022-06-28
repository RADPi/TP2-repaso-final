'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 */
		await queryInterface.bulkInsert(
			'Repositories',
			[
				{
					name: 'Prueba1',
					visibility: false,
					user: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Prueba2',
					visibility: true,
					user: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		)
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 */
		await queryInterface.bulkDelete('Repositories', null, {})
	},
}

// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all
