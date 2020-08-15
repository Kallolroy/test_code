const config = {
    api: {
        base: process.env.REACT_APP_BASE_URL,
        tokenLabel: 'Authorization',
        //tokenValue: token => 'Bearer ' + token,
        contentType: 'application/json; charset=UTF-8',
        pageSize: 100,
        tokenCheckMinute: 5,
    },
}

export default config;
