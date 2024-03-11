const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Event extends Base {
  // Define additional properties specific to event entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.title = { type: 'varchar' };
    this.body = { type: 'text' };
  }
}

module.exports = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: new Event(),
});
