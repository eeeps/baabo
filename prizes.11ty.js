import monochromize from './lib/monochromizeEmoji.js';
import urlSlugify from './lib/urlSlugify.js';

export const data = {
	layout: "base.11ty.js",
	pagination: {
		data: "prizes",
		size: 1,
		alias: 'prize'
	},
	eleventyComputed: {
		permalink: data => `${ urlSlugify( data.prize.game ) }/prizes/${ urlSlugify( data.prize.what ) }/`,
		game: data => data.games.find( g => urlSlugify( g.name ) === urlSlugify( data.prize.game ) ),
		players: data => data.boards.filter( b => urlSlugify( b.game ) === data.prize.game ).map( b => b.player ).sort(),
		head: data => `
		`
	}
};

export function render(data) {
			
	return `
<div class="mainContain" style="display: grid; grid-template-columns: 8rem 1fr;">
	<p style="grid-column: 1/3; text-align: center; font-size: 2rem;"><a href="/${ urlSlugify( data.game.name ) }/#prize-${ urlSlugify( data.prize.what ) }">← Back</a></p>
	<p class="emoji" style="text-align: center;">${ monochromize( data.prize.emoji ) }</p>
	<div>
		<h4 class=what>${ data.prize.what }</h4>
		<dl style="font-size: 1.25em;">
			<div>
				<dt>From</dt>
				<dd ${ data.game.winner && ( urlSlugify( data.game.winner ) === urlSlugify( data.prize.from ) ) ? 'class="winner"' : '' }>${ data.prize.from }</dd>
			</div>
			<div>
				<dt>How to win</dt>
				<dd>${ data.prize.howToWin }</dd>
			</div>
			<div>
				<dt>Won by</dt>
				<dd><p>${data.prize.wonBy}</p><form style='display: grid; grid-template-columns: repeat( auto-fit, minmax(10ch, 1fr) );
'>
				${ data.players.map( player => `
					<label>
						<!-- todo wonby needs to be an array now... -->
						<input type=checkbox${ ( data.prize.wonBy?.toLowerCase().includes( player.toLowerCase() ) ? ' checked' : '' ) }></input>
						${ player }
					</label>
				`).join('\n\n')}
				</form></dd>
			</div>
			<div>
				<dt>Availability</dt>
				<dd><form style='display: grid;'>
					<label>
						<input type=radio name=availability${ ( data.prize.available ? ' checked' : '')} />
						Available
					</label>
					<label>
						<input type=radio name=availability${ ( !data.prize.available ? ' checked' : '')} />
						Claimed
					</label>
				</form></dd>
			</div>
		</dl>
	</div>

</div>

`;

};