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
        // const submitBtn = document.getElementById('start-new-game-btn')
        // submitBtn.addEventListener('click', function(e){
        //     e.preventDefault();
        //     console.log("Submit Btn clicked...in the callback")
        //     const homeTeam = new Team(document.querySelector("input[name='home-team']").value)
        //     const awayTeam = new Team(document.querySelector("input[name='away-team']").value)
        //     currentGame.homeTeam = homeTeam;
        //     currentGame.awayTeam = awayTeam;
        //     let currentInning = new Inning(1.0, currentGame.awayTeam)
        //     currentGame.innings.push(currentInning)
        //     Inning.renderInningInterface.call(currentInning)
        //     AtBat.renderAtBatInterface.call(new AtBat(), currentGame)
        // })
    })
    main.appendChild(newGameBtn)
}

run()


const clearMain = function(){
    main.innerHTML = ''
}