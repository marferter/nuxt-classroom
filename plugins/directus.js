//je crois que ce fichier est inutile
import { createDirectus, rest, readItem, readItems, createItem, createItems } from '@directus/sdk';

const directus = createDirectus('https://directus.apps.21-learning.com/').with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems, createItem, createItems},
    };
});
