module.exports = {
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'access-control-allow-origin',
                        value: '*',
                    },
                ],
            },
        ]
    }
}