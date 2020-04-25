class GamesController < ApplicationController
    def show 
        set_game 
        options = {
            include: [:home_team, :away_team, :innings, :"innings.at_bats"]
        }
        render json: GameSerializer.new(@game, options)
    end


    private
        def set_game
            @game = Game.find(params[:id])
        end
end
