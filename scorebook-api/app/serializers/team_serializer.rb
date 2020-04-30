class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :players
end
