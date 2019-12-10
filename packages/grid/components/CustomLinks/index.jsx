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
  onUpdateLinkText,
  onUpdateLinkUrl,
  maxCustomLinks,
  onToggleEditMode,
  onSwapCustomLinks,
  onSaveNewLinkClick,
  isValidItem,
  onCancelCustomLinkEdit,
}) => {
  const [colorButtons, setColorButton] = useState(
    customLinksDetails.buttonColor || DEFAULT_COLOR
  );
  const [textColor, setTextColor] = useState(
    customLinksDetails.buttonContrastColor || DEFAULT_CONTRAST_COLOR
  );
  const [newLinks, addNewLink] = useState([]);

  const onCancelClick = ({ item }) => {
    addNewLink(
      newLinks.filter(currentItem => currentItem.order !== item.order)
    );
  };

  const onUpdateNewLinkValue = ({ item, value, type }) => {
    addNewLink(
      newLinks.map(currentItem => {
        if (currentItem.order === item.order) {
          item[type] = value;
        }
        return currentItem;
      })
    );
  };

  const totalLinks =
    newLinks.length +
    ((customLinksDetails.customLinks &&
      customLinksDetails.customLinks.length) ||
      0);

  const onAddLinkClick = () => {
    addNewLink([
      ...newLinks,
      {
        text: '',
        url: '',
        order: Math.max(0, ...newLinks.map(l => l.order)) + 1,
      },
    ]);
  };

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
        addLinkDisabled={totalLinks >= maxCustomLinks}
      />
      <MyLinksBody>
        {customLinksDetails.customLinks &&
          customLinksDetails.customLinks.map((customLinkItem, index) => {
            return (
              <React.Fragment>
                {!customLinkItem.editing && (
                  <LinkDragWrapper
                    item={customLinkItem}
                    totalLinks={customLinksDetails.customLinks.length}
                    index={index}
                    textColor={textColor}
                    bgColor={colorButtons}
                    onSwapCustomLinks={onSwapCustomLinks}
                    onToggleEditMode={onToggleEditMode}
                    onDeleteCustomLink={onDeleteCustomLink}
                  />
                )}
                {customLinkItem.editing && (
                  <EditingLinkForm
                    key={customLinkItem.order}
                    item={customLinkItem}
                    customLinksDetails={customLinksDetails}
                    onUpdateLinkText={onUpdateLinkText}
                    onUpdateLinkUrl={onUpdateLinkUrl}
                    onCancelClick={({ item }) => {
                      onCancelCustomLinkEdit({ item });
                    }}
                    onSaveClick={() =>
                      onUpdateCustomLinks({
                        customLinks: customLinksDetails.customLinks,
                      })
                    }
                    isValidItem={isValidItem}
                  />
                )}
              </React.Fragment>
            );
          })}

        {newLinks.map(newLinkItem => {
          return (
            <EditingLinkForm
              key={newLinkItem.order}
              item={newLinkItem}
              customLinksDetails={customLinksDetails}
              onUpdateLinkText={({ item, value }) => {
                onUpdateNewLinkValue({ item, value, type: 'text' });
              }}
              onUpdateLinkUrl={({ item, value }) => {
                onUpdateNewLinkValue({ item, value, type: 'url' });
              }}
              onSaveClick={({ item }) => {
                onSaveNewLinkClick({ item });
                onCancelClick({ item });
              }}
              onCancelClick={onCancelClick}
              isValidItem={isValidItem}
            />
          );
        })}
      </MyLinksBody>
    </MyLinksSection>
  );
};

CustomLinks.propTypes = {
  maxCustomLinks: PropTypes.number,
  onUpdateLinkUrl: PropTypes.func,
  onUpdateLinkText: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  onDeleteCustomLink: PropTypes.func,
  onUpdateCustomLinks: PropTypes.func,
  onSwapCustomLinks: PropTypes.func,
  onCancelCustomLinkEdit: PropTypes.func,
  onUpdateCustomLinksColor: PropTypes.func,
  onSaveNewLinkClick: PropTypes.func,
  isValidItem: PropTypes.func,
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
    maxCustomLinks: PropTypes.number,
    buttonColor: PropTypes.string,
    buttonContrastColor: PropTypes.string,
  }),
};

CustomLinks.defaultProps = {
  maxCustomLinks: 3,
  onUpdateLinkUrl: () => {},
  onUpdateLinkText: () => {},
  onToggleEditMode: () => {},
  onDeleteCustomLink: () => {},
  onUpdateCustomLinks: () => {},
  onSwapCustomLinks: () => {},
  onCancelCustomLinkEdit: () => {},
  onSaveNewLinkClick: () => {},
  onUpdateCustomLinksColor: () => {},
  isValidItem: () => {},
  customLinksDetails: {
    customLinks: [],
    maxCustomLinks: 0,
    buttonColor: null,
    buttonContrastColor: null,
  },
};

export default CustomLinks;
