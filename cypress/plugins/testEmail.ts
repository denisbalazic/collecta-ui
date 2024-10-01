import axios from 'axios';

/*
 * These functions provide a way to use TestMail.app for testing email functionality.
 * Settings and list of received mails can be viewed at:
 * https://testmail.app/console
 */

const testMailNamespace = 'kycjz';
export const getTaggedEmailAddress = (tag: string): string => {
    return `${testMailNamespace}.${tag}@inbox.testmail.app`;
};

/**
 * Fetches the last tagged email sent to the specified email address after the given timestamp.
 * Timestamp should be obtained on the very beginning of the test, so we can fetch only emails that were sent after the test started.
 *
 * @param {Object} params - The parameters for fetching the email.
 * @param {string} params.email - The email address to fetch the email for.
 * @param {number} params.timestampFrom - The timestamp from which to start fetching emails.
 * @returns {Promise<{headers: Record<string, string>, body: string} | null>} - The headers and body of the last tagged email, or null if no email is found.
 */
export const getLastTaggedEmail = async ({
    email,
    timestampFrom,
}: {
    email: string;
    timestampFrom: number;
}): Promise<{headers: Record<string, string>; body: string} | null> => {
    // look at generateTaggedEmailAddress to see how the email is formatted
    const tag = email.split('@')[0].split('.')[1].toLowerCase();
    try {
        const response = await axios.get(`https://api.testmail.app/api/json`, {
            params: {
                apikey: process.env.TESTMAIL_API_KEY,
                namespace: process.env.TESTMAIL_NAMESPACE,
                pretty: true,
                tag,
                timestamp_from: timestampFrom,
            },
        });

        if (response.data.result === 'success' && response.data.emails.length > 0) {
            const taggedEmail = response.data.emails[response.data.emails.length - 1];

            return {
                headers: taggedEmail.headers,
                body: taggedEmail.html, // or taggedEmail.text, depending on what you need
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return null;
    }
};
