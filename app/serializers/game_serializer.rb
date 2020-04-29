class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :home_team_runs, :away_team_runs, :created_at
  belongs_to :home_team, serializer: :team
  belongs_to :away_team, serializer: :team
  has_many :innings
end
