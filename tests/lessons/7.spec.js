import {App, test} from '../../src/helpers/fixtures/fixture.js';

const urlApi = 'https://apichallenges.com';
test('Пользователь может зарегистрироваться используя email и пароль ', async ({request}) => {
    let response = await request.post(`${urlApi}/api/challenger`);
    const headers = response.headers();
    const token = headers['x-challenger'];
    console.log(token);

    response = await request.get(`${urlApi}/api/challenges`, {
        headers: {
            'X-CHALLENGER': token
        }
    });
});
