import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { plansPageRoute } from '@bufferapp/publish-routes';
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
      dispatch(push(plansPageRoute));
    },
  })
)(ShopGridPromoModal);
