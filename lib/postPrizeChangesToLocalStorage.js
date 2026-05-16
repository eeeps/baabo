import fetchPrizeChangeHistoryFromLocalStorageWhere from './fetchPrizeChangeHistoryFromLocalStorageWhere.js';

/**
 * Append prize changes to localStorage representation of prize change history
 * @param {Object[]} prizeChanges
 * @param {string} prizeChanges[].id - uuid
 * @param {Date} prizeChanges[].timestamp
 * @param {string} prizeChanges[].game
 * @param {string} prizeChanges[].prize
 * @param {string} prizeChanges[].player
 * @param {boolean} prizeChanges[].state
 * @returns {undefined} - side effects only
 */
 
export default function postPrizeChangesToLocalStorage( prizeChanges ) {
	const changeHistory = fetchPrizeChangeHistoryFromLocalStorageWhere( {} );
	prizeChanges.forEach( change => changeHistory.push( change ) );
	localStorage.setItem( 'prizeChangeHistory', JSON.stringify( changeHistory ) );
}