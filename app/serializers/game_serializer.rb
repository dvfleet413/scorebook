class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :home_team, serializer: :team
  belongs_to :away_team, serializer: :team
  has_many :innings
end
