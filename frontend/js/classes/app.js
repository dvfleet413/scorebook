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
                else {cell.setAttribute('class', `inning-${columnCounter}-at-bat at-batt-cell`)}
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
        App.assignH1AndTitle(`${this.currentInning.numberDescription} - ${this.currentInning.team.name}`, `Scorebook`)
        const table = document.createElement('table')
        table.setAttribute('class', 'at-bat')
        App.appendToMain(table)
    }

    static renderCheckRunnerForm(runner){
        return new Promise((resolve, reject) => {
            let selectFieldOptions
            if (runner.baseReached == 1){
                selectFieldOptions =
                    `<option value='1'>Didn't Advance</option>
                    <option value='2'>Second</option>
                    <option value='3'>Third</option>
                    <option value='4'>Scored</option>`
            }
            else if (runner.baseReached == 2){
                selectFieldOptions =
                    `<option value='2'>Didn't Advance</option>
                    <option value='3'>Third</option>
                    <option value='4'>Scored</option>`
            }
            else if (runner.baseReached == 3){
                selectFieldOptions =
                    `<option value='3'>Didn't Advance</option>
                    <option value='4'>Scored</option>`
            }

            document.body.innerHTML += `
            <div class="modal fade" id="checkRunnerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Did ${runner.runnerName} Advance?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <select id="runner-advance-select">
                                ${selectFieldOptions}
                            </select>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="advance-runner-btn">Move Runner</button>
                    </div>
                    </div>
                </div>
            </div>`

            document.getElementById('advance-runner-btn').addEventListener('click', (e) => {
                runner.baseReached = document.getElementById('runner-advance-select').value
                document.getElementById('checkRunnerModal').remove()
                $('.modal-backdrop').remove()
                resolve("Runner Updated")
            })

            $('#checkRunnerModal').modal()
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
        const row = document.createElement('div')
        row.setAttribute('class', 'row result-row')
        const colOne = document.createElement('div')
        colOne.setAttribute('class', 'col-sm text-center')
        row.appendChild(colOne)
        const hitBtn = document.createElement('input')
        hitBtn.setAttribute('type', 'submit')
        hitBtn.setAttribute('id', 'hit-btn')
        hitBtn.setAttribute('value', 'Record a Hit')
        hitBtn.setAttribute('class', "btn btn-dark")
        hitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            App.renderHitForm.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        colOne.appendChild(hitBtn)
        const colTwo = document.createElement('div')
        colTwo.setAttribute('class', 'col-sm text-center')
        row.appendChild(colTwo)
        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.setAttribute('class', "btn btn-dark")
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            App.renderOutForm.call(new AtBat(currentGame.currentBatter), currentGame)
        })
        colTwo.appendChild(outBtn)
        App.appendToMain(row)
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
        hitSelection.innerHTML = AtBat.hitOptions()
        form.appendChild(hitSelection)
        // Submit Button
        const atBatSubmitBtn = document.createElement('input')
        atBatSubmitBtn.setAttribute('type', 'submit')
        atBatSubmitBtn.setAttribute('class', "btn btn-dark")
        atBatSubmitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (currentGame.teamAtBat.currentBatterIndex < 8){
                currentGame.teamAtBat.currentBatterIndex += 1;
            }
            else {
                currentGame.teamAtBat.currentBatterIndex = 0;
            }
            const result = document.getElementById('hit-options').value
            if (result == 'BB'){
                this.baseReached = 1
                this.result = 'BB'
            }
            else{
                this.baseReached = parseInt(result, 10)
                this.result = parseInt(result, 10)
            }
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
        // Select input for out code
        const outSelection = document.createElement('select')
        outSelection.setAttribute('id', 'out-code-options')
        outSelection.innerHTML = AtBat.outOptions()
        form.appendChild(outSelection)
        // Submit Button
        const outSubmitBtn = document.createElement('input')
        outSubmitBtn.setAttribute('type', 'submit')
        outSubmitBtn.setAttribute('class', "btn btn-dark")
        outSubmitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (currentGame.teamAtBat.currentBatterIndex < 8){
                currentGame.teamAtBat.currentBatterIndex += 1;
            }
            else {
                currentGame.teamAtBat.currentBatterIndex = 0;
            }
            this.outCode = document.getElementById('out-code-options').value
            currentGame.currentInning.outs += 1
            this.outNumber = currentGame.currentInning.outs
            currentGame.currentInning.atBats.push(this)
            if (currentGame.currentInning.outs == 3){ 
                currentGame.changeSides()
            }
            else{ 
                await currentGame.currentInning.checkRunners(currentGame)
            }
            if (currentGame.isOver){
                currentGame.save()
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