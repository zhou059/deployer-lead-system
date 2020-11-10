/* eslint-disable no-process-exit */
/* eslint-disable no-await-in-loop */
import logger from 'heroku-logger';

import { getLead, getLeadQueueSize, putFailedLead } from '../lib/redisNormal';

import { leadCreate } from '../lib/leadSupport';

(async () => {
    logger.debug('Lead queue consumer is up');
    while ((await getLeadQueueSize()) > 0) {
        const lead = await getLead();
        try {
            await leadCreate(lead);
            logger.debug(`created lead ${lead.UserEmail}`);
        } catch (e) {
            logger.error('error in trialLeadCreate', lead);
            await putFailedLead(lead);
        }
    }
    process.exit(0);
})();
