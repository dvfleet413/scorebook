import { AtBat } from './atBat.js'
import { Inning } from "./inning.js";


// This Class contains the functions that primarily deal with DOM manipulation 
// such as clearing pages, rendering tables, rendering forms and buttons, 
// adding event listeners, etc.
class App {

    // General DOM Manipulation
    static assignH1AndTitle(heading, title = 'Scorebook'){
        document.getElementById('title').innerHTML = `<h1>${heading}</h1>`
        document.querySelector('title').innerText = title
    }

    static clearMain(){
        const main = document.querySelector('div.main')
        main.innerHTML = ''
    }

    static appendToMain(element){
        const main = document.querySelector('div.main')
        main.appendChild(element)
    }

    //DOM manipulation related to Game Class
    static renderGameSummary(currentGame){
        const main = document.querySelector('div.main')
        main.innerHTML = `<p>${currentGame.awayTeam.name} - ${currentGame.awayTeamRuns}</p><p>${currentGame.homeTeam.name} - ${currentGame.homeTeamRuns}</p>`
    }

    // DOM manipulation related to the AtBat Class
    static renderAtBatSquares(atBats){
        const table = document.querySelector('table.at-bat')
        atBats.forEach((atBat, index) => {
            const atBatSquare = document.createElement('div')
            atBatSquare.setAttribute('class', 'at-bat')
            atBatSquare.innerHTML = atBat.htmlRepresentation()
            const tableRow = document.createElement('tr')
            tableRow.setAttribute('id', `batter-${index}`)
            const nameTd = document.createElement('td')
            nameTd.innerText = atBat.runnerName
            tableRow.appendChild(nameTd)
            const atBatTd = document.createElement('td')
            tableRow.appendChild(atBatTd)
            atBatTd.append(atBatSquare)
            table.appendChild(tableRow)
        })
    }

    static renderCurrentAtBatSquare(currentGame){
        const table = document.querySelector('table.at-bat')
        const atBatSquare = document.createElement('div')
        atBatSquare.setAttribute('class', 'at-bat')
        atBatSquare.setAttribute('id', 'current-at-bat')
        atBatSquare.innerHTML = AtBat.newHTML();
        const tableRow = document.createElement('tr')
        const nameTd = document.createElement('td')
        nameTd.innerText = currentGame.currentBatter._name
        tableRow.appendChild(nameTd)
        const atBatTd = document.createElement('td')
        tableRow.appendChild(atBatTd)
        atBatTd.append(atBatSquare)
        table.appendChild(tableRow)
    }

    static renderAtBatButtons(currentGame){
        const table = document.querySelector('table.at-bat')
        const hitBtn = document.createElement('input')
        hitBtn.setAttribute('type', 'submit')
        hitBtn.setAttribute('id', 'hit-btn')
        hitBtn.setAttribute('value', 'Record a Hit')
        hitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(`what is this?`)
            console.log(this)
            App.renderHitForm.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        table.appendChild(hitBtn)

        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            App.renderOutForm.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        table.appendChild(outBtn)
    }

    static renderAtBatFormContainer(){
        const table = document.querySelector('table.at-bat')
        const atBatFormContainer = document.createElement('div')
        atBatFormContainer.setAttribute('id', 'at-bat-submit')
        table.appendChild(atBatFormContainer)
    }

    static renderHitForm(currentGame){
        const container = document.getElementById('at-bat-submit')
        container.innerHTML = ''
        // Build Form for AtBat Result
        const form = document.createElement('form')
        form.setAttribute('class', 'at-bat-form')
        // Select element for hit
        const hitSelection = document.createElement('select')
        hitSelection.setAttribute('id', 'hit-options')
        hitSelection.innerHTML = `<option value='1'>Single</option><option value='2'>Double</option><option value='3'>Triple</option><option value='4'>Home Run</option>`
        form.appendChild(hitSelection)
        // Submit Button
        const atBatSubmitBtn = document.createElement('input')
        atBatSubmitBtn.setAttribute('type', 'submit')
        atBatSubmitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            currentGame.teamAtBat.currentBatterIndex += 1;
            this.baseReached = parseInt(document.getElementById('hit-options').value, 10)
            this.result = document.getElementById('hit-options').value
            await currentGame.currentInning.checkRunners(currentGame)
            currentGame.currentInning.atBats.push(this)
            App.clearMain()
            Inning.renderInningInterface.call(currentGame)
            AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        form.appendChild(atBatSubmitBtn)
    
        container.appendChild(form)
    }

    static renderOutForm(currentGame){
        const container = document.getElementById('at-bat-submit')
        container.innerHTML = ''
        // Build Form for AtBat Result
        const form = document.createElement('form')
        form.setAttribute('class', 'out-code-form')
        // Text input for out code
        const outCodeInput = document.createElement('input')
        outCodeInput.setAttribute('type', 'text')
        outCodeInput.setAttribute('id', 'out-code-text')
        outCodeInput.value = 'Out Code'
        form.appendChild(outCodeInput)
        // Submit Button
        const outSubmitBtn = document.createElement('input')
        outSubmitBtn.setAttribute('type', 'submit')
        outSubmitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            currentGame.teamAtBat.currentBatterIndex += 1; 
            this.outCode = document.getElementById('out-code-text').value
            currentGame.currentInning.outs += 1
            this._outNumber = currentGame.currentInning.outs
            currentGame.currentInning.atBats.push(this)
            if (currentGame.currentInning.outs == 3){ 
                currentGame.changeSides()
            }
            else{ 
                await currentGame.currentInning.checkRunners(currentGame)
            }
            if (currentGame.isOver){
                currentGame.summarize()
            }
            else {
                App.clearMain()
                Inning.renderInningInterface.call(currentGame)
                AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
            }
        })
        form.appendChild(outSubmitBtn)
        container.appendChild(form)
    }
}

export { App }