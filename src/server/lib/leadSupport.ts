// asynchronously posts the lead form back to org62
import request from 'request-promise-native';

import { processWrapper } from './processWrapper';
import logger from 'heroku-logger';

const requestPage = '/form.html';
const resultPage = '/conf.html';
const requestHost = 'www.salesforce.com';

const auth = async () => {
    const uri = `${
        processWrapper.sfdcLeadCaptureServletAuth
    }?grant_type=password&client_id=${encodeURIComponent(
        processWrapper.sfdcLeadCaptureClientId
    )}&client_secret=${encodeURIComponent(
        processWrapper.sfdcLeadCaptureClientSecret
    )}&username=${encodeURIComponent(
        processWrapper.sfdcLeadCaptureUsername
    )}&password=${encodeURIComponent(processWrapper.sfdcLeadCapturePassword)}`;
    logger.debug(`auth url is ${uri}`);
    const authResponse = await request.post(uri, {
        headers: {
            'Content-Type': 'application/json'
        },
        proxy: processWrapper.FIXIE_URL,
        json: true
    });
    console.log(authResponse);
    return authResponse.access_token;
};

const leadCreate = async function (incoming, token: string): Promise<any> {
    const formPostBody = {
        userFirstName: incoming.UserFirstName,
        userLastName: incoming.UserLastName,
        companyName: incoming.CompanyName,
        userTitle: incoming.UserTitle,
        userEmail: incoming.UserEmail,
        userPhone: incoming.UserPhone,
        companyState: incoming.CompanyState,
        companyPostalCode: incoming.CompanyPostalCode,
        // CompanyEmployees: incoming.CompanyEmployees,
        companyCountry: incoming.CompanyCountry,
        mcloudFormName: incoming.mcloudFormName,
        // 'Lead.LeadSource': incoming['Lead.LeadSource'],
        formCampaignId: incoming.FormCampaignId,
        driverCampaignId: incoming.DriverCampaignId,
        Web_Form_URL__c: incoming['Lead.Web_Form_URL__c'],
        leadType: incoming.leadType,
        primaryProductInterest: incoming.primaryProductInterest,
        SignupEdition__c: incoming['SignupEdition__c'],
        Trial_Name__c: incoming['Trial_Name__c'],
        Trial_Language__c: incoming['Trial_Language__c'],
        Region__c: incoming['TrialRegion'],
        requestPage,
        resultPage,
        requestHost
    };

    logger.debug('lead to send is', formPostBody);
    const result = await request.post(processWrapper.sfdcLeadCaptureServlet, {
        auth: {
            bearer: token
        },
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formPostBody),
        proxy: processWrapper.FIXIE_URL
        // json: true
    });

    console.log(result);
    return result;
};

export { leadCreate, auth };
