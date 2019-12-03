import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';
import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import LinksHeader from './LinksHeader';
import CustomLinkPreview from './LinkPreview';

const DEFAULT_COLOR = '#000000';

const MyLinksSection = styled.div`
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
  margin-bottom: 22px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #636363;
  margin: 15px;
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

const UrlPreview = styled.div`
  margin-left: 14px;
  flex-basis: 402px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px 15px;
`;

const MyLinksPreview = ({
  item,
  bgColor,
  textColor,
  onDeleteCustomLink,
  onToggleEditMode,
}) => {
  return (
    <PreviewWrapper>
      <CustomLinkPreview
        bgColor={bgColor}
        textColor={textColor}
        text={item.text}
      />
      <UrlPreview>{item.url}</UrlPreview>
      <Button
        label="Delete"
        type="gray"
        onClick={() => onDeleteCustomLink({ customLinkId: item._id })}
      />
      <Button
        label="Edit"
        type="secondary"
        onClick={() => onToggleEditMode({ item, editing: true })}
      />
    </PreviewWrapper>
  );
};

const EditingLink = ({
  item,
  customLinksDetails,
  onUpdateCustomLinks,
  onUpdateLinkText,
  onUpdateLinkUrl,
  onToggleEditMode,
}) => {
  return (
    <>
      <EditingMyLinksItem>
        <LinkInput>
          <Input
            label="Link Text"
            type="text"
            onChange={e => onUpdateLinkText({ item, value: e.target.value })}
            name="text"
            value={item.text}
          />
        </LinkInput>
        <LinkInput>
          <Input
            label="Link URL"
            type="text"
            onChange={e => onUpdateLinkUrl({ item, value: e.target.value })}
            name="url"
            value={item.url}
          />
        </LinkInput>
      </EditingMyLinksItem>
      <ActionsWrapper>
        <Button
          label="Cancel"
          type="gray"
          onClick={() => onToggleEditMode({ item, editing: false })}
        />
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
};

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
  onToggleEditMode,
}) => {
  const [colorButtons, setColorButton] = useState(
    customLinksDetails.buttonColor || DEFAULT_COLOR
  );
  const [textColor, setTextColor] = useState(
    customLinksDetails.buttonContrastColor || '#FFFFFF'
  );

  return (
    <MyLinksSection>
      <LinksHeader
        customLinksDetails={customLinksDetails}
        maxCustomLinks={maxCustomLinks}
        onAddLinkClick={onAddLinkClick}
        setColorButton={setColorButton}
        setTextColor={setTextColor}
        colorButtons={colorButtons}
        textColor={textColor}
        onUpdateCustomLinksColor={onUpdateCustomLinksColor}
      />
      <MyLinksBody>
        {customLinksDetails.customLinks &&
          customLinksDetails.customLinks.map(item => {
            return (
              <>
                {item._id && !item.editing && (
                  <MyLinksPreview
                    onDeleteCustomLink={onDeleteCustomLink}
                    onToggleEditMode={onToggleEditMode}
                    bgColor={colorButtons}
                    textColor={textColor}
                    item={item}
                  />
                )}
                {item.editing && (
                  <EditingLink
                    key={item.order}
                    item={item}
                    customLinksDetails={customLinksDetails}
                    onUpdateCustomLinks={onUpdateCustomLinks}
                    onUpdateLinkText={onUpdateLinkText}
                    onUpdateLinkUrl={onUpdateLinkUrl}
                    onToggleEditMode={onToggleEditMode}
                  />
                )}
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
    buttonContrastColor: PropTypes.string,
  }),
};

CustomLinks.defaultProps = {
  onAddLinkClick: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
    buttonContrastColor: null,
  },
};

export default CustomLinks;
