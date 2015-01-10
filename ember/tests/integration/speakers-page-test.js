import startApp from 'ember-rails/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

var App, server;

module('Integration - Speakers Page', {
	setup: function(){
		App = startApp();	
		var speakers = [
			{ id: 1, name: 'Michael C', presentation_ids: [1,2] },
			{ id: 2, name: 'Jimmy C',	presentation_ids: [3]},
			{ id: 3, name: 'Dustin F', presentation_ids: [4,5,6] }
		];

		var presentations = [
			{ id: 1, title: "This is Development", speaker_id: 1},
			{ id: 2, title: "The Process of Reinvention", speaker_id: 1},
			{ id: 3, title: "The Saints are facilitators of Spiritual Growth", speaker_id: 2},
			{ id: 4, title: "Joys of the Sports Modile DIY Build", speaker_id: 3},
			{ id: 5, title: "Taming my Family in the Wild", speaker_id: 3},
			{ id: 6, title: "Hard Headed partnership", speaker_id: 3}

		];	
	
		server = new Pretender(function(){
			this.get('/api/speakers', function(request){
				return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers, presentations: presentations})];
			});

			this.get('/api/speakers/:id', function(request){
				var speaker = speakers.find(function(speaker){
					if (speaker.id === parseInt(request.params.id, 10)){
						return speaker;
					}
				});

				var speakerPresentations = presentations.filter(function(presentation){
					if (presentation.speaker_id === speaker.id){
						return true;
					}
				});

				return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker, presentations: speakerPresentations})];
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

test('Should list all Speakers and number of Presentaions', function(){
	visit('/speakers').then(function(){
		equal(find('a:contains("Michael C (2)")').length, 1);
		equal(find('a:contains("Jimmy C (1)")').length, 1);
		equal(find('a:contains("Dustin F (3)")').length, 1);
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

test('Should list all presentations for speaker', function(){
	visit('/speakers/1').then(function(){
		equal(find('li:contains("This is Development")').length, 1);
		equal(find('li:contains("The Process of Reinvention")').length, 1);
	});
});
