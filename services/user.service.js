import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    // getAll
};

async function login(payload) {
    try{
        const response = await fetch(`http://localhost:8080/authorize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        const user = data.data
        if (user){
            userSubject.next(user)
            localStorage.setItem('user', JSON.stringify(user));
        }        

        return user

    }catch(err){
        console.log(err)
    }
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

async function register(payload) {
    try{
        const response = await fetch(`http://localhost:8080/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data
    }catch(err){
        console.log(err)
    }
}

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
