import { Team } from './modules/team.js'
import { Player } from './modules/player.js'
import { Game } from './modules/game.js'
import { Inning } from './modules/inning.js'
import { AtBat } from './modules/atBat.js'


const serverUrl = 'http://localhost:3000/'

// Create and Load elements for start of app
let currentGame = new Game()
console.log(currentGame)

const main = document.querySelector('div.main')

const newGameBtn = document.createElement('button')
newGameBtn.setAttribute('id', 'new-game-button')
newGameBtn.setAttribute('type', 'button')
newGameBtn.innerText = 'New Scorebook'
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    // renderNewGameForm()
    Game.renderNewGameForm(currentGame)
    const submitBtn = document.getElementById('start-new-game-btn')
    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        console.log("Submit Btn clicked...in the callback")
        const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
        const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
        currentGame.homeTeam = homeTeam;
        currentGame.awayTeam = awayTeam;
        let currentInning = new Inning(1.0, currentGame.awayTeam)
        currentGame.innings.push(currentInning)
        Inning.renderInningInterface.call(currentInning)
    })
})
main.appendChild(newGameBtn)

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
        document.querySelector('div#current-at-bat').removeAttribute('id')
        document.querySelector('table#current-at-bat').removeAttribute('id')
        currentGame.innings.slice(-1)[0].atBats.push(this)
        console.log(currentGame.innings.slice(-1)[0].atBats)
        const outBtn = document.querySelector('#out-btn')
        outBtn.parentNode.removeChild(outBtn)
        const hitBtn = document.querySelector('#hit-btn')
        hitBtn.parentNode.removeChild(hitBtn)
        hitSelection.parentNode.removeChild(hitSelection)
        atBatSubmitBtn.parentNode.removeChild(atBatSubmitBtn)
        container.parentNode.removeChild(container)
        renderAtBatInterface.call(new AtBat())
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