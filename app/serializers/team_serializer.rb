class TeamSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name
  has_many :players
  
end
