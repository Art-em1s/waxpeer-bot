import axios from 'axios';
import 'dotenv/config';

function getCurrentTimestamp(): string {
    const now = new Date();
    const date = now.toISOString().substring(0, 10).replace(/-/g, '-');
    const time = now.toTimeString().substring(0, 8);
    return `[${date} ${time}]`;
}

function logWithTimestamp(message: string) {
    console.log(`${getCurrentTimestamp()} ${message}`);
}

export async function sendNotification(content: string) {
    if (process.env.DISCORD_WEBHOOK_URL) {
        try {
            await axios.post(process.env.DISCORD_WEBHOOK_URL, {
                content,
            });
        } catch (err) {
            logWithTimestamp('Error sending notification to Discord');
            console.error(err);
        }
    }

    logWithTimestamp(content);
}