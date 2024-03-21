const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Voluntery extends Base {
  // Define additional properties specific to Post entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.name = { type: 'varchar' };
    this.description = { type: 'text' };
  }
}

module.exports = new EntitySchema({
  name: 'Voluntery',
  tableName: 'volunterys',
  columns: new Voluntery(),
});
