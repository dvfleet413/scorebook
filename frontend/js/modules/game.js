import { Team } from './team.js'
import { Inning } from './inning.js'
import { AtBat } from './atBat.js'
import { App } from './app.js';

class Game {
    constructor(currentInning = 1.0, homeTeam, awayTeam, innings = [], isOver = false){
        this._currentInning = currentInning;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.innings = innings;
        this.isOver = isOver
    }

    get currentInning(){
        return this.innings.slice(-1)[0]
    }

    get teamAtBat(){
        if (this.currentInning._number % 1 == 0){
            return this.awayTeam
        }
        else {
            return this.homeTeam
        }
    }

    get currentAtBat(){
        if (this.currentInning.atBats.length > 0){ return this.currentInning.atBats.slice(-1)[0] }
        else { return new AtBat(this.currentBatter) }
    }

    get currentBatter(){
        if (this.currentInning._number % 1 == 0){
            let index = this.awayTeam.currentBatterIndex
            return this.awayTeam.players[index]
        }
        else {
            let index = this.homeTeam.currentBatterIndex
            return this.homeTeam.players[index]
        }
    }

    get homeTeamRuns(){
        let result = 0;
        const homeInnings = this.innings.filter((inning) => inning.team == this.homeTeam)
        homeInnings.forEach((inning) => {
            result += inning.atBats.filter((atBat) => atBat.baseReached == 4).length
        })
        return result
    }

    get awayTeamRuns(){
        let result = 0;
        const awayInnings = this.innings.filter((inning) => inning.team == this.awayTeam)
        awayInnings.forEach((inning) => {
            result += inning.atBats.filter((atBat) => atBat.baseReached == 4).length
        })
        return result
    }

    changeSides(){
        // Change sides if before the bottom of the ninth, always after top of inning, always when tied
        if (this._currentInning < 1.5 || this._currentInning % 1 == 0 || this.homeTeamRuns == this.awayTeamRuns){
            this._currentInning += 0.5;
            if (this.currentInning.team == this.homeTeam){
                this.innings.push(new Inning(this._currentInning, this.awayTeam))
            }
            else{
                this.innings.push(new Inning(this._currentInning, this.homeTeam))
            }
        }
        // If none of above conditions are met, game is over
        else {
            this.isOver = true;
        }
    }

    summarize(){
        App.assignH1AndTitle('Game is Over', 'Scorebook - Game Complete')
        App.renderGameSummaryTable('away-team')
        App.renderGameSummaryTable('home-team')
        const nameBoxes = document.querySelectorAll('#away-team td.batter-name')
        for (let i = 0; i < nameBoxes.length; i++){
            nameBoxes[i].innerText = this.awayTeam.players[i]._name
        }
        const awayTeamInnings = this.innings.filter(inning => inning.team == this.awayTeam)
        awayTeamInnings.forEach(inning => {
            inning.atBats.forEach(atBat => {
                const battingOrderIndex = this.awayTeam.players.findIndex(player => player == atBat._batter)
                const target = document.getElementById(`batter-${battingOrderIndex}-inning-${inning._number}`)
                const atBatSquare = document.createElement('div')
                atBatSquare.setAttribute('class', 'at-bat')
                atBatSquare.innerHTML = atBat.htmlRepresentation()
                target.appendChild(atBatSquare)
            })
        })

    }


    start(){
        App.assignH1AndTitle('Start a New Game', 'Scorebook - New Game')
        App.clearMain()
    
        //Set up form
        const form = document.createElement('form')
    
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
        
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
            await homeTeam.getPlayers()
            const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
            await awayTeam.getPlayers()
            this.homeTeam = homeTeam;
            this.awayTeam = awayTeam;
            let topFirst = new Inning(1.0, this.awayTeam)
            this.innings.push(topFirst)
            App.renderInningInterface.call(this)
            AtBat.renderAtBatInterface.call(new AtBat(this.currentBatter), this)
        })
        form.appendChild(submitBtn)
    
        // Render form
        App.appendToMain(form)
    }
}

export { Game };