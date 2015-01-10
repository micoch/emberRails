import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
	this.resource('speakers', function(){
	  this.route('show', {path: ':speaker_id'});
		this.route('create', {path: 'create'});
	});
});

export default Router;
