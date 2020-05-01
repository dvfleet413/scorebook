class InningSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :number
  belongs_to :game
  has_many :at_bats
  
end
