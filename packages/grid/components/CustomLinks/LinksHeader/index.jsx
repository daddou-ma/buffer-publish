import React from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import styled from 'styled-components';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import { IconArrowPopover } from '@bufferapp/components';
import { gray, grayDarker } from '@bufferapp/ui/style/colors';
import { fontFamily, fontWeightBold } from '@bufferapp/ui/style/fonts';

const DEFAULT_COLOR = '#000000';

const MyLinksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const MyLinksTitle = styled.div`
  display: flex;
  align-items: center;
`;

const PopoverTextContainer = styled.div`
  padding: 0.5rem 0.25rem;
`;

const MyLinksIcon = styled.span`
  padding: 6px 0 0 6px;
`;

const MyLinksTitleText = styled.span`
  color: ${grayDarker};
  font-family: ${fontFamily};
  font-size: 18px;
  font-weight: ${fontWeightBold};
`;

const LinkColorSection = styled.div`
  display: flex;
  padding: 0 8px;
`;

const AddLinkSection = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 8px;
`;

const ColorPickerSection = ({
  label,
  defaultColor,
  setColorButton,
  setTextColor,
  onBlur,
}) => {
  return (
    <ColorPicker
      label={label}
      defaultColor={defaultColor || DEFAULT_COLOR}
      onChange={(color, contrastColor) => {
        setColorButton(color);
        setTextColor(contrastColor);
      }}
      onBlur={(color, contrastColor) => {
        setColorButton(color);
        setTextColor(contrastColor);
        onBlur();
      }}
    />
  );
};

const LinksHeader = ({
  customLinksDetails,
  maxCustomLinks,
  title = 'Top Links',
  label = 'Top Links',
  popupText = 'Add upto 3 custom links to the top of your Shop grid page.',
  onAddLinkClick = () => {},
  buttonText = 'Add Link',
  pickerText = 'Link Color',
  setColorButton,
  setTextColor,
  colorButtons,
  textColor,
  onUpdateCustomLinksColor,
}) => {
  return [
    <MyLinksHeader>
      <MyLinksTitle>
        <MyLinksTitleText>{title}</MyLinksTitleText>
        <MyLinksIcon>
          <IconArrowPopover
            icon={<InfoIcon color={gray} />}
            position="below"
            shadow
            oneLine={false}
            width="320px"
            label={label}
          >
            <PopoverTextContainer>
              {/* eslint-disable max-len */}
              {popupText}
            </PopoverTextContainer>
          </IconArrowPopover>
        </MyLinksIcon>
      </MyLinksTitle>
      <AddLinkSection>
        <LinkColorSection>
          <ColorPickerSection
            label={pickerText}
            defaultColor={colorButtons}
            setColorButton={setColorButton}
            setTextColor={setTextColor}
            onBlur={e =>
              onUpdateCustomLinksColor({
                customLinkColor: colorButtons,
                customLinkContrastColor: textColor,
              })
            }
          />
        </LinkColorSection>
        <Button
          label={buttonText}
          type="primary"
          onClick={onAddLinkClick}
          disabled={
            customLinksDetails.customLinks &&
            customLinksDetails.customLinks.length >= maxCustomLinks
          }
        />
      </AddLinkSection>
    </MyLinksHeader>,
  ];
};

LinksHeader.proptypes = {
  customLinksDetails: PropTypes.object,
  title: PropTypes.string,
  label: PropTypes.string,
  popupText: PropTypes.string,
  onAddLinkClick: PropTypes.func,
  buttonText: PropTypes.string,
  pickerText: PropTypes.string,
};

export default LinksHeader;