import urlSlugify from './lib/urlSlugify.js';

export const data = {
	layout: "base.11ty.js",
	pagination: {
		data: "boards",
		size: 1,
		alias: 'board'
	},
	eleventyComputed: {
		permalink: data => `${ urlSlugify( data.board.game ) }/boards/${ urlSlugify( data.board.player ) }/`
	}
};

export function render(data) {
		
	const boardState = data.boardStates.find( boardState =>
		urlSlugify( boardState.game ) === urlSlugify( data.board.game ) &&
		urlSlugify( boardState.player ) === urlSlugify( data.board.player )
	).boardState;
		
	const game = data.games.find( g => urlSlugify( g.name ) === urlSlugify( data.board.game ) );
	
	return `
<div class="mainContain">
	<header>
		<h1 class="baaboHeader"><a href="/${ game.name }">
			
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
		<h2><span ${ game.winner && ( urlSlugify( game.winner ) === urlSlugify( data.board.player ) ) ? 'class="winner"' : '' }>${ data.board.player }</span></h2>
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
				const tdIndex = 13 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 14, 19 ).map( function( item, index ) {
				const tdIndex = 15 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
		<tr>
			${ data.board.challenges.slice( 19, 24 ).map( function( item, index ) {
				const tdIndex = 20 + index;
				return `<td${ ( boardState[ tdIndex ] ? ' class="checked"' : '' ) }>${ item }`;
			} ).join("") }
	</table>
</div>

<script type="module">

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

${ ( game.active ? `

import uuid from '/lib/uuid.js';
import postChange from '/lib/postChange.js';
import updateHtmlFromBoardState from '/lib/updateHtmlFromBoardState.js';
import boardsFromLocalStorage from '/lib/boardsFromLocalStorage.js';
import syncLocalStorageChangeHistoryAndDatabaseWhere from '/lib/syncLocalStorageChangeHistoryAndDatabaseWhere.js';

const gameName = '${ urlSlugify( data.board.game ) }';
const playerName = '${ urlSlugify( data.board.player ) }';

tds.forEach( ( td, index ) => {
	if ( index === 12 ) { return; } // free space
	td.classList.add('clickable');
	td.addEventListener( 'click', function() {
		this.classList.toggle( 'checked' );
		const change = {
			id: uuid(),
			timestamp: new Date(),
			game: gameName,
			board: playerName,
			index: index,
			state: this.classList.contains( 'checked' )
		};
		postChange( change );
	} );
} );

updateHtmlFromBoardState(
	table,
	boardsFromLocalStorage( [ { 
		game: gameName,
		player: playerName
	} ] )[ 0 ].boardState
);

// go out to the database and update again, asynchronously
syncLocalStorageChangeHistoryAndDatabaseWhere( {
	game: gameName,
	board: playerName
} ).then( ( result ) => {
	if ( result.postedToLocalStorage === true ||
	     result.deletedFromLocalStorage === true ) {
		updateHtmlFromBoardState(
			table,
			boardsFromLocalStorage( [ { 
				game: gameName,
				player: playerName
			} ] )[ 0 ].boardState
		);
	}
} );

` : '' ) }
</script>

`;

};