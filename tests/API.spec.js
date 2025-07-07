import { test, expect, request } from '@playwright/test';

test('API login', async () => {
   
    const response = await fetch('https://the-internet.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: process.env.USERNAMEValid,
            password: process.env.PASSWORDValid,
        }), 
     });
 });



// const { test, expect, request } = require('@playwright/test');

// test('Login API — отримання токена', async () => {
//   const apiContext = await request.newContext();

//   const response = await apiContext.post('https://reqres.in/api/login', {
//     data: {
//       email: 'eve.holt@reqres.in',
//       password: 'cityslicka',
//     },
//   });

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.token).toBeTruthy();

//   console.log('Token:', body.token);
// });