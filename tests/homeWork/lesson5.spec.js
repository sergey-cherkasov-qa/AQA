import {expect, test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {MainPage} from '../../src/pages/main.page';
import {RegisterPage} from '../../src/pages/register.page';
import {YourFeedPage} from '../../src/pages/yourfeed.page';
import {CreateArticlePage} from '../../src/pages/createArticle.page';
import {ArticleInfoPage} from "../../src/pages/articleInfo.page";
import {EditArticlePage} from "../../src/pages/editArticle.page"


let mainPage;
let registerPage;
let yourFeed;
let createArticlePage;
let articleInfo;
let editArticle;

let title;
let about;
let write;


test.describe('Домашнее задание: 5 функциональных тестов', () => {
    test.beforeEach(async ({page}) => {
        const user = {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password()
        };

        mainPage = new MainPage(page);
        registerPage = new RegisterPage(page);
        yourFeed = new YourFeedPage(page);
        createArticlePage = new CreateArticlePage(page);
        articleInfo = new ArticleInfoPage(page);
        editArticle = new EditArticlePage(page);

        title = faker.book.title();
        about = faker.book.publisher();
        write = faker.book.series();

        await mainPage.open();
        await mainPage.signup();
        await registerPage.register(user);

        await mainPage.createArticle();
        await createArticlePage.create(title, about, write);
    });

    test('Пользователь может создать статью', async () => {
        const articleBodyText = await articleInfo.getArticleBodyText();
        expect(articleBodyText, 'Статья должна быть успешно создана').toContain(write);
    });

    test('Пользователь может удалить созданную статью', async ({page}) => {
        await articleInfo.deleteArticle();

        await expect(page, 'После успешного удаления - редирект на страницу ленты').toHaveURL(/.*#\//);
    });

    test('Пользователь может отредактировать созданную статью', async () => {
        const newBody = faker.book.genre();

        await articleInfo.editArticle();
        await editArticle.editBody(newBody);

        const articleBodyText = await articleInfo.getArticleBodyText();
        expect(articleBodyText, 'Статья должна быть успешно отредактирована').toContain(newBody);
    });

    test('Пользователь может добавить комментарий к своей статье', async () => {
        const comment = faker.book.author();
        await articleInfo.addComment(comment);

        await expect(articleInfo.getComment(comment), 'Комментарий должен быть добавлен').toBeVisible();
    });

    test('Пользователь может удалить свой комментарий статье', async () => {
        const comment = faker.book.author();
        await articleInfo.addComment(comment);

        await articleInfo.deleteComment(comment);

        await expect(articleInfo.getComment(comment), 'Удаленный комментарий, должен отсутствовать на странице')
            .toHaveCount(0);
    });
});
