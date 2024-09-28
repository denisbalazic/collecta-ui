import axios from 'axios';
import {v4 as uuid} from 'uuid';

/*
 * These functions provide a way to use TestMail.app for testing email functionality.
 * They generate a unique email address with a tag and provide a way to fetch emails sent to that address.
 * Settings and list of received mails can be viewed at:
 * https://testmail.app/console
 */

export const generateTaggedEmailAddress = (tag: string): string => {
    const id = uuid().split('-')[0];
    const suffixedTag = `${tag}${id}`;
    return `${process.env.TESTMAIL_NAMESPACE}.${suffixedTag}@inbox.testmail.app`;
};

export const getTaggedEmail = async (email: string): Promise<any> => {
    // look at generateTaggedEmailAddress to see how the email is formatted
    const tag = email.split('@')[0].split('.')[1].toLowerCase();
    try {
        const response = await axios.get(`https://api.testmail.app/api/json`, {
            params: {
                apikey: process.env.TESTMAIL_API_KEY,
                namespace: process.env.TESTMAIL_NAMESPACE,
                pretty: true,
                tag,
            },
        });

        if (response.data.result === 'success' && response.data.emails.length > 0) {
            const taggedEmail = response.data.emails[response.data.emails.length - 1];

            return {
                headers: taggedEmail.headers,
                body: taggedEmail.html, // or lastEmail.text, depending on what you need
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return null;
    }
};
