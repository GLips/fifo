import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('list', 'default').then(
        (list)=> {
          return list;
        }, ()=> {
          // TODO: Move this to an initializer
          var list = this.store.createRecord('list', { id: 'default', title: 'Your First List' }).save().then( (l)=> {
            Ember.RSVP.Promise.all([
              this.store.createRecord('task', { text: 'Your first task—click to edit me!', list: l }).save(),
              this.store.createRecord('task', { text: 'Your second task—click to edit me!', list: l }).save()
            ]).then(function(results) {
              l.get('tasks').addObjects(results);
              l.save();
            });
            return l;
          });
        });
    return list;
  }
});
