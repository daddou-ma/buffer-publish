import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { fontSize, fontWeightBold } from '@bufferapp/ui/style/fonts';
import { gray, grayDark } from '@bufferapp/ui/style/colors';
import HashtagGroupItem from './../HashtagGroupItem';

const wrapperStyle = {
  margin: '0 16px',
};

const emptyHeaderStyle = {
  paddingTop: '130px',
  paddingBottom: '8px',
  fontSize,
  fontWeight: fontWeightBold,
  color: grayDark,
  textAlign: 'center',
};

const emptyParagraphStyle = {
  fontSize,
  color: gray,
  textAlign: 'center',
};

const HashtagGroupManager = ({ onCreateHashtagGroup, hashtagGroups }) => (
  <Fragment>
    <div>
      <div style={wrapperStyle}>
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
      </div>
      {hashtagGroups.length > 0 &&
        <HashtagGroupItem /> // INSERT HASHTAG GROUP ITEMS MAP
      }
    </div>
    <div style={wrapperStyle}>
      <Button
        type="secondary"
        label="Create Hashtag Group"
        fullWidth
        onClick={onCreateHashtagGroup}
      />
    </div>
  </Fragment>
);

HashtagGroupManager.propTypes = {
  onCreateHashtagGroup: PropTypes.func.isRequired,
  hashtagGroups: PropTypes.arrayOf(PropTypes.shape({})),
};

HashtagGroupManager.defaultProps = {
  hashtagGroups: [],
};


export default HashtagGroupManager;
