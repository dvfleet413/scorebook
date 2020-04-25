class TeamsController < ApplicationController
    def show 
        set_team
        options = {
            include: [:players]
        }
        render json: TeamSerializer.new(@team, options)
    end


    private
        def set_team
            @team = Team.find(params[:id])
        end
end
