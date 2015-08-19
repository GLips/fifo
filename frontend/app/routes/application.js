import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var _this = this;
    return this.store.find('list', 'default').then(
      function(list) {
        return list;
      }, function() {
        // Move this to an initializer
        var list = _this.store.createRecord('list', { id: 'default', title: 'Your First List' }).save().then(function(l) {
          _this.store.createRecord('task', { text: 'Your first task—click to edit me!', list: l }).save();
          _this.store.createRecord('task', { text: 'Your second task—click to edit me!', list: l }).save();
        });
        return list;
      });
  }
});
