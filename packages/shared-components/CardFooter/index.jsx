import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { borderWidth } from '@bufferapp/components/style/border';
import { offWhite } from '@bufferapp/components/style/color';
import {
  Link,
} from '@bufferapp/components';

import { Text, Button } from '@bufferapp/ui';
import { grayLight, grayDarker, red } from '@bufferapp/ui/style/colors';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';

const ALLOWED_COLORS = ['shuttleGray', 'red'];

const igCommentIconWrapper = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
  marginLeft: '0.5rem',
  borderLeft: '1px solid #cfd4d6',
};
const renderCommentIcon = () => (
  <span style={igCommentIconWrapper} title="Post includes a comment">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#59626a"
        d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6c-.746 0-2.886 1.672-4.13 2.52-.457.31-.87.032-.87-.52V3z"
      />
    </svg>
  </span>
);

const CardFooterWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
`;

const CardFooterWrapperWithBorder = styled(CardFooterWrapper)`
  padding: 12px 16px;
  background-color: ${offWhite};
  borderTop: ${borderWidth} solid ${grayLight};
`;

const CardFooterContent = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const VerticalDivider = styled.span`
  margin: 0 20px 0 12px;
  height: 32px;
  border-left: 1px solid ${grayLight};
  border-right: 1px solid ${grayLight};
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const Message = styled(Text)`
  font-size: 12px;
`;

const PreMessage = styled(Text)`
  font-size: 12px;
  font-weight: ${fontWeightBold};
`;

const EditButton = styled(Button)`
  margin-right: 8px;
`;

const RequeueButton = styled(Button)`
  margin-left: 8px;
`;

const ButtonWrapper = styled.span`
  display: flex;
`;

const CardFooter = ({
  hideButtons,
  icon,
  preMessage,
  message,
  messageColor,
  messageLink,
  onDeleteClick,
  onEditClick,
  onSubmitClick,
  submitLabel,
  onRequeueClick,
  hasFirstComment,
  isPerformingAction,
  actionMessage,
  isDragging,
  disableBorder,
}) => {
  const showButtons = !(hideButtons || isPerformingAction) || !!messageLink;
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);
  const textColor = ALLOWED_COLORS.includes(messageColor) ? messageColor : grayDarker;
  const WrapperComponent = disableBorder ? CardFooterWrapper : CardFooterWrapperWithBorder;

  return (
    <WrapperComponent isDragging={isDragging} disableBorder={disableBorder}>
      <CardFooterContent>
        <IconWrapper>{icon}</IconWrapper>
        {messageLink
          ? (
            <Link href={messageLink} unstyled newTab>
              <Message type="p">{ message }</Message>
            </Link>
          )
          : (
            <Fragment>
              <PreMessage type="p">
                { preMessage }
                &nbsp;
              </PreMessage>
              <Message type="p" textColor={textColor}>{ message }</Message>
            </Fragment>
          )
        }
        {hasFirstComment
          && (
            renderCommentIcon()
          )
        }
      </CardFooterContent>
      {showButtons
        && (
          <ButtonWrapper>
            {onDeleteClick
              && (
                <Fragment>
                  {!isConfirmingDelete
                    ? <Button type="text" label="Delete" size="small" onClick={() => setConfirmingDelete(true)} />
                    : (
                      <Fragment>
                        <Button type="text" label="Cancel" size="small" onClick={() => setConfirmingDelete(false)} />
                        <Button type="text" label="Confirm" size="small" onClick={onDeleteClick} />
                      </Fragment>
                    )
                  }
                  <VerticalDivider />
                </Fragment>
              )
            }
            {onEditClick
              && <EditButton type="secondary" label="Edit" size="small" onClick={onEditClick} />
            }
            {onSubmitClick
              && <Button type={onRequeueClick ? 'secondary' : 'primary'} label={submitLabel} size="small" onClick={onSubmitClick} />
            }
            {onRequeueClick
              && <RequeueButton type="primary" label="Re-add to Queue" size="small" onClick={onRequeueClick} />
            }
          </ButtonWrapper>
        )
      }
      {isPerformingAction
        && actionMessage
      }
    </WrapperComponent>
  );
};

CardFooter.propTypes = {
  hideButtons: PropTypes.bool,
  icon: PropTypes.node,
  preMessage: PropTypes.string,
  message: PropTypes.string.isRequired,
  messageColor: PropTypes.string,
  messageLink: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  submitLabel: PropTypes.string,
  onRequeueClick: PropTypes.func,
  hasFirstComment: PropTypes.bool,
  isPerformingAction: PropTypes.bool,
  actionMessage: PropTypes.string,
  isDragging: PropTypes.bool,
  disableBorder: PropTypes.bool,
};

CardFooter.defaultProps = {
  hideButtons: false,
  icon: null,
  preMessage: null,
  messageColor: 'black',
  messageLink: null,
  onDeleteClick: null,
  onEditClick: null,
  onSubmitClick: null,
  submitLabel: 'Share Now',
  onRequeueClick: false,
  hasFirstComment: false,
  isPerformingAction: false,
  actionMessage: 'Submitting...',
  isDragging: false,
  disableBorder: false,
};

export default CardFooter;
