import { MongoClient, Db } from 'mongodb';

class Database {
    private static instance: Database;
    private client: MongoClient | null = null;
    private db: Db | null = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        try {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
            this.client = await MongoClient.connect(uri);
            this.db = this.client.db('urlshortener');
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }

    public getDb(): Db {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        return this.db;
    }
}

export default Database;