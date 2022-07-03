exports.data = {
	layout: "base.11ty.js",
	pagination: {
		data: "boards",
		size: 1,
		alias: 'board'
	},
	eleventyComputed: {
		permalink: data => `boards/${ data.board.player.toLowerCase() }/`
	}
};

exports.render = function(data) {
	const boardState = data.boardStates[ data.board.player.toLowerCase() ];
	return `
<div class="mainContain">
	<header>
		<h1><a href="/">
			
			<ruby>B
			<rp>(</rp><rt>Bellingham</rt><rp>)</rp>
			</ruby>
				
			<ruby>A
			<rp>(</rp><rt>Adults</rt><rp>)</rp>
			</ruby>
				
			<ruby>A
			<rp>(</rp><rt>Against</rt><rp>)</rp>
			</ruby>
			
			<ruby>B
			<rp>(</rp><rt>B-</rt><rp>)</rp>
			</ruby>

			<ruby>o
			<rp>(</rp><rt>-oredom</rt><rp>)</rp>
			</ruby>

		</a></h1>
		<h2>${ data.board.player }</h2>
	</header>
	<table>
		<tr>
			${ data.board.challenges.slice( 0, 5 ).map( function( item, index ) {
				const tdIndex = index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 5, 10 ).map( function( item, index ) {
				const tdIndex = 5 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 10, 12 ).map( function( item, index ) {
				const tdIndex = 10 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
			<td class="freespace"><img src="https://o.img.rodeo/image/upload/v1653428416/q1wweqagv9qwh5dwh6dl.svg">
			${ data.board.challenges.slice( 12, 14 ).map( function( item, index ) {
				const tdIndex = 12 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 14, 19 ).map( function( item, index ) {
				const tdIndex = 14 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 19, 24 ).map( function( item, index ) {
				const tdIndex = 19 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
	</table>
</div>

<script>
const table = document.querySelector( 'table' );
const tds = [ ...table.querySelectorAll( 'td' ) ];

tds.forEach( td => {
	if (td.textContent.length > 50) {
		td.classList.add('long');
	}
	if (td.textContent.length > 90) {
		td.classList.add('extra');
	}
	if (td.textContent.length > 130) {
		td.classList.add('super');
	}
	if (td.textContent.length > 170) {
		td.classList.add('duper');
	}
} );

tds.forEach( ( td, index ) => {
	if ( index === 12 ) { return; } // free space
	td.addEventListener( 'click', function() {
		this.classList.toggle( 'checked' );
		const change = {
			id: uuid(),
			timestamp: Date.now(),
			board: '${ data.board.player.toLowerCase() }',
			index: index,
			state: this.classList.contains( 'checked' )
		};
		postChange( change );
	} );
} );

const playerName = '${ data.board.player.toLowerCase() }';

updateHtmlFromBoardState(
	table,
	boardsFromLocalStorage( [ playerName ] )[ playerName ]
);

// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabase().then( ( result ) => {
	if ( result.postedToLocalStorage === true ) {
		updateHtmlFromBoardState(
			table,
			boardsFromLocalStorage( [ playerName ] )[ playerName ]
		);
	}
} );

</script>

`;

};