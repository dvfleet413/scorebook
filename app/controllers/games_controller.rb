class GamesController < ApplicationController
    def show 
        set_game 
        options = {
            include: [:home_team, :away_team, :innings, :"innings.at_bats"]
        }
        render json: GameSerializer.new(@game, options)
    end

    def create
        game = Game.new(games_params)
        binding.pry
    end


    private
        def set_game
            @game = Game.find(params[:id])
        end

        def games_params
            params.require(:game).permit(:home_team_runs, :away_team_runs, 
                                        innings_attributes: [:number, 
                                            at_bats_attributes: [:name, :result, :base_reached, :out_number, :out_code]],
                                        home_team_attributes: [:name],
                                        away_team_attributes: [:name])
        end
end
