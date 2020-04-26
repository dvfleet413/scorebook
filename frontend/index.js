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
        this._baseReached = baseReached;
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

                <div class='diamond'></div><br />
                <br />`
    }

    advanceToBase(baseReached){
        const diamond = document.querySelector('#current-at-bat~.diamond')
        this._baseReached = baseReached;
        diamond.classList.add(`reach-${this._baseReached}`)
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
    atBatSquare.setAttribute('id', 'current-at-bat')
    atBatSquare.innerHTML = this.htmlRepresentation();
    document.querySelector('.main').appendChild(atBatSquare)

    // Buttons to Select Hit or Out
    renderHitBtn()
    renderOutBtn()

    const atBatFormContainer = document.createElement('div')
    atBatFormContainer.setAttribute('id', 'at-bat-submit')
    main.appendChild(atBatFormContainer)
}

const renderHitBtn = function(){
    const hitBtn = document.createElement('input')
    hitBtn.setAttribute('type', 'submit')
    hitBtn.setAttribute('value', 'Record a Hit')
    hitBtn.addEventListener('click', function(e){
        e.preventDefault()
        renderHitForm()
    })
    main.appendChild(hitBtn)
}

const renderOutBtn = function(){
    const outBtn = document.createElement('input')
    outBtn.setAttribute('type', 'submit')
    outBtn.setAttribute('value', 'Record an Out')
    outBtn.addEventListener('click', function(e){
        e.preventDefault()
        renderOutForm()
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
    single.setAttribute('value', 'single')
    single.innerText = 'Single'
    hitSelection.appendChild(single)

    const double = document.createElement('option')
    double.setAttribute('value', 'double')
    double.innerText = 'Double'
    hitSelection.appendChild(double)

    const triple = document.createElement('option')
    triple.setAttribute('value', 'triple')
    triple.innerText = 'Triple'
    hitSelection.appendChild(triple)

    const homeRun = document.createElement('option')
    homeRun.setAttribute('value', 'home-run')
    homeRun.innerText = 'Home Run'
    hitSelection.appendChild(homeRun)

    renderSubmitBtn(form, container)
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

    renderSubmitBtn(form, container)
}

const renderSubmitBtn = function(form, container){
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