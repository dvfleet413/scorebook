# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Team.create!([
  {name: "Baltimore Orioles"},
  {name: "Boston Red Sox"},
  {name: "New York Yankees"},
  {name: "Tampa Bay Rays"},
  {name: "Toronto Blue Jays"}
])

Player.create!([
  {team_id: 1, name: "Mullins", number: 3, position: "8"},
  {team_id: 1, name: "Smith", number: 35, position: "7"},
  {team_id: 1, name: "Villar", number: 2, position: "4"},
  {team_id: 1, name: "Mancini", number: 16, position: "DH"},
  {team_id: 1, name: "Ruiz", number: 14, position: "5"},
  {team_id: 1, name: "Rickard", number: 37, position: "9"},
  {team_id: 1, name: "Davis", number: 19, position: "3"},
  {team_id: 1, name: "Sucre", number: 40, position: "2"},
  {team_id: 1, name: "Martin", number: 1, position: "6"},
  {team_id: 2, name: "Benintendi", number: 16, position: "7"},
  {team_id: 2, name: "Betts", number: 50, position: "9"},
  {team_id: 2, name: "Devers", number: 11, position: "5"},
  {team_id: 2, name: "Martinez", number: 28, position: "DH"},
  {team_id: 2, name: "Bogaerts", number: 2, position: "6"},
  {team_id: 2, name: "Moreland", number: 18, position: "3"},
  {team_id: 2, name: "Nunez", number: 36, position: "4"},
  {team_id: 2, name: "Bradley Jr", number: 19, position: "8"},
  {team_id: 2, name: "Vasquez", number: 7, position: "2"},
  {team_id: 3, name: "Gardner", number: 11, position: "8"},
  {team_id: 3, name: "Judge", number: 99, position: "9"},
  {team_id: 3, name: "Stanton", number: 27, position: "7"},
  {team_id: 3, name: "Voit", number: 45, position: "DH"},
  {team_id: 3, name: "Andujar", number: 41, position: "5"},
  {team_id: 3, name: "Sanchez", number: 24, position: "2"},
  {team_id: 3, name: "Bird", number: 33, position: "3"},
  {team_id: 3, name: "Torres", number: 25, position: "4"},
  {team_id: 3, name: "Tulowitzki", number: 12, position: "6"},
  {team_id: 4, name: "Meadows", number: 17, position: "9"},
  {team_id: 4, name: "Pham", number: 29, position: "7"},
  {team_id: 4, name: "Choi", number: 26, position: "3"},
  {team_id: 4, name: "Lowe", number: 8, position: "DH"},
  {team_id: 4, name: "Diaz", number: 2, position: "5"},
  {team_id: 4, name: "Wendle", number: 18, position: "4"},
  {team_id: 4, name: "Adames", number: 1, position: "6"},
  {team_id: 4, name: "Kiermaier", number: 39, position: "8"},
  {team_id: 4, name: "Zunino", number: 10, position: "2"},
  {team_id: 5, name: "Drury", number: 3, position: "5"},
  {team_id: 5, name: "Grichuk", number: 15, position: "9"},
  {team_id: 5, name: "Hernandez", number: 37, position: "7"},
  {team_id: 5, name: "Smoak", number: 14, position: "3"},
  {team_id: 5, name: "Gurriel", number: 13, position: "4"},
  {team_id: 5, name: "Pillar", number: 11, position: "8"},
  {team_id: 5, name: "Tellez", number: 44, position: "DH"},
  {team_id: 5, name: "Jansen", number: 9, position: "2"},
  {team_id: 5, name: "Galvis", number: 16, position: "6"}
])

Game.create!([
  {home_team_id: 2, away_team_id: 3, home_team_runs: 5, away_team_runs: 1}
])

Inning.create!([
  {game_id: 1, number: 1.0},
  {game_id: 1, number: 1.5},
  {game_id: 1, number: 2.0},
  {game_id: 1, number: 2.5},
  {game_id: 1, number: 3.0},
  {game_id: 1, number: 3.5},
  {game_id: 1, number: 4.0},
  {game_id: 1, number: 4.5},
  {game_id: 1, number: 5.0},
  {game_id: 1, number: 5.5},
  {game_id: 1, number: 6.0},
  {game_id: 1, number: 6.5},
  {game_id: 1, number: 7.0},
  {game_id: 1, number: 7.5},
  {game_id: 1, number: 8.0},
  {game_id: 1, number: 8.5},
  {game_id: 1, number: 9.0},
  {game_id: 1, number: 9.5}
])

