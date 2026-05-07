import monochromize from './lib/monochromizeEmoji.js';
import urlSlugify from './lib/urlSlugify.js';
import remainingPrizeCount from './lib/remainingPrizeCount.js';
import prettyRemainingPrizeCount from './lib/prettyRemainingPrizeCount.js';

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
<div class="mainContain prizes" style="display: grid; grid-template-columns: 8rem 1fr;">
	<p style="grid-column: 1/3; text-align: center; font-size: 2rem;"><a href="/${ urlSlugify( data.game.name ) }/#prize-${ urlSlugify( data.prize.what ) }">← Back</a></p>
	<p class="emoji" style="text-align: center; view-transition-name: prize-${ urlSlugify( data.prize.what ) }-emoji">${ monochromize( data.prize.emoji ) }</p>
	<div>
		<h4 class=what style="view-transition-name: prize-${ urlSlugify( data.prize.what ) }-what">${ data.prize.what }</h4>
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
				<dd><form style='display: grid; grid-template-columns: repeat( auto-fit, minmax(10ch, 1fr) );'
				  ${ ( remainingPrizeCount( data.prize ) <= 0 ? 'class=noneAvailable' : '' ) }
				  ${ ( remainingPrizeCount( data.prize ) !== null && remainingPrizeCount( data.prize ) <= 0 ? 'class=noneAvailable' : '' ) }
				>
				${ data.players.map( player => { 
						
						const didThisPlayerWin = data.prize.wonBy.map( d => d.player.toLowerCase() ).includes( player.toLowerCase() );
					
					return `
					<label>
						<input type=checkbox${ ( didThisPlayerWin ? ' checked' : '' ) } disabled></input>
						${ player }
					</label>
				` } ).join('\n\n')}
				</form></dd>
			</div>
			<div>
				<dt>
					How many are available
				</dt>
				<dd>
					${ prettyRemainingPrizeCount( data.prize ) }
				</dd>
			</div>
		</dl>
	</div>

</div>

`;

};