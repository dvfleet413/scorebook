import { Team } from './team.js'
import { Inning } from './inning.js'
import { AtBat } from './atBat.js'
import { App } from './app.js';

class Game {
    constructor(currentInning = 1.0, homeTeam, awayTeam, homeTeamRuns = 0, awayTeamRuns = 0, innings = [], isOver = false){
        this._currentInning = currentInning;
        this.homeTeamAttributes = homeTeam
        this.awayTeamAttributes = awayTeam
        this.homeTeamRuns = homeTeamRuns;
        this.awayTeamRuns = awayTeamRuns;
        this.inningsAttributes = innings;
        this.isOver = isOver
    }

    get innings(){
        return this.inningsAttributes
    }

    get homeTeam(){
        return this.homeTeamAttributes
    }

    set homeTeam(homeTeam){
        this.homeTeamAttributes = homeTeam
    }

    get awayTeam(){
        return this.awayTeamAttributes
    }

    set awayTeam(awayTeam){
        this.awayTeamAttributes = awayTeam
    }

    get currentInning(){
        return this.inningsAttributes.slice(-1)[0]
    }

    get teamAtBat(){
        if (this.currentInning.number % 1 == 0){
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
        if (this.currentInning.number % 1 == 0){
            let index = this.awayTeam.currentBatterIndex
            return this.awayTeam.players[index]
        }
        else {
            let index = this.homeTeam.currentBatterIndex
            return this.homeTeam.players[index]
        }
    }

    calculateHomeTeamRuns(){
        let result = 0;
        const homeInnings = this.innings.filter((inning) => inning.team == this.homeTeam)
        homeInnings.forEach((inning) => {
            result += inning.atBats.filter((atBat) => atBat.baseReached == 4).length
        })
        this.homeTeamRuns = result
        return result
    }

    calculateAwayTeamRuns(){
        let result = 0;
        const awayInnings = this.innings.filter((inning) => inning.team == this.awayTeam)
        awayInnings.forEach((inning) => {
            result += inning.atBats.filter((atBat) => atBat.baseReached == 4).length
        })
        this.awayTeamRuns = result
        return result
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

    changeSides(){
        // Change sides if before the bottom of the ninth, always after top of inning, always when tied
        if (this._currentInning < 1.5 || this._currentInning % 1 == 0 || this.calculateHomeTeamRuns == this.calculateAwayTeamRuns){
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
            console.log(this)
            this.calculateAwayTeamRuns()
            this.calculateHomeTeamRuns()
            this.isOver = true;
        }
    }

    summarize(){
        this.save()
        App.clearMain()
        App.assignH1AndTitle('Game is Over', 'Scorebook - Game Complete')
        App.renderGameSummaryTable('away-team', this.awayTeam.name)
        App.renderGameSummaryTable('home-team', this.homeTeam.name)

        // Away Team
        const awayNameBoxes = document.querySelectorAll('#away-team td.batter-name')
        for (let i = 0; i < awayNameBoxes.length; i++){
            awayNameBoxes[i].innerText = this.awayTeam.players[i]._name
        }
        const awayTeamInnings = this.innings.filter(inning => inning.team == this.awayTeam)
        awayTeamInnings.forEach(inning => {
            inning.atBats.forEach(atBat => {
                const battingOrderIndex = this.awayTeam.players.findIndex(player => player == atBat.batter)
                const target = document.getElementById(`away-team-batter-${battingOrderIndex}-inning-${inning.number}`)
                const atBatSquare = document.createElement('div')
                atBatSquare.setAttribute('class', 'at-bat')
                atBatSquare.innerHTML = atBat.htmlRepresentation()
                target.appendChild(atBatSquare)
            })
        })

        // Home Team
        const homeNameBoxes = document.querySelectorAll('#home-team td.batter-name')
        for (let i = 0; i < homeNameBoxes.length; i++){
            homeNameBoxes[i].innerText = this.homeTeam.players[i]._name
        }
        const homeTeamInnings = this.innings.filter(inning => inning.team == this.homeTeam)
        homeTeamInnings.forEach(inning => {
            inning.atBats.forEach(atBat => {
                const battingOrderIndex = this.homeTeam.players.findIndex(player => player == atBat.batter)
                const target = document.getElementById(`home-team-batter-${battingOrderIndex}-inning-${Math.floor(inning.number)}`)
                const atBatSquare = document.createElement('div')
                atBatSquare.setAttribute('class', 'at-bat')
                atBatSquare.innerHTML = atBat.htmlRepresentation()
                target.appendChild(atBatSquare)
            })
        })
    }

    save(){
        // make AJAX POST call with current game to save it to the database, along with all associated records
        const url = 'http://localhost:3000/games'
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({game: this})
        }
        fetch(url, configObj)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                console.log(json)
            })
            .catch(function(error){
                console.log(error.message)
            })
    }

    static requestSavedGame(){
        // make AJAX GET call to get a game
        // create new game object from response and call summarize() to render scorecard
    }
}

export { Game };