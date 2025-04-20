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

export function render(data) {

	const boards = data.boards
		.filter( x => x.game === data.game.name );
	
	const challengesPlayers = boards.reduce( ( challengesPlayersMap, board ) => {
		const player = board.player;
		board.challenges.forEach( challenge => {
			if ( challengesPlayersMap.has( challenge ) ) {
				const existingPlayers = challengesPlayersMap.get( challenge );
				challengesPlayersMap.set( challenge, existingPlayers.concat( [ player ] ) );
			} else {
				challengesPlayersMap.set( challenge, [ player ] );
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
	players.map( p => `<dd>${p}</dd>`).join('\n')
}
</div>
` ).join('\n') }

</dl>
`;

};