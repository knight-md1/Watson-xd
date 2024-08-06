const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0E4ZEIyYXp2dEF4UmVWb1RaYjA3ZHRKTUNaZGp0L0UvRTBCV1V5VHdHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05GUUhIRzROZzMvOENFWHJ0SFNBeisyNjBSampHdjgvK0FIcUJGSzNCOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNR0V5NVFhanFNSTFLUzhGMnF4cGJTT01yVk9iLzhCeFpJcEFjWGd6ZkdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5azJOK0xjWW5mbzlSOHVTOXFYeWhFTzhWNmFRTk90eDM5Wjh4OXRMVkNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdMa3g3RHFLMGwwcmxoTTIzb0xNdEwxeHJxdWNqdDgrNUMwQzQ1YW5oMGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRFTzNjdThocXMzTW9yazgzRWlJK3pKaWJHUERJbkpwenZYd3ZtbHlxWGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU9naklRVUxkZ1YrTzlTQ2RRSy83VU1GYnVDRWRZcngrL1dmdy92QWVHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkJxNzVHMTFweGZHM1JwZ0NoNzkyb1UySFE1Y013TXlGK01XeHhaV0UxYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZka1M0WDBKRHl1a3FTZmNPeHM3Y0d6RDFCMExZalc1Y3hQODVicW8va25EbytuUnN3SVVEYTdYclJoVkZRMS9XcTNLcXQvUkpFYVZkUCtPSEJNWUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6Ikg4ckhXNWp3WUVubXZXNkt0QlNTcndwb1RXbU1yRVVTTnp4d3VIRFY2R1k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5NjIyNzQ3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJFN0JDODk3NkQzNjgxQkNCNzQyMzQ5MDg3QjIwMUYxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjI5Mzk2NDV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkEwTkdCM0VDUTRHc1JtQkJiZ01KSWciLCJwaG9uZUlkIjoiY2M0MzBhMTctNTYyZC00ZmZmLWJiZTYtOGVjNDAwYzA0YWUwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJCdzM1UmNGbGhaczFBOVRUclRHRXdaNStuYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyd3ZBZTkvQXpZUTIrTXNuTCtxOGtvbko1Vlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUEFKNDQzMUYiLCJtZSI6eyJpZCI6IjI2Mzc4OTYyMjc0Nzo4M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJXYXRzb254ZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlBTcjdRR0VPM3h4N1VHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUXpqZGxkK3M2NWtBeXdQSzhmeHRCWUFGRng1NTJML09yS0xBeWZXMXkyMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ2h0dk41TUxUZzdaNG1Nbzdxbzdwc1VMcXpYWlRTbmRLR2FaWjlRQlpKdHpoWllBNkhxb3hybnY5aEQ4cnFPUDJuUUZpNjdVWDZTU013QXJlV1B6Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkhiWGgwYWg5T0lNajNQQlZXNmFJQ2JZYU02MlpVaTVHeGU1WW12VnBVY25HSTc0WVVJRDZFYlE2alcrbExiRWsvTHBOM0dMQXJtQ05YZlIxL1ZsZkFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg5NjIyNzQ3OjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVNNDNaWGZyT3VaQU1zRHl2SDhiUVdBQlJjZWVkaS96cXlpd01uMXRjdHQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI5Mzk2NDIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTVhCIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "WATSON-MD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263789622747",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'WATSON MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/1774326c63cc0b0e87680.jpg,https://telegra.ph/file/2e5cb1ec0619781c9fa41.jpg,https://telegra.ph/file/91e4fd1e8ce0fe6bb2253.jpg,https://telegra.ph/file/19df783b5751341a78780.jpg,https://telegra.ph/file/56dfb94e0f8b32fab33a7.jpg,https://telegra.ph/file/fe8a25fb17af3926e6048.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

