class Adapter {
    constructor(url){
        this.url = url
    }

    getGames(){
        return new Promise((resolve, reject) => {
            const url = `${this.url}/games`
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    json.data.forEach(game => {
                        let gameToAdd = new Game()
                        const homeTeamId = game['relationships']['homeTeam']['data']['id']
                        const homeTeamData = json['included'].find((element) => element.type == 'team' && element.id == homeTeamId)
                        gameToAdd.homeTeam = app.teams.find(team => team.name == homeTeamData['attributes']['name'])
                        const awayTeamId = game['relationships']['awayTeam']['data']['id']
                        const awayTeamData = json['included'].find((element) => element.type == 'team' && element.id == awayTeamId)
                        gameToAdd.awayTeam = app.teams.find(team => team.name == awayTeamData['attributes']['name'])
                        gameToAdd.homeTeamRuns = game['attributes']['homeTeamRuns']
                        gameToAdd.awayTeamRuns = game['attributes']['awayTeamRuns']
                        // Build Inning Objects to add to Game
                        const inningIds = game['relationships']['innings']['data'].map(inning => inning.id)
                        const inningsArray = json['included'].filter(element => element.type == 'inning' && inningIds.includes(element.id))
                        inningsArray.forEach(inning => {
                            const newInning = new Inning(inning['attributes']['number'])
                            if (newInning.number % 1 == 0){newInning.team = gameToAdd.awayTeam}
                            else {newInning.team = gameToAdd.homeTeam }
                            const atBatIds = inning['relationships']['atBats']['data'].map(element => element.id)
                            const atBatsArray = json['included'].filter((element => element.type == 'atBat' && atBatIds.includes(element.id)))
                            atBatsArray.forEach(atBat => {
                                let batter
                                if (newInning.number % 1 == 0){
                                    batter = gameToAdd.awayTeam.players.find(player => player._name == atBat.attributes.player.name)
                                }
                                else {
                                    batter = gameToAdd.homeTeam.players.find(player => player._name == atBat.attributes.player.name)
                                }
                                const newAtBat = new AtBat(batter, atBat.attributes.result, atBat.attributes.baseReached, atBat.attributes.outNumber, atBat.attributes.outCode)
                                newInning.atBats.push(newAtBat)
                            })
                            gameToAdd.innings.push(newInning)
                        })
                        gameToAdd.isOver = true
                        gameToAdd._currentInning = gameToAdd.innings.slice(-1)[0].number
                        gameToAdd.date = parseDate(game['attributes']['createdAt'])
                        gameToAdd.id = game['id']
                        app.addGame(gameToAdd)
                    })
                    resolve("Games Fetched")
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    postGame(game){
        // make AJAX POST call with current game to save it to the database, along with all associated records
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({game})
        }
        fetch(`${this.url}/games`, configObj)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                console.log("Successful POST")
            })
            .catch(function(error){
                console.log(error.message)
            })
    }

    getTeams(){
        return new Promise((resolve, reject) => {
            const url = `${this.url}/teams`
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    json.data.forEach(team =>{
                        const teamToAdd = new Team(team.attributes.name)
                        const playerIds = team.relationships.players.data.map(element => element.id)
                        json.included.forEach(player => {
                            if (playerIds.includes(player.id)){
                                teamToAdd.players.push(new Player(player.attributes.name, player.attributes.number, player.attributes.position))
                            }
                        })
                        app.teams.push(teamToAdd)
                    })
                    resolve("Teams Added")
                })
                .catch(error => {
                    reject(error)
                })
            })
    }
}