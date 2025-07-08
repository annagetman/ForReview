export class SecureAreaPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('a[href="/logout"]');
    this.flashMessage = page.locator('#flash');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getFlashMessage() {
    return await this.flashMessage.textContent();
  }
}