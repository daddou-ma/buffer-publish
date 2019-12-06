import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { Text } from '@bufferapp/components';
import PropTypes from 'prop-types';
import FeatureLoader from './index';
import WithFeatureLoader from './withFeatureLoader';

const fakeFeatures = {
  features: {
    show_stuff: true,
    not_here: false,
  },
  planName: 'free',
};
const defaultStyles = {
  margin: '20px',
};
const Fallback = <Text size={'large'}>Fallback</Text>;

storiesOf('FeatureLoader', module)
  .addDecorator(withA11y)
  .add('should show child on free plan', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedPlans={'free'}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback on pro plan', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedPlans={'pro'}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add(
    'should show child when multiple plans specified and its in one of them',
    () => (
      <div style={defaultStyles}>
        <FeatureLoader
          productFeatures={fakeFeatures}
          supportedPlans={['free', 'dont_exist']}
          fallback={Fallback}
        >
          <Text size={'large'}>Pro</Text>
        </FeatureLoader>
      </div>
    )
  )
  .add('should show child when plan name mismatches on case', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={{
          ...fakeFeatures,
          planName: 'Free',
        }}
        supportedPlans={['FREE', 'dont_exist']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add(
    'should show fallback when multiple plans specified and its not in any of them',
    () => (
      <div style={defaultStyles}>
        <FeatureLoader
          productFeatures={fakeFeatures}
          supportedPlans={['pro', 'dont_exist']}
          fallback={Fallback}
        >
          <Text size={'large'}>Pro</Text>
        </FeatureLoader>
      </div>
    )
  )
  .add('should show child when supporting show_stuff feature', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={'show_stuff'}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add(
    'should show child when supporting show_stuff feature with case mismatch comparison',
    () => (
      <div style={defaultStyles}>
        <FeatureLoader
          productFeatures={{
            ...fakeFeatures,
            features: { SHOW_STUFF: true },
          }}
          supportedFeatures={'Show_stuff'}
          fallback={Fallback}
        >
          <Text size={'large'}>Pro</Text>
        </FeatureLoader>
      </div>
    )
  )
  .add('should show child when supporting multiple features', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['hedgehog', 'show_stuff']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback when feature is disabled', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={'not_here'}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback when feature not in multiple features', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['doesnt_exist']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show child when in feature and plan', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['show_stuff']}
        supportedPlans={['free']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback when not in feature or plan', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['chess']}
        supportedPlans={['pro']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback when not in plan but in feature', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['show_stuff']}
        supportedPlans={['pro']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add('should show fallback when not in feature but in plan', () => (
    <div style={defaultStyles}>
      <FeatureLoader
        productFeatures={fakeFeatures}
        supportedFeatures={['not_here']}
        supportedPlans={['free']}
        fallback={Fallback}
      >
        <Text size={'large'}>Pro</Text>
      </FeatureLoader>
    </div>
  ))
  .add(
    'should not show component if no fallback is provided and feature non existant',
    () => (
      <div style={defaultStyles}>
        <FeatureLoader
          productFeatures={fakeFeatures}
          supportedFeatures={['not_here']}
          supportedPlans={['free']}
        >
          <Text size={'large'}>Pro</Text>
        </FeatureLoader>
      </div>
    )
  )
  .add('load Feature Component ', () => {
    const TextComponent = ({ features, ...other }) => {
      if (features.isFreeUser()) {
        return <Text {...other}>Free User</Text>;
      }
      return null;
    };

    TextComponent.propTypes = {
      features: PropTypes.any.isRequired,
    };
    const TestComponentWithFeatureLoader = WithFeatureLoader(TextComponent);

    return (
      <div style={defaultStyles}>
        <TestComponentWithFeatureLoader
          size={'large'}
          productFeatures={fakeFeatures}
        />
      </div>
    );
  });
