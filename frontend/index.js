const serverUrl = 'http://localhost:3000/'

class Team {
    constructor(name){
        this._name = name;
    }
}

class Player {
    constructor(name, number, position){
        this._name = name;
        this._number = number;
        this._position = position;
    }
}

class Game {
    constructor(currentInning = 1.0){
        this._currentInning = currentInning;
    }

    changeSides(){
        this._currentInning += 0.5;
    }
}

class AtBat {
    constructor(batter, result, baseReached, outNumber){
        this._batter = batter;
        this._result = result;
        this.baseReached = baseReached;
        this._outNumber = outNumber;
    }

    advanceToBase(baseReached){
        this.baseReached = baseReached;
    }

    score(){
        this.baseReached = 4;
    }
}

// Renders datalist input with team names as options
const renderTeamDatalist = function(name, target){
    const url = serverUrl + `teams`

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

// Renders an h1 of team name and list of players
const renderTeam = function(id){
    const url = serverUrl + `teams/${id}`
    // Send GET Request to /teams/:id
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json)
            // Add h1 element with Team Name
            const teamName = json.data.attributes.name
            const container = document.querySelector('div.container')
            const element = document.createElement('h1')
            element.innerText = teamName
            container.appendChild(element)

            // Create an empty list to add players to
            const list = document.createElement('ul')
            list.setAttribute('id', 'players-list')
            container.appendChild(list)

            // Add players to list
            json.included.forEach(function(player){
                console.log(player.attributes.name)
                let playerElement = document.createElement('li')
                playerElement.innerText = player.attributes.name
                document.getElementById('players-list').appendChild(playerElement)
            })
        })
}

const renderNewGameForm = function(){
    clearMain()

    //Set up form
    const main = document.querySelector('div.main')
    const form = document.createElement('form')
    const formTitle = document.createElement('h4')
    formTitle.innerText = "Start a New Game"
    form.appendChild(formTitle)

    // Add home team datalist
    const homeLabel = document.createElement('p')
    homeLabel.innerText = "Home Team"
    form.appendChild(homeLabel)
    renderTeamDatalist('home-team', homeLabel)

    // Add away team datalist
    const awayLabel = document.createElement('p')
    awayLabel.innerText = "Away Team"
    form.appendChild(awayLabel)
    renderTeamDatalist('away-team', awayLabel)

    const submitBtn = document.createElement('input')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log("Submit Btn clicked...in the callback")
        const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
        const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
        const game = new Game()
    })
    form.appendChild(submitBtn)

    // Render form
    main.appendChild(form)
}

const clearMain = function(){
    document.querySelector('div.main').innerHTML = ''
}






// // Sample GET Request to /teams/:id
//     fetch('http://localhost:3000/teams/1')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(json){
//         console.log(json)
//     })

// // Sample GET Request to /games/:id
//     fetch('http://localhost:3000/games/1')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(json){
//         console.log(json)
//     })


// // Sample PATCH to /players/:id
//     const configObj = {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             name: 'Beni'
//         })
//     }

//     fetch('http://localhost:3000/players/1', configObj)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(object) {
//             console.log(object);
//         });