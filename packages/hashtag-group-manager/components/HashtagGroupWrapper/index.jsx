import React from 'react';
import PropTypes from 'prop-types';
import HashtagGroupCreator from './../HashtagGroupCreator';
import HashtagGroupManager from './../HashtagGroupManager';

const boxStyle = {
  height: 'calc(100% - 16px)',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 0 16px',
};

const CREATE_MODE = 'createHashtag';
const MANAGE_MODE = 'manageHashtag';

class HashtagGroupWrapper extends React.Component {
  constructor () {
    super();

    this.state = {
      viewMode: CREATE_MODE,
    };

    this.onSwitchMode = this.onSwitchMode.bind(this);
    this.onSaveHashtagGroup = this.onSaveHashtagGroup.bind(this);
    this.onDeleteHashtagGroupClick = this.onDeleteHashtagGroupClick.bind(this);
  }

  componentDidMount() {
    this.onSwitchMode(this.props.viewMode);
  }

  onSwitchMode(viewMode) {
    this.setState({ viewMode });
  }

  // @todo: create implementation for save group
  onSaveHashtagGroup() {
    console.log('Save Hashtag Group');
  }

  // @todo: create implementation for delete group
  onDeleteHashtagGroupClick() {
    console.log('Save Hashtag Group');
  }

  render() {
    const { hashtagGroups, onInsertHashtagGroupClick } = this.props;
    const { viewMode } = this.state;

    return (
      <div style={boxStyle}>
        {viewMode === CREATE_MODE &&
          <HashtagGroupCreator
            onCancelHashtagGroup={() => this.onSwitchMode(MANAGE_MODE)}
            onSaveHashtagGroup={() => this.onSaveHashtagGroup()}
          />
        }
        {viewMode === MANAGE_MODE &&
          <HashtagGroupManager
            hashtagGroups={hashtagGroups}
            onCreateHashtagGroup={() => this.onSwitchMode(CREATE_MODE)}
            onInsertHashtagGroupClick={onInsertHashtagGroupClick}
            onDeleteHashtagGroupClick={() => this.onDeleteHashtagGroupClick()}
          />
        }
      </div>
    );
  }
}

HashtagGroupWrapper.propTypes = {
  viewMode: PropTypes.string,
  onInsertHashtagGroupClick: PropTypes.func,
  hashtagGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ).isRequired,
};

HashtagGroupWrapper.defaultProps = {
  viewMode: 'createHashtag',
  onInsertHashtagGroupClick: () => {},
  hashtagGroups: [],
};

export default HashtagGroupWrapper;
