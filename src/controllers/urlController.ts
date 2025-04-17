import { Request, Response } from 'express';
import shortid from 'shortid';
import Database from '../config/database';
import { IUrl } from '../types/url';

export class UrlController {
    static async shortenUrl(req: Request, res: Response): Promise<void> {
        const { longUrl } = req.body;

        if (!this.isValidUrl(longUrl)) {
            res.status(400).json({ error: 'Invalid URL format provided.' });
            return;
        }

        try {
            const db = Database.getInstance().getDb();
            const urlsCollection = db.collection<IUrl>('urls');

            // Check if URL already exists
            const existingUrl = await urlsCollection.findOne({ longUrl });

            if (existingUrl) {
                res.json(existingUrl);
                return;
            }

            const urlCode = shortid.generate();
            const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

            const newUrl: IUrl = {
                urlCode,
                longUrl,
                shortUrl,
                createdAt: new Date(),
                clicks: 0
            };

            await urlsCollection.insertOne(newUrl);
            res.status(201).json(newUrl);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async redirectUrl(req: Request, res: Response): Promise<void> {
        try {
            const db = Database.getInstance().getDb();
            const urlsCollection = db.collection<IUrl>('urls');
            
            const url = await urlsCollection.findOne({ urlCode: req.params.code });

            if (url) {
                await urlsCollection.updateOne(
                    { urlCode: req.params.code },
                    { $inc: { clicks: 1 } }
                );
                
                res.redirect(301, url.longUrl);
            } else {
                res.status(404).json({ error: 'Short URL not found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    private static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}