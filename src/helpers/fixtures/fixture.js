import {test as base} from '@playwright/test';
import {App} from '../../pages/app.page';

export const test = base.extend({
    app: async ({page}, use) => {
        await use(new App(page));
    },
});
export {expect} from '@playwright/test';