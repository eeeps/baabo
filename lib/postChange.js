import postChangeToDatabase from './postChangeToDatabase.js';
import postChangeToLocalStorage from './postChangeToLocalStorage.js';

export default function postChange( change ) {
	postChangeToDatabase( change );
	postChangeToLocalStorage( change );
}