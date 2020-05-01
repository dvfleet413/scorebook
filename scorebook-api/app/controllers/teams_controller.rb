class TeamsController < ApplicationController

    def index
        teams = Team.all
        options = {
            include: [:players]
        }
        render json: TeamSerializer.new(teams, options)
    end

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
