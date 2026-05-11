/** 
 * From an initial list of prize winners, apply a history
 * @param {{player: String, claimDate: Date}[]} initial
 * @param {{player: String, timestamp: Date, state: Boolean}[]} changes
 * @returns {{player: String, claimDate: Date}[]}
 * 
 * @example
 * applyPrizeChangesToWonBy(
 * 	 [
 * 		 { player: 'eric', claimDate: new Date( Date.parse( '2026-05-11T00:00-07:00' ) ) },
 * 		 { player: 'celeste', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) }
 * 	 ],
 * 	 [
 * 		  { timestamp: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ), player: 'britt', state: true },
 * 		  { timestamp: new Date( Date.parse( '2026-06-02T00:00-07:00' ) ), player: 'eric', state: false }
 * 	  ]
 *  );
 * // returns [
 * 	 { player: 'celeste', claimDate: new Date( Date.parse( '2026-05-12T00:00-07:00' ) ) },
 * 	 { player: 'britt', claimDate: new Date( Date.parse( '2026-06-01T00:00-07:00' ) ) }
 *  ];
 */

export default function applyPrizeChangesToWonBy( initial, changes ) {
	const result = structuredClone( initial );
	changes
		.sort( ( a, b ) => a.timestamp.getTime() - b.timestamp.getTime() )
		.forEach( change => {
		 	const existingIndex = result.findIndex( wonByItem => change.player === wonByItem.player );
			if ( change.state === true ) {

				// if the player is already on the won by list, and this is newer, update the claim date
				if ( existingIndex >= 0 && change.timestamp > result[existingIndex].claimDate ) {
					result[ existingIndex ].claimDate = change.timestamp;
				}

				// if the player isn't on the won by list, add them 
				if ( existingIndex === -1 ) {
					result.push( { player: change.player, claimDate: change.timestamp } );
				}

			}
			if ( change.state === false ) {

				// if the player is on the won by list, and this is newer, remove them
				if ( existingIndex >= 0 && change.timestamp > result[ existingIndex ].claimDate ) {
					result.splice( existingIndex, 1 );
				}

			}
		} );
	 return result
	 	.sort( ( a, b ) => a.claimDate.getTime() - b.claimDate.getTime() );
 }