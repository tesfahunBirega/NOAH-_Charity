const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Event extends Base {
  // Define additional properties specific to event entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.name = { type: 'varchar' };
    this.eventAddress = { type: 'varchar' };
    this.description = { type: 'varchar' };
    this.date = { type: 'datetime' };
    this.charityAddress = { type: 'varchar' };
    this.is_active = { type: 'boolean', nullable: true };
  }
}

module.exports = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: new Event(),
});
