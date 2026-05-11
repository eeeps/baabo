import test from 'node:test';
import assert from 'node:assert/strict';
import onePrizeWonByFromChangeHistory from '../lib/onePrizeWonByFromChangeHistory.js';

test('one change, one winner', (t) => {
	
	const result = onePrizeWonByFromChangeHistory(
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
	);
	
	const expected = [
		{
			player: 'eric',
			claimDate: new Date( Date.parse( '2026-05-01T00:00-07' ) )
		}
	];
	
	assert.deepStrictEqual(result, expected);
	
});