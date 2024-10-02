exports.data = {
	pagination: {
		data: "games",
		size: 1,
		alias: 'game'
	},
	eleventyComputed: {
		permalink: data => `${ data.game.name }/`
	},
	layout: "base.11ty.js"
};


exports.render = function( data ) {

	const boards = data.boards
		.filter( x => x.game === data.game.name );
	const boardStates = data.boardStates
		.filter( x => x.game === data.game.name );
	const prizes = data.prizes
		.filter( x => x.game === data.game.name );

	return `<div class="mainContain" data-game="${ data.game.name }">
	<header>
		<h1><a href="/">
			
			<!-- need rb to work around https://bugs.webkit.org/show_bug.cgi?id=275828 -->
			<!-- can't have a space between /rb and rp on safari -->
			<ruby>
			<rb>B</rb><rp>(</rp><rt>Bellingham</rt><rp>)</rp>
			</ruby>
				
			<ruby>
			<rb>A</rb><rp>(</rp><rt>Adults</rt><rp>)</rp>
			</ruby>
				
			<ruby>
			<rb>A</rb><rp>(</rp><rt>Against</rt><rp>)</rp>
			</ruby>
			
			<ruby>
			<rb>B</rb><rp>(</rp><rt>B-</rt><rp>)</rp>
			</ruby>

			<ruby>
			<rb>o</rb><rp>(</rp><rt>-oredom</rt><rp>)</rp>
			</ruby>

		</a></h1>
	</header>
	
	<h2>Players</h2>
	
	<ul class=players>
		${ boards.map( board => {
			const boardState = boardStates.find( bs => 
				bs.player.toLowerCase() === board.player.toLowerCase()
			).boardState;
			const tds = boardState.map( checked => `<td${ ( checked ? ' class="checked"' : '' ) }>` );
			return `
		<li>
			<a href="/${ board.game.toLowerCase() }/boards/${ board.player.toLowerCase() }"><div>
				<table class="thumb" data-player="${ board.player.toLowerCase() }">
					<tr>${ tds[ 0 ] }${ tds[ 1 ] }${ tds[ 2 ] }${ tds[ 3 ] }${ tds[ 4 ] }
					<tr>${ tds[ 5 ] }${ tds[ 6 ] }${ tds[ 7 ] }${ tds[ 8 ] }${ tds[ 9 ] }
					<tr>${ tds[ 10 ] }${ tds[ 11 ] }<td class="checked">${ tds[ 13 ] }${ tds[ 14 ] }
					<tr>${ tds[ 15 ] }${ tds[ 16 ] }${ tds[ 17 ] }${ tds[ 18 ] }${ tds[ 19 ] }
					<tr>${ tds[ 20 ] }${ tds[ 21 ] }${ tds[ 22 ] }${ tds[ 23 ] }${ tds[ 24 ] }
				</table>
				<h4 class="name ${ data.game.winner === board.player.toLowerCase() ? 'winner' : '' }">${ board.player }</h4>
			</div></a>
			`
		} ).join('\n\t\t') }
	</ul>
	
	${ (
		data.game.name === '2023' || data.game.name === 'winter2023-24' || data.game.name === 'summer2024' ?
			`<p style="margin: 3em; text-align: center;">
				<a href="who-got-each-challenge/"
				   style="font-size: 2rem; text-underline-offset: 0.1em; padding: 0.125ch 0.5ch 0.25ch 0.5ch;">
				   	Who got each challenge?
				</a>
			</p>`
		:
			''
	) }
	
	
	<h2>Prizes</h2>

	<h3><span>Available</span></h3>

	<ul class="prizes available">

		${ prizes
			.filter( prize => prize.available )
			.map( prize => `
		<li>
			<p class="emoji">${ prize.emoji }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd ${ data.game.winner === prize.from.toLowerCase() ? 'class="winner"' : '' }>${ prize.from }
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

		${ prizes
			.filter( prize => !prize.available )
			.map( prize => `
		<li>
			<p class="emoji">${ prize.emoji }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd ${ data.game.winner === prize.from.toLowerCase() ? 'class="winner"' : '' }>${ prize.from }
					</div>
					<div>
						<dt>How to win</dt>
						<dd>${ prize.howToWin }
					</div>
					<div>
						<dt>Won by</dt>
						<dd ${ data.game.winner === prize.wonBy.toLowerCase() ? 'class="winner"' : '' }>${ prize.wonBy }
					</div>
				</dl>
			</div>
		</li>
		`).join('\n\t\t') }

	</ul>



</div>

${ data.game.active ? `
<script type="module"">

import boardsFromLocalStorage from '/lib/boardsFromLocalStorage.js';
import updateHtmlFromBoardState from '/lib/updateHtmlFromBoardState.js';
import syncLocalStorageChangeHistoryAndDatabaseWhere from '/lib/syncLocalStorageChangeHistoryAndDatabaseWhere.js';


const tables = document.querySelectorAll( 'table:not(.tiny)' );

function updateTables( tables ) {
	
	const playerNames = [ ${ boards.map( b => `"${ b.player.toLowerCase() }"` ).join(', ') } ];
	const allBoards = boardsFromLocalStorage( playerNames.map( pn => ( {
		game: "${ data.game.name.toLowerCase() }",
		player: pn,
	} ) ) );
	
	tables.forEach( table => {
		const playerName = table.dataset.player.toLowerCase();
		// console.log( allBoards.find( b => b.player.toLowerCase() === playerName ).boardState );
		updateHtmlFromBoardState( table, allBoards.find( b => b.player.toLowerCase() === playerName ).boardState );
	} );
	
}

updateTables( tables );
// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabaseWhere( { game: '${ data.game.name.toLowerCase() }' } ).then( ( result ) => {
	if ( result.postedToLocalStorage === true ) {
		updateTables( tables );
	}
} );


</script>
` : '' }
`;
}
