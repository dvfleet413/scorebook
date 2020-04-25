# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

bos = Team.create(name: "Boston Red Sox")
bos.players.build(name: 'Andrew Benintendi', number: 16, position: '7').save
bos.players.build(name: 'Mookie Betts', number: 50, position: '9').save
bos.players.build(name: 'Rafael Devers', number: 11, position: '5').save
bos.players.build(name: 'JD Martinez', number: 28, position: 'DH').save
bos.players.build(name: 'Xander Bogaerts', number: 2, position: '6').save
bos.players.build(name: 'Mitch Moreland', number: 18, position: '3').save
bos.players.build(name: 'Eduardo Nunez', number: 36, position: '4').save
bos.players.build(name: 'Jackie Bradley Jr', number: 19, position: '8').save
bos.players.build(name: 'Christian Vasquez', number: 7, position: '2').save

nyy = Team.create(name: "New York Yankees")
nyy.players.build(name: "Brett Gardner", number: 11, position: '8').save
nyy.players.build(name: "Aaron Judge", number: 99, position: '9').save
nyy.players.build(name: "Giancarlo Stanton", number: 27, position: '7').save
nyy.players.build(name: "Luke Voit", number: 45, position: 'DH').save
nyy.players.build(name: "Miguel Andujar", number: 41, position: '5').save
nyy.players.build(name: "Gary Sanchez", number: 24, position: '2').save
nyy.players.build(name: "Greg Bird", number: 33, position: '3').save
nyy.players.build(name: "Gleyber Torres", number: 25, position: '4').save
nyy.players.build(name: "Troy Tulowitzki", number: 12, position: '6').save



