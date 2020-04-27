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
        if (this._currentInning < 9.5 || this._currentInning % 1 == 0 || this.homeTeamRuns == this.awayTeamRuns){
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
            console.log(`Game is Over -`)
            console.log(`${this.homeTeam.name} - ${this.homeTeamRuns}`)
            console.log(`${this.awayTeam.name} - ${this.awayTeamRuns}`)
        }
    }

    summarize(){
        App.assignH1AndTitle('Game is Over', 'Scorebook - Game Complete')
        const main = document.querySelector('div.main')
        main.innerHTML = `<p>${this.awayTeam.name} - ${this.awayTeamRuns}</p><p>${this.homeTeam.name} - ${this.homeTeamRuns}</p>`
    }


    static renderNewGameForm(currentGame){
        App.assignH1AndTitle('Start a New Game', 'Scorebook - New Game')
        App.clearMain()
        const main = document.querySelector('div.main')
    
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
        
        submitBtn.addEventListener('click', async function(e){
            e.preventDefault();
            const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
            await homeTeam.getPlayers()
            const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
            await awayTeam.getPlayers()
            currentGame.homeTeam = homeTeam;
            currentGame.awayTeam = awayTeam;
            let currentInning = new Inning(1.0, currentGame.awayTeam)
            currentGame.innings.push(currentInning)
            Inning.renderInningInterface.call(currentGame)
            AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        form.appendChild(submitBtn)
    
        // Render form
        main.appendChild(form)
    }
}

export { Game };