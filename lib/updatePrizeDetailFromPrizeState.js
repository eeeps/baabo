/**
 * Updates the prize detail page based upon wonBy state
 * @param {HTMLElement} checkboxForm
 * @param  {{player: string, claimDate: Date}[]} wonBy - An array of objects listing (hopefully unique!) players and the date they each claimed the prize
 */

export default function updatePrizeDetailFromPrizeState( checkboxForm, wonBy ) {
	
	// todo store maxwinners on checkbox?? or mainContain??
	// would love it if this could just check boxes and everything else updated automatically (no duplicated state)
	
	const checkboxes = [ ...checkboxForm.querySelectorAll( 'input[type=checkbox]' ) ];
	const winners = wonBy.map( wb => wb.player );
	
	checkboxes.forEach( cb => {
		if ( winners.includes( cb.name ) ) {
			cb.checked = true;
			cb.setAttribute( 'checked', 'checked' ); // reflect in dom so css works...
		} else {
			cb.checked = false;
			cb.removeAttribute( 'checked' );
		}
	} );
	
}