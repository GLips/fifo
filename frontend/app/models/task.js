import DS from 'ember-data';

export default DS.Model.extend({
  list: DS.belongsTo('list'),
  content: DS.attr('string'),
  sleeps: DS.attr('number'),
  createdAt: DS.attr('date')
});
