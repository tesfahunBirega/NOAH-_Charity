const { EntitySchema } = require('typeorm');
const { Base } = require('./BaseModel');

class Event extends Base {
  // Define additional properties specific to event entity
  constructor() {
    super(); // Call the constructor of the Base entity to inherit its properties
    this.name = { type: 'varchar' };
    this.eventAddress = { type: 'varchar' };
    this.description = { type: 'varchar' };
    this.date = { type: 'datetime', nullable: 'true' };
    this.event_time = { type: 'datetime', nullable: 'true' };
    this.event_price = { type: 'double' };
    this.image = { type: 'varchar', nullable: true };
    this.charityAddress = { type: 'varchar' };
    this.description = { type: 'varchar' };
    this.isActive = { type: 'boolean', nullable: true, default: true };
  }
}

module.exports = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: new Event(),
});
