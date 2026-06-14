export default function wonByHtmlFromWonBy( wonBy ) {

const prettyList = new Intl.ListFormat( 'en', { style: 'long', type: 'conjunction' } );

return ( prize.wonBy.length > 0 ? `
	<div>
		<dt
			style="view-transition-name: prize-${ urlSlugify( prize.what ) }-won-by-dt"
		>Won by</dt>
		<!-- todo dazzle the name again -->
		<dd>
			${ prettyList.format(
				prize.wonBy.map( d => 
					data.players
						.find( player => player.slug === d.player )
						.name
				)
			) }
		</dd>
	</div>
` : '' )

}