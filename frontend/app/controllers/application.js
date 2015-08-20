import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newTask() {
      this.store.find('list', 'default').then( (list)=> {
        this.store.createRecord('task', {
          text: "",
          list: list
        }).save().then(function(task) {
          list.get('tasks').addObject(task);
          list.save();
        });
      });
    }
  }
});
