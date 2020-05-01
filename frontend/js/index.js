import { Game } from './modules/game.js'
import { App } from './modules/app.js'

// Create and Load elements for start of app
let currentGame = new Game()

const newGameBtn = document.getElementById('new-game-button')
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    currentGame.start()
})

const getGameList = () => {
    const url = 'http://localhost:3000/games'
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(json => {
            const gameList = document.getElementById('game-list')
            json['data'].forEach(game => {
                gameList.innerHTML += `<li><a href="#" id="${game.id}-game" onclick="handleClick()">${game['attributes']['createdAt']}</a></li>`
            })
        })
}

getGameList()

const handleClick = () => {
    event.preventDefault()
    const id = parseInt(event.target.id, 10)
    Game.requestSavedGame(currentGame, id)
        .then(response => {
            currentGame = response
            currentGame.summarize()
        })
        .catch(error => {
            console.log(error.message)
        })
}
window.handleClick = handleClick;