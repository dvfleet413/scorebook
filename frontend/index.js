const serverUrl = 'http://localhost:3000/'

// Class Definitions
class Team {
    constructor(name){
        this._name = name;
    }

    get name(){
        return this._name;
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
    constructor(currentInning = 1.0, homeTeam, awayTeam, innings = []){
        this._currentInning = currentInning;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.innings = innings;
    }

    changeSides(){
        this._currentInning += 0.5;
    }
}

class Inning {
    constructor(number, atBats = []){
        this._number = number;
        this.atBats = atBats;
    }

    get number(){
        if(this._number % 1 === 0){
            return `Top ${Math.floor(this._number)}`
        }
        else{
            return `Bottom ${Math.floor(this._number)}`
        }
    }

    get teamAtBat(){
        if(this._number % 1 === 0){
            return currentGame.awayTeam.name
        }
        else {
            return currentGame.homeTeam.name
        }
    }
}

class AtBat {
    constructor(batter, result, baseReached, outNumber, outCode){
        this._batter = batter;
        this._result = result;
        this.baseReached = baseReached;
        this._outNumber = outNumber;
        this.outCode = outCode;
    }

    htmlRepresentation(){
        return `<table id='current-at-bat'>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class='out-code'></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="out"><span></span></td>
                        <td></td>
                        <td class='result'></td>
                    </tr>
                </table>

                <div class='diamond'></div>
                <div class='out-code'><span></span></div><br />
                <br />`
    }

    set result(result){
        this._result = parseInt(result, 10)
    }

    get result(){
        if (this._result && this._result < 4){
            return `${this._result}B`
        }
        else if (this._result == 4){
            return 'HR'
        }
    }

    advanceToBase(baseReached){
        const diamond = document.querySelector('#current-at-bat~.diamond')
        this.baseReached = baseReached;
        diamond.classList.add(`reach-${this.baseReached}`)
    }

    score(){
        this.advanceToBase(4);
    }
}

// Create and Load elements for start of app
let currentGame = new Game()

const main = document.querySelector('div.main')

const newGameBtn = document.createElement('button')
newGameBtn.setAttribute('id', 'new-game-button')
newGameBtn.setAttribute('type', 'button')
newGameBtn.innerText = 'New Scorebook'
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    renderNewGameForm()
})
main.appendChild(newGameBtn)


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


// Form to Start a New Game
const renderNewGameForm = function(){
    clearMain()

    //Set up form
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

    // Add Start Button
    const submitBtn = document.createElement('input')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log("Submit Btn clicked...in the callback")
        const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
        const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
        currentGame.homeTeam = homeTeam;
        currentGame.awayTeam = awayTeam;
        let currentInning = new Inning(1.0)
        currentGame.innings.push(currentInning)
        renderInningInterface.call(currentInning)
    })
    form.appendChild(submitBtn)

    // Render form
    main.appendChild(form)
}

// Within a game, call renderInningInterface() to add AtBats/keep score
// Should be called with execution context of an Inning

const renderInningInterface = function(){
    clearMain()
    let title = document.createElement('h1')
    title.innerText = `${this.number} - ${this.teamAtBat} At Bat`
    main.appendChild(title)
    renderAtBatInterface.call(new AtBat())
}

// Loads scoring box and form to modify AtBat instance
const renderAtBatInterface = function(){
    console.log(this)

    // Build AtBat Square
    const atBatSquare = document.createElement('div')
    atBatSquare.setAttribute('class', 'at-bat')
    atBatSquare.innerHTML = this.htmlRepresentation();
    document.querySelector('.main').appendChild(atBatSquare)

    // Buttons to Select Hit or Out
    renderHitBtn.call(this)
    renderOutBtn.call(this)

    const atBatFormContainer = document.createElement('div')
    atBatFormContainer.setAttribute('id', 'at-bat-submit')
    main.appendChild(atBatFormContainer)
}

const renderHitBtn = function(){
    const hitBtn = document.createElement('input')
    hitBtn.setAttribute('type', 'submit')
    hitBtn.setAttribute('id', 'hit-btn')
    hitBtn.setAttribute('value', 'Record a Hit')
    hitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderHitForm.call(this)
    })
    main.appendChild(hitBtn)
}

const renderOutBtn = function(){
    const outBtn = document.createElement('input')
    outBtn.setAttribute('type', 'submit')
    outBtn.setAttribute('id', 'out-btn')
    outBtn.setAttribute('value', 'Record an Out')
    outBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderOutForm.call(this)
    })
    main.appendChild(outBtn)
}

const renderHitForm = function(){
    const container = document.getElementById('at-bat-submit')
    container.innerHTML = ''
    // Build Form for AtBat Result
    const form = document.createElement('form')
    form.setAttribute('class', 'at-bat-form')
    // Select element for hit
    const hitSelection = document.createElement('select')
    hitSelection.setAttribute('id', 'hit-options')
    form.appendChild(hitSelection)

    const single = document.createElement('option')
    single.setAttribute('value', '1')
    single.innerText = 'Single'
    hitSelection.appendChild(single)

    const double = document.createElement('option')
    double.setAttribute('value', '2')
    double.innerText = 'Double'
    hitSelection.appendChild(double)

    const triple = document.createElement('option')
    triple.setAttribute('value', '3')
    triple.innerText = 'Triple'
    hitSelection.appendChild(triple)

    const homeRun = document.createElement('option')
    homeRun.setAttribute('value', '4')
    homeRun.innerText = 'Home Run'
    hitSelection.appendChild(homeRun)

    // Submit Button
    const atBatSubmitBtn = document.createElement('input')
    atBatSubmitBtn.setAttribute('type', 'submit')
    atBatSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        this.advanceToBase(parseInt(document.getElementById('hit-options').value, 10))
        this.result = document.getElementById('hit-options').value
        document.querySelector('#current-at-bat .result').innerText = this.result
        document.querySelector('#current-at-bat')
        currentGame.innings.slice(-1)[0].atBats.push(this)
        console.log(currentGame.innings.slice(-1)[0].atBats)
        const outBtn = document.querySelector('#out-btn')
        outBtn.parentNode.removeChild(outBtn)
        const hitBtn = document.querySelector('#hit-btn')
        hitBtn.parentNode.removeChild(hitBtn)
        hitSelection.parentNode.removeChild(hitSelection)
        atBatSubmitBtn.parentNode.removeChild(atBatSubmitBtn)
    })
    form.appendChild(atBatSubmitBtn)

    container.appendChild(form)
}

const renderOutForm = function(){
    const container = document.getElementById('at-bat-submit')
    container.innerHTML = ''
    const form = document.createElement('form')
    form.setAttribute('class', 'out-code-form')
    // Text input for out code
    const outCodeInput = document.createElement('input')
    outCodeInput.setAttribute('type', 'text')
    outCodeInput.setAttribute('id', 'out-code-text')
    outCodeInput.value = 'Out Code'
    form.appendChild(outCodeInput)

    // Submit Button
    const atBatSubmitBtn = document.createElement('input')
    atBatSubmitBtn.setAttribute('type', 'submit')
    atBatSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        currentGame.innings.slice(-1)[0].atBats.push(this)
        console.log(currentGame.innings.slice(-1)[0].atBats)
    })
    form.appendChild(atBatSubmitBtn)

    container.appendChild(form)
}


const clearMain = function(){
    main.innerHTML = ''
}