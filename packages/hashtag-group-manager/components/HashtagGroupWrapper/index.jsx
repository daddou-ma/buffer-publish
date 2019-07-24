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
    this.onDeleteHashtagGroupClick = this.onDeleteHashtagGroupClick.bind(this);
  }

  componentDidMount() {
    this.onSwitchMode(this.props.viewMode);
  }

  onSwitchMode(viewMode) {
    this.setState({ viewMode });
  }

  onDeleteHashtagGroupClick(groupId) {
    this.props.onDeleteHashtagGroup(groupId);
  }

  render() {
    const { viewMode } = this.state;
    const {
      hashtagGroups,
      onHandleInsertHashtagGroupClick,
      name,
      text,
      onChangeGroupName,
      onChangeGroupText,
      onSaveHashtagGroup,
    } = this.props;

    return (
      <div style={boxStyle}>
        {viewMode === CREATE_MODE &&
        <HashtagGroupCreator
          name={name}
          text={text}
          onChangeGroupName={onChangeGroupName}
          onChangeGroupText={onChangeGroupText}
          onSaveHashtagGroup={onSaveHashtagGroup}
          onCancelHashtagGroup={() => this.onSwitchMode(MANAGE_MODE)}
        />
        }
        {viewMode === MANAGE_MODE &&
        <HashtagGroupManager
          hashtagGroups={hashtagGroups}
          onCreateHashtagGroup={() => this.onSwitchMode(CREATE_MODE)}
          onInsertHashtagGroupClick={onHandleInsertHashtagGroupClick}
          onDeleteHashtagGroupClick={groupId => this.onDeleteHashtagGroupClick(groupId)}
        />
        }
      </div>
    );
  }
}

HashtagGroupWrapper.propTypes = {
  viewMode: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  onInsertHashtagGroupClick: PropTypes.func,
  onHandleInsertHashtagGroupClick: PropTypes.func,
  onDeleteHashtagGroup: PropTypes.func,
  onSaveHashtagGroup: PropTypes.func,
  onChangeGroupName: PropTypes.func,
  onChangeGroupText: PropTypes.func,
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
  name: null,
  text: null,
  hashtagGroups: [],
  profiles: null,
  onInsertHashtagGroupClick: () => {},
  onHandleInsertHashtagGroupClick: () => {},
  onDeleteHashtagGroup: () => {},
  onSaveHashtagGroup: () => {},
  onChangeGroupName: () => {},
  onChangeGroupText: () => {},
};

export default HashtagGroupWrapper;
