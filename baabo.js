
const fetchChangeHistoryFromDatabaseWhere = async function( {
	// all optional; empty obj gives entire history
	games, // array of strings e.g. [ '2022', '2023' ]
	game, // string e.g. '2022'
	board, // string e.g. 'britt'
	sinceTimestamp // Date object
} ) {

	const endpoint = new URL( 'https://baabo-db.herokuapp.com/changes' );
	
	if ( games ) {
		endpoint.searchParams.append( 'games', JSON.stringify( games ) );
	}
	if ( game ) {
		endpoint.searchParams.append( 'game', game );
	}
	if ( board ) {
		endpoint.searchParams.append( 'board', board );
	}
	if ( sinceTimestamp ) {
		endpoint.searchParams.append( 'since', sinceTimestamp.toISOString() );
	}
	
	const response = await fetch( endpoint );
	const json = await response.json();
		
	// cast date (which comes down as an ISO8601 string) to an... integer
	// I love to work with dates in Javascript!
	return json.map( change => {
		change.timestamp = Date.parse( change.timestamp );
		return change;
	} );
	
}

const fetchChangeHistoryFromLocalStorageWhere = function( {
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

const setDifference = function( setA, setB ) {
	return new Set( [ ...setA ].filter( x => !setB.has( x ) ) );
}

// where looks like
// { games, game, board, sinceTimestamp }
// see fetchChangeHistoryFromDatabaseWhere and  fetchChangeHistoryFromLocalStorageWhere
const syncLocalStorageChangeHistoryAndDatabaseWhere = async function( where ) {

	const fromDatabase = await fetchChangeHistoryFromDatabaseWhere( where );
	const fromLocalStorage = fetchChangeHistoryFromLocalStorageWhere( where );
	
	const databaseIDs = new Set( fromDatabase.map( change => change.id ) );
	const localStorageIDs = new Set( fromLocalStorage.map( change => change.id ) );
	
	const idsInDatabaseButNotInLocalStorage = setDifference( databaseIDs, localStorageIDs );
	const idsInLocalStorageButNotInDatabase = setDifference( localStorageIDs, databaseIDs );
	
	if ( idsInDatabaseButNotInLocalStorage.size > 0 ) {
		const everythingFromLocalStorage = fetchChangeHistoryFromLocalStorageWhere( {} );
		idsInDatabaseButNotInLocalStorage.forEach( id => {
			const change = fromDatabase.find( c => c.id === id );
			everythingFromLocalStorage.push( change );
		} );
		localStorage.setItem( 'changeHistory', JSON.stringify( everythingFromLocalStorage ) )
	}

	if ( idsInLocalStorageButNotInDatabase.size > 0 ) {
		idsInLocalStorageButNotInDatabase.forEach( id => {
			const change = fromLocalStorage.find( c => c.id === id );
			postChangeToDatabase( change );
		} );
	}
	
	return {
		postedToDatabase: idsInLocalStorageButNotInDatabase.size > 0,
		postedToLocalStorage: idsInDatabaseButNotInLocalStorage.size > 0
	}
	
}


const blankBoard = function() {
	return [ false, false, false, false, false,
	         false, false, false, false, false,
	         false, false, true,  false, false,
	         false, false, false, false, false,
	         false, false, false, false, false ];
}

// applyChangesToBoard ::
// ( 
//   [ Boolean{25} ], 
//   [ { timestamp: Number, index: Number, state: Boolean } ]
// ) 
// -> [ Boolean{25} ]
const applyChangesToBoard = function( initial, changes ) {
	const result = JSON.parse( JSON.stringify( initial ) );
	changes
		.sort( ( a, b ) => a.timestamp - b.timestamp )
		.forEach( change => { result[ change.index ] = change.state } );
	return result;
}

// oneBoardStateFromChangeHistory ::
// ( String, String, [ { timestamp: Number, index: Number, state: Boolean } ] )
// -> [ Boolean{25} ]
const oneBoardStateFromChangeHistory = function( gameName, playerName, changeHistory ) {
	const playerChanges = changeHistory.filter( change => 
		change.game === gameName &&
		change.board === playerName
	);
	return applyChangesToBoard( blankBoard(), playerChanges );
}

// boardStatesFromChangeHistory ::
// ( [ { game: String, player: String} ], [ { timestamp: Number, index: Number, state: Boolean } ] )
// -> [ { game: String, player: String, squareStates: [ Boolean{25} ] } ]
const boardStatesFromChangeHistory = function( gameAndPlayerNames, changeHistory ) {

	return gameAndPlayerNames.map( gb => ( {
		game: gb.game,
		player: gb.player,
		boardState: oneBoardStateFromChangeHistory( gb.game, gb.player, changeHistory )
	} ) );

}

const postChangeToDatabase = function( change ) {
	const endpoint = 'https://baabo-db.herokuapp.com/changes';
	
	// cast date to ISO8601 string
	change.timestamp = ( new Date( change.timestamp ) ).toISOString();
	
	navigator.sendBeacon( endpoint, new URLSearchParams( change ) );
}

const postChangeToLocalStorage = function( change ) {
	const changeHistory = fetchEntireChangeHistoryFromLocalStorage();
	changeHistory.push( change );
	localStorage.setItem( 'changeHistory', JSON.stringify( changeHistory ) );
}

const postChange = function( change ) {
	postChangeToDatabase( change );
	postChangeToLocalStorage( change );
}

// boardsFromLocalStorage ::
// ( [ { game: String, player: String} ] )
// -> [ { game: String, player: String, boardState: [ Boolean{25} ] } ]
const boardsFromLocalStorage = function( gameAndPlayerNames ) {
	return boardStatesFromChangeHistory(
		gameAndPlayerNames,
		fetchEntireChangeHistoryFromLocalStorage()
	);
}

const updateHtmlFromBoardState = function( tableEl, boardState ) {
	const tds = [ ...tableEl.querySelectorAll( 'td' ) ];
	boardState.forEach( ( cellState, index ) => {
		if ( cellState ) {
			tds[ index ].classList.add( 'checked' );
		} else {
			tds[ index ].classList.remove( 'checked' );
		}
	} );
}

const uuid = function() {
	if (
		'crypto' in self &&
		'randomUUID' in self.crypto
	) {
		// https://caniuse.com/mdn-api_crypto_randomuuid
		return self.crypto.randomUUID();
	}
	else {
		// https://stackoverflow.com/a/8809472
		var d = new Date().getTime(); // Timestamp
		var d2 = ( ( typeof performance !== 'undefined' ) && performance.now && ( performance.now() * 1000 ) ) || 0; // Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
			var r = Math.random() * 16; // random number between 0 and 16
			if ( d > 0 ) { // Use timestamp until depleted
				r = ( d + r ) % 16 | 0;
				d = Math.floor( d / 16 );
			} else { // Use microseconds since page-load if supported
				r = ( d2 + r ) % 16 | 0;
				d2 = Math.floor( d2 / 16 );
			}
			return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
		} );
	}
}

// exports (for node!)
if (typeof module !== "undefined" && module.exports) {
	module.exports =  {
		fetchChangeHistoryFromDatabaseWhere,
		boardStatesFromChangeHistory
	};
}