export class CreateArticlePage {
    constructor(page) {
        this.page = page;
        this.titleInput = page.getByRole('textbox', {name: 'Article Title'});
        this.descriptionInput = page.getByRole('textbox', {name: "What's this article about?"});
        this.bodyInput = page.getByRole('textbox', {name: 'Write your article'});
        this.tagsInput = page.getByRole('textbox', {name: 'Enter tags'});
        this.publishButton = page.getByRole('button', {name: 'Publish Article'});
    }

    async create(title, description, body, tags) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        // Тэги - не обязательное поле
        if (tags) await this.tagsInput.fill(tags);
        await this.publishButton.click();

        // Ожидаем перехода на созданную статью
        await this.page.waitForURL(/#\/article\/.+/);
    }
}