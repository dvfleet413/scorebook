# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_25_021117) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "at_bats", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.string "result"
    t.integer "base_reached"
    t.integer "out_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "inning_id", null: false
    t.index ["inning_id"], name: "index_at_bats_on_inning_id"
    t.index ["player_id"], name: "index_at_bats_on_player_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "home_team_id"
    t.integer "away_team_id"
    t.integer "home_team_runs"
    t.integer "away_team_runs"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "innings", force: :cascade do |t|
    t.bigint "game_id", null: false
    t.float "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_innings_on_game_id"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.string "name"
    t.integer "number"
    t.string "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.integer "wins"
    t.integer "losses"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "at_bats", "innings"
  add_foreign_key "at_bats", "players"
  add_foreign_key "innings", "games"
  add_foreign_key "players", "teams"
end
