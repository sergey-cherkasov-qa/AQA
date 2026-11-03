import {App, expect, test} from '../../src/helpers/fixtures/fixture.js';
import {UserBuilder} from '../../src/helpers/index';

test('Пользователь может зарегистрироваться используя email и пароль ', async ({app}) => {
    const user = new UserBuilder().withEmail().withPassword(12).withName().build();

    await app.main.open();
    await app.main.signup();
    await app.register.register(user);

    await expect(app.yourFeed.getProfileName()).toContainText(user.name);

});
test('Еще некий тест на регистрацию', {
    tag: '@fast',
}, async ({page}) => {
    // act подготовка данных
    const user = new UserBuilder().withEmail().withPassword(12).withName().build();
    const app = new App(page);

    await app.main.open();
    await app.main.signup();
    await app.register.register(user);

    // простой
    await expect(app.yourFeed.getProfileName()).toContainText(user.name);


});