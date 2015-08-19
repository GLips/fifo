import DS from 'ember-data';

export default DS.Model.extend({
  list: DS.belongsTo('list'),
  text: DS.attr('string'),
  sleeps: DS.attr('number', { defaultValue: 0 }),
  createdAt: DS.attr('date'),
  completed: DS.attr('boolean', { defaultValue: false }),
});
