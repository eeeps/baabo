import monochromize from './lib/monochromizeEmoji.js';
import urlSlugify from './lib/urlSlugify.js';
import remainingPrizeCount from './lib/remainingPrizeCount.js';

export const data = {
	pagination: {
		data: "games",
		size: 1,
		alias: 'game'
	},
	eleventyComputed: {
		permalink: data => `${ data.game.name }/`,
		boards: data => data.boards.filter( x => x.game === data.game.name ),
		head: data => `
${ data.game.active ? `
<script type="module" blocking="render">

import boardsFromLocalStorage from '/lib/boardsFromLocalStorage.js';
import updateHtmlFromBoardState from '/lib/updateHtmlFromBoardState.js';
import urlSlugify from '/lib/urlSlugify.js';
import syncLocalStorageChangeHistoryAndDatabaseWhere from '/lib/syncLocalStorageChangeHistoryAndDatabaseWhere.js';

/* hoisted
   https://bsky.app/profile/mayank.co/post/3lpucuvplic2d */
import '/lib/boardStatesFromChangeHistory.js';
import '/lib/fetchChangeHistoryFromLocalStorageWhere.js';
import '/lib/oneBoardStateFromChangeHistory.js';
import '/lib/fetchChangeHistoryFromDatabaseWhere.js';
import '/lib/setDifference.js';
import '/lib/postChangeToDatabase.js';
import '/lib/timestampReviver.js';
import '/lib/db.js';
import '/lib/deleteChangeFromLocalStorage.js';
import '/lib/applyChangesToBoard.js';
import '/lib/blankBoard.js';
import '/env.js'; 

const tables = document.querySelectorAll( 'table:not(.tiny)' );

function updateTables( tables ) {
	
	const playerNames = [ ${ data.boards.map( b => `"${ urlSlugify( b.player ) }"` ).join(', ') } ];
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
		`
	},
	layout: "base.11ty.js"
};

export function render(data) {

	// used for listing prize winners
	const prettyList = new Intl.ListFormat( 'en', { style: 'long', type: 'conjunction' } );

	const boardStates = data.boardStates
		.filter( x => x.game === data.game.name );
	const prizes = data.prizes
		.filter( x => x.game === data.game.name )
		// add some computed properties
		.map( prize => ( {
			...prize,
			html: `
				<li>
					<p
						class="emoji"
						style="view-transition-name: prize-${ urlSlugify( prize.what ) }-emoji"
					>${ monochromize( prize.emoji ) }</p>
					<div>
						<hgroup>
							<h4
								class=what
								id="prize-${ urlSlugify( prize.what ) }"><a
									href="/${ urlSlugify( prize.game ) }/prizes/${ urlSlugify( prize.what ) }/" 
									style="view-transition-name: prize-${ urlSlugify( prize.what ) }-what">${ prize.what }</a
							></h4>
							${ ( prize.subhead ? `<p style="view-transition-name: prize-${ urlSlugify( prize.what ) }-subhead">
								${ prize.subhead }
							</p>` : '' ) }
						</hgroup>
						<dl>
							<div>
								<dt
									style="view-transition-name: prize-${ urlSlugify( prize.what ) }-from-dt"
								>From</dt>
								<dd
									${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( prize.from ) ) ? 'class="winner"' : '' }
									style="view-transition-name: prize-${ urlSlugify( prize.what ) }-from-dd"
								>${ prize.from }</dd>
							</div>
							<div>
								<dt
									style="view-transition-name: prize-${ urlSlugify( prize.what ) }-how-to-win-dt"
								>How to win</dt>
								<dd
									style="view-transition-name: prize-${ urlSlugify( prize.what ) }-how-to-win-dd"
								>${ prize.howToWin }</dd>
							</div>
							${
								( prize.wonBy.length > 0 ? `
									<div>
										<dt
											style="view-transition-name: prize-${ urlSlugify( prize.what ) }-won-by-dt"
										>Won by</dt>
										<!-- todo dazzle the name again -->
										<dd>
											${ prettyList.format( prize.wonBy.map( d => d.player ) ) }
										</dd>
									</div>
								` : '' )
							}
						</dl>
					</div>
				</li>
			`
		} ) );

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
			<rb>O</rb><rp>(</rp><rt>-oredom</rt><rp>)</rp>
			</ruby>

		</a></h1>
	</header>
	
	<h2>Players</h2>
	
	<ul class=players>
		${ data.boards.map( board => {
			const boardState = boardStates.find( bs => 
				urlSlugify( bs.player ) === urlSlugify( board.player )
			).boardState;
			const tds = boardState.map( checked => `<td${ ( checked ? ' class="checked"' : '' ) }>` );
			return `
		<li>
			<a href="/${ urlSlugify( board.game ) }/boards/${ urlSlugify( board.player ) }"><div>
				<table class="thumb" data-player="${ urlSlugify( board.player ) }"
				 style="view-transition-name: ${ urlSlugify( board.player ) }-board;">					<tr>${ tds[ 0 ] }${ tds[ 1 ] }${ tds[ 2 ] }${ tds[ 3 ] }${ tds[ 4 ] }
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
			.filter( prize => prize.maxWinners === null || remainingPrizeCount( prize ) > 0 )
			.map( prize => prize.html )
			.join('\n\t\t')
		}

	</ul>

	<h3><span>Claimed</span></h3>

	<ul class="prizes noneAvailable">

		${ prizes
		.filter( prize => prize.maxWinners !== null && remainingPrizeCount( prize ) <= 0 )
		.map( prize => prize.html )
		.join('\n\t\t')
	}

	</ul>



</div>

`;
}
