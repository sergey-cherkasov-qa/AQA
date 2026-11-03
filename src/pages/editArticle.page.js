export class EditArticlePage {
    constructor(page) {
        this.page = page;
        this.bodyInput = page.getByRole('textbox', {name: 'Write your article'});
        this.updateArticleButton = page.getByRole('button', {name: 'Update Article'});
    }

    async editBody(newbody) {
        await this.bodyInput.fill(newbody);
        await this.updateArticleButton.click();
        // Ждем перехода обратно на страницу статьи
        await this.page.waitForURL(/\/article\//);
    }
}
