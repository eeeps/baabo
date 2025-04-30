import timestampReviver from './timestampReviver.js';

export default function fetchChangeHistoryFromLocalStorageWhere( {
	games,
	game,
	board,
	sinceTimestamp // Date object
} ) {

	const fromLocalStorage = localStorage.getItem( 'changeHistory' );

	if ( !fromLocalStorage ) {
		return [];
	} else {

		const json = JSON.parse( fromLocalStorage, timestampReviver );
		
		return json.filter( c => {
 
			return (
				( games ? games.includes( c.game ) : true ) &&
				( game ? c.game === game : true ) &&
				( board ? c.board === board : true ) &&
				( sinceTimestamp ? c.timestamp.getTime() >= sinceTimestamp.getTime() : true )
			);

		} )

	}
}