// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { compose } from 'redux';
// load the presentational component
import FeatureLoader from './components/FeatureLoader';
import withFeatureLoader from './components/FeatureLoader/withFeatureLoader';

const productFeatures = state => ({
  productFeatures: state.productFeatures,
});

export default connect(productFeatures)(FeatureLoader);

export const WithFeatureLoader = compose(
  connect(productFeatures),
  withFeatureLoader
);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
