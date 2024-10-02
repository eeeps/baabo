export default function postChangeToDatabase( change ) {
	const endpoint = 'https://baabo-db.herokuapp.com/changes';
	
	// cast date to ISO8601 string
	change.timestamp = ( new Date( change.timestamp ) ).toISOString();
	
	navigator.sendBeacon( endpoint, new URLSearchParams( change ) );
}