import React from 'react';
import { Divider } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Button, Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';

const openExtensionLink = () => {
  window.open('https://buffer.com/extensions', '_blank');
};

const openLinkGooglePlay = () => {
  window.open(
    'https://play.google.com/store/apps/details?id=org.buffer.android',
    '_blank'
  );
};

const openLinkAppStore = () => {
  window.open(
    'https://itunes.apple.com/app/apple-store/id490474324?pt=936146&ct=Web%20App%20Sidebar&mt=8',
    '_blank'
  );
};

const ExtrasLinks = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text type="h2">{t('preferences.appsAndExtras.title')}</Text>
      <Text type="p">{t('preferences.appsAndExtras.description')}</Text>
      <Divider />
      <Row>
        <div>
          <Text type="h3">
            {t('preferences.appsAndExtras.browserExtension')}
          </Text>
          <Text type="p">
            {t('preferences.appsAndExtras.extensionDescription')}
          </Text>
        </div>
        <Button
          type="secondary"
          label={t('preferences.appsAndExtras.installExtension')}
          onClick={() => openExtensionLink()}
        />
      </Row>
      <Divider />
      <div>
        <Text type="h3">{t('preferences.appsAndExtras.mobileApps')}</Text>
        <Text type="p">
          {t('preferences.appsAndExtras.mobileAppsDescription')}
        </Text>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              marginRight: '0.5rem',
            }}
          >
            <Button
              type="secondary"
              label={t('preferences.appsAndExtras.viewOnAppleStore')}
              onClick={() => openLinkAppStore()}
            />
          </div>
          <Button
            type="secondary"
            label={t('preferences.appsAndExtras.viewOnGooglePlay')}
            onClick={() => openLinkGooglePlay()}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ExtrasLinks;
