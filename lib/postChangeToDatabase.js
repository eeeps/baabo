import { databaseURL, databaseToken } from './db.js';

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
	} );
}