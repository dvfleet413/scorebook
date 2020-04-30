class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.references :team, null: false, foreign_key: true
      t.string :name
      t.integer :number
      t.string :position

      t.timestamps
    end
  end
end
