module.exports = {
    async headers() {
        return [
            {
                source: '/api',
                headers: [
                    {
                        key: 'access-control-allow-origin',
                        value: '*',
                    },
                    
                ]
            },
            
        ]
    }
}

module.exports = {
    httpAgentOptions: {
    keepAlive: false,
  }
}
