import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/options',
    component: () => import('pages/OptionPage.vue'),
  },
  {
    path: '/popup',
    component: () => import('pages/PopupPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/cheatsheets',
    component: () => import('pages/OptionPage.vue'),
    children: [
      { path: '', component: () => import('pages/CheatsheetsPage.vue') },
    ],
  },
];

export default routes;
