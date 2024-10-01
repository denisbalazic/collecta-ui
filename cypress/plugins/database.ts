import mongoose from 'mongoose';
import axios from 'axios';
import {seed} from '../support/seed';

export const resetDb = async (): Promise<null> => {
    await axios.post('http://localhost:3000/testDb/reset');
    return null;
};

export const seedDb = async (): Promise<null> => {
    await axios.post('http://localhost:3000/testDb/populate', seed);
    return null;
};

/* Use resetDbAlt and seedDbAlt for the alternative implementation
 * if we have access to the database directly
 * and we don't want to use endpoints to reset and seed the database
 */

const connectToDatabase = async (): Promise<typeof mongoose> => {
    const mongoUri = process.env.CYPRESS_TEST_DB;
    if (mongoose.connection.readyState === 0 && mongoUri) {
        await mongoose.connect(mongoUri);
        console.log('Connected to database');
    }
    return mongoose;
};

export const resetDbAlt = async (): Promise<null> => {
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
};

export const seedDbAlt = async (): Promise<null> => {
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
};
