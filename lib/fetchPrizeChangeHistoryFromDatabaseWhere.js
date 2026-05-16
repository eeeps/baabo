import { databaseURL, databaseToken } from './db.js';
import timestampReviver from './timestampReviver.js';

/**
 * Get prize change history from database, optionally filtered to a subset
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

export default async function fetchPrizeChangeHistoryFromDatabaseWhere( {
	games,
	game,
	prize,
	sinceTimestamp
	
} ) {

	const endpoint = new URL( `${ databaseURL }/prizeChanges` );
	
	// TODO why handle games and game separately? why not just take an array
	// A: because array and parameter handling is ugly? we stringify and urlencode the array, much less readable than game=2026 or whatever
	// todo change that?
	if ( games ) {
		endpoint.searchParams.append( 'games', JSON.stringify( games ) );
	}
	if ( game ) {
		endpoint.searchParams.append( 'game', game );
	}
	if ( prize ) {
		endpoint.searchParams.append( 'prize', prize );
	}
	if ( sinceTimestamp ) {
		endpoint.searchParams.append( 'since', sinceTimestamp.toISOString() );
	}
	
	const response = await fetch( endpoint,
		{
			headers: {
				"Authorization": `Bearer ${ databaseToken }`
			}
		}
	);
	
	const text = await response.text();
	const json = JSON.parse( text, timestampReviver );
		
	return json;
	
}