import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinksHeader from './LinksHeader';
import EditingLinkForm from './EditingLinkForm';
import LinkDragWrapper from './LinkDragWrapper';

import {
  DEFAULT_COLOR,
  DEFAULT_CONTRAST_COLOR,
  MyLinksSection,
  MyLinksBody,
} from './styles';

const CustomLinks = ({
  customLinksDetails,
  onUpdateCustomLinks,
  onUpdateCustomLinksColor,
  onDeleteCustomLink,
  onAddLinkClick,
  onUpdateLinkText,
  onUpdateLinkUrl,
  maxCustomLinks,
  onToggleEditMode,
  onSwapCustomLinks,
}) => {
  const [colorButtons, setColorButton] = useState(
    customLinksDetails.buttonColor || DEFAULT_COLOR
  );
  const [textColor, setTextColor] = useState(
    customLinksDetails.buttonContrastColor || DEFAULT_CONTRAST_COLOR
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
              <React.Fragment>
                {!item.editing && (
                  <LinkDragWrapper
                    item={item}
                    textColor={textColor}
                    bgColor={colorButtons}
                    onSwapCustomLinks={onSwapCustomLinks}
                    onToggleEditMode={onToggleEditMode}
                    onDeleteCustomLink={onDeleteCustomLink}
                  />
                )}
                {item.editing && (
                  <EditingLinkForm
                    key={item.order}
                    item={item}
                    customLinksDetails={customLinksDetails}
                    onUpdateCustomLinks={onUpdateCustomLinks}
                    onUpdateLinkText={onUpdateLinkText}
                    onUpdateLinkUrl={onUpdateLinkUrl}
                    onToggleEditMode={onToggleEditMode}
                  />
                )}
              </React.Fragment>
            );
          })}
      </MyLinksBody>
    </MyLinksSection>
  );
};

CustomLinks.propTypes = {
  maxCustomLinks: PropTypes.number,
  onAddLinkClick: PropTypes.func,
  onUpdateLinkUrl: PropTypes.func,
  onUpdateLinkText: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  onDeleteCustomLink: PropTypes.func,
  onUpdateCustomLinks: PropTypes.func,
  onSwapCustomLinks: PropTypes.func,
  onUpdateCustomLinksColor: PropTypes.func,
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
    maxCustomLinks: PropTypes.number,
    buttonColor: PropTypes.string,
    buttonContrastColor: PropTypes.string,
  }),
};

CustomLinks.defaultProps = {
  maxCustomLinks: 3,
  onAddLinkClick: () => {},
  onUpdateLinkUrl: () => {},
  onUpdateLinkText: () => {},
  onToggleEditMode: () => {},
  onDeleteCustomLink: () => {},
  onUpdateCustomLinks: () => {},
  onSwapCustomLinks: () => {},
  onUpdateCustomLinksColor: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
    buttonContrastColor: null,
  },
};

export default CustomLinks;
