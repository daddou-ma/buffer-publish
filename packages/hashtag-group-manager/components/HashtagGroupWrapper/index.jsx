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
  }

  componentDidMount() {
    this.onSwitchMode(this.props.viewMode);
  }

  onSwitchMode(viewMode) {
    this.setState({ viewMode });
  }

  render() {
    const { hashtagGroups } = this.props;
    const { viewMode } = this.state;

    return (
      <div style={boxStyle}>
        {viewMode === CREATE_MODE &&
          <HashtagGroupCreator
            onCancelHashtagGroup={() => this.onSwitchMode(MANAGE_MODE)}
          />
        }
        {viewMode === MANAGE_MODE &&
          <HashtagGroupManager
            hashtagGroups={hashtagGroups}
            onCreateHashtagGroup={() => this.onSwitchMode(CREATE_MODE)}
          />
        }
      </div>
    );
  }
}

HashtagGroupWrapper.propTypes = {
  viewMode: PropTypes.string,
  hashtagGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ).isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    canPostComment: PropTypes.bool,
    isSelected: PropTypes.bool,
  })),
};

HashtagGroupWrapper.defaultProps = {
  viewMode: 'createHashtag',
  hashtagGroups: [],
  profiles: null,
};

export default HashtagGroupWrapper;
