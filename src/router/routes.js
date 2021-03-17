
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/agenda/Agenda.vue') },
      { name: 'despesas', path: '/despesas', component: () => import('pages/despesas/Despesas.vue') },
      { name: 'relatorios', path: '/relatorios', component: () => import('pages/relatorios/Relatorios.vue') },
      { name: 'agenda', path: '/agenda', component: () => import('pages/agenda/Agenda.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
