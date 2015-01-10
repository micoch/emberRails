import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.store.createRecord('speaker', {
			name: ''
		});
	},

	actions: {
		create: function(){
		var model = this.controller.get('model');
		model.save();
		this.transitionTo('speakers');
		}
	}
});
