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
                    // Build empty Game object
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
                        gameToAdd.date = parseDate(json['data'][i]['attributes']['createdAt'])
                        gameToAdd.id = json['data'][i]['id']
                        app.addGame(gameToAdd)
                    }
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

    // Need to refactor Team.renderTeamSelect...these can probably be combined uning app.teams attribute
    getTeams(){
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
            })
    }
    getPlayers(team){
        const url = `${this.url}/teams`
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .then(json => {
                const teamData = json.data.filter(element => element.attributes.name == team.name)[0]
                const playerIds = teamData.relationships.players.data.map(element => element.id)
                json.included.forEach(player => {
                    if (playerIds.includes(player.id)){
                        team.players.push(new Player(player.attributes.name, player.attributes.number, player.attributes.position))
                    }
                })
            })
    }

}