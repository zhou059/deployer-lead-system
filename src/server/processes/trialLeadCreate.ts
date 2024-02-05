/* eslint-disable no-process-exit */
/* eslint-disable no-await-in-loop */
import logger from 'heroku-logger';
// import { sample } from '../__tests__/helpers/sampleLead';
import { getLead, getLeadQueueSize, putFailedLead } from '../lib/redisNormal';

import { leadCreate, auth } from '../lib/leadSupport';

(async () => {
    
    while ((await getLeadQueueSize()) > 0) {
        logger.debug('Lead queue consumer is up');
        const token = await auth();
        logger.debug(`access token is ${token}`);
        
        const lead = await getLead();
        // const lead = sample; // sample used for local testing only
        try {
            const result = await leadCreate(lead, token);
            logger.debug('success', result);
            logger.debug(`created lead ${lead.UserEmail}`);
        } catch (e) {
            console.log(e);
            logger.error('error in trialLeadCreate', lead);
            await putFailedLead(lead);
        }
    }
    process.exit(0);
})();
