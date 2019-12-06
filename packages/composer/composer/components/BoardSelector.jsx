import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/BoardSelector.css';
import BoardSelectorBoardItem from '../components/BoardSelectorBoardItem';
import BoardCreator from '../components/BoardCreator';
import Input from '../components/Input';

class BoardSelector extends React.Component {
  static propTypes = {
    subprofilesCount: PropTypes.number,
    profile: PropTypes.object.isRequired,
    subprofiles: PropTypes.array.isRequired,
    visibleNotifications: PropTypes.array.isRequired,
    canUnselectSubprofiles: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    canUnselectSubprofiles: true,
    onChange: () => {},
  };

  state = {
    searchQuery: '',
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.subprofilesCount < this.props.subprofilesCount &&
      !this.props.profile.subprofilesOrignatedFromAPI
    ) {
      this.refs.subprofilesContainer.scrollTop = this.refs.subprofilesContainer.scrollHeight;
    }
  };

  onClick = e => {
    e.stopPropagation();
  };

  onSearchChange = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  render() {
    const {
      profile,
      subprofiles,
      canUnselectSubprofiles,
      onChange,
      visibleNotifications,
    } = this.props;

    const searchQuery = this.state.searchQuery.toLowerCase();
    const boards = subprofiles.filter(
      board => board.name && board.name.toLowerCase().includes(searchQuery)
    );

    const searchBoardIconClassName = [
      styles.searchBoardIcon,
      'bi bi-search',
    ].join(' ');

    const hasBoardsDisplayed = boards.length > 0;
    const profileHasBoards = this.props.subprofiles.length > 0;

    return (
      <div className={styles.boardSelector} onClick={this.onClick}>
        <div className={styles.boardTriangle}>▲</div>

        <div className={styles.boardSearchContainer}>
          <i className={searchBoardIconClassName} />
          <Input
            type="text"
            placeholder="Search your boards"
            className={styles.boardSearchInput}
            value={this.state.searchQuery}
            onChange={this.onSearchChange}
          />
        </div>
        <div className={styles.subprofilesContainer} ref="subprofilesContainer">
          {[...boards].map(board => (
            <BoardSelectorBoardItem
              profile={profile}
              board={board}
              onChange={onChange}
              canUnselectSubprofiles={canUnselectSubprofiles}
              key={board.id}
            />
          ))}
        </div>

        {!hasBoardsDisplayed && (
          <div className={styles.emptySearchResults}>
            {profileHasBoards
              ? 'Sorry, no boards matched your search!'
              : `Looks like this profile doesn't have any boards yet.
              No worries, you can create one below! :)`}
          </div>
        )}

        <BoardCreator
          profile={profile}
          visibleNotifications={visibleNotifications}
        />
      </div>
    );
  }
}

export default BoardSelector;
