import oneBoardStateFromChangeHistory from './oneBoardStateFromChangeHistory.js';

// boardStatesFromChangeHistory ::
// ( [ { game: String, player: String} ], [ { timestamp: Object (Date), index: Number, state: Boolean } ] )
// -> [ { game: String, player: String, squareStates: [ Boolean{25} ] } ]
export default function boardStatesFromChangeHistory( gameAndPlayerNames, changeHistory ) {

	return gameAndPlayerNames.map( gb => ( {
		game: gb.game,
		player: gb.player,
		boardState: oneBoardStateFromChangeHistory( gb.game, gb.player, changeHistory )
	} ) );

}
