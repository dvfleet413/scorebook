require 'rails_helper'

RSpec.describe AtBat, type: :model do
  before(:each) do
    @bos = Team.new(name: "Boston Red Sox")
    @beni = @bos.players.build(name: 'Andrew Benintendi', number: 16, position: '7')
    @nyy = Team.new(name: "New York Yankees")
    @game = Game.new
    @game.home_team = @bos
    @game.away_team = @nyy
    @inn = @game.innings.build(number: 1.0)
  end

  it "is valid with player, inning, result, base_reached, and out_number" do
    at_bat = @inn.at_bats.build(player: @beni, result: 'K', base_reached: 0, out_number: 1)
    expect(at_bat).to be_valid
  end

  it "is valid without out number" do
    at_bat = @inn.at_bats.build(player: @beni, result: '2B', base_reached: 3)
    expect(at_bat).to be_valid
  end
end
