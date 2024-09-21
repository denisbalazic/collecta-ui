import mongoose from 'mongoose';
import {seed} from '../support/seed';

const connectToDatabase = async (): Promise<typeof mongoose> => {
    const mongoUri = process.env.CYPRESS_TEST_DB;
    if (mongoose.connection.readyState === 0 && mongoUri) {
        await mongoose.connect(mongoUri);
        console.log('Connected to database');
    }
    return mongoose;
};

const pluginFunction = (on: Cypress.PluginEvents): void => {
    on('task', {
        resetDb: async () => {
            try {
                await connectToDatabase();
                const connection = mongoose.connection.db;

                const collections = (await connection?.listCollections().toArray()) || [];

                await Promise.all(
                    collections.map(async ({name: collectionName}) => {
                        const collection = connection?.collection(collectionName);
                        try {
                            await collection?.deleteMany({});
                            console.log(`Collection ${collectionName} reset successfully`);
                        } catch (error) {
                            console.error(`Failed to reset collection: ${collectionName}`, error);
                        }
                    })
                );

                return null;
            } catch (error) {
                console.error('Error resetting database:', error);
                throw error;
            }
        },

        seedDb: async () => {
            try {
                await connectToDatabase();
                const connection = mongoose.connection.db;

                await Promise.all(
                    Object.keys(seed).map(async (collectionName) => {
                        const collection = connection?.collection(collectionName);
                        const documents = seed[collectionName];

                        if (collection && documents.length) {
                            try {
                                await collection.insertMany(documents);
                                console.log(`Inserted ${documents.length} documents into ${collectionName}`);
                            } catch (error) {
                                console.error(`Failed to populate collection: ${collectionName}`, error);
                            }
                        } else {
                            console.warn(`No collection or no data to insert for ${collectionName}`);
                        }
                    })
                );

                console.log('Database seeded successfully');
                return null;
            } catch (error) {
                console.error('Error seeding database:', error);
                throw error;
            }
        },

        /* use resetDbAlt and seedDbAlt for the alternative implementation
         * if we don't have access to the database
         * and we have endpoints configured to reset and seed the database
         */
        resetDbAlt: () => {
            return cy.request('POST', 'http://localhost:3000/testDb/reset');
        },

        seedDbAlt: () => {
            return cy.request('POST', 'http://localhost:3000/testDb/populate', seed);
        },
    });
};

export default pluginFunction;
