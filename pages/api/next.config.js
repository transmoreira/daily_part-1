export default  headers=> {
    return [
        {
            source: '/dailyPart',
            headers: [
                {
                    key: 'access-control-allow-origin',
                    value: '*',
                },
            ],
        },
    ]
}