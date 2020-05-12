class Team {
    constructor(name, players = [], currentBatterIndex = 0){
        this.name = name;
        this.players = players
        this.currentBatterIndex = currentBatterIndex
    }

    async getPlayers(){
        await adapter.getPlayers(this)
    }

    static renderTeamSelect(name, target){
        const url = 'http://localhost:3000/teams'
    
        // Create input field
        const teamInput = document.createElement('select')
        teamInput.setAttribute('id', 'team-names')
        teamInput.setAttribute('name', name)
    
        // GET /teams, use Promise to add option elements to datalist, then add entire input to DOM
        fetch(url)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                json.data.forEach(function(element){
                    let option = document.createElement('option')
                    option.setAttribute('value', element.attributes.name)
                    option.innerText = element.attributes.name
                    teamInput.append(option)
                })
                target.appendChild(teamInput)
            })
    }
}