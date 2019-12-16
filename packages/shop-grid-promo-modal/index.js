import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { generatePlansPageRoute } from '@bufferapp/publish-routes';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
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
            message: 'user_saw_shopgrid_2_promo',
          },
        })
      );
    },
    onComparePlansClick: () => {
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_shopgrid_2_promo',
          },
        })
      );
      dispatch(modalsActions.hideShopGridPromoModal());
      dispatch(
        push(
          generatePlansPageRoute({
            utmlSource: 'publish',
            utmMedium: 'appcues',
            utmCampaign: 'shop-grid-v2',
          })
        )
      );
    },
  })
)(ShopGridPromoModal);
