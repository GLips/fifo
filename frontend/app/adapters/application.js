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
    return new Ember.RSVP.Promise((resolve, reject)=> {
      var data = JSON.parse(window.localStorage.getItem(id));
      if(data) {
        Ember.run(null, resolve, data);
      } else {
        Ember.run(null, reject);
      }
    });
  },
  createRecord: function(store, type, snapshot) {
    // Handle cases when the ID is provided outside this function (e.g. list ID 'default')
    var fullId = (snapshot.id) ? snapshot.id : this.fullId(type, this.generateId());

    var data = this.serialize(snapshot, { includeId: true });
    data.id = fullId;

    window.localStorage.setItem(fullId, JSON.stringify(data));
    return new Ember.RSVP.Promise(function(resolve) { Ember.run(null, resolve, data); });
  },
  updateRecord: function(store, type, snapshot) {
    // For now, these two functions are *exactly* the same.
    return this.createRecord(store, type, snapshot);
  },
  deleteRecord: function() {
    console.log("deleteRecord");
  },
  findAll: function() {
    console.log("findAll");
  },
  query: function() {
    console.log("query");
  },
});
