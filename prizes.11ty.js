import monochromize from './lib/monochromizeEmoji.js';
import urlSlugify from './lib/urlSlugify.js';
import remainingPrizeCount from './lib/remainingPrizeCount.js';

export const data = {
	layout: "base.11ty.js",
	pagination: {
		data: "prizesWithStates",
		size: 1,
		alias: 'prize'
	},
	eleventyComputed: {
		permalink: data => `${ urlSlugify( data.prize.game ) }/prizes/${ urlSlugify( data.prize.what ) }/`,
		game: data => data.games.find( g => urlSlugify( g.name ) === urlSlugify( data.prize.game ) ),
		players: data => data.boards.filter( b => urlSlugify( b.game ) === data.prize.game ).map( b => b.player ).sort(),
		head: data => `
${ data.game.active ? `
<script type="module" blocking="render">

// imports
import fetchPrizeChangeHistoryFromLocalStorageWhere from '/lib/fetchPrizeChangeHistoryFromLocalStorageWhere.js';
import onePrizeWonByFromChangeHistory from '/lib/onePrizeWonByFromChangeHistory.js';
import syncLocalStoragePrizeChangeHistoryAndDatabaseWhere from '/lib/syncLocalStoragePrizeChangeHistoryAndDatabaseWhere.js';
import updatePrizeDetailFromPrizeState from '/lib/updatePrizeDetailFromPrizeState.js';

import uuid from '/lib/uuid.js';
import postPrizeChange from '/lib/postPrizeChange.js';

// hoisted imports
import timestampReviver from '/lib/timestampReviver.js';
import applyPrizeChangesToWonBy from '/lib/applyPrizeChangesToWonBy.js';
import fetchPrizeChangeHistoryFromDatabaseWhere from '/lib/fetchPrizeChangeHistoryFromDatabaseWhere.js';
import setDifference from '/lib/setDifference.js';
import postPrizeChangeToDatabase from '/lib/postPrizeChangeToDatabase.js';
import postPrizeChangesToLocalStorage from '/lib/postPrizeChangesToLocalStorage.js';
import deletePrizeChangeFromLocalStorage from '/lib/deletePrizeChangeFromLocalStorage.js';



// game and prize name
const gameName = '${ urlSlugify( data.prize.game ) }';
const prizeName = '${ urlSlugify( data.prize.what ) }';
const maxWinners = ${ data.prize.maxWinners };

// calculate wonBy from what's in local storage now
// set checkbox states based on that
const prizeChanges = fetchPrizeChangeHistoryFromLocalStorageWhere( {
	game: gameName,
	prize: prizeName
} );

// todo can i eliminate the gamename and prizename here, and assume changehistory is always pre-filtered?
const wonBy = onePrizeWonByFromChangeHistory( gameName, prizeName, prizeChanges );
const checkboxForm = document.getElementById( 'playerCheckboxes' );
// we store the .noneAvailable state here, because it's the highest thing we have access to in this page (body is handled by template...)
const mainContain = document.querySelector( '.mainContain' );

updatePrizeDetailFromPrizeState( mainContain, checkboxForm, wonBy, maxWinners )


// sync with the database, and if there were relevant changes, update again, async
syncLocalStoragePrizeChangeHistoryAndDatabaseWhere( {
	game: gameName,
	prize: prizeName
} ).then( ( result ) => {
	if ( result.postedToLocalStorage === true ||
		 result.deletedFromLocalStorage === true ) {
		updatePrizeDetailFromPrizeState(
			mainContain,
			checkboxForm,
			onePrizeWonByFromChangeHistory(
				gameName,
				prizeName,
				fetchPrizeChangeHistoryFromLocalStorageWhere( {
					game: gameName,
					prize: prizeName
				} )
			),
			maxWinners
		);
	}
} );

// set event listeners
checkboxForm.querySelectorAll('input[type=checkbox]').forEach( c => {
	
	c.addEventListener( 'input', ( event ) => {
		
		//console.log(event)
		
		const change = {
			id: uuid(),
			timestamp: new Date(),
			game: gameName,
			prize: prizeName,
			player: event.target.name,
			state: event.target.checked
		};
		//console.log(change)

		console.log(postPrizeChange( change ));
		
		const wonBy = [ ...checkboxForm.querySelectorAll( 'input[type=checkbox]:checked' ) ]
			// we don't actually need claimdates, I think?
			.map( cb => ({ player: cb.name, claimDate: null }) );
		
		updatePrizeDetailFromPrizeState( mainContain, checkboxForm, wonBy, maxWinners )
		
	} );

} );

</script>
` : '' }
		`
	}
};

export function render(data) {
			
	return `
<div
	class="mainContain prizes prizesDetail ${ ( remainingPrizeCount( data.prize ) !== null && remainingPrizeCount( data.prize ) <= 0 ? 'noneAvailable' : '' ) }"
	style="display: grid; grid-template-columns: 8rem 1fr;"
>
	<p style="grid-column: 1/3; text-align: center; font-size: 2rem;"><a href="/${ urlSlugify( data.game.name ) }/#prize-${ urlSlugify( data.prize.what ) }">← Back</a></p>
	<p class="emoji" style="text-align: center; view-transition-name: prize-${ urlSlugify( data.prize.what ) }-emoji">${ monochromize( data.prize.emoji ) }</p>
	<div>
		<hgroup>
			<h1 class=what style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-what">${ data.prize.what }</h1>
			${ ( data.prize.subhead ? `<p style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-subhead">
				${ data.prize.subhead }
			</p>` : '' ) }
		</hgroup>
		<dl>
			<div>
				<dt style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-from-dt">From</dt>
				<dd
					${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( data.prize.from ) ) ? 'class="winner"' : '' }
					style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-from-dd"
				>${ data.prize.from }</dd>
			</div>
			<div>
				<dt
					style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-how-to-win-dt"
				>How to win</dt>
				<dd
					style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-how-to-win-dd"
				>${ data.prize.howToWin }</dd>
			</div>
			<div>
				<dt
					style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-won-by-dt"
				>Won by</dt>
				<dd><form id="playerCheckboxes" style='display: grid; grid-template-columns: repeat( auto-fit, minmax(15ch, 1fr) );'>
				${ data.players
					.filter( player => urlSlugify( player ) !== urlSlugify( data.prize.from ) )
					.map( player => { 
						
					const didThisPlayerWin = data.prize.wonBy.map( d => urlSlugify(d.player) ).includes( urlSlugify( player ) );
					
					return `
					<label>
						<input name="${ urlSlugify( player ) }" type=checkbox${ ( didThisPlayerWin ? ' checked' : '' ) } disabled></input>
						${ player }
					</label>
				` } ).join('\n\n')}
				</form></dd>
			</div>
		</dl>
	</div>

</div>

`;

};