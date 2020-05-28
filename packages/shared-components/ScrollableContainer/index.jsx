import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  overflowY: 'auto',
  marginTop: '1rem',
  paddingRight: '1rem',
  paddingLeft: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 0,
  height: '1px',
  scrollbarColor: 'rgba(89, 98, 106, 0.4) transparent', // firefox
};

function ScrollableContainer({
  tabId,
  profileId,
  loadingMore,
  page,
  moreToLoad,
  children,
  growthSpace,
  onReachBottom,
}) {
  const containerEl = useRef(null);

  function handleScroll() {
    const reachedBottom =
      containerEl.current.scrollHeight - containerEl.current.scrollTop ===
      containerEl.current.clientHeight;
    if (reachedBottom) {
      onReachBottom();
    }
  }

  useEffect(() => {
    if (containerEl.current) {
      containerEl.current.scrollTop = 0;
    }
  }, [tabId, profileId]);

  useEffect(() => {
    const container = containerEl.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [profileId, tabId, moreToLoad, loadingMore, page]);

  return (
    <div
      ref={containerEl}
      style={{ ...containerStyle, flexGrow: growthSpace || 0 }}
    >
      {children}
    </div>
  );
}

ScrollableContainer.propTypes = {
  profileId: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
  page: PropTypes.number,
  children: PropTypes.node.isRequired,
  growthSpace: PropTypes.number,
  moreToLoad: PropTypes.bool,
  onReachBottom: PropTypes.func,
};

export default ScrollableContainer;
