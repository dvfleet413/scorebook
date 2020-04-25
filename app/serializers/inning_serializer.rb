class InningSerializer
  include FastJsonapi::ObjectSerializer
  attributes :number
  belongs_to :game
  has_many :at_bats
end
