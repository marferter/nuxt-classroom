
import { createDirectus, rest, readItem, readItems } from '@directus/sdk';

const directus = createDirectus('https://classroom-directus.jcloud.ik-server.com/').with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems },
    };
});


