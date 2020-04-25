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