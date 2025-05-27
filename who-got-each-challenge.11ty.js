import urlSlugify from './lib/urlSlugify.js';

export const data = {
	layout: "base.11ty.js",
	pagination: {
		data: "games",
		size: 1,
		alias: 'game'
	},
	eleventyComputed: {
		permalink: data => `${ urlSlugify( data.game.name ) }/who-got-each-challenge/`
	}
};

// well this is frustrating
function accountForFreeSpace( index ) {
	if (index > 11) {
		return index + 1;
	}
	return index;
}

export function render(data) {

	const boards = data.boards
		.filter( x => x.game === data.game.name );
	
	const challengesPlayers = boards.reduce( ( challengesPlayersMap, board ) => {
		const player = board.player;
		
		const boardState = data.boardStates.find( bs => {
			return urlSlugify( bs.player ) === urlSlugify( player ) && 
			       urlSlugify( bs.game ) === urlSlugify( data.game.name )
		} ).boardState;
		
		board.challenges.forEach( ( challenge, index ) => {
			if ( challengesPlayersMap.has( challenge ) ) {
				const existingPlayers = challengesPlayersMap.get( challenge );
				challengesPlayersMap.set( challenge, existingPlayers.concat( [ {
					player,
					index,
					done: boardState[accountForFreeSpace(index)]
				} ] ) );
			} else {
				challengesPlayersMap.set( challenge, [ {
					player,
					index,
					done: boardState[accountForFreeSpace(index)]
				} ] );
			}
		} );
		return challengesPlayersMap;
	}, new Map() );
	
	const challengesPlayersArray = Array.from( challengesPlayers );
			
	return `
<style>
dl {
	font-size: 1.5rem;
}
dl > div {
	margin: 2em;
}
dt {
	background: black;
	color: white;
	padding: 0.25ch 0.5ch;
}
.done {
	text-decoration: line-through;
	text-decoration-thickness: 0.1875ch;
}
</style>

<div class="mainContain">
	<header>
		<h1><a href="/${ urlSlugify( data.game.name ) }/">
			
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
	
	<h2>Who got each challenge?</h2>
	
	
<dl>

${ challengesPlayersArray.map( ( [ challenge, players ] ) => `
<div>
<dt>${ challenge }</dt>
${
	players.map( p => `
<dd
	class="player ${ p.done ? ` done` : '' }"
	data-player="${ urlSlugify( p.player ) }"
	data-index="${ p.index }"
>
	${ p.player }
</dd>
	` ).join('\n')
}
</div>
` ).join('\n') }

</dl>

${ data.game.active ? `
<script type="module"">

import boardsFromLocalStorage from '/lib/boardsFromLocalStorage.js';
import updateHtmlFromBoardState from '/lib/updateHtmlFromBoardState.js';
import syncLocalStorageChangeHistoryAndDatabaseWhere from '/lib/syncLocalStorageChangeHistoryAndDatabaseWhere.js';

const playerNameDds = [...document.querySelectorAll( '.player' )];

// well this is frustrating
function accountForFreeSpace( index ) {
	if (index > 11) {
		return index + 1;
	}
	return index;
}

function updatePlayerNameDds(playerNameDds) {
	const playerNames = [ ${ boards.map( b => `"${ urlSlugify( b.player ) }"` ).join(', ') } ];
	const gameBoards = boardsFromLocalStorage( playerNames.map( pn => ( {
		game: "${ urlSlugify( data.game.name ) }",
		player: pn,
	} ) ) );
	playerNameDds.forEach( dd  => {
		const player = dd.dataset.player;
		const index = parseInt( dd.dataset.index );
		const playerBoard = gameBoards.find( b => b.player === player );
		const done = playerBoard.boardState[ accountForFreeSpace( index ) ];
		if ( done ) {
			dd.classList.add( 'done' );
		} else {
			dd.classList.remove( 'done' );
		}
	} );
}

updatePlayerNameDds( playerNameDds );
// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabaseWhere( { game: '${ urlSlugify( data.game.name ) }' } ).then( ( result ) => {
	if ( result.postedToLocalStorage === true ) {
		updatePlayerNameDds( updatePlayerNameDds );
	}
} );


</script>
` : '' }

`;

};