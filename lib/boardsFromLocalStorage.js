import boardStatesFromChangeHistory from './boardStatesFromChangeHistory.js';
import fetchChangeHistoryFromLocalStorageWhere from './fetchChangeHistoryFromLocalStorageWhere.js';

// boardsFromLocalStorage ::
// ( [ { game: String, player: String} ] )
// -> [ { game: String, player: String, boardState: [ Boolean{25} ] } ]
// TODO this can prpbably get a lot smarter
export default function boardsFromLocalStorage( gameAndPlayerNames ) {
	return boardStatesFromChangeHistory(
		gameAndPlayerNames,
		fetchChangeHistoryFromLocalStorageWhere( {} )
	);
}
