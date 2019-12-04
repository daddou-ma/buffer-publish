import React from 'react';
import { Text } from '@bufferapp/ui';
import PropTypes from 'prop-types';

import { ModalWrapper, AnalyzeIcon, CTAButton } from './style';

function BannerAdvancedAnalytics({ isAnalyzeCustomer }) {
  return (
    <ModalWrapper>
      <div>
        <AnalyzeIcon />
        <Text>
          <b>Looking for advanced analytics? </b>
          Track, measure, and report with Analyze
        </Text>
      </div>
      <CTAButton
        type="primary"
        size="small"
        onClick={() => {
          window.location.assign(
            isAnalyzeCustomer
              ? 'https://analyze.buffer.com'
              : 'https://account.buffer.com/analyze?cta=publish-analytics-posts-analyzeTrial-1'
          );
        }}
        label={isAnalyzeCustomer ? 'Visit Analyze' : 'Start Free Analyze Trial'}
      />
    </ModalWrapper>
  );
}

BannerAdvancedAnalytics.propTypes = {
  isAnalyzeCustomer: PropTypes.bool,
};

BannerAdvancedAnalytics.defaultProps = {
  isAnalyzeCustomer: false,
};

export default BannerAdvancedAnalytics;
