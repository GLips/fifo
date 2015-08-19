import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  fullId: function(type, id) {
    return type.toString() + id;
  },
  generateId: function() {
    return Math.random().toString(32).slice(2).substr(0, 5) + Math.random().toString(32).slice(2).substr(0, 5);
  },
  findRecord: function(store, type, id/*, snapshot*/) {
    return JSON.parse(window.localStorage.getItem(id));
  },
  createRecord: function(store, type, snapshot) {
    var fullId = this.fullId(type, this.generateId());
    var data = this.serialize(snapshot, { includeId: true });
    data.id = fullId;
    window.localStorage.setItem(fullId, JSON.stringify(data));
    return new Ember.RSVP.Promise(function(resolve) { Ember.run(null, resolve, data); });
  },
  updateRecord: function() {
    console.log("updateRecord");
  },
  deleteRecord: function() {
    console.log("deleteRecord");
  },
  findAll: function() {
    console.log("findAll");
  },
  query: function() {
    console.log("query");
  }
});
