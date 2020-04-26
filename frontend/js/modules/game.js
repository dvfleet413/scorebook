import { Team } from './team.js'

class Game {
    constructor(currentInning = 1.0, homeTeam, awayTeam, innings = []){
        this._currentInning = currentInning;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.innings = innings;
    }

    changeSides(){
        this._currentInning += 0.5;
    }

    static renderNewGameForm(currentGame){
        const main = document.querySelector('div.main')
        main.innerHTML = ''
    
        //Set up form
        const form = document.createElement('form')
        const formTitle = document.createElement('h4')
        formTitle.innerText = "Start a New Game"
        form.appendChild(formTitle)
    
        // Add home team datalist
        const homeLabel = document.createElement('p')
        homeLabel.innerText = "Home Team"
        form.appendChild(homeLabel)
        Team.renderTeamDatalist('home-team', homeLabel)
    
        // Add away team datalist
        const awayLabel = document.createElement('p')
        awayLabel.innerText = "Away Team"
        form.appendChild(awayLabel)
        Team.renderTeamDatalist('away-team', awayLabel)
    
        // Add Start Button
        const submitBtn = document.createElement('input')
        submitBtn.setAttribute('type', 'submit')
        submitBtn.setAttribute('id', 'start-new-game-btn')
        form.appendChild(submitBtn)
    
        // Render form
        main.appendChild(form)
    }
}

export { Game };