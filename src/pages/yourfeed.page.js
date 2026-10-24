export class YourFeedPage {
    constructor(page) {
        // техническое описание страницы браузером
        // описываем браузер
        this.page = page;
        this.profileText = page.getByRole('navigation');
    }

    getProfileName() {
        return this.profileText;
    }
}