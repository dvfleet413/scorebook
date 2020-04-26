class Team {
    constructor(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    static renderTeamDatalist(name, target){
        const url = 'http://localhost:3000/teams'
    
        // Create input field
        const teamInput = document.createElement('input')
        teamInput.setAttribute('id', 'team-names')
        teamInput.setAttribute('list', 'teams-list')
        teamInput.setAttribute('name', name)
        
        // Create datalist element
        const datalist = document.createElement('datalist')
        datalist.setAttribute('id', 'teams-list')
    
        // GET /teams, use Promise to add option elements to datalist, then add entire input to DOM
        fetch(url)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                console.log(json)
                json.data.forEach(function(element){
                    console.log(element.attributes)
                    let option = document.createElement('option')
                    option.setAttribute('value', element.attributes.name)
                    datalist.append(option)
                })
                target.appendChild(teamInput)
                target.appendChild(datalist)
            })
    }
}

export { Team };