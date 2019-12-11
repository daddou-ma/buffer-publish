import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';

import {
  EditingMyLinksItem,
  ActionsWrapper,
  LinkUrlInput,
  LinkTextInput,
  StyledButton,
} from '../styles';

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
        <LinkTextInput>
          <Input
            label="Link Text"
            type="text"
            onChange={e => onUpdateLinkText({ item, value: e.target.value })}
            name="text"
            value={item.text}
            placeholder="Describe link (e.g. “Shop Sale”)"
            maxLength="35"
          />
        </LinkTextInput>
        <LinkUrlInput>
          <Input
            label="Link URL"
            type="text"
            onChange={e => onUpdateLinkUrl({ item, value: e.target.value })}
            name="url"
            value={item.url}
            placeholder="Your website or URL"
          />
        </LinkUrlInput>
      </EditingMyLinksItem>
      <ActionsWrapper>
        <StyledButton
          label="Cancel"
          type="text"
          size="small"
          onClick={() => onCancelClick({ item })}
        />
        <Button
          label="Save Link"
          type="primary"
          size="small"
          disabled={!isValidItem({ item })}
          onClick={() => onSaveClick({ item })}
        />
      </ActionsWrapper>
    </React.Fragment>
  );
};

EditingLinkForm.propTypes = {
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
