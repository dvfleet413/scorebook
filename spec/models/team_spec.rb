require 'rails_helper'

RSpec.describe Team, type: :model do
  it "is instantiated with a name" do
    bos = Team.new(name: "Boston Red Sox")
    expect(bos).to be_valid
    expect(bos.name).to eq("Boston Red Sox")
  end
end
