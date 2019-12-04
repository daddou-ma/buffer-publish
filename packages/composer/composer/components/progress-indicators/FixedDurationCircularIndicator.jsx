/**
 * Progress indicator that builds on top of CircularIndicator. Displays a
 * fixed-duration indicator.
 *
 * props.duration is the only required prop specific to this component, in addition
 * to the required props for CircularIndicator.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CircularIndicator from './CircularIndicator';

class FixedDurationCircularIndicator extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired, // Seconds
    steps: PropTypes.number,
  };

  static defaultProps = {
    steps: 4,
  };

  state = {
    progress: 0,
  };

  componentDidMount() {
    this._intervalId = setInterval(this.step, this.getInterval());
    this.step();
  }

  getInterval = () => (this.props.duration / this.props.steps) * 1000;

  step = () => {
    const progressStep = 100 / this.props.steps;
    const progress = Math.min(
      Math.round(this.state.progress + progressStep),
      100
    );

    this.setState({ progress });
    if (progress === 100) clearInterval(this._intervalId);
  };

  render = () => {
    const transitionDuration = Math.round(this.getInterval() / 1000);

    const stylesMap = {
      circle: {
        transitionDuration: `${transitionDuration}s`,
      },
    };

    return (
      <CircularIndicator
        progress={this.state.progress}
        styles={stylesMap}
        {...this.props}
      />
    );
  };
}

export default FixedDurationCircularIndicator;
