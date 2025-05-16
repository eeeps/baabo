// most likely thing this doesn't deal with is diacritics
// but look if this ever gets serious use https://github.com/sindresorhus/slugify/

export default function urlSlugify( s ) {
	return s
		.trim()
		.toLowerCase()
		.replaceAll( '&', 'and' )
		.replace( /[\–\—]/g, '-' )
		.replace( /[^a-z\d\s\-]/g, '' )
		.replace( /\s+/g, '-' )
}