module.exports = {
    apps: [{
        name: 'lush',
        script: 'yarn start ./',
        watch: true,
        env: {
            "NODE_ENV": "production"
        }
    }]
}