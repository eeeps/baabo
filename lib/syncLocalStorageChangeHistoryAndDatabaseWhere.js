import fetchChangeHistoryFromDatabaseWhere from './fetchChangeHistoryFromDatabaseWhere.js';
import fetchChangeHistoryFromLocalStorageWhere from './fetchChangeHistoryFromLocalStorageWhere.js';
import setDifference from './setDifference.js';
import postChangeToDatabase from './postChangeToDatabase.js';

// where looks like
// { games, game, board, sinceTimestamp }
// see fetchChangeHistoryFromDatabaseWhere and  fetchChangeHistoryFromLocalStorageWhere
export default async function syncLocalStorageChangeHistoryAndDatabaseWhere( where ) {

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