import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { gray, white } from '@bufferapp/ui/style/colors';
import { Warning } from '@bufferapp/ui/Icon';

const ErrorBannerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 150px;
  border: 1px solid ${gray};
  box-sizing: border-box;
  border-radius: 2px;
  text-align: center;
  margin-bottom: 24px;
  position: relative;
`;

const Triangle = styled.div`
  position: absolute;
  border-top: 74px solid #e0364f;
  border-right: 74px solid transparent;
  top: 0;
  left: 0;
`;

const WarningIcon = styled(Warning)`
  position: absolute;
  top: 16px;
  left: 16px;
  color: ${white};
`;

const Title = styled(Text)`
  margin: 0 0 8px;
`;

const ButtonWithStyles = styled(Button)`
  margin-top: 16px;
`;

const ErrorBanner = ({ title, content, onClick, actionLabel }) => (
  <ErrorBannerCard>
    <Triangle />
    <WarningIcon />
    <Title type="h3">{title}</Title>
    {content}
    {onClick && actionLabel && (
      <ButtonWithStyles type="primary" onClick={onClick} label={actionLabel} />
    )}
  </ErrorBannerCard>
);

ErrorBanner.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  actionLabel: PropTypes.string,
};

ErrorBanner.defaultProps = {
  onClick: () => {},
  actionLabel: '',
};

export default ErrorBanner;
