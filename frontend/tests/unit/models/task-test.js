import { moduleForModel, test } from 'ember-qunit';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: ['model:list']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
