class AddOutCodeToAtBats < ActiveRecord::Migration[6.0]
  def change
    add_column :at_bats, :out_code, :string
  end
end
