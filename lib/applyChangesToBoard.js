// applyChangesToBoard ::
// ( 
//   [ Boolean{25} ], 
//   [ { timestamp: Object (Date), index: Number, state: Boolean } ]
// ) 
// -> [ Boolean{25} ]

export default function applyChangesToBoard( initial, changes ) {
	const result = structuredClone( initial );
	changes
		.sort( ( a, b ) => a.timestamp.getTime() - b.timestamp.getTime() )
		.forEach( change => { result[ change.index ] = change.state } );
	return result;
}