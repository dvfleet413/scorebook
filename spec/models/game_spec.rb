require 'rails_helper'

RSpec.describe Game, type: :model do
  it "can create a new Game instance without defining innings" do
    bos = Team.new(name: "Boston Red Sox")
    nyy = Team.new(name: "New York Yankees")
    game = Game.new
    game.home_team = bos
    game.away_team = nyy

    expect(game).to be_valid
    expect(game.home_team.name).to eq("Boston Red Sox")
    expect(game.away_team.name).to eq("New York Yankees")
  end
end
