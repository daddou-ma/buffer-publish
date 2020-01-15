import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from '@bufferapp/components';
import { Text, Modal } from '@bufferapp/ui';

import LockedIcon from '@bufferapp/ui/Icon/Icons/Locked';
import StripeCreditCardForm from '@bufferapp/publish-credit-card-form';

import PlanCycleSelect from '../PlanCycleSelect';
import PlanDescriptors from '../PlanDescriptors';

const listItemStyle = {
  marginBottom: '0.75rem',
  fontSize: '14px',
};

const ListItem = ({ text }) => (
  <li style={listItemStyle}>
    <Text>{text}</Text>
  </li>
);

ListItem.propTypes = { text: PropTypes.string.isRequired };

const isPro = plan => plan === 'pro';
const isSoloPremium = plan => plan === 'solo_premium_business';
const isPremium = plan => plan === 'premium_business';
const isSmallBusiness = plan => plan === 'small';

const getButtonText = ({ plan, translations }) => {
  let buttonText = '';
  switch (plan) {
    case 'pro':
      buttonText = translations.proDescriptors.buttonText;
      break;
    case 'solo_premium_business':
      buttonText = translations.soloPremiumDescriptors.buttonText;
      break;
    case 'premium_business':
      buttonText = translations.premiumDescriptors.buttonText;
      break;
    case 'small':
      buttonText = translations.businessDescriptors.buttonText;
      break;
    default:
      buttonText = 'Subscribe';
      break;
  }
  return buttonText;
};

class SwitchPlanModal extends React.Component {
  constructor() {
    super();
    this.onSecondaryAction = this.onSecondaryAction.bind(this);
  }

  onSecondaryAction() {
    const { hideModal, cancelTrial, hasExpiredProTrial } = this.props;
    if (hasExpiredProTrial) {
      cancelTrial();
    } else {
      hideModal();
    }
  }

  render() {
    const {
      plan,
      translations,
      cycle,
      validating,
      selectCycle,
      isNonprofit,
      dismissible,
      isPromo,
    } = this.props;

    return (
      <Modal wide dismissible={dismissible}>
        <div style={{ height: 'auto' }}>
          <div style={{ width: '600px', padding: '0px 20px 25px' }}>
            {isPro(plan) && (
              <PlanDescriptors {...translations.proDescriptors} />
            )}
            {isPremium(plan) && (
              <PlanDescriptors {...translations.premiumDescriptors} />
            )}
            {isSoloPremium(plan) && (
              <PlanDescriptors {...translations.soloPremiumDescriptors} />
            )}
            {isSmallBusiness(plan) && (
              <PlanDescriptors {...translations.businessDescriptors} />
            )}

            <Divider marginTop="" marginBottom="1.5rem" />

            {isPro(plan) && (
              <PlanCycleSelect
                translations={translations.proDescriptors}
                plan={plan}
                cycle={cycle}
                selectCycle={selectCycle}
                isNonprofit={isNonprofit}
                isPromo={isPromo}
              />
            )}

            {isSoloPremium(plan) && (
              <PlanCycleSelect
                plan={plan}
                translations={translations.soloPremiumDescriptors}
                cycle={cycle}
                selectCycle={selectCycle}
                isNonprofit={isNonprofit}
              />
            )}

            {isPremium(plan) && (
              <PlanCycleSelect
                plan={plan}
                translations={translations.premiumDescriptors}
                cycle={cycle}
                selectCycle={selectCycle}
                isNonprofit={isNonprofit}
              />
            )}

            {isSmallBusiness(plan) && (
              <PlanCycleSelect
                plan={plan}
                translations={translations.businessDescriptors}
                cycle={cycle}
                selectCycle={selectCycle}
                isNonprofit={isNonprofit}
              />
            )}

            <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem' }}>
              <Text type="h3">
                {translations.enterPaymentDetails} <LockedIcon />
              </Text>
            </div>
            <StripeCreditCardForm
              buttonLabel={
                validating
                  ? translations.validating
                  : getButtonText({ plan, translations })
              }
              closeButtonLabel={translations.close}
              closeAction={this.onSecondaryAction}
              {...this.props}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

SwitchPlanModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cycle: PropTypes.string.isRequired,
  plan: PropTypes.string,
  isPromo: PropTypes.bool,
  storeValue: PropTypes.func.isRequired,
  validating: PropTypes.bool.isRequired,
  selectCycle: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  cancelTrial: PropTypes.func.isRequired,
  clearCardInfo: PropTypes.func.isRequired,
  isNonprofit: PropTypes.bool.isRequired,
  hasExpiredProTrial: PropTypes.bool,
  dismissible: PropTypes.bool,
  setupIntentClientSecret: PropTypes.string.isRequired,
};

SwitchPlanModal.defaultProps = {
  hasExpiredProTrial: false,
  dismissible: false,
  plan: 'pro',
  isPromo: false,
};

export default SwitchPlanModal;
