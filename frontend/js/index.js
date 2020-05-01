import { Game } from './modules/game.js'
import { App } from './modules/app.js'

// Create and Load elements for start of app
let currentGame = new Game()

const newGameBtn = document.getElementById('new-game-button')
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    currentGame.start()
})

const getGameList = function(){
    const url = 'http://localhost:3000/games'
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(json => {
            const gameList = document.getElementById('game-list')
            console.log(json['data'])
            json['data'].forEach(game => {
                const gameLi = document.createElement('li')
                const gameLink = document.createElement('a')
                gameLink.setAttribute('href', '#')
                gameLink.setAttribute('id', `${game.id}-game`)
                gameLink.addEventListener('click', handleClick)
                gameLink.innerText = game['attributes']['created_at']
                gameLi.appendChild(gameLink)
                gameList.appendChild(gameLi)
            })
            console.log(json)
        })
}()

const handleClick = (e) => {
    e.preventDefault()
    const id = parseInt(e.target.id, 10)
    console.log(e.target)
    Game.requestSavedGame(currentGame, id)
        .then(response => {
            currentGame = response
            currentGame.summarize()
        })
        .catch(error => {
            console.log(error.message)
        })
}