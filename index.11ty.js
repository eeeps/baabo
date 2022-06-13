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

<ul>
<li>Celeste
<li>Portrait of Celeste
<li>Full Frame (all four sides)
</ul>

<ul>
<li>Ellie
<li>Physical trophy that will be passed on for baabo generations
<li>Do the thing on your board that is the most scary (or challenging) to you
(Everyone must determine today)
</ul>

<ul>
<li>Rachel
<li>Throw a party with crazy cellar beer, open whatever you want
<li>Draw an X (everyone who gets the X gets to come)
</ul>

<ul>
<li>Britt
<li>Cocktails and dessert from Britt to you
<li>Draw an M
</ul>

<ul>
<li>Jake
<li>Illuminating waist pack
<li>Straight across (Only in the middle)
</ul>

<ul>
<li>Andrea
<li>2 tickets to price is right mount baker theatre
<li>S (all straight lines) (like money)
</ul>

<ul>
<li>Eric
<li>$25 gift certificate to Elizabeth station
<li>First BINGO
</ul>

<ul>
<li>Jeff
<li>Beers with u and me
<li>You get to choose brewery place and if the place is no good he’ll help choose a better one
<li>Draw a U (first three winners)
</ul>

<ul>
<li>Lindsey
<li>Tahitian chocolate pearl neckalace and bracelet
<li>Small circle around the free
</ul>

<ul>
<li>Jamie
<li>Whittled wooden spoon
<li>5 activities that are new to you
</ul>

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