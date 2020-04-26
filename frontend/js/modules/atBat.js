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
            renderHitForm.call(this)
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
}

export { AtBat };