export default function updateHtmlFromBoardState( tableEl, boardState ) {
	const tds = [ ...tableEl.querySelectorAll( 'td' ) ];
	boardState.forEach( ( cellState, index ) => {
		if ( cellState ) {
			tds[ index ].classList.add( 'checked' );
		} else {
			tds[ index ].classList.remove( 'checked' );
		}
	} );
}