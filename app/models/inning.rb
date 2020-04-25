class Inning < ApplicationRecord
  belongs_to :game
  has_many :at_bats
end
