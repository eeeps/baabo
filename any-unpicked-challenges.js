import fs from 'fs';

const boards = JSON.parse( 
	fs.readFileSync('_data/boards.json')
).filter( board => board.game === '2025');

//console.log(boards);

const challengesPlayers = boards.reduce( ( challengesPlayersMap, board ) => {
	const player = board.player;
	board.challenges.forEach( challenge => {
		if ( challengesPlayersMap.has( challenge ) ) {
			const existingPlayers = challengesPlayersMap.get( challenge );
			challengesPlayersMap.set( challenge, existingPlayers.concat( [ player ] ) );
		} else {
			challengesPlayersMap.set( challenge, [ player ] );
		}
	} );
	return challengesPlayersMap;
}, new Map() );

// console.log(challengesPlayers)
// 

// console.log a dl (lol)
// console.log('<dl>');
// challengesPlayers.forEach( ( players, challenge ) => console.log(`
// <div>
// <dt>${challenge}</dt>
// ${
// 	players.map( p => `<dd>${p}</dd>`).join('\n')
// }
// </div>
// `))
// console.log('</dl>');

// see if there were any challenges that weren't picked by any player

const pickedChallenges = [...challengesPlayers.keys()];
const allChallenges = JSON.parse( 
	fs.readFileSync('_data/challenges.json')
);
const flatChallenges = allChallenges.reduce( (acc, cv) => {
	cv.challenges.forEach( c => acc.add(c) );
	return acc;
}, new Set() );
const diff = [...flatChallenges].filter(x => !pickedChallenges.includes(x));
console.log(flatChallenges.size);
console.log(pickedChallenges.length)
console.log(diff);