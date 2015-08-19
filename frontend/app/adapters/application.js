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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = JSON.parse(window.localStorage.getItem(id));
      if(data) {
        Ember.run(null, resolve, data);
      } else {
        Ember.run(null, reject);
      }
    });
  },
  createRecord: function(store, type, snapshot) {
    var fullId = (snapshot.id) ? snapshot.id : this.fullId(type, this.generateId());
    // TODO: Update serialize to save the IDs of hasMany/belongsTo relationships
    var data = this.serialize(snapshot, { includeId: true });
    data.id = fullId;
    console.log(data);
    window.localStorage.setItem(fullId, JSON.stringify(data));
    return new Ember.RSVP.Promise(function(resolve) { Ember.run(null, resolve, data); });
  },
  updateRecord: function(store, type, snapshot) {
    var fullId = (snapshot.id) ? snapshot.id : this.fullId(type, this.generateId());
    var data = this.serialize(snapshot, { includeId: true });
    data.id = fullId;
    console.log(data);
    window.localStorage.setItem(fullId, JSON.stringify(data));
    return new Ember.RSVP.Promise(function(resolve) { Ember.run(null, resolve, data); });
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
