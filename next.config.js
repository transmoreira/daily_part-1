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
    },
}


