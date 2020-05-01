class CreateAtBats < ActiveRecord::Migration[6.0]
  def change
    create_table :at_bats do |t|
      t.references :player, null: false, foreign_key: true
      t.string :result
      t.integer :base_reached
      t.integer :out_number

      t.timestamps
    end
  end
end
