class Inning < ApplicationRecord
  belongs_to :game
  has_many :at_bats

  accepts_nested_attributes_for :at_bats
end
