import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
//import { t } from '/@/hooks/web/useI18n';

const paper: AppRouteModule = {
  path: '/paper',
  name: 'paper',
  component: LAYOUT,
  redirect: '/paper/create',
  meta: {
    orderNo: 10,
    icon: 'ion:md-paper',
    title: '政协提案',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'create',
      name: 'create',
      component: () => import('/@/views/paper/create/index.vue'),
      meta: {
        // affix: true,
        title: '政协提案',
        hideMenu: true,
      },
    },
  ],
};

export default paper;
