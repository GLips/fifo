import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newTask() {
      var _this = this;
      this.store.createRecord('task', {
        text: ""
      }).save().then(function(task) {
        _this.store.find('list', 'default').then(function(list) {
          list.get('tasks').addObject(task);
          list.save();
        })
      });
    }
  }
});
