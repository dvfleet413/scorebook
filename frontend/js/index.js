import { Team } from './modules/team.js'
import { Player } from './modules/player.js'
import { Game } from './modules/game.js'
import { Inning } from './modules/inning.js'
import { AtBat } from './modules/atBat.js'
import { App } from './modules/app.js'

// Create and Load elements for start of app
let currentGame = new Game()

const run = function(){
    const newGameBtn = document.createElement('button')
    newGameBtn.setAttribute('id', 'new-game-button')
    newGameBtn.setAttribute('type', 'button')
    newGameBtn.innerText = 'New Scorebook'
    newGameBtn.addEventListener('click', (e) => {
        e.preventDefault()
        currentGame.start()
    })
    App.appendToMain(newGameBtn)
}

run()
App.renderGameSummaryTable('home-team')