import applyPrizeChangesToWonBy from './applyPrizeChangesToWonBy.js';

/** 
 * Derive an ordered "won by" list for a specific prize from a complete change history
 * @param {string} game - game
 * @param {number} prize - prize
 * @param {{game: string, prize: string, player: string, timestamp: Date }[]}} changeHistory - some set of prizeChanges objects
 * @returns {{player: string, claimDate: Date}[]} - An array of objects listing (hopefully unique!) players and the date they each claimed the prize
 * 
 * @example
 * onePrizeWonByFromChangeHistory(
	  '2026', 
	  'toothbrush',
	  [
		 {
			 game: '2026', 
			 prize: 'toothbrush', 
			 player: 'eric',
			 timestamp: new Date( Date.parse( '2026-05-01T00:00-07' ) ),
			 state: true
		 }
	 ]
 ); // returns [ { player: 'eric', claimDate: new Date( Date.parse( '2026-05-01T00:00-07' ) ) } ];
 */
export default function onePrizeWonByFromChangeHistory( game, prize, changeHistory ) {
	
	const prizeHistory = changeHistory
		.filter(c => c.game === game & c.prize === prize);
	
	return applyPrizeChangesToWonBy([], prizeHistory);
}
