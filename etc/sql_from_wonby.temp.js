import prizes from '../_data/prizes.json' with { type: 'json' };
import urlSlugify from '../lib/urlSlugify.js';

console.log( prizes.reduce( ( acc, prize ) => {
	if ( prize.wonBy?.length > 0 ) {
		prize.wonBy.forEach( wonBy => {
			const timestamp = `${ wonBy.claimDate }T12:00-07:00`;
			acc +=`('${ timestamp }', '${ urlSlugify( prize.game ) }', '${ urlSlugify( prize.what ) }', '${ urlSlugify( wonBy.player ) }', TRUE, FALSE, '${ timestamp }'),\n`;
		} );
	}
	return acc;
}, 'INSERT INTO "public"."prize_changes"("timestamp", "game", "prize", "player", "state", "deleted", "created") VALUES\n' ) );