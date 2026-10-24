import {expect} from '@playwright/test'

export class ArticleInfoPage {
    constructor(page) {
        this.page = page;
        this.articleBody = page.locator('.article-content p');
        this.deleteArticleButton = page.getByRole("button", {name: "Delete Article"}).first();
        this.editArticleButton = page.getByRole("link", {name: "Edit Article"}).first();
        this.commentInput = page.getByRole("textbox", {name: "Write a comment..."});
        this.commentButton = page.getByRole("button", {name: "Post Comment"});
        this.commentCards = page.locator(".card");
    }

    async getArticleBodyText() {
        await this.articleBody.waitFor({state: 'visible'});
        return await this.articleBody.innerText();
    }

    async deleteArticle() {
        //закрываем  диалоговое окно
        this.page.once("dialog", async (dialog) => await dialog.accept());
        await this.deleteArticleButton.click();
    }

    async editArticle() {
        await this.editArticleButton.click();
    }

    async addComment(text) {
        await this.commentInput.fill(text);
        await this.commentButton.click();
        await expect(this.getComment(text)).toHaveCount(1);
    }

    getComment(text) {
        return this.commentCards.filter({hasText: text});
    }

    async deleteComment(text) {
        const comment = this.getComment(text);
        await comment.hover();
        this.page.once("dialog", async (dialog) => await dialog.accept());
        await comment.locator(".ion-trash-a").click();
    }
}