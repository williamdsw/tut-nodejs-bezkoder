
module.exports = {
    HOST: 'us-cdbr-east-02.cleardb.com',
    USER: 'b609f075a917a4',
    PASSWORD: '08d45d26',
    DATABASE: 'heroku_5717e3d2e337d68',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};