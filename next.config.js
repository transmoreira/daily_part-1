module.exports = {
    async headers() {
        return [
            {
                source: '/api',
                headers: [
                    /*{
                        key: 'access-control-allow-origin',
                        value: '*',
                    },*/
                    {
                        key: 'Access-Control-Request-Method',
                        value: 'GET,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-with, X-PINGOTHER, Content-Type',
                    },
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    //:
                ]
            },
            
        ]
    },
}


