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
};

function ScrollableContainer({ tabId, children, growthSpace, onReachBottom }) {
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
    const container = containerEl.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (containerEl.current) {
      containerEl.current.scrollTop = 0;
    }
  }, [tabId]);

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
  tabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  growthSpace: PropTypes.number,
  onReachBottom: PropTypes.func,
};

export default ScrollableContainer;
