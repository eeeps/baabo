export const data = {
	layout: "base.11ty.js",
	pagination: {
		data: "games",
		size: 1,
		alias: 'game'
	},
	eleventyComputed: {
		permalink: data => `${ data.game.name.toLowerCase() }/who-got-each-challenge/`
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
			console.log(player.toLowerCase());
			console.log(data.game.name);
			return bs.player.toLowerCase() === player.toLowerCase() && 
			bs.game.toLowerCase() === data.game.name.toLowerCase()
		}
		).boardState;
		
		
		
		board.challenges.forEach( ( challenge, index ) => {
			if ( challengesPlayersMap.has( challenge ) ) {
				const existingPlayers = challengesPlayersMap.get( challenge );
				challengesPlayersMap.set( challenge, existingPlayers.concat( [ {
					player,
					done: boardState[accountForFreeSpace(index)]
				} ] ) );
			} else {
				challengesPlayersMap.set( challenge, [ {
					player,
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
}
</style>

<div class="mainContain">
	<header>
		<h1><a href="/summer2024/">
			
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
	
	<h2>Who got each challenge??</h2>
	
	
<dl>

${ challengesPlayersArray.map( ( [ challenge, players ] ) => `
<div>
<dt>${ challenge }</dt>
${
	players.map( p => `<dd${ p.done ? ` class="done"` : '' }>${p.player}</dd>`).join('\n')
}
</div>
` ).join('\n') }

</dl>
`;

};