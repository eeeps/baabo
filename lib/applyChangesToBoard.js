// applyChangesToBoard ::
// ( 
//   [ Boolean{25} ], 
//   [ { timestamp: Number, index: Number, state: Boolean } ]
// ) 
// -> [ Boolean{25} ]
export default function applyChangesToBoard( initial, changes ) {
	const result = JSON.parse( JSON.stringify( initial ) );
	changes
		.sort( ( a, b ) => a.timestamp - b.timestamp )
		.forEach( change => { result[ change.index ] = change.state } );
	return result;
}