AtBat.create!([
  {player_id: 19, result: "1", base_reached: 3, out_number: nil, inning_id: 1, out_code: nil},
  {player_id: 20, result: nil, base_reached: nil, out_number: 1, inning_id: 1, out_code: "K"},
  {player_id: 21, result: nil, base_reached: nil, out_number: 2, inning_id: 1, out_code: "F-9"},
  {player_id: 22, result: "2", base_reached: 2, out_number: nil, inning_id: 1, out_code: nil},
  {player_id: 23, result: nil, base_reached: nil, out_number: 3, inning_id: 1, out_code: "K"},
  {player_id: 10, result: "BB", base_reached: 4, out_number: nil, inning_id: 2, out_code: nil},
  {player_id: 11, result: nil, base_reached: nil, out_number: 1, inning_id: 2, out_code: "K"},
  {player_id: 12, result: "2", base_reached: 4, out_number: nil, inning_id: 2, out_code: nil},
  {player_id: 13, result: nil, base_reached: nil, out_number: 2, inning_id: 2, out_code: "U-3"},
  {player_id: 14, result: "4", base_reached: 4, out_number: nil, inning_id: 2, out_code: nil},
  {player_id: 15, result: nil, base_reached: nil, out_number: 3, inning_id: 2, out_code: "F-8"},
  {player_id: 24, result: nil, base_reached: nil, out_number: 1, inning_id: 3, out_code: "5-3"},
  {player_id: 25, result: nil, base_reached: nil, out_number: 2, inning_id: 3, out_code: "5-3"},
  {player_id: 26, result: nil, base_reached: nil, out_number: 3, inning_id: 3, out_code: "U-3"},
  {player_id: 16, result: nil, base_reached: nil, out_number: 1, inning_id: 4, out_code: "6-3"},
  {player_id: 17, result: "2", base_reached: 2, out_number: nil, inning_id: 4, out_code: nil},
  {player_id: 18, result: nil, base_reached: nil, out_number: 2, inning_id: 4, out_code: "K"},
  {player_id: 10, result: nil, base_reached: nil, out_number: 3, inning_id: 4, out_code: "F-9"},
  {player_id: 27, result: "1", base_reached: 1, out_number: nil, inning_id: 5, out_code: nil},
  {player_id: 19, result: nil, base_reached: nil, out_number: 1, inning_id: 5, out_code: "U-3"},
  {player_id: 20, result: nil, base_reached: nil, out_number: 2, inning_id: 5, out_code: "F-8"},
  {player_id: 21, result: nil, base_reached: nil, out_number: 3, inning_id: 5, out_code: "K"},
  {player_id: 11, result: "2", base_reached: 4, out_number: nil, inning_id: 6, out_code: nil},
  {player_id: 12, result: "2", base_reached: 2, out_number: nil, inning_id: 6, out_code: nil},
  {player_id: 13, result: nil, base_reached: nil, out_number: 1, inning_id: 6, out_code: "F-9"},
  {player_id: 14, result: nil, base_reached: nil, out_number: 2, inning_id: 6, out_code: "K"},
  {player_id: 15, result: nil, base_reached: nil, out_number: 3, inning_id: 6, out_code: "F-7"},
  {player_id: 22, result: nil, base_reached: nil, out_number: 1, inning_id: 7, out_code: "K"},
  {player_id: 23, result: nil, base_reached: nil, out_number: 2, inning_id: 7, out_code: "K"},
  {player_id: 24, result: nil, base_reached: nil, out_number: 3, inning_id: 7, out_code: "K"},
  {player_id: 16, result: "1", base_reached: 2, out_number: nil, inning_id: 8, out_code: nil},
  {player_id: 17, result: nil, base_reached: nil, out_number: 1, inning_id: 8, out_code: "F-8"},
  {player_id: 18, result: nil, base_reached: nil, out_number: 2, inning_id: 8, out_code: "K"},
  {player_id: 10, result: "BB", base_reached: 1, out_number: nil, inning_id: 8, out_code: nil},
  {player_id: 11, result: nil, base_reached: nil, out_number: 3, inning_id: 8, out_code: "K"},
  {player_id: 25, result: nil, base_reached: nil, out_number: 1, inning_id: 9, out_code: "K"},
  {player_id: 26, result: nil, base_reached: nil, out_number: 2, inning_id: 9, out_code: "U-3"},
  {player_id: 27, result: nil, base_reached: nil, out_number: 3, inning_id: 9, out_code: "F-8"},
  {player_id: 12, result: nil, base_reached: nil, out_number: 1, inning_id: 10, out_code: "F-8"},
  {player_id: 13, result: nil, base_reached: nil, out_number: 2, inning_id: 10, out_code: "K"},
  {player_id: 14, result: "1", base_reached: 1, out_number: nil, inning_id: 10, out_code: nil},
  {player_id: 15, result: nil, base_reached: nil, out_number: 3, inning_id: 10, out_code: "U-3"},
  {player_id: 19, result: nil, base_reached: nil, out_number: 1, inning_id: 11, out_code: "K"},
  {player_id: 20, result: nil, base_reached: nil, out_number: 2, inning_id: 11, out_code: "6-3"},
  {player_id: 21, result: "2", base_reached: 2, out_number: nil, inning_id: 11, out_code: nil},
  {player_id: 22, result: nil, base_reached: nil, out_number: 3, inning_id: 11, out_code: "F-7"},
  {player_id: 16, result: "2", base_reached: 4, out_number: nil, inning_id: 12, out_code: nil},
  {player_id: 17, result: nil, base_reached: nil, out_number: 1, inning_id: 12, out_code: "K"},
  {player_id: 18, result: nil, base_reached: nil, out_number: 2, inning_id: 12, out_code: "K"},
  {player_id: 10, result: "1", base_reached: 1, out_number: nil, inning_id: 12, out_code: nil},
  {player_id: 11, result: nil, base_reached: nil, out_number: 3, inning_id: 12, out_code: "U-3"},
  {player_id: 23, result: nil, base_reached: nil, out_number: 1, inning_id: 13, out_code: "F-7"},
  {player_id: 24, result: nil, base_reached: nil, out_number: 2, inning_id: 13, out_code: "K"},
  {player_id: 25, result: nil, base_reached: nil, out_number: 3, inning_id: 13, out_code: "5-3"},
  {player_id: 12, result: "1", base_reached: 1, out_number: nil, inning_id: 14, out_code: nil},
  {player_id: 13, result: nil, base_reached: nil, out_number: 1, inning_id: 14, out_code: "F-9"},
  {player_id: 14, result: nil, base_reached: nil, out_number: 2, inning_id: 14, out_code: "F-8"},
  {player_id: 15, result: nil, base_reached: nil, out_number: 3, inning_id: 14, out_code: "6-3"},
  {player_id: 26, result: nil, base_reached: nil, out_number: 1, inning_id: 15, out_code: "6-3"},
  {player_id: 27, result: nil, base_reached: nil, out_number: 2, inning_id: 15, out_code: "F-7"},
  {player_id: 19, result: "4", base_reached: 4, out_number: nil, inning_id: 15, out_code: nil},
  {player_id: 20, result: nil, base_reached: nil, out_number: 3, inning_id: 15, out_code: "K"},
  {player_id: 16, result: nil, base_reached: nil, out_number: 1, inning_id: 16, out_code: "U-3"},
  {player_id: 17, result: nil, base_reached: nil, out_number: 2, inning_id: 16, out_code: "F-9"},
  {player_id: 18, result: nil, base_reached: nil, out_number: 3, inning_id: 16, out_code: "5-3"},
  {player_id: 21, result: nil, base_reached: nil, out_number: 1, inning_id: 17, out_code: "K"},
  {player_id: 22, result: nil, base_reached: nil, out_number: 2, inning_id: 17, out_code: "6-3"},
  {player_id: 23, result: "2", base_reached: 2, out_number: nil, inning_id: 17, out_code: nil},
  {player_id: 24, result: nil, base_reached: nil, out_number: 3, inning_id: 17, out_code: "F-8"},
  {player_id: 10, result: nil, base_reached: nil, out_number: 1, inning_id: 18, out_code: "F-7"},
  {player_id: 11, result: nil, base_reached: nil, out_number: 2, inning_id: 18, out_code: "F-9"},
  {player_id: 12, result: nil, base_reached: nil, out_number: 3, inning_id: 18, out_code: "F-7"}
])