import applyChangesToBoard from './applyChangesToBoard.js';
import blankBoard from './blankBoard.js';

// oneBoardStateFromChangeHistory ::
// ( String, String, [ { timestamp: Number, index: Number, state: Boolean } ] )
// -> [ Boolean{25} ]
export default function oneBoardStateFromChangeHistory( gameName, playerName, changeHistory ) {
	const playerChanges = changeHistory.filter( change => 
		change.game === gameName &&
		change.board === playerName
	);
	return applyChangesToBoard( blankBoard(), playerChanges );
}
