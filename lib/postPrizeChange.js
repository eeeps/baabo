import postPrizeChangeToDatabase from './postPrizeChangeToDatabase.js';
import postPrizeChangesToLocalStorage from './postPrizeChangesToLocalStorage.js';

/**
 * Add a prize change to localstorage and the database
 * @param {object} change
 * @param {uuid} prizeChange.id
 * @param {Date} prizeChange.timestamp
 * @param {string} prizeChange.game
 * @param {string} prizeChange.prize
 * @param {string} prizeChange.player
 * @param {boolean} prizeChange.state
 * @returns undefined
 */

export default function postPrizeChange( change ) {
	postPrizeChangeToDatabase( change ); // this is async but we don't care about the response here, just the side effects
	postPrizeChangesToLocalStorage( [ change ] );
}