import { getURL } from '@bufferapp/publish-server/formatters';
import ZendeskWidget from '@bufferapp/publish-thirdparty/zendesk-widget';

const helpMenuItems = t => {
  return [
    {
      id: '1',
      title: t('app-shell.helpCenter'),
      onItemClick: () => {
        window.open(
          'https://support.buffer.com/hc/en-us/?utm_source=app&utm_medium=appshell&utm_campaign=appshell',
          '_blank'
        );
      },
    },
    {
      id: '2',
      title: t('app-shell.quickHelp'),
      onItemClick: () => ZendeskWidget.showWidget(),
    },
    {
      id: '3',
      title: t('app-shell.status'),
      onItemClick: () => {
        window.location.assign('https://status.buffer.com/');
      },
    },
    {
      id: '4',
      title: t('app-shell.pricingAndPlans'),
      onItemClick: () => {
        window.location.assign(`https://${getURL.getBaseURL()}/pricing`);
      },
    },
    {
      id: '5',
      title: t('app-shell.wishlist'),
      onItemClick: () => {
        window.location.assign('https://buffer.com/feature-request');
      },
    },
  ];
};

export default helpMenuItems;
