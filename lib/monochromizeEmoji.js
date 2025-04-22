// https://github.com/googlefonts/noto-emoji/issues/438#issuecomment-2821680948

// replace
const monochromize = (emoji) => {
  const codepoints = [ ...emoji ]
    .map( codepoint => {
      const int = codepoint.codePointAt(0);
      return ( int === 65039 ? 65038 : int );
    } );
  return String.fromCodePoint( ...codepoints );
}

//strip
const monochromizeStrip = (emoji) => {
	const codepoints = [ ...emoji ]
		.filter( codepoint  => codepoint.codePointAt(0) !== 65039 )
		.map( codepoint => codepoint.codePointAt(0))
	console.log(emoji);
	console.log(codepoints);
	return String.fromCodePoint(...codepoints);
}



export default monochromize;