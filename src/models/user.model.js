const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class User extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.fullName = { type: 'varchar' };
    this.phone = { type: 'varchar' };
    this.email = { type: 'varchar' };
    this.password = { type: 'varchar', nullable: true }; // Set nullable to true to indicate that password is not required
    this.role = { type: 'varchar' };
    this.country = { type: 'varchar' };
    this.resetToken = { type: 'varchar' };
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    userProfile: {
      type: 'many-to-one',
      target: 'UserProfile',
      inverseSide: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
});
