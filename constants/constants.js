module.exports = {
    EMAIL_REGEXP: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret1221',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '123secretkey',
    RESET_PASS_ACTION_TOKEN_SECRET: process.env.RESET_PASS_ACTION_TOKEN_SECRET || 'ukraine228',
    DEFAULT_EMAIL: process.env.DEFAULT_EMAIL || 'test@gmail.com',
    DEFAULT_EMAIL_PASSWORD: process.env.DEFAULT_EMAIL_PASSWORD || 'test@gmail.com',
    FORGET_PASS_FRONT_URL: 'http://localhost:5000',
    DEFAULT_ADMIN_EMAIL: process.env.DEFAULT_ADMIN_EMAIL || 'test@gmail.com',
    DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_EMAIL_PASSWORD || 'Test1234#',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000&http://localhost:4200',
    MAX_REQUESTS_PER_TIME: process.env.MAX_REQUESTS_PER_TIME || 500,
    CRON_JOBS_SEND_EMAIL: process.env.CRON_JOBS_SEND_EMAIL || 'artikkurtak@gmail.com'
};
