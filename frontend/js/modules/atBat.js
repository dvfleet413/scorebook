class AtBat {
    constructor(batter, result, baseReached, outNumber, outCode){
        this._batter = batter;
        this._result = result;
        this.baseReached = baseReached;
        this._outNumber = outNumber;
        this.outCode = outCode;
    }

    htmlRepresentation(){
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

    static renderAtBatInterface = function(){
        const main = document.querySelector('div.main')
        main.innerHTML = ''
    
        // Build AtBat Square
        const atBatSquare = document.createElement('div')
        atBatSquare.setAttribute('class', 'at-bat')
        atBatSquare.setAttribute('id', 'current-at-bat')
        atBatSquare.innerHTML = this.htmlRepresentation();
        document.querySelector('.main').appendChild(atBatSquare)
    
        // Buttons to Select Hit or Out
        const hitBtn = document.createElement('input')
        hitBtn.setAttribute('type', 'submit')
        hitBtn.setAttribute('id', 'hit-btn')
        hitBtn.setAttribute('value', 'Record a Hit')
        hitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            AtBat.renderHitForm()
        })
        main.appendChild(hitBtn)

        const outBtn = document.createElement('input')
        outBtn.setAttribute('type', 'submit')
        outBtn.setAttribute('id', 'out-btn')
        outBtn.setAttribute('value', 'Record an Out')
        outBtn.addEventListener('click', (e) => {
            e.preventDefault()
            renderOutForm.call(this)
        })
        main.appendChild(outBtn)
    
        const atBatFormContainer = document.createElement('div')
        atBatFormContainer.setAttribute('id', 'at-bat-submit')
        main.appendChild(atBatFormContainer)
    }

    static renderHitForm = function(){
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
    
        // const single = document.createElement('option')
        // single.setAttribute('value', '1')
        // single.innerText = 'Single'
        // hitSelection.appendChild(single)
    
        // const double = document.createElement('option')
        // double.setAttribute('value', '2')
        // double.innerText = 'Double'
        // hitSelection.appendChild(double)
    
        // const triple = document.createElement('option')
        // triple.setAttribute('value', '3')
        // triple.innerText = 'Triple'
        // hitSelection.appendChild(triple)
    
        // const homeRun = document.createElement('option')
        // homeRun.setAttribute('value', '4')
        // homeRun.innerText = 'Home Run'
        // hitSelection.appendChild(homeRun)
    
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
            renderAtBatInterface.call(new AtBat())
        })
        form.appendChild(atBatSubmitBtn)
    
        container.appendChild(form)
    }
}

export { AtBat };