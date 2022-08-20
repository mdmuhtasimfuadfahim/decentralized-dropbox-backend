// ecosystem.config.js
module.exports = {  
  apps: [{
    name: 'decentralized-dropbox',
    script: 'src/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user : 'mdmuhtasimfuadfahim',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/main',
      repo : 'https://github.com/mdmuhtasimfuadfahim/decentralized-dropbox-backend.git',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
