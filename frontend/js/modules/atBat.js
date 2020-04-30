import { App } from "./app.js";


class AtBat {
    constructor(batter, result, baseReached, outNumber, outCode){
        this.batter = batter;
        this.name = batter._name
        this.result = result;
        this.baseReached = baseReached;
        this.outNumber = outNumber;
        this.outCode = outCode;
    }

    get runnerName(){
        return this.batter._name
    }

    htmlRepresentation(){
        let result = `<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td class="out">`
        if (this.outNumber){ result += `<span class='out-number'>${this.outNumber}</span>`}
        result += `</td><td></td><td class='result'>`
        if (this.result){ result += this.hitDescription}
        result += `</td></tr></table><div class='diamond`
        if (this.baseReached){ result += ` reach-${this.baseReached}`}
        result += `'></div><br /><div class='out-code'><span>`
        if (this.outCode){ result += this.outCode}
        result += `</span></div><br />`
        return result
    }

    get hitDescription(){
        if (this.result && this.result < 4){
            return `${this.result}B`
        }
        else if (this.result == 4){
            return 'HR'
        }
    }

    static newHTML(){
        return `<table id='current-at-bat'><tr><td></td><td></td><td></td></tr><tr><td></td><td class='out-code'></td><td></td></tr><tr><td class="out"><span></span></td><td></td><td class='result'></td></tr></table><div class='diamond'></div><div class='out-code'><span></span></div><br><br>`
    }

    static renderAtBatInterface(currentGame){
        App.renderAtBatSquares(currentGame.currentInning.atBats)
        App.renderCurrentAtBatSquare(currentGame)
        App.renderAtBatButtons(currentGame)
        App.renderAtBatFormContainer()
        console.log(currentGame)
    }
}

export { AtBat };