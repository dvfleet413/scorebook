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

    get htmlRepresentation(){
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
        if (this.result == 'BB'){
            return `BB`
        }
        else if (this.result && this.result < 4){
            return `${this.result}B`
        }
        else if (this.result == 4){
            return 'HR'
        }
    }

    static newHTML(){
        return `<table id='current-at-bat'><tr><td></td><td></td><td></td></tr><tr><td></td><td class='out-code'></td><td></td></tr><tr><td class="out"><span></span></td><td></td><td class='result'></td></tr></table><div class='diamond'></div><div class='out-code'><span></span></div><br><br>`
    }

    static hitOptions(){
        return `
        <option value='BB'>Walk</option>
        <option value='1'>Single</option>
        <option value='2'>Double</option>
        <option value='3'>Triple</option>
        <option value='4'>Home Run</option>
        `
    }

    static outOptions(){
        return `
            <option value="U-3">Ground Out To First Baseman</option>
            <option value="4-3">Ground Out To Second Baseman</option>
            <option value="6-3">Ground Out To Shortstop</option>
            <option value="5-3">Ground Out To Third Baseman</option>
            <option value="F-9">Flyout to Rightfielder</option>
            <option value="F-8">Flyout to Centerfielder</option>
            <option value="F-7">Flyout To Leftfielder</option>
            <option value="K">Strikeout</option>
        `
    }
}