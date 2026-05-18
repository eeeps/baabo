import fetchPrizeChangeHistoryFromDatabaseWhere from './fetchPrizeChangeHistoryFromDatabaseWhere.js';
import fetchPrizeChangeHistoryFromLocalStorageWhere from './fetchPrizeChangeHistoryFromLocalStorageWhere.js';
import setDifference from './setDifference.js';
import postPrizeChangeToDatabase from './postPrizeChangeToDatabase.js';
import postPrizeChangesToLocalStorage from './postPrizeChangesToLocalStorage.js';

/**
 * Sync prize history between database and localStorage, optionally filtering to some subset of changes
 * returns info on whether the sync added anything to either the database or localStorage, 
 * or whether we deleted things from localStorage
 * because we update the front-end differently in each of these cases
 * 
 * @param {object} where? - empty object syncs entire change history
 * @param {{string}[]} where.games?
 * @param {string} where.game?
 * @param {string} where.prize?
 * @param {Date} where.sinceTimestamp?
 *
 * @returns {
 * 	 postedToDatabase: {boolean},
 * 	 postedToLocalStorage: {boolean},
 * 	 deletedFromLocalStorage {boolean}
 * }
 */

export default async function syncLocalStoragePrizeChangeHistoryAndDatabaseWhere( where ) {

	const fromDatabase = await fetchPrizeChangeHistoryFromDatabaseWhere( where );
	const fromLocalStorage = fetchPrizeChangeHistoryFromLocalStorageWhere( where );
	
	const databaseIDs = new Set( fromDatabase.map( change => change.id ) );
	const localStorageIDs = new Set( fromLocalStorage.map( change => change.id ) );
	
	const idsInDatabaseButNotInLocalStorage = setDifference( databaseIDs, localStorageIDs );
	const idsInLocalStorageButNotInDatabase = setDifference( localStorageIDs, databaseIDs );
	
	// post things in database but not in localstorage to localstorage
	if ( idsInDatabaseButNotInLocalStorage.size > 0 ) {	
		const prizeChangesToPost = [ ...idsInDatabaseButNotInLocalStorage ].map( id => 
			fromDatabase.find( c => c.id === id )
		);
		postPrizeChangesToLocalStorage(prizeChangesToPost);
	}
	
	// post things in local storage but not in database to database
	// if it tells us any were deleted, postChangeToDatabase will delete them from localstorage
	// but we need to know about that and report
	let deletedFromLocalStorage = false;
	if ( idsInLocalStorageButNotInDatabase.size > 0 ) {
		const results = await Promise.all( [ ...idsInLocalStorageButNotInDatabase ].map( async id => {
			const change = fromLocalStorage.find( c => c.id === id );
			return await postPrizeChangeToDatabase( change ); // returns { deleted: Boolean }
		} ) );
		deletedFromLocalStorage = results.some( r => r.deleted );
	}
	
	return {
		postedToDatabase: idsInLocalStorageButNotInDatabase.size > 0,
		postedToLocalStorage: idsInDatabaseButNotInLocalStorage.size > 0,
		deletedFromLocalStorage
	}
	
}