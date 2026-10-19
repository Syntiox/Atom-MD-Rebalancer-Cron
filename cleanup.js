const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');

const MAX_AGE_HOURS = 24; 
const MAX_AGE_MS = MAX_AGE_HOURS * 60 * 60 * 1000;

if (fs.existsSync(logsDir)) {
    const files = fs.readdirSync(logsDir);
    let deletedCount = 0;
    
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(logsDir, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isFile() && (Date.now() - stats.mtimeMs > MAX_AGE_MS)) {
                fs.unlinkSync(filePath);
                deletedCount++;
            }
        }
    });
    console.log(`Cleanup completed. Deleted ${deletedCount} old log files.`);
} else {
    console.log('Logs directory not found.');
}
