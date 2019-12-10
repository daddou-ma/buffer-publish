import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@bufferapp/ui';

import { EditingMyLinksItem, ActionsWrapper, LinkInput, StyledButton } from '../styles';

const EditingLinkForm = ({
  item,
  customLinksDetails,
  onUpdateCustomLinks,
  onUpdateLinkText,
  onUpdateLinkUrl,
  onCancelCustomLinkEdit,
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
        <StyledButton
          label="Cancel"
          type="text"
          size="small"
          onClick={() => onCancelCustomLinkEdit({ item })}
        />
        <Button
          label="Save Link"
          type="primary"
          size="small"
          onClick={() =>
            onUpdateCustomLinks({
              customLinks: customLinksDetails.customLinks,
            })
          }
        />
      </ActionsWrapper>
    </React.Fragment>
  );
};

EditingLinkForm.propTypes = {
  onCancelCustomLinkEdit: PropTypes.func,
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
  onCancelCustomLinkEdit: () => {},
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
