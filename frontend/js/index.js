import { Team } from './modules/team.js'
import { Player } from './modules/player.js'
import { Game } from './modules/game.js'
import { Inning } from './modules/inning.js'
import { AtBat } from './modules/atBat.js'

// Create and Load elements for start of app
let currentGame = new Game()
console.log(currentGame)
const main = document.querySelector('div.main')

const run = function(){
    const newGameBtn = document.createElement('button')
    newGameBtn.setAttribute('id', 'new-game-button')
    newGameBtn.setAttribute('type', 'button')
    newGameBtn.innerText = 'New Scorebook'
    newGameBtn.addEventListener('click', (e) => {
        e.preventDefault()
        Game.renderNewGameForm(currentGame)
    })
    main.appendChild(newGameBtn)
}

run()

function clearMain(){
    main.innerHTML = ''
}