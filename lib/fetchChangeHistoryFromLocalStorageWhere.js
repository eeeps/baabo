export default function fetchChangeHistoryFromLocalStorageWhere( {
	games,
	game,
	board,
	sinceTimestamp
} ) {

	const fromLocalStorage = localStorage.getItem( 'changeHistory' );

	if ( !fromLocalStorage ) {
		return [];
	} else {

		const json = JSON.parse( fromLocalStorage );
		// console.log(json);
		
		return json.filter( c => {
 
			return (
				( games ? games.includes( c.game ) : true ) &&
				( game ? c.game === game : true ) &&
				( board ? c.board === board : true ) &&
				( sinceTimestamp ? Date.parse( c.timestamp ) >= Date.parse( sinceTimestamp ) : true )
			);

		} );

	}
}