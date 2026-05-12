import { databaseURL, databaseToken } from './db.js';
import timestampReviver from './timestampReviver.js';

export default async function fetchPrizeChangeHistoryFromDatabaseWhere( {
	// all optional; empty obj gives entire history
	games, // array of strings e.g. [ '2022', '2023' ]
	game, // string e.g. '2022'
	prize, // string e.g. 'britt'
	sinceTimestamp // Date object
} ) {

	const endpoint = new URL( `${ databaseURL }/prizeChanges` );
	
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