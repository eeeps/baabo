import monochromize from './lib/monochromizeEmoji.js';
import urlSlugify from './lib/urlSlugify.js';

export const data = {
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


export function render(data) {

	const boards = data.boards
		.filter( x => x.game === data.game.name );
	const boardStates = data.boardStates
		.filter( x => x.game === data.game.name );
	const prizes = data.prizes
		.filter( x => x.game === data.game.name );

	return `<div class="mainContain" data-game="${ data.game.name }">
	<header>
		<h1 class="baaboHeader"><a href="/">
			
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
				urlSlugify( bs.player ) === urlSlugify( board.player )
			).boardState;
			const tds = boardState.map( checked => `<td${ ( checked ? ' class="checked"' : '' ) }>` );
			return `
		<li>
			<a href="/${ urlSlugify( board.game ) }/boards/${ urlSlugify( board.player ) }"><div>
				<table class="thumb" data-player="${ urlSlugify( board.player ) }"
				 style="view-transition-name: ${ urlSlugify( board.player ) }-board;">
					<tr>${ tds[ 0 ] }${ tds[ 1 ] }${ tds[ 2 ] }${ tds[ 3 ] }${ tds[ 4 ] }
					<tr>${ tds[ 5 ] }${ tds[ 6 ] }${ tds[ 7 ] }${ tds[ 8 ] }${ tds[ 9 ] }
					<tr>${ tds[ 10 ] }${ tds[ 11 ] }<td class="checked">${ tds[ 13 ] }${ tds[ 14 ] }
					<tr>${ tds[ 15 ] }${ tds[ 16 ] }${ tds[ 17 ] }${ tds[ 18 ] }${ tds[ 19 ] }
					<tr>${ tds[ 20 ] }${ tds[ 21 ] }${ tds[ 22 ] }${ tds[ 23 ] }${ tds[ 24 ] }
				</table>
				<h4 class="name ${ data.game.winner &&  ( urlSlugify( data.game.winner ) === urlSlugify( board.player ) ) ? 'winner' : '' }">${ board.player }</h4>
			</div></a>
			`
		} ).join('\n\t\t') }
	</ul>
	
	<p style="margin: 3em; text-align: center;">
		<a href="who-got-each-challenge/"
		   style="font-size: 2rem; text-underline-offset: 0.1em; padding: 0.125ch 0.5ch 0.25ch 0.5ch;">
			Who got each challenge?
		</a>
	</p>
	
	
	<h2>Prizes</h2>

	<h3><span>Available</span></h3>

	<ul class="prizes available">

		${ prizes
			.filter( prize => prize.available )
			.map( prize => `
		<li>
			<p class="emoji">${ monochromize( prize.emoji ) }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd ${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( prize.from ) ) ? 'class="winner"' : '' }>${ prize.from }</dd>
					</div>
					<div>
						<dt>How to win</dt>
						<dd>${ prize.howToWin }</dd>
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
			<p class="emoji">${ monochromize(prize.emoji) }</p>
			<div>
				<h4 class=what>${ prize.what }</h4>
				<dl>
					<div>
						<dt>From</dt>
						<dd ${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( prize.from ) ) ? 'class="winner"' : '' }>${ prize.from }</dd>
					</div>
					<div>
						<dt>How to win</dt>
						<dd>${ prize.howToWin }</dd>
					</div>
					<div>
						<dt>Won by</dt>
						<dd ${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( prize.wonBy ) ) ? 'class="winner"' : '' }>${ prize.wonBy }</dd>
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
import urlSlugify from '/lib/urlSlugify.js';

const tables = document.querySelectorAll( 'table:not(.tiny)' );

function updateTables( tables ) {
	
	const playerNames = [ ${ boards.map( b => `"${ urlSlugify( b.player ) }"` ).join(', ') } ];
	const allBoards = boardsFromLocalStorage( playerNames.map( pn => ( {
		game: "${ urlSlugify( data.game.name ) }",
		player: pn,
	} ) ) );
	
	tables.forEach( table => {
		const playerName = urlSlugify( table.dataset.player );
		// console.log( allBoards.find( b => urlSlugify( b.player ) === playerName ).boardState );
		updateHtmlFromBoardState( table, allBoards.find( b => urlSlugify( b.player ) === playerName ).boardState );
	} );
	
}

updateTables( tables );

// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabaseWhere( { game: '${ urlSlugify( data.game.name ) }' } ).then( ( result ) => {
	if ( result.postedToLocalStorage === true ||
	     result.deletedFromLocalStorage === true ) {
		updateTables( tables );
	}
} );


</script>
` : '' }
`;
}
