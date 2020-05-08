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
                json.data.forEach(game => {
                    const game = new Game()
                    const homeTeamId = game.relationships.homeTeam.data.id
                    const homeTeamData = json.included.find(element => element.id == homeTeamId && element.type == "team")
                    // This is the code I want...
                    // game.homeTeam = new Team(homeTeamData)
                    const awayTeamId = game.relationships.awayTeam.data.id 
                    const awayTeamData = json.included.find(element => element.id == awayTeamId && element.type == "team")
                    // This is the code I want...
                    // game.awayTeam = new Team(awayTeamData)
                })
            })
    }

    postGame(){
        
    }

}