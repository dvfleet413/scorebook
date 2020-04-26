import { Team } from './team.js'
import { Inning } from './inning.js'
import { AtBat } from './atBat.js'

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
        
        submitBtn.addEventListener('click', function(e){
            e.preventDefault();
            console.log("Submit Btn clicked...in the callback")
            const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
            const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
            currentGame.homeTeam = homeTeam;
            currentGame.awayTeam = awayTeam;
            let currentInning = new Inning(1.0, currentGame.awayTeam)
            currentGame.innings.push(currentInning)
            Inning.renderInningInterface.call(currentInning)
            AtBat.renderAtBatInterface.call(new AtBat(), currentGame)
        })
        form.appendChild(submitBtn)
    
        // Render form
        main.appendChild(form)
    }
}

export { Game };