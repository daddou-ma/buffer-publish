import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';

import { EditingMyLinksItem, ActionsWrapper, LinkInput } from '../styles';

const EditingLinkForm = ({
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
          onClick={() =>
            onUpdateCustomLinks({
              customLinks: customLinksDetails.customLinks,
            })
          }
        />
      </ActionsWrapper>
    </>
  );
};

EditingLinkForm.propTypes = {
  onToggleEditMode: PropTypes.func,
  onUpdateCustomLinks: PropTypes.func,
  onUpdateLinkText: PropTypes.func,
  onUpdateLinkUrl: PropTypes.func,
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
  item: {
    text: null,
    url: null,
  },
  customLinksDetails: {
    customLinks: [],
  },
};

export default EditingLinkForm;
