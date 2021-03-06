class Inning {
    constructor(number, team, atBats = [], outs = 0){
        this.number = number;
        this.team = team;
        this.atBats = atBats;
        this.atBatsAttributes = this.atBats;
        this.outs = outs;
    }

    get numberDescription(){
        if(this.number % 1 === 0){ return `Top ${Math.floor(this.number)}` }
        else{ return `Bottom ${Math.floor(this.number)}` }
    }

    async checkRunners(currentGame){
        const runners = currentGame.currentInning.atBats.filter(runner => runner.baseReached > 0 && runner.baseReached < 4)
        for (let i = 0; i < runners.length; i++){
            await app.renderCheckRunnerForm(runners[i])
        }
    }
}