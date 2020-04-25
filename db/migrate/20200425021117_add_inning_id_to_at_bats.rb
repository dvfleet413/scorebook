class AddInningIdToAtBats < ActiveRecord::Migration[6.0]
  def change
    add_reference :at_bats, :inning, null: false, foreign_key: true
  end
end
