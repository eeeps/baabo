import test from 'node:test';
import assert from 'node:assert/strict';
import applyPrizeChangesToWonBy from '../lib/applyPrizeChangesToWonBy.js';

test('adding and removing prizewinners', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'celeste', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[
			 { timestamp: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ), player: 'britt', state: true },
			 { timestamp: new Date( Date.parse( '2026-06-02T00:00-07:00' ) ), player: 'eric', state: false }
		 ]
	);
	
	const expected = [
		{ player: 'celeste', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) },
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ) }
	];
	
	assert.deepStrictEqual(result, expected);
	
});