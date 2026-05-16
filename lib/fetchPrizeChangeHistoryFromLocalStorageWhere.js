import timestampReviver from './timestampReviver.js';

/**
 * Get prize change history from localStorage, optionally filtered to a subset
 * 
 * @param {object} where? - empty object gives entire change history
 * @param {{string}[]} where.games?
 * @param {string} where.game?
 * @param {string} where.prize?
 * @param {Date} where.sinceTimestamp?
 * 
 * @returns {{
 * 	 id: {uuid},
 * 	 timestamp: {Date},
 * 	 game: {string},
 * 	 prize: {string},
 * 	 player: {string},
 * 	 state: {boolean}
 *  }[]}
 * 
 * @example
 * fetchPrizeChangeHistoryFromDatabaseWhere( {game: '2026', prize: 'toothbrush'} )
 * // returns [
 * // 	{
 * //	 	id: 'b64887f6-27dc-4563-97f8-df62fc53629c', 
 * //	 	timestamp: new Date(Date.parse('2026-05-11T12:00:00-07')),
 * //		game: '2026',
 * //		prize: 'toothbrush',
 * //		player: 'eric',
 * //		state: true
 * //	 }
 * // ]
 */

export default function fetchPrizeChangeHistoryFromLocalStorageWhere( {
	games,
	game,
	prize,
	sinceTimestamp // Date object
} ) {

	const fromLocalStorage = localStorage.getItem( 'prizeChangeHistory' );

	if ( !fromLocalStorage ) {
		return [];
	} else {

		const json = JSON.parse( fromLocalStorage, timestampReviver );
		
		return json.filter( c => {
 
			return (
				( games ? games.includes( c.game ) : true ) &&
				( game ? c.game === game : true ) &&
				( prize ? c.prize === prize : true ) &&
				( sinceTimestamp ? c.timestamp.getTime() >= sinceTimestamp.getTime() : true )
			);

		} )

	}
}