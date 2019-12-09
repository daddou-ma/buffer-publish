import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';

import { EditingMyLinksItem, ActionsWrapper, LinkInput } from '../styles';

const EditingLinkForm = ({
  item,
  onUpdateLinkText,
  onUpdateLinkUrl,
  onCancelClick,
  onSaveClick,
  isValidItem,
}) => {
  return (
    <React.Fragment>
      <EditingMyLinksItem>
        <LinkInput>
          <Input
            label="Link Text"
            type="text"
            onChange={e => onUpdateLinkText({ item, value: e.target.value })}
            name="text"
            value={item.text}
            placeholder="Describe link (e.g. “Shop Sale”)"
          />
        </LinkInput>
        <LinkInput>
          <Input
            label="Link URL"
            type="text"
            onChange={e => onUpdateLinkUrl({ item, value: e.target.value })}
            name="url"
            value={item.url}
            placeholder="Your website or URL"
          />
        </LinkInput>
      </EditingMyLinksItem>
      <ActionsWrapper>
        <Button
          label="Cancel"
          type="text"
          onClick={() => onCancelClick({ item })}
        />
        <Button
          label="Save Link"
          type="primary"
          disabled={!isValidItem({ item })}
          onClick={() => onSaveClick({ item })}
        />
      </ActionsWrapper>
    </React.Fragment>
  );
};

EditingLinkForm.propTypes = {
  onToggleEditMode: PropTypes.func,
  onUpdateCustomLinks: PropTypes.func,
  onUpdateLinkText: PropTypes.func,
  onUpdateLinkUrl: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  isValidItem: PropTypes.func,
  item: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  }),
  customLinksDetails: PropTypes.shape({
    customLinks: PropTypes.array,
  }),
};

EditingLinkForm.defaultProps = {
  onToggleEditMode: () => {},
  onUpdateCustomLinks: () => {},
  onUpdateLinkText: () => {},
  onUpdateLinkUrl: () => {},
  onCancelClick: () => {},
  onSaveClick: () => {},
  isValidItem: () => {},
  item: {
    text: null,
    url: null,
  },
  customLinksDetails: {
    customLinks: [],
  },
};

export default EditingLinkForm;
