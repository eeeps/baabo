import fetchChangeHistoryFromLocalStorageWhere from './fetchChangeHistoryFromLocalStorageWhere.js';

export default function deleteChangeFromLocalStorage( id ) {
	const changeHistory = fetchChangeHistoryFromLocalStorageWhere( {} )
		.filter( c => c.id !== id );
	localStorage.setItem( 'changeHistory', JSON.stringify( changeHistory ) );
}