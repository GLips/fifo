import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newTask() {
      var newTask = this.store.createRecord('task', {
        content: "Test task, created programatically",
        sleeps: 0
      });
      newTask.save();
    }
  }
});
