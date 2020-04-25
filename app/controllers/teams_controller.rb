class TeamsController < ApplicationController
    def show 
        set_team
        render json: @team, include: [:players]
    end


    private
        def set_team
            @team = Team.find(params[:id])
        end
end
