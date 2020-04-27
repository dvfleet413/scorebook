import { AtBat } from './atBat.js'

class Inning {
    constructor(number, team, atBats = []){
        this._number = number;
        this.team = team;
        this.atBats = atBats;
    }

    get number(){
        if(this._number % 1 === 0){
            return `Top ${Math.floor(this._number)}`
        }
        else{
            return `Bottom ${Math.floor(this._number)}`
        }
    }

    checkRunners(currentGame){
        const runners = currentGame.currentInning().atBats.filter(runner => runner.baseReached > 0 && runner.baseReached < 4)
    }

    // Within a game, call renderInningInterface() to add AtBats/keep score
    // Should be called with execution context of an Inning and the current Game
    static renderInningInterface(){
        const main = document.querySelector('div.main')
        main.innerHTML = ''
        let title = document.getElementById('title')
        title.innerHTML = `<h1>${this.number} - ${this.team.name} At Bat</h1>`
    }
}

export { Inning };