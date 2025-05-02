import { databaseURL, databaseToken } from './db.js';
import deleteChangeFromLocalStorage from './deleteChangeFromLocalStorage.js';

export default function postChangeToDatabase( change ) {
	const endpoint = `${ databaseURL }/changes`;
	
	// cast date to ISO8601 string
	change.timestamp = change.timestamp.toISOString();
	
	fetch( endpoint, {
		method: "POST",
		keepalive: true,
		headers: {
			"Authorization": `Bearer ${ databaseToken }`
		},
		body: new URLSearchParams( change )
	} ).then( response => {
		if ( response.status === 410 ) {
			
			// can't console.log when I'm keepaliving, maybe?
			// console.log( `client tried to post ${ change.id } but it's been marked as deleted, responding 410` );
			deleteChangeFromLocalStorage( change.id );

		}
	} );
}