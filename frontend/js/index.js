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