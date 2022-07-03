const baaboJs = require( '../baabo.js' );
const boards = require( './boards.json' );

module.exports = async function() {
	const changeHistory = await baaboJs.fetchEntireChangeHistoryFromDatabase();
	const playerNames = boards.map( b => b.player.toLowerCase() );
	return baaboJs.boardStatesFromChangeHistory( playerNames, changeHistory );
};
