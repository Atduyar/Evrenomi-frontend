class ApiAuth {
    constructor(loginBody = null) {
        this.loginBody = loginBody;
    }
    Login = async() => {
        console.log(this.loginBody);
        const response = await fetch('https://api.atduyar.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(this.loginBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson);
    }
}