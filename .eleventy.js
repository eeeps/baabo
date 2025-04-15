export default function ( eleventyConfig ) {
	eleventyConfig.addPassthroughCopy( 'style.css' );
	eleventyConfig.addPassthroughCopy( '_redirects' );
	eleventyConfig.addPassthroughCopy( 'fonts' );
	eleventyConfig.addPassthroughCopy( 'lib' );
	eleventyConfig.addPassthroughCopy( 'assets' );
} 