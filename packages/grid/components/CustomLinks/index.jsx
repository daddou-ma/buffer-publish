import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinksHeader from './LinksHeader';
import EditingLinkForm from './EditingLinkForm';
import LinksPreview from './LinksPreview';

import { DEFAULT_COLOR, MyLinksSection, MyLinksBody } from './styles';

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
                {!item.editing && (
                  <LinksPreview
                    onDeleteCustomLink={onDeleteCustomLink}
                    onToggleEditMode={onToggleEditMode}
                    bgColor={colorButtons}
                    textColor={textColor}
                    item={item}
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
              </>
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
  onUpdateCustomLinksColor: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
    buttonContrastColor: null,
  },
};

export default CustomLinks;
