import { Inning } from "./inning.js";

class AtBat {
    constructor(batter, result, baseReached, outNumber, outCode){
        this._batter = batter;
        this._result = result;
        this.baseReached = baseReached;
        this._outNumber = outNumber;
        this.outCode = outCode;
    }

    get runnerName(){
        return this._batter._name
    }


    htmlRepresentation(){
        let result = `<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td class="out">`
        if (this._outNumber){ result += `<span class='out-number'>${this._outNumber}</span>`}
        result += `</td><td></td><td class='result'>`
        if (this._result){ result += this.result}
        result += `</td></tr></table><div class='diamond`
        if (this.baseReached){ result += ` reach-${this.baseReached}`}
        result += `'></div><br /><div class='out-code'><span>`
        if (this.outCode){ result += this.outCode}
        result += `</span></div><br />`
        return result
    }

    set result(result){
        this._result = parseInt(result, 10)
    }

    get result(){
        if (this._result && this._result < 4){
            return `${this._result}B`
        }
        else if (this._result == 4){
            return 'HR'
        }
    }

    static newHTML(){
        return `<table id='current-at-bat'><tr><td></td><td></td><td></td></tr><tr><td></td><td class='out-code'></td><td></td></tr><tr><td class="out"><span></span></td><td></td><td class='result'></td></tr></table><div class='diamond'></div><div class='out-code'><span></span></div><br><br>`
    }

    static renderAtBatInterface(currentGame){
        const table = document.querySelector('table.at-bat')
        const currentInningAtBats = currentGame.innings.slice(-1)[0].atBats
        currentInningAtBats.forEach((atBat, index) => {
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
    
        // Build AtBat Square
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
    
        // Buttons to Select Hit or Out
        const hitBtn = document.createElement('input')
        hitBtn.setAttribute('type', 'submit')
        hitBtn.setAttribute('id', 'hit-btn')
        hitBtn.setAttribute('value', 'Record a Hit')
        hitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            AtBat.renderHitForm.call(this, currentGame)
        })
        table.appendChild(hitBtn)

        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            AtBat.renderOutForm.call(this, currentGame)
        })
        table.appendChild(outBtn)
    
        const atBatFormContainer = document.createElement('div')
        atBatFormContainer.setAttribute('id', 'at-bat-submit')
        table.appendChild(atBatFormContainer)
        console.log(currentGame)
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
            this.baseReached = parseInt(document.getElementById('hit-options').value, 10)
            this.result = document.getElementById('hit-options').value
            await currentGame.currentInning.checkRunners(currentGame)
            currentGame.currentInning.atBats.push(this)
            currentGame.teamAtBat.currentBatterIndex += 1;
            document.querySelector('div.main').innerHTML = '' 
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
            this.outCode = document.getElementById('out-code-text').value
            currentGame.currentInning.outs += 1
            this._outNumber = currentGame.currentInning.outs
            await currentGame.currentInning.checkRunners(currentGame)
            currentGame.currentInning.atBats.push(this)
            currentGame.teamAtBat.currentBatterIndex += 1;
            document.querySelector('div.main').innerHTML = '' 
            Inning.renderInningInterface.call(currentGame)
            AtBat.renderAtBatInterface.call(new AtBat(currentGame.currentBatter), currentGame)
            console.log(currentGame)
        })
        form.appendChild(outSubmitBtn)
    
        container.appendChild(form)
    }
}

export { AtBat };