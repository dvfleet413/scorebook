class PlayersController < ApplicationController
    def show
        set_player
        render json: PlayerSerializer.new(@player)
    end

    def update
        set_player
        @player.update(players_params)
        # Send the updated object back to the client
        render json: PlayerSerializer.new(@player)
    end

    private
        def set_player
            @player = Player.find(params[:id])
        end

        def players_params
            params.require(:player).permit(:name, :number, :position)
        end
end
