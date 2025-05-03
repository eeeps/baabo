import postChangeToDatabase from './postChangeToDatabase.js';
import postChangeToLocalStorage from './postChangeToLocalStorage.js';

export default function postChange( change ) {
	postChangeToDatabase( change ); // this is async but we don't care about the response here, just the side effects
	postChangeToLocalStorage( change );
}