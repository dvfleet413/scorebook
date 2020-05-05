import { Game } from './modules/game.js'
import { App } from './modules/app.js'

let currentGame = new Game()
let showAbout = false

const newGameBtn = document.getElementById('new-game-button')
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    currentGame.start()
})

const about = document.getElementById('about')
about.addEventListener('click', (e) => {
    const par = document.getElementById('about-par')
    showAbout = !showAbout
    if (showAbout){
        par.style.display = 'block'
        e.target.setAttribute('class', 'fas fa-caret-down')
    }
    else {
        par.style.display = 'none'
        e.target.setAttribute('class', 'fas fa-caret-right')
    }
})

const getGameList = () => {
    const url = 'http://localhost:3000/games'
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(json => {
            const gameList = document.getElementById('game-list')
            json.data.forEach(game => {
                const homeTeamId = game.relationships.homeTeam.data.id
                const homeTeamData = json.included.find(element => element.id == homeTeamId && element.type == "team")
                const awayTeamId = game.relationships.awayTeam.data.id 
                const awayTeamData = json.included.find(element => element.id == awayTeamId && element.type == "team")
                gameList.innerHTML += `<li><a href="#" id="${game.id}-game" onclick="handleClick()">
                    ${parseDate(game.attributes.createdAt)}:
                    ${awayTeamData.attributes.name} ${game.attributes.awayTeamRuns} - ${homeTeamData.attributes.name} ${game.attributes.homeTeamRuns}
                    </a></li>`
            })
        })
}

getGameList()

// Event Listener for clicking on <li> in saved game list
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


// Function to reformat 'createdAt' attribute from AJAX response for game list
const parseDate = (string) => {
    const elements = string.split('-')
    const year = elements[0]
    const month = elements[1]
    const date = elements[2].slice(0, 2)
    return `${month}/${date}/${year}`
}
window.parseDate = parseDate;