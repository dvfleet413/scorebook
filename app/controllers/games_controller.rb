class GamesController < ApplicationController
    def show 
        set_game 
        options = {
            include: [:home_team, :away_team, :innings, :"innings.at_bats"]
        }
        render json: GameSerializer.new(@game, options)
    end

    def create
        # game = Game.new(home_team_runs: games_params[:_homeTeamRuns], away_team_runs: games_params[:_awayTeamRuns])
        binding.pry
    end


    private
        def set_game
            @game = Game.find(params[:id])
        end

        def games_params
            params.require(:game).permit(:home_team_runs, :away_team_runs)
        end
end
