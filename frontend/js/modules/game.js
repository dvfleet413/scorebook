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

    changeSides(){
        this._currentInning += 0.5;
    }


    static renderNewGameForm(currentGame){
        document.getElementById('title').innerHTML = `<h1>Start a New Game</h1>`
        const main = document.querySelector('div.main')
        main.innerHTML = ''
    
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
            console.log('after homeTeam.getPlayers()')
            console.log(homeTeam)
            const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
            await awayTeam.getPlayers()
            console.log('after awayTeam.getPlayers()')
            console.log(awayTeam)
            currentGame.homeTeam = homeTeam;
            currentGame.awayTeam = awayTeam;
            let currentInning = new Inning(1.0, currentGame.awayTeam)
            currentGame.innings.push(currentInning)
            console.log(currentGame)
            Inning.renderInningInterface.call(currentGame)
            AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        form.appendChild(submitBtn)
    
        // Render form
        main.appendChild(form)
    }
}

export { Game };