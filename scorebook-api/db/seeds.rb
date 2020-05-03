# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

bal = Team.new(name: "Baltimore Orioles")
bal.players.build(name: 'Mullins', number: 3, position: '8')
bal.players.build(name: 'Smith', number: 35, position: '7')
bal.players.build(name: 'Villar', number: 2, position: '4')
bal.players.build(name: 'Mancini', number: 16, position: 'DH')
bal.players.build(name: 'Ruiz', number: 14, position: '5')
bal.players.build(name: 'Rickard', number: 37, position: '9')
bal.players.build(name: 'Davis', number: 19, position: '3')
bal.players.build(name: 'Sucre', number: 40, position: '2')
bal.players.build(name: 'Martin', number: 1, position: '6')
bal.save


bos = Team.new(name: "Boston Red Sox")
bos.players.build(name: 'Benintendi', number: 16, position: '7')
bos.players.build(name: 'Betts', number: 50, position: '9')
bos.players.build(name: 'Devers', number: 11, position: '5')
bos.players.build(name: 'Martinez', number: 28, position: 'DH')
bos.players.build(name: 'Bogaerts', number: 2, position: '6')
bos.players.build(name: 'Moreland', number: 18, position: '3')
bos.players.build(name: 'Nunez', number: 36, position: '4')
bos.players.build(name: 'Bradley Jr', number: 19, position: '8')
bos.players.build(name: 'Vasquez', number: 7, position: '2')
bos.save

nyy = Team.new(name: "New York Yankees")
nyy.players.build(name: "Gardner", number: 11, position: '8')
nyy.players.build(name: "Judge", number: 99, position: '9')
nyy.players.build(name: "Stanton", number: 27, position: '7')
nyy.players.build(name: "Voit", number: 45, position: 'DH')
nyy.players.build(name: "Andujar", number: 41, position: '5')
nyy.players.build(name: "Sanchez", number: 24, position: '2')
nyy.players.build(name: "Bird", number: 33, position: '3')
nyy.players.build(name: "Torres", number: 25, position: '4')
nyy.players.build(name: "Tulowitzki", number: 12, position: '6')
nyy.save

tb = Team.new(name: "Tampa Bay Rays")
tb.players.build(name: 'Meadows', number: 17, position: '9')
tb.players.build(name: 'Pham', number: 29, position: '7')
tb.players.build(name: 'Choi', number: 26, position: '3')
tb.players.build(name: 'Lowe', number: 8, position: 'DH')
tb.players.build(name: 'Diaz', number: 2, position: '5')
tb.players.build(name: 'Wendle', number: 18, position: '4')
tb.players.build(name: 'Adames', number: 1, position: '6')
tb.players.build(name: 'Kiermaier', number: 39, position: '8')
tb.players.build(name: 'Zunino', number: 10, position: '2')
tb.save

tor = Team.new(name: "Toronto Blue Jays")
tor.players.build(name: 'Drury', number: 3, position: '5')
tor.players.build(name: 'Grichuk', number: 15, position: '9')
tor.players.build(name: 'Hernandez', number: 37, position: '7')
tor.players.build(name: 'Smoak', number: 14, position: '3')
tor.players.build(name: 'Gurriel', number: 13, position: '4')
tor.players.build(name: 'Pillar', number: 11, position: '8')
tor.players.build(name: 'Tellez', number: 44, position: 'DH')
tor.players.build(name: 'Jansen', number: 9, position: '2')
tor.players.build(name: 'Galvis', number: 16, position: '6')
tor.save

