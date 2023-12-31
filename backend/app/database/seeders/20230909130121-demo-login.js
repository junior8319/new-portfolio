'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        user_name: 'admin',
        role: 'owner',
        password: await bcrypt.hash('adminSuper', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: 'user',
        role: 'visitor',
        password: await bcrypt.hash('userSuper', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
