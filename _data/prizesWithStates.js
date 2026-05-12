import fetchPrizeChangeHistoryFromDatabaseWhere from '../lib/fetchPrizeChangeHistoryFromDatabaseWhere.js';
import onePrizeWonByFromChangeHistory from '../lib/onePrizeWonByFromChangeHistory.js';
import urlSlugify from '../lib/urlSlugify.js';

import prizes from './prizes.json' with { type: 'json' };

export default async function() {

	// fetch entire change history
	const changeHistory = await fetchPrizeChangeHistoryFromDatabaseWhere( {} );
	
	return prizes.map( prize => ({
		...prize,
		wonBy: onePrizeWonByFromChangeHistory( urlSlugify( prize.game ), urlSlugify( prize.what ), changeHistory )
	}) );
	
};
