// most likely thing this doesn't deal with is diacritics
// but look if this ever gets serious use https://github.com/sindresorhus/slugify/
// nah that's huge
// let's add things as they come up

export default function urlSlugify( s ) {
	return s
		.trim()
		.toLowerCase()
		.replaceAll( '&', 'and' )
		.replaceAll( 'é', 'e' )
		.replaceAll( 'û', 'u' )
		.replaceAll( '×', 'x' )
		.replace( /[\–\—\/]/g, '-' )
		.replace( /[^a-z\d\s\-]/g, '' )
		.replace( /\s+/g, '-' )
}


// TODO make actual tests
// also have a dedicated slug field for prizes?
// console.log(urlSlugify('Six creme brûlées'))
// console.log(urlSlugify('Three half-pints of homemade jam (your choice of strawberry, raspberry, and/or blackberry)'))