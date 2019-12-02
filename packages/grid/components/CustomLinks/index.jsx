import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';
import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import LinksHeader from './LinksHeader';

const MyLinksSection = styled.div`
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
  margin-bottom: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const MyLinksBody = styled.div``;

const EditingMyLinksItem = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid ${grayLight};
`;

const LinkInput = styled.div`
  margin: 8px;
  width: 50%;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px 15px;
`;

const CustomLinks = ({
  customLinksDetails,
  onUpdateCustomLinks,
  onUpdateCustomLinksColor,
  onUpdateCustomLinksButtonType,
  onDeleteCustomLink,
  onAddLinkClick,
  onUpdateLinkText,
  onUpdateLinkUrl,
  maxCustomLinks,
}) => {
  return (
    <MyLinksSection>
      <LinksHeader
        customLinksDetails={customLinksDetails}
        maxCustomLinks={maxCustomLinks}
        onAddLinkClick={onAddLinkClick}
      />
      <MyLinksBody>
        {customLinksDetails.customLinks.map(item => {
          return (
            <>
              <EditingMyLinksItem key={item.order}>
                <LinkInput>
                  <Input
                    label="Link Text?"
                    type="text"
                    onChange={e =>
                      onUpdateLinkText({ item, value: e.target.value })
                    }
                    name="text"
                    value={item.text}
                  />
                </LinkInput>
                <LinkInput>
                  <Input
                    label="Link URL"
                    type="text"
                    onChange={e =>
                      onUpdateLinkUrl({ item, value: e.target.value })
                    }
                    name="url"
                    value={item.url}
                  />
                </LinkInput>
              </EditingMyLinksItem>
              <ActionsWrapper>
                <Button label="Cancel" type="gray" />
                <Button
                  label="Save Link"
                  type="primary"
                  onClick={e =>
                    onUpdateCustomLinks({
                      customLinks: customLinksDetails.customLinks,
                    })
                  }
                />
              </ActionsWrapper>
            </>
          );
        })}
      </MyLinksBody>
    </MyLinksSection>
  );
};

CustomLinks.propTypes = {
  onAddLinkClick: PropTypes.func,
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
    maxCustomLinks: PropTypes.number,
    buttonColor: PropTypes.string,
  }),
};

CustomLinks.defaultProps = {
  onAddLinkClick: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
  },
};

export default CustomLinks;
