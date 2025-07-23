'use strict';

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        ['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnabry', 'Lewandowski'],
        ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze']
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        draw: 3.25,
        team2: 6.5
    }
};


const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']




console.log("####################################")
console.log("##########Player1############")
console.log("####################################")
console.log(game)
console.log("####################################")
console.log("##########Player1############")
console.log("####################################")
console.log(players1)
console.log("####################################")
console.log("##########Player2############")
console.log("####################################")
console.log(players2)
console.log("####################################")
console.log("##########gk############")
console.log("####################################")
console.log(gk)
console.log("####################################")
console.log("##########fieldPlayers############")
console.log("####################################")
console.log(fieldPlayers)
console.log("####################################")
console.log("##########players1Final############")
console.log("####################################")
console.log(players1Final)
console.log("####################################")
