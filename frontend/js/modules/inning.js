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


    async checkRunners(currentGame){
        const runners = currentGame.currentInning().atBats.filter(runner => runner.baseReached > 0 && runner.baseReached < 4)
        const atBatSquares = document.querySelectorAll('.main .at-bat')
        for (let i = 0; i < runners.length; i++){
            console.log(`in forEach loop, i = ${i}`)
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