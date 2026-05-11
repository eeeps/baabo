export default function remainingPrizeCount( prize ) {
	if ( prize.maxWinners === null ) {
		return null;
	}
	return prize.maxWinners - ( prize.wonBy?.length || 0 );
}