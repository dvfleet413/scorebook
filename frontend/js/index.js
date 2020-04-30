import { Game } from './modules/game.js'
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

Game.requestSavedGame(currentGame, 2)
    .then((response) => {
        currentGame = response
        currentGame.summarize()
    })
    .catch((error) => {
        console.log(error.message)
    })


