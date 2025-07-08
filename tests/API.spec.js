import { test, expect } from "@playwright/test";

//POST Method 
test("POST request Create New Booking ", async ({ request }) => {
 const response = await request.post("https://restful-booker.herokuapp.com/booking", {
   data: {
     firstname: "Kim",
     lastname: "Smith",
     totalprice: 125,
     depositpaid: true,
     bookingdates: {
       checkin: "2024-04-01",
       checkout: "2024-07-15",
     },
     additionalneeds: "Breakfast",
   },
 });
 console.log(JSON.stringify(response));
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
 const responseBody = await response.json();
  console.log(responseBody);

 expect(responseBody.booking).toHaveProperty("totalprice", 125);
 expect(responseBody.booking).toHaveProperty("firstname", "Kim");
 expect(responseBody.booking).toHaveProperty("lastname", "Smith");
 expect(responseBody.booking).toHaveProperty("depositpaid", true);
});

//GET Method
test("GET request Get Booking by ID", async ({ request }) => {
 const bookingId = 1; // Replace with a valid booking ID
 const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
 console.log(JSON.stringify(response));
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
 const responseBody = await response.json();
 expect(responseBody).toHaveProperty("firstname");
 expect(responseBody).toHaveProperty("lastname");
 expect(responseBody).toHaveProperty("totalprice");
 expect(responseBody).toHaveProperty("depositpaid");
 expect(responseBody).toHaveProperty("bookingdates");
});

//PUT Method
test("PUT request Update Booking by ID", async ({ request }) => {   
 const bookingId = 17125; // Replace with a valid booking ID
 const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
   data: {
     firstname: "John",
     lastname: "Doe",
     totalprice: 150,
     depositpaid: false,
     bookingdates: {
       checkin: "2024-05-01",
       checkout: "2024-08-15",
     },
     additionalneeds: "Dinner",
   },
 });
 console.log(JSON.stringify(response));
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
 const responseBody = await response.json();
 expect(responseBody).toHaveProperty("firstname", "John");
 expect(responseBody).toHaveProperty("lastname", "Doe");
 expect(responseBody).toHaveProperty("totalprice", 150);
 expect(responseBody).toHaveProperty("depositpaid", false);
});
//DELETE Method
test("DELETE request Delete Booking by ID", async ({ request }) => {
 const bookingId = 17125; // Replace with a valid booking ID
 const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
 console.log(JSON.stringify(response));
 //expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(201); // 201 Created is expected for successful deletion
});
//GET Method with Authentication
test("GET request Get Booking with Authentication", async ({ request }) => {
 const response = await request.get("https://restful-booker.herokuapp.com/booking/1", {
    headers: {
      Authorization: `Basic ${Buffer.from("admin:password").toString("base64")}`, // Replace with valid credentials
    },
 });    
    console.log(JSON.stringify(response));
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody).toHaveProperty("depositpaid");
    expect(responseBody).toHaveProperty("bookingdates");
    expect(responseBody).toHaveProperty("additionalneeds");
    expect(responseBody).toHaveProperty("additionalneeds", "Breakfast");
});

//GET Method with Query Parameters
test("GET request Get Booking with Query Parameters", async ({ request }) => {
 const response = await request.get("https://restful-booker.herokuapp.com/booking", {
   params: {
     firstname: "John",
     lastname: "Doe",
   },
 });
 console.log(JSON.stringify(response));
 expect(response.ok()).toBeTruthy();
 expect(response.status()).toBe(200);
 const responseBody = await response.json();
 expect(Array.isArray(responseBody)).toBeTruthy(); // Expect an array of bookings
 if (responseBody.length > 0) {
   expect(responseBody[0]).toHaveProperty("firstname", "John");
   expect(responseBody[0]).toHaveProperty("lastname", "Doe");
 }
});

//GET Method with Headers
test("GET request Get Booking with Headers", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking/1", {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    });
    console.log(JSON.stringify(response));
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody).toHaveProperty("depositpaid");
    expect(responseBody).toHaveProperty("bookingdates");
    });
