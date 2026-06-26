/**
 * Updates the prize detail page based upon wonBy state
 * @param {HTMLElement} mainContain - high element, where we store state
 * @param {HTMLElement} checkboxForm - the form with the player checkboxes
 * @param  {{player: string, claimDate: Date}[]} wonBy - An array of objects listing (hopefully unique!) players and the date they each claimed the prize,
 * @param {number|null} maxWinners - the maximum number of winners for this prize (or null if everybody can win it)
 */

export default function updatePrizeDetailFromPrizeState( mainContain, checkboxForm, wonBy, maxWinners ) {
	
	// would love it if this could just check boxes and everything else updated automatically (no duplicated state)
	// like maybe CSS could read maxWinners out of the DOM and count checked checkboxes?
	// do it in JS for now...
	
	const checkboxes = [ ...checkboxForm.querySelectorAll( 'input[type=checkbox]' ) ];
	const winners = wonBy.map( wb => wb.player );
	
	checkboxes.forEach( cb => {
		
		// sync checked state with wonBy state
		if ( winners.includes( cb.name ) ) {
			cb.checked = true;
		} else {
			cb.checked = false;
		}
		
		// disable non-checked checkboxes if all of the prizes have gone
		// this allows winners to be unselected, but no new winners to be added until one is
		if ( maxWinners === null || winners.length < maxWinners || cb.checked ) {
			cb.removeAttribute('disabled');
		} else {
			cb.setAttribute('disabled', 'disabled')
		}
		
	} );
	
	// let the whole page know if all of the prizes are gone
	if ( maxWinners === null || winners.length < maxWinners ) {
		mainContain.classList.remove('noneAvailable');
	} else {
		mainContain.classList.add('noneAvailable');
	}
	
}