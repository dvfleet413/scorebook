require 'rails_helper'

RSpec.describe AtBat, type: :model do
  it "is instantiated with player" do
    bos = Team.new(name: "Boston Red Sox")
    nyy = Team.new(name: "New York Yankees")
    game = Game.new
    game.home_team = bos
    game.away_team = nyy
    inn = game.innings.build(number: 1.0)
    expect(inn).to be_valid
    expect(inn.game).to eq(game)
    expect(inn.number).to eq(1.0)
  end
end
