import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';

const emptyHeaderStyle = {
  paddingTop: '130px',
  paddingBottom: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#636363',
  textAlign: 'center',
};

const emptyParagraphStyle = {
  fontSize: '14px',
  color: '#B8B8B8',
  textAlign: 'center',
};

const ManageHashtagGroup = ({ onCreateHashtagGroup, hashtagGroups }) =>
  <React.Fragment>
    <div>
      <Text type="h3">Hashtag Manager</Text>
      <Text type="p">Create, save and organize hashtags to use in Instagram first comments.</Text>
      {hashtagGroups.length === 0 &&
        <div>
          <div style={emptyHeaderStyle}>
            <Text>No hashtag groups yet!</Text>
          </div>
          <div style={emptyParagraphStyle}>
            <Text>
              Save and reuse your favorite hashtags by creating a hashtag group.
              Click the button bellow to get started.
            </Text>
          </div>
        </div>
      }
      {hashtagGroups.lenght > 0 &&
        <div /> // INSERT HASHTAG GROUPS
      }
    </div>
    <Button
      type="secondary"
      label="Create Hashtag Group"
      fullWidth
      onClick={onCreateHashtagGroup}
    />
  </React.Fragment>;

ManageHashtagGroup.propTypes = {
  onCreateHashtagGroup: PropTypes.func,
  hashtagGroups: PropTypes.arrayOf(PropTypes.shape({})),
};

ManageHashtagGroup.defaultProps = {
};


export default ManageHashtagGroup;
