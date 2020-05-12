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
        // Create option elements for input field
        app.teams.forEach(team => {
            let option = document.createElement('option')
            option.setAttribute('value', team.name)
            option.innerText = team.name
            teamInput.append(option)
        })
        target.appendChild(teamInput)
    }
}