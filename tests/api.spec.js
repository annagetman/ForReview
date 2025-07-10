import { test, expect } from "@playwright/test";

const BASE_URL = "https://jsonplaceholder.typicode.com";
let createdPostId;

test.describe.serial("JSONPlaceholder API CRUD (JavaScript)", () => {
  test("READ: отримати список постів", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test("READ: отримати один пост за ID", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/2`);
    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post).toMatchObject({ id: 2, userId: expect.any(Number) });
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
    expect(post).toHaveProperty("title", "qui est esse");
    expect(post.title).toBe("qui est esse");
    expect(typeof post.title).toBe("string");
    expect(typeof post.id).toBe("number");
    expect(post.id).toBe(2);
    expect(post.title.length).toBeGreaterThan(0);
    //    – body має містити певне слово, наприклад "et"
    expect(post.body).toEqual(expect.stringContaining("tempore"));

    //    – жодних зайвих ключів (лише userId, id, title, body)
    const keys = Object.keys(post).sort();
    expect(keys).toEqual(["body", "id", "title", "userId"].sort());
  });

  test("CREATE: створити новий пост", async ({ request }) => {
    const newData = { title: "foo", body: "bar", userId: 42 };
    // 1) Надсилаємо POST і перевіряємо HTTP-статус
    const response = await request.post(`${BASE_URL}/posts`, { data: newData });
    expect(response.status()).toBe(201); // JSONPlaceholder повертає 201
    expect(response.ok()).toBeTruthy();
    // 2) Перевіряємо заголовки відповіді
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
    // 3) Парсимо тіло і перевіряємо базову структуру
    const created = await response.json();
    expect(created).toMatchObject({
      title: newData.title,
      body: newData.body,
      userId: newData.userId,
      id: expect.any(Number),
    });
    // 4) Переконуємося, що в об’єкті немає зайвих полів
    const keys = Object.keys(created).sort();
    expect(keys).toEqual(["body", "id", "title", "userId"].sort());
    // 5) (Опційно, для справжнього API) робимо GET за новим id і перевіряємо, що ресурс справді створився
    // const getRes = await request.get(`${BASE_URL}/posts/${created.id}`);
    // expect(getRes.status()).toBe(200);
    // const fetched = await getRes.json();
    // expect(fetched).toMatchObject({ ...newData, id: created.id });
    // Запам'ятовуємо id для наступних тестів
    createdPostId = created.id;
  });

  test("UPDATE: оновити створений пост", async ({ request }) => {
// Пропускаємо тест, якщо CREATE не відпрацював і нема id
  test.skip(!createdPostId, "Пропускаємо, якщо CREATE не відпрацював");

  const updatedData = {
    title: "updated title",
    body: "updated body",
    userId: 42,
  };
  // Використовуємо PATCH для часткового оновлення (більш природньо для JSONPlaceholder)
  const res = await request.patch(`${BASE_URL}/posts/${createdPostId}`, {
    data: updatedData,
  });
  // Перевіряємо HTTP-статус та content-type
  expect(res.status()).toBe(200);
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("application/json");
  // Парсимо оновлений ресурс і перевіряємо структуру
  const updated = await res.json();
  expect(updated).toMatchObject({ ...updatedData});
  // Додаткова верифікація: GET та перевірка збережених даних
  const getRes = await request.get(`${BASE_URL}/posts/${createdPostId}`);
  // expect(getRes.ok()).toBeTruthy();
  const fetched = await getRes.json();
  // Якщо бекенд справді оновлює дані, повинно збігатися:
  // expect(fetched).toMatchObject({ ...updatedData});
  // Логування для дебагу
  console.log("UPDATE URL:", `${BASE_URL}/posts/${createdPostId}`);
  console.log("Response status:", res.status(), "Body:", updated);
  });

  test("DELETE: видалити створений пост", async ({ request }) => {
    test.skip(!createdPostId, "Пропускаємо, якщо CREATE не відпрацював");
    const response = await request.delete(`${BASE_URL}/posts/${createdPostId}`);
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toBe("{}");
  });
});

test("Full CRUD against JSONPlaceholder", async ({ request }) => {
  // CREATE
  const createResponse = await request.post(`${BASE_URL}/posts`, {
    data: { title: "foo", body: "bar", userId: 42 },
  });
  expect(createResponse.ok()).toBeTruthy();
  const post = await createResponse.json();
  const id = post.id;

  // UPDATE (PATCH краще за PUT для часткового оновлення)
  const updateResponse = await request.patch(`${BASE_URL}/posts/${id}`, {
    data: { title: "updated title" },
  });
  expect(updateResponse.ok()).toBeTruthy();
  const updated = await updateResponse.json();
  expect(updated.title).toBe("updated title");

  // DELETE
  const deleteResponse = await request.delete(`${BASE_URL}/posts/${id}`);
  expect(deleteResponse.ok()).toBeTruthy();
});
