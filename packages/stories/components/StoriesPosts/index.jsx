import React, { Fragment } from 'react';
import { WithFeatureLoader } from '@bufferapp/product-features';
import {
  PostEmptySlot,
} from '@bufferapp/publish-shared-components';

const StoriesPosts = ({
  gridPosts,
}) => {
  return (
    <div>
      <PostEmptySlot
        time="Story"
        service="noProfile"
        onClick={() => {}}
      />
    </div>
  );
};

export default WithFeatureLoader(StoriesPosts);
