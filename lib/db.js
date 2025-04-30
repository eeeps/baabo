let databaseURL, databaseToken;

if ( typeof process !== "undefined" ) {
	// running on server
	// console.log( 'server' );
	await import( 'dotenv/config' );
	databaseURL = process.env.DATABASE_URL;
	databaseToken = process.env.DATABASE_TOKEN;
} else {
	// running on client
	// console.log('client');
	const impt = await import( '../env.js' );
	databaseURL = impt.databaseURL;
	databaseToken = impt.databaseToken;
}

export { databaseURL, databaseToken };
