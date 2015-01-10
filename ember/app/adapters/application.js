import DS from 'ember-data';
import Ember from 'ember';


Ember.ApplicationAdapter = DS.ActiveModelAdapter.extend({
	namespace: 'api'
});

export default Ember.ApplicationAdapter;
