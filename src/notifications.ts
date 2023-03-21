import axios from 'axios';
import 'dotenv/config';

function getCurrentTimestamp(): string {
    const now = new Date();
    const dateString = now.toDateString(); // Format: "Mon Mar 21 2023"
    const [_, month, day, year] = dateString.split(' ');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `[${day}-${month} ${hours}:${minutes}:${seconds}]`;
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