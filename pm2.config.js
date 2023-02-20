module.exports = {
    apps: [{
        name: 'lush',
        script: 'npm start ./',
        watch: true,
        env: {
            "NODE_ENV": "production"
        }
    }]
}