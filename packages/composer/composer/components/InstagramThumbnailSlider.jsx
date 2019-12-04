import React from 'react';
import './css/InstagramThumbnailSlider.css';

class InstagramThumbnailSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleChange = this.handleChange.bind(this);
  }
  // Created custom seekbar because Safari 10+ doesn't allow styling changes to the
  // shadow dom for the video element
  componentDidMount() {
    const video = document.getElementById('thumbnailVideo');
    video.addEventListener('timeupdate', () => {
      const value = (100 / video.duration) * video.currentTime;
      this.setState({
        value,
      });
    });
  }

  handleChange = event => {
    // moves the video & seek bar to correct place
    const video = document.getElementById('thumbnailVideo');
    const time = video.duration * (event.target.value / 100);
    if (isFinite(time)) video.currentTime = time;
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div id="videoControls">
        <input
          onChange={this.handleChange}
          value={this.state.value}
          type="range"
        />
      </div>
    );
  }
}

export default InstagramThumbnailSlider;
