class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :home_team_id
      t.integer :away_team_id
      t.integer :home_team_runs
      t.integer :away_team_runs

      t.timestamps
    end
  end
end
