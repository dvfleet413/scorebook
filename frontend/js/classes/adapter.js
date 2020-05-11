class Adapter {
    constructor(url){
        this.url = url
    }

    fetchGames(){
        const url = `${this.url}/games`
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(json => {
                // want to instantiate new Game objects for each game record fetched and add them to app.games
                // Build blank Game Object
                let gameToAdd = new Game()
                // Build Team and Player Objects to add to Game
                for(let i = 0; i < json.data.length; i++){
                    const homeTeamId = json['data'][i]['relationships']['homeTeam']['data']['id']
                    const homeTeamData = json['included'].find((element) => element.type == 'team' && element.id == homeTeamId)
                    gameToAdd.homeTeam = new Team (homeTeamData['attributes']['name'])
                    const homeTeamPlayerIds = homeTeamData['relationships']['players']['data'].map(element => element.id)
                    const homeTeamPlayersArray = json['included'].filter(element => element.type == 'player' && homeTeamPlayerIds.includes(element.id))
                    homeTeamPlayersArray.forEach(player => {
                        const newPlayer = new Player(player.attributes.name, player.attributes.number, player.attributes.position)
                        gameToAdd.homeTeam.players.push(newPlayer)
                    })
                    const awayTeamId = json['data'][i]['relationships']['awayTeam']['data']['id']
                    const awayTeamData = json['included'].find((element) => element.type == 'team' && element.id == awayTeamId)
                    gameToAdd.awayTeam = new Team (awayTeamData['attributes']['name'])
                    const awayTeamPlayerIds = awayTeamData['relationships']['players']['data'].map(element => element.id)
                    const awayTeamPlayersArray = json['included'].filter(element => element.type == 'player' && awayTeamPlayerIds.includes(element.id))
                    awayTeamPlayersArray.forEach(player => {
                        const newPlayer = new Player(player.attributes.name, player.attributes.number, player.attributes.position)
                        gameToAdd.awayTeam.players.push(newPlayer)
                    })
                    gameToAdd.homeTeamRuns = json['data'][i]['attributes']['homeTeamRuns']
                    gameToAdd.awayTeamRuns = json['data'][i]['attributes']['awayTeamRuns']
                    // Build Inning Objects to add to Game
                    const inningsArray = json['included'].filter(element => element.type == 'inning')
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
                    app.addGame(gameToAdd)
                }
            })
    }

    postGame(){

    }

}