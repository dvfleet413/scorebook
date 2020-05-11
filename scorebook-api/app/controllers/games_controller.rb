class GamesController < ApplicationController
    def index
        games = Game.all
        options = {
            include: [:home_team, :'home_team.players', :away_team, :'away_team.players', :innings, :"innings.at_bats"]
        }
        render json: GameSerializer.new(games, options)
    end

    def show 
        set_game 
        options = {
            include: [:home_team, :'home_team.players', :away_team, :'away_team.players', :innings, :"innings.at_bats"]
        }
        render json: GameSerializer.new(@game, options)
    end

    def create
        game = Game.create!(games_params)
    end


    private
        def set_game
            @game = Game.find(params[:id])
        end

        def games_params
            params.require(:game).permit(:home_team_runs, :away_team_runs, 
                                        innings_attributes: [:number, 
                                            at_bats_attributes: [:name, :result, :base_reached, :out_number, :out_code]],
                                        home_team_attributes: [:name,
                                            players_attributes: [:name]],
                                        away_team_attributes: [:name,
                                            players_attributes: [:name]])
        end
end
