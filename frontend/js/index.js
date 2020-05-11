//let currentGame = new Game()
let showAbout = false

let app = new App()
let adapter = new Adapter("http://localhost:3000")

async function getGames(){
    await adapter.fetchGames()
    app.renderGameList()
}

getGames()


const newGameBtn = document.getElementById('new-game-button')
newGameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    app.addGame(new Game())
    app.currentGame.start()
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

// Event Listener for clicking on <li> in saved game list
const handleClick = () => {
    event.preventDefault()
    const id = parseInt(event.target.id, 10)
    // Game.requestSavedGame(currentGame, id)
    //     .then(response => {
    //         currentGame = response
    //         currentGame.summarize()
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     })
    const game = app.games.find(game => game.id == id)
    game.summarize()
}


// Function to reformat 'createdAt' attribute from AJAX response for game list
const parseDate = (string) => {
    const elements = string.split('-')
    const year = elements[0]
    const month = elements[1]
    const date = elements[2].slice(0, 2)
    return `${month}/${date}/${year}`
}