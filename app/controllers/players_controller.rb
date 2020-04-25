class PlayersController < ApplicationController
    def show
        set_player
        render json: PlayerSerializer.new(@player)
    end

    private
        def set_player
            @player = Player.find(params[:id])
        end
end
