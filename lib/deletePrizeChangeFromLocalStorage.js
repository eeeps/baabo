import fetchPrizeChangeHistoryFromLocalStorageWhere from './fetchPrizeChangeHistoryFromLocalStorageWhere.js';

/**
 * Delete an prize change item from localStorage
 * @param {uuid} id
 * @returns {undefined}
 */

export default function deletePrizeChangeFromLocalStorage( id ) {
	const prizeChangeHistory = fetchPrizeChangeHistoryFromLocalStorageWhere( {} )
		.filter( c => c.id !== id );
	localStorage.setItem( 'prizeChangeHistory', JSON.stringify( prizeChangeHistory ) );
}