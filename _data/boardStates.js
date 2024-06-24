/* returned object looks like: 
{
  jake: [
    true,  false, false, true,
    false, false, true,  true,
    false, true,  true,  false,
    true,  false, false, false,
    false, false, false, false,
    false, false, true,  true,
    false
  ],
  andrea: [ ${ 25 booleans go here (includes free space!) } ],
  etc...
}

Now I need it to look like this...

[
	{
		game: '2023',
		player: 'jake',
		squareStates: [ true, false, &c... ]
	},
]

*/

const baaboJs = require( '../baabo.js' );
const boards = require( './boards.json' );

module.exports = async function() {

	// fetch entire change history
	const changeHistory = await baaboJs.fetchChangeHistoryFromDatabaseWhere( {} );
	
	let gameAndPlayerNames = boards.reduce( ( acc, cv ) => {

		if ( !acc.find( item => {
			item.game === cv.game.toLowerCase() &&
			item.player === cv.player.toLowerCase()
		} ) ) {
			acc.push( { game: cv.game.toLowerCase(), player: cv.player.toLowerCase() } )
		}

		return acc;
	}, [] );
	
	return baaboJs.boardStatesFromChangeHistory( gameAndPlayerNames, changeHistory );
	
};
