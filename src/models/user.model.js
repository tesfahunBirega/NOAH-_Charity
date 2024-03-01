const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class User extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.firstName = { type: 'varchar' };
    this.lastName = { type: 'varchar' };
    this.email = { type: 'varchar' };
    this.password = { type: 'varchar' };
    this.role = { type: 'varchar' };
  }
}

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: new User(),

  relations: {
    userAdmin: {
      type: 'many-to-one',
      target: 'UserAdmin',
      inverseSide: 'users',
    },
    userProfile: {
      type: 'many-to-one',
      target: 'UserProfile',
      inverseSide: 'users',
    },
  },
});
