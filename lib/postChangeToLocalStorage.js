import fetchChangeHistoryFromLocalStorageWhere from './fetchChangeHistoryFromLocalStorageWhere.js';

export default function postChangeToLocalStorage( change ) {
	const changeHistory = fetchChangeHistoryFromLocalStorageWhere( {} );
	changeHistory.push( change );
	localStorage.setItem( 'changeHistory', JSON.stringify( changeHistory ) );
}