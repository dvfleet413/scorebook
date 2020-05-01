require 'rails_helper'

RSpec.describe Player, type: :model do
  it "new player is instantiated with name, number, position, and team" do
    bos = Team.new(name: "Boston Red Sox")
    jbj = bos.players.build(name: 'Jackie Bradley Jr', number: 19, position: 8)
    expect(jbj).to be_valid
    expect(jbj.name).to eq('Jackie Bradley Jr')
    expect(jbj.number).to eq(19)
    expect(jbj.position).to eq('8')
  end
end
