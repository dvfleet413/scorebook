class AtBat < ApplicationRecord
  belongs_to :player
  belongs_to :inning
end
