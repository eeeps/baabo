/**
 * @param {{maxWinners: (number|null), wonBy?: array}} prize
 * @returns {(number|null)} the number of currently-available prizes for a given prize, or null if there is no limit
 */

export default function remainingPrizeCount( prize ) {
	if ( prize.maxWinners === null ) {
		return null;
	}
	return prize.maxWinners - ( prize.wonBy?.length || 0 );
}