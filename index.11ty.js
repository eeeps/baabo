exports.data = {
	layout: "base.11ty.js"
};

exports.render = function(data) {

// console.log( data.boardStates );

	return `<div class=mainContain>
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
		${ data.boards.map( board => {
			const boardState = data.boardStates[ board.player.toLowerCase() ];
			const tds = boardState.map( checked => `<td${ ( checked ? ' class="checked"' : '' ) }>` );
			return `
		<li>
			<a href="/boards/${ board.player.toLowerCase() }"><div>
				<table class="thumb" data-player="${ board.player.toLowerCase() }">
					<tr>${ tds[ 0 ] }${ tds[ 1 ] }${ tds[ 2 ] }${ tds[ 3 ] }${ tds[ 4 ] }
					<tr>${ tds[ 5 ] }${ tds[ 6 ] }${ tds[ 7 ] }${ tds[ 8 ] }${ tds[ 9 ] }
					<tr>${ tds[ 10 ] }${ tds[ 11 ] }<td class="checked">${ tds[ 13 ] }${ tds[ 14 ] }
					<tr>${ tds[ 15 ] }${ tds[ 16 ] }${ tds[ 17 ] }${ tds[ 18 ] }${ tds[ 19 ] }
					<tr>${ tds[ 20 ] }${ tds[ 21 ] }${ tds[ 22 ] }${ tds[ 23 ] }${ tds[ 24 ] }
				</table>
				<h4 class=name>${ board.player }</h4>
			</div></a>
			`
		} ).join('\n\t\t') }
	</ul>
	
	<h2>Prizes</h2>

	<h3><span>Available</span></h3>

	<ul class="prizes available">

		${ data.prizes
			.filter( prize => prize.available )
			.map( prize => `
		<li>
			<p class="emoji">${ prize.emoji }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd>${ prize.from }
					</div>
					<div>
						<dt>How to win</dt>
						<dd>${ prize.howToWin }
					</div>
				</dl>
			</div>
		</li>
		`).join('\n\t\t') }

	</ul>

	<h3><span>Claimed</span></h3>

	<ul class="prizes claimed">

		${ data.prizes
			.filter( prize => !prize.available )
			.map( prize => `
		<li>
			<p class="emoji">${ prize.emoji }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd>${ prize.from }
					</div>
					<div>
						<dt>How to win</dt>
						<dd>${ prize.howToWin }
					</div>
					<div>
						<dt>Won by</dt>
						<dd>${ prize.wonBy }
					</div>
				</dl>
			</div>
		</li>
		`).join('\n\t\t') }

	</ul>



</div>

<script>
const tables = document.querySelectorAll( 'table:not(.tiny)' );

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