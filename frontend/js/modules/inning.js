import { AtBat } from './atBat.js'
import { App } from './app.js';

class Inning {
    constructor(number, team, atBats = [], outs = 0){
        this._number = number;
        this.team = team;
        this.atBats = atBats;
        this.outs = outs;
    }

    get number(){
        if(this._number % 1 === 0){ return `Top ${Math.floor(this._number)}` }
        else{ return `Bottom ${Math.floor(this._number)}` }
    }

    async checkRunners(currentGame){
        const runners = currentGame.currentInning.atBats.filter(runner => runner.baseReached > 0 && runner.baseReached < 4)
        for (let i = 0; i < runners.length; i++){
            await App.renderCheckRunnerForm(runners[i])
        }
    }

    // static renderInningInterface(){
    //     App.clearMain()
    //     App.assignH1AndTitle(`${this.currentInning.number} - ${this.currentInning.team.name}`, `Scorebook`)
    //     const table = document.createElement('table')
    //     table.setAttribute('class', 'at-bat')
    //     App.appendToMain(table)
    // }
}

export { Inning };