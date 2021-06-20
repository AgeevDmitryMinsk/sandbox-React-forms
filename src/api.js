class Api {
    constructor () {
        this.profile = {
            name: 'foooo',
            descr: 'barrr'
        }
    }

    getUserInfo (){
        return new Promise(resolve => {
            setTimeout(()=> {
                resolve(this.profile);
            }, 1000)
        })
    }

    setProfileInfo(data) {
        return new Promise(resolve => {
            setTimeout(()=> {
                this.profile = data;
                resolve(data);
            }, 1000)
        })
    }
}

export const api = new Api();