# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
mike = Speaker.create(name: 'Michael C')
jim = Speaker.create(name: 'Jimmy C')
dustin = Speaker.create(name: 'Dustin')

mike.presentations.create(title: 'This is Development')
mike.presentations.create(title: 'The Process of Reinvention')

jim.presentations.create(title: 'The Saints as Faith Finding Facilitators')

dustin.presentations.create(title: 'Sports Mobile for the Family')
dustin.presentations.create(title: 'Build with Imaginitive Hands')
dustin.presentations.create(title: 'Family Trekking')
