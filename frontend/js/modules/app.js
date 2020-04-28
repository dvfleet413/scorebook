import { AtBat } from './atBat.js'

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
    static renderGameSummaryTable(id, title){
        const tableTitle = document.createElement('h2')
        tableTitle.innerText = title;
        App.appendToMain(tableTitle)
        const table = document.createElement('table')
        table.setAttribute('id', id)
        table.setAttribute('class', 'at-bat')
        const headerRow = document.createElement('tr')
        for (let i = 0; i < 10; i++){
            const th = document.createElement('th')
            if (i == 0){th.innerText = 'Batter'}
            else {th.innerText = `Inning ${i}`}
            headerRow.appendChild(th)
        }
        table.appendChild(headerRow)

        for (let rowCounter = 0; rowCounter < 9; rowCounter++){
            const row = document.createElement('tr')
            row.setAttribute('id', `batter-${rowCounter}`)
            for (let columnCounter = 0; columnCounter < 10; columnCounter++){
                const cell = document.createElement('td')
                if (columnCounter == 0){cell.setAttribute('class', 'batter-name')}
                else {cell.setAttribute('class', `inning-${columnCounter}-at-bat`)}
                cell.setAttribute('id', `${id}-batter-${rowCounter}-inning-${columnCounter}`)
                row.appendChild(cell)
            }
            table.appendChild(row)
        }
        App.appendToMain(table)
    }

    // DOM manipulation related to Inning Class
    static renderInningInterface(){
        App.clearMain()
        App.assignH1AndTitle(`${this.currentInning.number} - ${this.currentInning.team.name}`, `Scorebook`)
        const table = document.createElement('table')
        table.setAttribute('class', 'at-bat')
        App.appendToMain(table)
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
        App.appendToMain(hitBtn)

        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            App.renderOutForm.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        App.appendToMain(outBtn)
    }

    static renderAtBatFormContainer(){
        const atBatFormContainer = document.createElement('div')
        atBatFormContainer.setAttribute('id', 'at-bat-submit')
        App.appendToMain(atBatFormContainer)
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
            App.renderInningInterface.call(currentGame)
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
                App.renderInningInterface.call(currentGame)
                AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
            }
        })
        form.appendChild(outSubmitBtn)
        container.appendChild(form)
    }
}

export { App }