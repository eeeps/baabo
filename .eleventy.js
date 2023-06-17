module.exports = function( eleventyConfig ) {
	eleventyConfig.addPassthroughCopy( 'style.css' );
	eleventyConfig.addPassthroughCopy( 'baabo.js' );
	eleventyConfig.addPassthroughCopy( '_redirects' );
}