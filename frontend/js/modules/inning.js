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

    // Within a game, call renderInningInterface() to add AtBats/keep score
    // Should be called with execution context of an Inning and the current Game
    static renderInningInterface(){
        const main = document.querySelector('div.main')
        main.innerHTML = ''
        let title = document.createElement('h1')
        title.innerText = `${this.number} - ${this.team.name} At Bat`
        main.appendChild(title)
        renderAtBatInterface.call(new AtBat())
    }
}

export { Inning };