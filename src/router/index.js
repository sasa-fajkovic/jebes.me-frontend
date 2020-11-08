import { createWebHistory, createRouter } from "vue-router";

import Homepage from '@/views/Homepage.vue';
import NewSentencePage from '@/views/AddNewSentencePage.vue';

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    },
    {
        path: '/add-new',
        name: 'Add new sentence',
        component: NewSentencePage
    }
]

const router = createRouter({ history: createWebHistory(), routes });

export default router;