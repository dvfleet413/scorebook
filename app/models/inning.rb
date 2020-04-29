class Inning < ApplicationRecord
  belongs_to :game
  has_many :at_bats

  accepts_nested_attributes_for :at_bats

  def at_bats_attributes=(at_bats)
    at_bats.each do |at_bat|
      binding.pry
      new_at_bat = AtBat.new(base_reached: at_bat[:base_reached], out_code: at_bat[:out_code])
      new_at_bat.player = Player.find(name: at_bat[:name])
      self.at_bats << new_at_bat
    end
  end
end
