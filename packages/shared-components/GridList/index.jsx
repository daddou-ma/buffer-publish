import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Input, Link } from '@bufferapp/components';
import PostList from '../PostLists';

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
  onImageClick,
  onImageClose,
}) => {
  return (
    <div style={itemStyle(index)}>
      <Link onClick={() => onImageClick({ post })}>
        <div style={imgWrapperStyle(post.thumbnail)} />
      </Link>
      <Lightbox
        images={[{ src: `${post.thumbnail}` }]}
        isOpen={post.isLightboxOpen || false}
        onClose={() => onImageClose({ post })}
        backdropClosesModal
        showImageCount={false}
      />
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
  onImageClick,
  onImageClose,
}) => {
  return (
    <div style={gridContainer}>
      {
        mergedPosts.map((post, index) => {
          return (
            <GridListPost
              key={`gridListPost-${post.id}`}
              index={index}
              post={post}
              onChangePostUrl={onChangePostUrl}
              onImageClick={onImageClick}
              onImageClose={onImageClose}
            />
          );
        })
      }
    </div>
  );
};

GridList.propTypes = {
  onImageClick: PropTypes.func,
  onImageClose: PropTypes.func,
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
  onImageClick: PropTypes.func,
  onImageClose: PropTypes.func,
  onChangePostUrl: PropTypes.func,
  post: PropTypes.shape({
    text: PropTypes.string,
  }),
};

GridList.defaultProps = {
  mergedPosts: [],
  onImageClick: () => {},
  onImageClose: () => {},
  onChangePostUrl: () => {},
};

export default WithFeatureLoader(GridList);
