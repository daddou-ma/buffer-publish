import React from 'react';
import { Text } from '@bufferapp/ui';
import PropTypes from 'prop-types';

import { ModalWrapper, AnalyzeIcon, CTAButton } from './style';

function BannerAdvancedAnalytics({ analyzeCrossSale }) {
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
            analyzeCrossSale
              ? 'https://analyze.buffer.com'
              : 'https://account.buffer.com/analyze?cta=publish-analytics-posts-analyzeTrial-1'
          );
        }}
        label={analyzeCrossSale ? 'Visit Analyze' : 'Start Free Analyze Trial'}
      />
    </ModalWrapper>
  );
}

BannerAdvancedAnalytics.propTypes = {
  analyzeCrossSale: PropTypes.bool,
};

BannerAdvancedAnalytics.defaultProps = {
  analyzeCrossSale: false,
};

export default BannerAdvancedAnalytics;
