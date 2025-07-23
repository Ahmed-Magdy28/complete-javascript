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


game.scored.forEach((player, index) => {
    console.log(`Goal ${index + 1}: ${player}`);
});


let average = 0;
for (const odd of Object.values(game.odds)) {
    average += odd;
};
average /= Object.values(game.odds).length;
console.log(`Average odd: ${average}`);

Object.entries(game.odds).forEach(([key, value]) => {
    const teamStr = key === 'draw' ? 'draw' : `victory ${game[key]}`;
    console.log(`Odd of ${teamStr}: ${value}`);
});
