class AuthApi{
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _validateQuery(res) {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    register({email, password}) {
          return fetch(`${this.baseUrl}/signup`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })   
        .then(this._validateQuery.bind(this))
           
    }

    login({email, password}) {
        return fetch(`${this.baseUrl}/signin`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })
            .then(this._validateQuery.bind(this))
            .then((res) => {
                if(res.token) {
                  localStorage.setItem('jwt', res.token);
                  return res;
                } else {
                    return;
                }
            
        })   
    }
    
    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(this._validateQuery);
    }
}

const apiAuth = new AuthApi({
   baseUrl: 'https://api.procsimo.nomoredomainsmonster.ru',
   headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
   }
})

 export default apiAuth;