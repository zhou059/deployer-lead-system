const processWrapper = {
    PORT: process.env.PORT ?? 8443,
    sfdcLeadCaptureServlet: process.env.sfdcLeadCaptureServlet,
    sfdcLeadCaptureUsername: process.env.sfdcLeadCaptureUsername,
    sfdcLeadCapturePassword: process.env.sfdcLeadCapturePassword,
    sfdcLeadCaptureServletAuth: process.env.sfdcLeadCaptureServletAuth,
    sfdcLeadCaptureClientSecret: process.env.sfdcLeadCaptureClientSecret,
    sfdcLeadCaptureClientId: process.env.sfdcLeadCaptureClientId,

    LEAD_QUEUE: process.env.LEAD_QUEUE ?? 'leads',
    FAILED_QUEUE: process.env.FAILED_QUEUE ?? 'failedLeads',
    REDIS_URL: process.env.REDIS_URL,
    FIXIE_URL: process.env.FIXIE_URL
};

export { processWrapper };
