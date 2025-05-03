import { databaseURL, databaseToken } from './db.js';
import deleteChangeFromLocalStorage from './deleteChangeFromLocalStorage.js';

export default async function postChangeToDatabase( change ) {
	const endpoint = `${ databaseURL }/changes`;
	
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
		deleteChangeFromLocalStorage( change.id );
		
		return { deleted: true };
	
	}
	
	throw new Error( response.status ); // todo make more descriptive...

}