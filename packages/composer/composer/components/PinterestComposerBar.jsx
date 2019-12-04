import React from 'react';
import PropTypes from 'prop-types';
import SourceUrl from '../components/SourceUrl';
import PinterestSelectedBoards from '../components/PinterestSelectedBoards';
import BoardSelector from '../components/BoardSelector';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from '../components/Dropdown';
import styles from './css/PinterestComposerBar.css';

class PinterestComposerBar extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    shouldShowInlineSubprofileDropdown: PropTypes.bool.isRequired,
    visibleNotifications: PropTypes.array.isRequired,
    sourceUrl: PropTypes.string,
    profiles: PropTypes.array,
    serviceName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    sourceUrl: null,
  };

  state = {
    isInlineSubprofileDropdownExpanded: false,
  };

  onInlineSubprofileDropdownExpanded = () => {
    this.setState({ isInlineSubprofileDropdownExpanded: true });
  };

  onInlineSubprofileDropdownCollapsed = () => {
    this.setState({ isInlineSubprofileDropdownExpanded: false });
  };

  onBoardSelectorChange = () => {
    this.setState({ isInlineSubprofileDropdownExpanded: false });
  };

  isPinterest = () => this.props.serviceName === 'pinterest';

  render() {
    const {
      profiles,
      draftId,
      sourceUrl,
      shouldShowInlineSubprofileDropdown,
      visibleNotifications,
    } = this.props;

    const selectedPinterestProfiles = profiles.filter(
      profile => profile.isSelected && profile.service.name === 'pinterest'
    );
    const uniqueSelectedProfile =
      selectedPinterestProfiles.length === 1
        ? selectedPinterestProfiles[0]
        : null;
    const hasUniqueSelectedProfile = uniqueSelectedProfile !== null;

    return (
      this.isPinterest() && (
        <div className={styles.pinterestComposerBar}>
          <PinterestSelectedBoards profiles={profiles} />

          {shouldShowInlineSubprofileDropdown && hasUniqueSelectedProfile && (
            <Dropdown
              isDropdownExpanded={this.state.isInlineSubprofileDropdownExpanded}
              onShow={this.onInlineSubprofileDropdownExpanded}
              onHide={this.onInlineSubprofileDropdownCollapsed}
              className={styles.inlineSubprofileDropdown}
            >
              <DropdownTrigger className={styles.tertiaryButton}>
                Change
              </DropdownTrigger>
              <DropdownContent
                className={styles.inlineSubprofileDropdownContent}
              >
                <BoardSelector
                  profile={uniqueSelectedProfile}
                  subprofiles={uniqueSelectedProfile.subprofiles}
                  subprofilesCount={uniqueSelectedProfile.subprofiles.length}
                  visibleNotifications={visibleNotifications}
                  canUnselectSubprofiles={false}
                  onChange={this.onBoardSelectorChange}
                />
              </DropdownContent>
            </Dropdown>
          )}

          <SourceUrl sourceUrl={sourceUrl} draftId={draftId} />
        </div>
      )
    );
  }
}

export default PinterestComposerBar;
