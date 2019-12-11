import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import ShopGridPromoModal from './components/ShopGridPromoModal';

export default connect(
  null,
  dispatch => ({
    onCloseModalClick: () => {
      dispatch(modalsActions.hideShopGridPromoModal());
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_shopgrid_promo',
          },
        })
      );
    },
    onComparePlansClick: () => {
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_shopgrid_promo',
          },
        })
      );
      window.location.assign(getURL.getPlansUrl());
    },
  })
)(ShopGridPromoModal);
