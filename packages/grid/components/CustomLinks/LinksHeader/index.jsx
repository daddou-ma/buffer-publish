import React from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import styled from 'styled-components';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import Tooltip from '@bufferapp/ui/Tooltip';
import { gray, grayDark } from '@bufferapp/ui/style/colors';
import { fontFamily, fontWeightBold } from '@bufferapp/ui/style/fonts';

const DEFAULT_COLOR = '#000000';

const MyLinksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;

const MyLinksTitle = styled.div`
  display: flex;
  align-items: center;
`;

const MyLinksIcon = styled.span`
  padding: 6px 0 0 6px;
`;

const MyLinksTitleText = styled.span`
  color: ${grayDark};
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

const LinksHeader = ({
  title = 'Top Links',
  popupText = 'Add up to 3 custom links to the top of your Shop grid page.',
  onAddLinkClick = () => {},
  buttonText = 'Add Link',
  pickerText = 'Link Color',
  setColorButton,
  setTextColor,
  colorButtons,
  textColor,
  onUpdateCustomLinksColor,
  addLinkDisabled = false,
  hasWriteAccess,
}) => {
  return (
    <MyLinksHeader>
      <MyLinksTitle>
        <MyLinksTitleText>{title}</MyLinksTitleText>
        <MyLinksIcon>
          <Tooltip label={popupText} position="right">
            <InfoIcon color={gray} />
          </Tooltip>
        </MyLinksIcon>
      </MyLinksTitle>
      {hasWriteAccess &&
        <AddLinkSection>
          <LinkColorSection>
            <ColorPicker
              label={pickerText}
              defaultColor={colorButtons || DEFAULT_COLOR}
              setColorButton={setColorButton}
              setTextColor={setTextColor}
              onChange={(color, contrastColor) => {
                setColorButton(color);
                setTextColor(contrastColor);
              }}
              onBlur={(color, contrastColor) => {
                setColorButton(color);
                setTextColor(contrastColor);
                onUpdateCustomLinksColor({
                  customLinkColor: colorButtons,
                  customLinkContrastColor: textColor,
                });
              }}
            />
          </LinkColorSection>
            <Button
              label={buttonText}
              type="primary"
              onClick={onAddLinkClick}
              disabled={addLinkDisabled}
            />
        </AddLinkSection>
      }
    </MyLinksHeader>
  );
};

LinksHeader.propTypes = {
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
    maxCustomLinks: PropTypes.number,
    buttonColor: PropTypes.string,
    buttonContrastColor: PropTypes.string,
  }),
  title: PropTypes.string,
  popupText: PropTypes.string,
  colorButtons: PropTypes.string,
  buttonText: PropTypes.string,
  pickerText: PropTypes.string,
  textColor: PropTypes.string,
  maxCustomLinks: PropTypes.number,
  onAddLinkClick: PropTypes.func,
  setColorButton: PropTypes.func,
  setTextColor: PropTypes.func,
  onUpdateCustomLinksColor: PropTypes.func,
  addLinkDisabled: PropTypes.bool,
  hasWriteAccess: PropTypes.bool,
};

LinksHeader.defaultProps = {
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
    buttonContrastColor: null,
  },
  title: 'Top Links',
  popupText: 'Add up to 3 custom links to the top of your Shop grid page.',
  buttonText: 'Add Link',
  pickerText: 'Link Color',
  colorButtons: '',
  textColor: '',
  maxCustomLinks: 3,
  onAddLinkClick: () => {},
  setColorButton: () => {},
  setTextColor: () => {},
  onUpdateCustomLinksColor: () => {},
};

export default LinksHeader;
