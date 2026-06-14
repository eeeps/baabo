import remainingPrizeCount from './remainingPrizeCount.js';

// returns a string
export default function prettyRemainingPrizeCount( prize ) {
	const n  = remainingPrizeCount( prize );
	if ( n === null ) {
		return 'no limit'
	}
	if ( n === 0 ) {
		return 'none'
	}
	return n.toString();
}