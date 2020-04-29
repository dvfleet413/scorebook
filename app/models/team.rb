class Team < ApplicationRecord
    has_many :players
    has_many :games, inverse_of: :home_team, inverse_of: :away_team

    accepts_nested_attributes_for :players

    def players_attributes=(players)
        binding.pry
        players.each do |player|
            player_to_add = Player.find_by(name: player[:name])
            self.players << player_to_add
        end
    end
end
