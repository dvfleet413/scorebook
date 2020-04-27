class AtBat {
    constructor(batter, result, baseReached, outNumber, outCode){
        this._batter = batter;
        this._result = result;
        this.baseReached = baseReached;
        this._outNumber = outNumber;
        this.outCode = outCode;
    }

    htmlRepresentation(){
        let result = `<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td class="out"><span>`
        if (this._outNumber){ result += this._outNumber}
        result += `</span></td><td></td><td class='result'>`
        if (this._result){ result += this._result}
        result += `</td></tr></table><div class='diamond`
        if (this.baseReached){ result += ` reach-${this.baseReached}`}
        result += `'></div><div class='out-code'><span>`
        if (this.outCode){ result += this.outCode}
        result += `</span></div><br /><br />`
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

    advanceToBase(baseReached){
        const diamond = document.querySelector('#current-at-bat~.diamond')
        this.baseReached = baseReached;
        diamond.classList.add(`reach-${this.baseReached}`)
    }

    score(){
        this.advanceToBase(4);
    }

    static newHTML(){
        return `<table id='current-at-bat'>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class='out-code'></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="out"><span></span></td>
                        <td></td>
                        <td class='result'></td>
                    </tr>
                </table>

                <div class='diamond'></div>
                <div class='out-code'><span></span></div><br />
                <br />`
    }

    static renderAtBatInterface(currentGame){
        const main = document.querySelector('div.main')
        const currentInningAtBats = currentGame.innings.slice(-1)[0].atBats
        currentInningAtBats.forEach(atBat => {
            // Add stuff to render html here when you get back
            const atBatSquare = document.createElement('div')
            atBatSquare.setAttribute('class', 'at-bat')
            atBatSquare.innerHTML = atBat.htmlRepresentation()
            main.appendChild(atBatSquare)
        })
        console.log(currentGame.innings.slice(-1)[0])
        console.log(currentInningAtBats)
    
        // Build AtBat Square
        const atBatSquare = document.createElement('div')
        atBatSquare.setAttribute('class', 'at-bat')
        atBatSquare.setAttribute('id', 'current-at-bat')
        atBatSquare.innerHTML = AtBat.newHTML();
        main.appendChild(atBatSquare)
    
        // Buttons to Select Hit or Out
        const hitBtn = document.createElement('input')
        hitBtn.setAttribute('type', 'submit')
        hitBtn.setAttribute('id', 'hit-btn')
        hitBtn.setAttribute('value', 'Record a Hit')
        hitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            AtBat.renderHitForm.call(this, currentGame)
        })
        main.appendChild(hitBtn)

        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            AtBat.renderOutForm.call(this, currentGame)
        })
        main.appendChild(outBtn)
    
        const atBatFormContainer = document.createElement('div')
        atBatFormContainer.setAttribute('id', 'at-bat-submit')
        main.appendChild(atBatFormContainer)
    }

    static renderHitForm(currentGame){
        const currentAtBat = document.querySelector('div#current-at-bat')
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
        atBatSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            this.advanceToBase(parseInt(document.getElementById('hit-options').value, 10))
            this.result = document.getElementById('hit-options').value
            document.querySelector('#current-at-bat .result').innerText = this.result
            document.querySelector('div#current-at-bat').removeAttribute('id')
            document.querySelector('table#current-at-bat').removeAttribute('id')
            currentGame.innings.slice(-1)[0].atBats.push(this)
            console.log(currentGame.innings.slice(-1)[0].atBats)
            const outBtn = document.querySelector('#out-btn')
            outBtn.parentNode.removeChild(outBtn)
            const hitBtn = document.querySelector('#hit-btn')
            hitBtn.parentNode.removeChild(hitBtn)
            hitSelection.parentNode.removeChild(hitSelection)
            atBatSubmitBtn.parentNode.removeChild(atBatSubmitBtn)
            container.parentNode.removeChild(container)
            currentAtBat.parentNode.removeChild(currentAtBat)
            AtBat.renderAtBatInterface.call(new AtBat(), currentGame)
        })
        form.appendChild(atBatSubmitBtn)
    
        container.appendChild(form)
    }

    static renderOutForm(currentGame){
        const container = document.getElementById('at-bat-submit')
        container.innerHTML = ''
        const form = document.createElement('form')
        form.setAttribute('class', 'out-code-form')
        // Text input for out code
        const outCodeInput = document.createElement('input')
        outCodeInput.setAttribute('type', 'text')
        outCodeInput.setAttribute('id', 'out-code-text')
        outCodeInput.value = 'Out Code'
        form.appendChild(outCodeInput)
    
        // Submit Button
        const atBatSubmitBtn = document.createElement('input')
        atBatSubmitBtn.setAttribute('type', 'submit')
        atBatSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            currentGame.innings.slice(-1)[0].atBats.push(this)
            console.log(currentGame.innings.slice(-1)[0].atBats)
        })
        form.appendChild(atBatSubmitBtn)
    
        container.appendChild(form)
    }
}

export { AtBat };