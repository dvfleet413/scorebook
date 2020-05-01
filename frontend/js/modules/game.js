import { Team } from './team.js'
import { Inning } from './inning.js'
import { AtBat } from './atBat.js'
import { Player } from './player.js'
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
        submitBtn.setAttribute('class', "btn btn-dark")
        
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
        // Update runs for each team after every inning change
        if (this._currentInning < 9.5 || this._currentInning % 1 == 0 || this.calculateHomeTeamRuns == this.calculateAwayTeamRuns){
            this._currentInning += 0.5;
            this.calculateHomeTeamRuns()
            this.calculateAwayTeamRuns()
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

        const cells = document.querySelectorAll('td.at-batt-cell')
        cells.forEach(cell => {
            if (cell.innerHTML == ""){
                cell.setAttribute('class', 'empty-cell')
                const atBatSquare = document.createElement('div')
                atBatSquare.setAttribute('class', 'at-bat')
                atBatSquare.innerHTML = AtBat.newHTML()
                cell.appendChild(atBatSquare)
            }
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

    static requestGameIndex(){

    }

    static requestSavedGame(currentGame, id){
        return new Promise((resolve, reject) => {
            // make AJAX GET call to get a game
            // create new game object from response and call summarize() to render scorecard
            const url = `http://localhost:3000/games/${id}`
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    console.log(json)
                    // Build blank Game Object
                    currentGame = new Game()
                    // Build Team and Player Objects to add to Game
                    const homeTeamId = json['data']['relationships']['homeTeam']['data']['id']
                    const homeTeamData = json['included'].find((element) => element.type == 'team' && element.id == homeTeamId)
                    currentGame.homeTeam = new Team (homeTeamData['attributes']['name'])
                    const homeTeamPlayerIds = homeTeamData['relationships']['players']['data'].map(element => element.id)
                    const homeTeamPlayersArray = json['included'].filter(element => element.type == 'player' && homeTeamPlayerIds.includes(element.id))
                    homeTeamPlayersArray.forEach(player => {
                        const newPlayer = new Player(player.attributes.name, player.attributes.number, player.attributes.position)
                        currentGame.homeTeam.players.push(newPlayer)
                    })
                    const awayTeamId = json['data']['relationships']['awayTeam']['data']['id']
                    const awayTeamData = json['included'].find((element) => element.type == 'team' && element.id == awayTeamId)
                    currentGame.awayTeam = new Team (awayTeamData['attributes']['name'])
                    const awayTeamPlayerIds = awayTeamData['relationships']['players']['data'].map(element => element.id)
                    const awayTeamPlayersArray = json['included'].filter(element => element.type == 'player' && awayTeamPlayerIds.includes(element.id))
                    awayTeamPlayersArray.forEach(player => {
                        const newPlayer = new Player(player.attributes.name, player.attributes.number, player.attributes.position)
                        currentGame.awayTeam.players.push(newPlayer)
                    })
                    currentGame.homeTeamRuns = json['data']['attributes']['homeTeamRuns']
                    currentGame.awayTeamRuns = json['data']['attributes']['awayTeamRuns']
                    // Build Inning Objects to add to Game
                    const inningsArray = json['included'].filter(element => element.type == 'inning')
                    console.log(inningsArray)
                    inningsArray.forEach(inning => {
                        const newInning = new Inning(inning['attributes']['number'])
                        if (newInning.number % 1 == 0){newInning.team = currentGame.awayTeam}
                        else {newInning.team = currentGame.homeTeam }
                        const atBatIds = inning['relationships']['atBats']['data'].map(element => element.id)
                        const atBatsArray = json['included'].filter((element => element.type == 'atBat' && atBatIds.includes(element.id)))
                        atBatsArray.forEach(atBat => {
                            let batter
                            if (newInning.number % 1 == 0){
                                batter = currentGame.awayTeam.players.find(player => player._name == atBat.attributes.player.name)
                            }
                            else {
                                batter = currentGame.homeTeam.players.find(player => player._name == atBat.attributes.player.name)
                            }
                            const newAtBat = new AtBat(batter, atBat.attributes.result, atBat.attributes.baseReached, atBat.attributes.outNumber, atBat.attributes.outCode)
                            newInning.atBats.push(newAtBat)
                        })
                        currentGame.innings.push(newInning)
                    })
                    console.log(currentGame)
                    currentGame.isOver = true
                    resolve(currentGame)
                })
                .catch((error) => {
                    console.log(error.message)
                    reject(`you don't got game`)
                })
        })
    }
}

export { Game };