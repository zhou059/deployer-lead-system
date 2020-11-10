const processWrapper = {
    PORT: process.env.PORT ?? 8443,
    sfdcLeadCaptureServlet: process.env.sfdcLeadCaptureServlet,
    LEAD_QUEUE: process.env.LEAD_QUEUE ?? 'leads',
    FAILED_QUEUE: process.env.FAILED_QUEUE ?? 'failedLeads',
    REDIS_URL: process.env.REDIS_URL
};

export { processWrapper };
