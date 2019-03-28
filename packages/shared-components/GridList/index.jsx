import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Link } from '@bufferapp/components';
import Input from '@bufferapp/ui/Input';
import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';

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
  position: 'relative',
  width: '100%',
  height: '281.66px',
  background: 'no-repeat top',
  backgroundSize: 'cover',
  cursor: 'pointer',
  backgroundImage: `url(${thumbnail})`,
});

const scheduledIconStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '40px',
  top: '15px',
  right: '0',
  backgroundColor: '#FFC6AB',
  color: '#662D12',
};

const GridListPost = ({
  post,
  index,
  onChangePostUrl,
  onSavePostUrl,
  onImageClick,
  onImageClose,
}) => {
  return (
    <div style={itemStyle(index)}>
      <Link onClick={() => onImageClick({ post })}>
        <div style={imgWrapperStyle(post.thumbnail)}>
          {post.scheduled &&
            <div style={scheduledIconStyle}>
              <ClockIcon size="medium" />
            </div>
          }
        </div>
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
          onChange={(e) => {
            onChangePostUrl(post, e.target.value);
          }}
          onBlur={(e) => {
            onSavePostUrl(post, e.target.value);
          }}
          size="small"
          name="postUrl"
          placeholder="bufferapp.com"
          value={post.link}
        />
      </div>
    </div>
  );
};

const GridList = ({
  gridPosts,
  onChangePostUrl,
  onSavePostUrl,
  onImageClick,
  onImageClose,
}) => {
  return (
    <div style={gridContainer}>
      {
        gridPosts.map((post, index) => {
          return (
            <GridListPost
              key={`gridListPost-${post.id}`}
              index={index}
              post={post}
              onChangePostUrl={onChangePostUrl}
              onSavePostUrl={onSavePostUrl}
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
  onSavePostUrl: PropTypes.func,
  gridPosts: PropTypes.arrayOf(
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
  gridPosts: [],
  onImageClick: () => {},
  onImageClose: () => {},
  onChangePostUrl: () => {},
  onSavePostUrl: () => {},
};

export default WithFeatureLoader(GridList);
