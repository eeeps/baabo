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

test('no change history returns the initial list', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[]
	);
	
	const expected = [
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});

test('removing a player that wasn’t there does nothing', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[
			{ timestamp: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ), player: 'celeste', state: false }
		]
	);
	
	const expected = [
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});


test('removing an existing player before the existing claim date does nothing', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[
			{ timestamp: new Date( Date.parse( '2026-04-01T00:00-07:00' ) ), player: 'eric', state: false }
		]
	);
	
	const expected = [
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});

test('adding an existing player before the existing claim date does nothing', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[
			{ timestamp: new Date( Date.parse( '2026-04-01T00:00-07:00' ) ), player: 'eric', state: true }
		]
	);
	
	const expected = [
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});

test('adding an existing player after the existing claim date updates the claim date, and order', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
			{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
		],
		[
			{ timestamp: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ), player: 'eric', state: true }
		]
	);
	
	const expected = [
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) },
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});

test('adding a non-existing player before an existing player returns them both in the proper order', (t) => {
	
	const result = applyPrizeChangesToWonBy(
		[
			{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) }
		],
		[
			{ timestamp: new Date( Date.parse( '2026-04-01T00:00-07:00' ) ), player: 'britt', state: true }
		]
	);
	
	const expected = [
		{ player: 'britt', claimDate: new Date( Date.parse( '2026-04-01T00:00-07:00' ) ) },
		{ player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) }
	]
	
	assert.deepStrictEqual(result, expected);
	
});