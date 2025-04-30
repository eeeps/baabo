import timestampReviver from './timestampReviver.js';

export default async function fetchChangeHistoryFromDatabaseWhere( {
	// all optional; empty obj gives entire history
	games, // array of strings e.g. [ '2022', '2023' ]
	game, // string e.g. '2022'
	board, // string e.g. 'britt'
	sinceTimestamp // Date object
} ) {

	const endpoint = new URL( 'https://baabo-db.herokuapp.com/changes' );
	
	if ( games ) {
		endpoint.searchParams.append( 'games', JSON.stringify( games ) );
	}
	if ( game ) {
		endpoint.searchParams.append( 'game', game );
	}
	if ( board ) {
		endpoint.searchParams.append( 'board', board );
	}
	if ( sinceTimestamp ) {
		endpoint.searchParams.append( 'since', sinceTimestamp.toISOString() );
	}
	
	const response = await fetch( endpoint );
	const text = await response.text();
	const json = JSON.parse( text, timestampReviver );
		
	return json;
	
}