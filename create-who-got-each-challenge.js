const fs = require('fs');

const boards = JSON.parse( 
	fs.readFileSync('_data/boards.json')
).filter( board => board.game === '2023');

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
console.log('<dl>');
challengesPlayers.forEach( ( players, challenge ) => console.log(`
<div>
<dt>${challenge}</dt>
${
	players.map( p => `<dd>${p}</dd>`).join('\n')
}
</div>
`))
console.log('</dl>');

// see if there were any challenges that weren't picked by any player

// const pickedChallenges = [...challengesPlayers.keys()];
// const allChallenges = JSON.parse( 
// 	fs.readFileSync('_data/challenges.json')
// );
// const diff = allChallenges.filter(x => !pickedChallenges.includes(x));
// console.log(allChallenges.length);
// console.log(pickedChallenges.length)
//console.log(diff)