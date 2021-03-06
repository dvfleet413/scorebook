let showAbout = false
let app = new App()
let adapter = new Adapter("http://scorebook-api.herokuapp.com")

async function getTeams(){
    await adapter.getTeams()
}

getTeams()

const handleFilterSubmit = (event) => {
    event.preventDefault()
    const games = app.games.filter(game => game.homeTeam.name.toLowerCase().includes(event.target[0].value.toLowerCase()) || game.awayTeam.name.toLowerCase().includes(event.target[0].value.toLowerCase()))
    app.filteredGameList(games)
}

async function getGames(){
    await adapter.getGames()
    app.renderGameList()
    app.renderFilterTextForm()
    app.renderFilterSelectForm()
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
        par.setAttribute('class', 'visible')
        e.target.setAttribute('class', 'fas fa-caret-down')
    }
    else {
        par.setAttribute('class', 'hidden')
        e.target.setAttribute('class', 'fas fa-caret-right')
    }
})

// Event Listener for clicking on <li> in saved game list
const handleClick = () => {
    event.preventDefault()
    const id = parseInt(event.target.id, 10)
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