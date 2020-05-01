class Player < ApplicationRecord
  belongs_to :team
  has_many :at_bats
end
