import startApp from 'ember-rails/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

var App, server;

module('Integration - Speakers Page', {
	setup: function(){
		App = startApp();	
		var speakers = [
			{ 
				id: 1,
			 	name: 'Michael C'
			},
			{ 
				id: 2,
			 	name: 'Jimmy C'
			},
			{ 
				id: 3, 
				name: 'Dustin F'
			}
		];	
	
		server = new Pretender(function(){
			this.get('/api/speakers', function(request){
				return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers})];
			});

			this.get('/api/speakers/:id', function(request){
				var speaker = speakers.find(function(speaker){
					if (speaker.id === parseInt(request.params.id, 10)){
						return speaker;
					}
				});

				return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker})];
			});
		});

	},
	teardown: function(){
		Ember.run(App, 'destroy');
		server.shutdown();
	}
});

test('Should navigate to the Speakers page', function(){
	visit('/').then(function(){
		click("a:contains('Speakers')").then(function(){
			equal(find('h3').text(), 'Speakers');
		});
	});
});

test('Should list all Speakers', function(){
	visit('/speakers').then(function(){
		equal(find("a:contains('Michael C')").length, 1);
		equal(find("a:contains('Jimmy C')").length, 1);
		equal(find("a:contains('Dustin F')").length, 1);
	});
});

test('Should navigate to a Speaker page', function(){
  visit('/speakers').then(function(){
		click('a:contains("Michael C")').then(function(){
			equal(find('h4').text(), 'Michael C');
		});
	});
});

test('Should be able to visit a Speaker page', function(){
	visit('/speakers/1').then(function(){
		equal(find('h4').text(), 'Michael C');
	});
});
