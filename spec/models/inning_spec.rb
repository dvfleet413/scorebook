require 'rails_helper'

RSpec.describe Inning, type: :model do
  it "is instantiated with game and number" do
    bos = Team.new(name: "Boston Red Sox")
    nyy = Team.new(name: "New York Yankees")
    game = Game.new(home_team: bos, away_team: nyy)
    inn = game.innings.build(number: 1.0)
    expect(inn).to be_valid
    expect(inn.game).to eq(game)
    expect(inn.number).to eq(1.0)
  end
end

