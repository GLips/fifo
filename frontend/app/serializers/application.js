import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serialize: function(snapshot, options) {
    var data = this._super(snapshot, { includeId: true });
    var ids;
    // Save IDs of hasMany and belongsTo relationships so we can
    // associate records on future loads
    snapshot.eachRelationship(function(name, relationship) {
      if(relationship.kind === "belongsTo") {
        ids = snapshot.belongsTo(name, { id: true });
      } else if(relationship.kind === "hasMany") {
        ids = snapshot.hasMany(name, { ids: true });
      }
      data[name] = ids;
    });
    return data;
  }
});
