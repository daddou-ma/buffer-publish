import React from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Input } from '@bufferapp/components';

const gridContainer = {
  display: 'flex',
  marginBottom: '20px',
  flexFlow: 'row wrap',
  position: 'relative',
};

const urlWrapperStyle = {
  padding: '15px 13px',
};

const itemStyle = index => ({
  display: 'flex',
  flexDirection: 'column',
  margin: ((index + 1) % 3 === 0) ? '0 0 4% 0' : '0px 1.41% 4% 0px',
  flex: '0 1 32.35%',
  border: '1px solid #B8B8B8',
  boxSizing: 'border-box',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
  borderRadius: '4px',
});

const imgWrapperStyle = thumbnail => ({
  width: '100%',
  height: '281.66px',
  background: 'no-repeat top',
  backgroundSize: 'cover',
  cursor: 'pointer',
  backgroundImage: `url(${thumbnail})`,
});

const GridListPost = ({
  post,
  index,
  onChangePostUrl,
}) => {
  return (
    <div style={itemStyle(index)}>
      <div style={imgWrapperStyle(post.thumbnail)} />
      <div style={urlWrapperStyle}>
        <Input
          type="text"
          input={{
            value: 'value',
            onChange: onChangePostUrl,
          }}
          name={'postUrl'}
          placeholder={'bufferapp.com'}
        />
      </div>
    </div>
  );
};

const GridList = ({
  mergedPosts,
  onChangePostUrl,
}) => {
  return (
    <div style={gridContainer}>
      {
        mergedPosts.map((post, index) => {
          return (
            <GridListPost
              index={index}
              post={post}
              onChangePostUrl={onChangePostUrl}
            />
          );
        })
      }
    </div>
  );
};

GridList.propTypes = {
  onChangePostUrl: PropTypes.func,
  mergedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

GridListPost.propTypes = {
  index: PropTypes.number,
  onChangePostUrl: PropTypes.func,
  post: PropTypes.shape({
    text: PropTypes.string,
  }),
};

GridList.defaultProps = {
  mergedPosts: [],
  onChangePostUrl: () => {},
};

export default WithFeatureLoader(GridList);
