/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import ShopgridComposerBar from '../components/ShopgridComposerBar';

jest.mock('../action-creators/ComposerActionCreators');
jest.mock('../utils/LocationFinder');
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const showShopgridBar = {
  isInstagram: true,
  hasShopgridFlip: true,
  selectedInstagramProfiles: [
    { instagramDirectEnabled: true },
    { instagramDirectEnabled: true },
  ],
  isBusinessUser: true,
};

describe('Whole component', () => {
  it('renders default state', () => {
    const tree = renderer
      .create(
        <ShopgridComposerBar
          {...showShopgridBar}
          draftId={'123'}
          shopgridLink={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with shopgrid link when set', () => {
    const tree = renderer
      .create(
        <ShopgridComposerBar
          {...showShopgridBar}
          draftId={'123'}
          shopgridLink={'test'}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render when shopgrid flip is not set", () => {
    const tree = renderer
      .create(
        <ShopgridComposerBar
          {...showShopgridBar}
          hasShopgridFlip={false}
          draftId={'123'}
          shopgridLink={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render for non business users", () => {
    const tree = renderer
      .create(
        <ShopgridComposerBar
          {...showShopgridBar}
          isBusinessUser={false}
          draftId={'123'}
          shopgridLink={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
