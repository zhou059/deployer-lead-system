// the purpose of this file is to wrap any interaction with Redis.
// This lets us keep key names in a single place, and handle any validate / stringify / parse operations.
// Users of this file just get/put/delete things as if redis is fancier than it really is

import Redis from 'ioredis';
import { processWrapper } from './processWrapper';
import logger from 'heroku-logger';

logger.debug(`redis url is ${processWrapper.REDIS_URL}`);
const redis = new Redis(processWrapper.REDIS_URL);

const putFailedLead = async (lead) => {
    if (processWrapper.sfdcLeadCaptureServlet) {
        await redis.rpush(processWrapper.FAILED_QUEUE, JSON.stringify(lead));
    }
};

const getLead = async () => {
    const lead = await redis.lpop(processWrapper.LEAD_QUEUE);
    return JSON.parse(lead);
};

const getLeadQueueSize = async () => redis.llen(processWrapper.LEAD_QUEUE);

export { getLead, getLeadQueueSize, putFailedLead };
