import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { offWhite } from '@bufferapp/components/style/color';
import { Link } from '@bufferapp/components';
import MessageIcon from '@bufferapp/ui/Icon/Icons/Message';
import { Text, Button } from '@bufferapp/ui';
import {
  grayLight, grayDarker, red, grayDark,
} from '@bufferapp/ui/style/colors';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';

const ALLOWED_COLORS = [grayDark, red];

const IgCommentIconWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  border-left: 1px solid ${grayLight};
  color: ${grayDarker};
`;

const renderCommentIcon = () => (
  <IgCommentIconWrapper title="Post includes a comment">
    <MessageIcon />
  </IgCommentIconWrapper>
);

const CardFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
`;

const CardFooterWrapperWithBorder = styled(CardFooterWrapper)`
  padding: 0 16px;
  background-color: ${offWhite};
  border-top: 1px solid ${grayLight};
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
  color: ${({ textColor }) => (textColor)};
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
  const showButtons = !(hideButtons || isPerformingAction) || !messageLink;
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);
  const textColor = ALLOWED_COLORS.includes(messageColor) ? messageColor : grayDarker;
  const WrapperComponent = disableBorder ? CardFooterWrapper : CardFooterWrapperWithBorder;

  return (
    <WrapperComponent isDragging={isDragging} disableBorder={disableBorder}>
      <CardFooterContent>
        {icon
          && <IconWrapper>{icon}</IconWrapper>
        }
        {messageLink
          ? (
            <Link href={messageLink} unstyled newTab>
              <Message type="p" textColor={textColor}>{ message }</Message>
            </Link>
          )
          : (
            <Fragment>
              {preMessage && (
                <PreMessage type="p">
                  { preMessage }
                  &nbsp;
                </PreMessage>
              )}
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
        && <Message type="p">{ actionMessage }</Message>
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
  messageColor: grayDarker,
  messageLink: null,
  onDeleteClick: null,
  onEditClick: null,
  onSubmitClick: null,
  submitLabel: 'Share Now',
  onRequeueClick: null,
  hasFirstComment: false,
  isPerformingAction: false,
  actionMessage: 'Submitting...',
  isDragging: false,
  disableBorder: false,
};

export default CardFooter;
