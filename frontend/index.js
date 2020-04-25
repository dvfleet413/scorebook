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