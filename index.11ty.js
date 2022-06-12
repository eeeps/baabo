exports.data = {
	layout: "base.11ty.js"
};

exports.render = function(data) {
	return `<div>
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
	</header>
	
	<h2>Players</h2>
	
	<ul class=players>
		${ data.boards.map( board => 
			`
		<li>
			<a href="/boards/${ board.player.toLowerCase() }"><div>
				<table class="thumb" data-player="${ board.player.toLowerCase() }">
					<tr><td><td><td><td><td>
					<tr><td><td><td><td><td>
					<tr><td><td><td class="checked"><td><td>
					<tr><td><td><td><td><td>
					<tr><td><td><td><td><td>
				</table>
				<p class=name>${ board.player }
			</div></a>
			`
		).join('\n\t\t') }
	</ul>
	
	<h2>Prizes</h2>
</div>

<script>
const tables = document.querySelectorAll( 'table' );

function updateTables( tables ) {
	
	const playerNames = [ ${ data.boards.map( b => `"${ b.player.toLowerCase() }"` ).join(', ') } ];
	const allBoards = boardsFromLocalStorage( playerNames );
	
	tables.forEach( table => {
		const playerName = table.dataset.player;
		updateHtmlFromBoardState( table, allBoards[ playerName ] );
	} );
	
}

updateTables( tables );
// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabase().then( ( result ) => {
	if ( result.postedToLocalStorage === true ) {
		updateTables( tables );
	}
} );


</script>

`;
}