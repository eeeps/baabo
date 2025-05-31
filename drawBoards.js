

import fs from 'fs';

const gameName = '2025';

const playersChallenges = JSON.parse( fs.readFileSync('_data/challenges.json') );
const flatChallenges = playersChallenges.reduce( ( acc, cv ) => acc.concat( cv.challenges ), [] );
const players = JSON.parse( fs.readFileSync('_data/players.json') );

const drawABoard = ( challenges ) => {

	// clone full challenges array into a hat that we're going to modify
	let hat = [ ...challenges ];
	let board = [];
	
	for ( let i = 0; i < 24; i++ ) {

		const randomIndex = Math.floor( Math.random() * hat.length );

		// pick an item from the hat
		board.push( hat[ randomIndex ] );

		console.log( 'drawn item', hat[ randomIndex ] )

		// remove pickedItem from hat
		hat.splice( randomIndex, 1 );

		console.log( 'resulting hat', hat );
	
	}
	
	return board;

};

// draw all boards and replace the boards.json
// only do this once!
//
const boards = players.map( playerName => {
	return {
		"game": gameName,
		"player": playerName,
		"challenges": drawABoard( flatChallenges )
	}
} );

try {
  fs.writeFileSync(`_data/boards-${ gameName }.json`, JSON.stringify( boards, null, 2 ), 'utf8');
  console.log('Data successfully saved to disk');
} catch (error) {
  console.log('An error has occurred ', error);
}


// draw one board
// for julie
// console.log( drawABoard( flatChallenges ) );
