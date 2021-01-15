module.exports = {
    apps: [{
        name: 'prefect',
        script: 'index.js',
        watch: false,
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
        exec_mode: 'cluster',
        instances: 1,
        source_map_support: true,
        max_restarts: 3,
    }],
};