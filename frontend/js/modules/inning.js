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
            await Inning.renderCheckRunnerForm(runners[i])
        }
    }

    static renderCheckRunnerForm(runner){
        return new Promise((resolve, reject) => {
            const form = document.createElement('form')
            const formTitle = document.createElement('h4')
            formTitle.innerText = runner.runnerName
            form.appendChild(formTitle)
            const selectField = document.createElement('select')
            selectField.innerHTML = `<option value='1'>First</option><option value='2'>Second</option><option value='3'>Third</option><option value='4'>Home</option>`
            form.appendChild(selectField)
            const submitBtn = document.createElement('button')
            submitBtn.setAttribute('type', 'button')
            submitBtn.innerText = "Advance Runner"
            form.appendChild(submitBtn)
            document.querySelector('.main').appendChild(form)
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault()
                runner.baseReached = selectField.value;
                resolve("Runner Updated")
            })
        })
    }

    static renderInningInterface(){
        App.clearMain()
        App.assignH1AndTitle(`${this.currentInning.number} - ${this.currentInning.team.name}`, `Scorebook`)
        const table = document.createElement('table')
        table.setAttribute('class', 'at-bat')
        App.appendToMain(table)
    }
}

export { Inning };