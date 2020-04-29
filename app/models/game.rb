class Game < ApplicationRecord
    belongs_to :home_team, class_name: "Team", foreign_key: :home_team_id
    belongs_to :away_team, class_name: "Team", foreign_key: :away_team_id
    has_many :innings
    accepts_nested_attributes_for :innings
    accepts_nested_attributes_for :home_team
    accepts_nested_attributes_for :away_team

    def home_team_attributes=(home_team)
        self.home_team = Team.find_by(name: home_team[:name])
    end

    def away_team_attributes=(away_team)
        self.away_team = Team.find_by(name: away_team[:name])
    end
end
