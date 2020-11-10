// asynchronously posts the lead form back to org62
import axios from 'axios';
import querystring from 'querystring';

import { processWrapper } from './processWrapper';

const sfdcLeadCaptureServlet = processWrapper.sfdcLeadCaptureServlet;
const requestPage = '/form.html';
const resultPage = '/conf.html';
const requestHost = 'www.salesforce.com';

const leadCreate = async function (incoming): Promise<void> {
    const formPostBody = {
        UserFirstName: incoming.UserFirstName,
        UserLastName: incoming.UserLastName,
        CompanyName: incoming.CompanyName,
        UserTitle: incoming.UserTitle,
        UserEmail: incoming.UserEmail,
        UserPhone: incoming.UserPhone,
        CompanyState: incoming.CompanyState,
        CompanyPostalCode: incoming.CompanyPostalCode,
        // CompanyEmployees: incoming.CompanyEmployees,
        CompanyCountry: incoming.CompanyCountry,
        mcloudFormName: incoming.mcloudFormName,
        // 'Lead.LeadSource': incoming['Lead.LeadSource'],
        FormCampaignId: incoming.FormCampaignId,
        DriverCampaignId: incoming.DriverCampaignId,
        requestPage,
        resultPage,
        requestHost
    };

    await axios({
        // strictSSL: false,
        url: sfdcLeadCaptureServlet,
        method: 'post',

        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: querystring.stringify(formPostBody),
        responseType: 'text'
    });

    // logger.debug(JSON.stringify(response));
};

export { leadCreate };
