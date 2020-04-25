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