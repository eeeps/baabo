export default function setDifference( setA, setB ) {
	return new Set( [ ...setA ].filter( x => !setB.has( x ) ) );
}