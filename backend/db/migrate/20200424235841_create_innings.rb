class CreateInnings < ActiveRecord::Migration[6.0]
  def change
    create_table :innings do |t|
      t.references :game, null: false, foreign_key: true
      t.float :number

      t.timestamps
    end
  end
end
