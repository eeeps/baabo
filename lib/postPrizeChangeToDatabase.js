import { databaseURL, databaseToken } from './db.js';
import deletePrizeChangeFromLocalStorage from './deletePrizeChangeFromLocalStorage.js';

/**
 * Add a prize change to the database.
 * If it's been deleted, the server won't add it and lets us know.
 * @param {object} change
 * @param {uuid} prizeChange.id
 * @param {Date} prizeChange.timestamp
 * @param {string} prizeChange.game
 * @param {string} prizeChange.prize
 * @param {string} prizeChange.player
 * @param {boolean} prizeChange.state
 * @returns {{ deleted: boolean }}
 */
export default async function postPrizeChangeToDatabase( change ) {
	const endpoint = `${ databaseURL }/prizeChanges`;
	
	// cast date to ISO8601 string
	change.timestamp = change.timestamp.toISOString();
	
	const response = await fetch( endpoint, {
		method: "POST",
		keepalive: true,
		headers: {
			"Authorization": `Bearer ${ databaseToken }`
		},
		body: new URLSearchParams( change )
	} )
	
	if ( response.status === 204 ) { 

		return { deleted: false };

	} else if ( response.status === 410 ) { // 410 creates a console.error... do I care?

		// can't console.log when I'm keepaliving, maybe?
		// console.log( `client tried to post ${ change.id } but it's been marked as deleted, responding 410` );
		deletePrizeChangeFromLocalStorage( change.id );
		
		return { deleted: true };
	
	}
	
	throw new Error( response.status ); // todo make more descriptive...

}