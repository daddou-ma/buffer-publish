import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
} from '@bufferapp/components';

import {
  Text,
  Modal,
} from '@bufferapp/ui';
import LockedIcon from '@bufferapp/ui/Icon/Icons/Locked';

import StripeCreditCardForm from "@bufferapp/credit-card-form";

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
const isPremium = plan => plan === 'premium_business';
const isSmallBusiness = plan => plan === 'small';

const getButtonText = ({ plan, translations }) => {
  let buttonText = '';
  switch (plan) {
    case 'pro':
      buttonText = translations.proDescriptors.buttonText;
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

const currentYear = new Date().getFullYear();
const creditCardSvg = '<svg width="31" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M0 0h31v21H0z"/><rect width="31" height="21" rx="3" fill="%232D98C8"/><path fill="%23343E47" d="M0 3h31v3H0z"/><path fill="%23fff" d="M6 9h20v4H6z"/><path fill="%23FD232B" d="M20 10h5v2h-5z"/></svg>';
const creditCardBackground = `right 6px center no-repeat url('data:image/svg+xml;utf8,${creditCardSvg}')`;

const isEmptyCard = card => Object.keys(card).length === 0 && card.constructor === Object;

class SwitchPlanModal extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {
        name: false,
        number: false,
        expMonth: false,
        expYear: false,
        cvc: false,
      },
    };

    this.onSecondaryAction = this.onSecondaryAction.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onSecondaryAction() {
    const {
      hideModal,
      cancelTrial,
      clearCardInfo,
      hasExpiredProTrial,
    } = this.props;

    clearCardInfo();
    if (hasExpiredProTrial) {
      cancelTrial();
    } else {
      hideModal();
    }
  }

  submitForm() {
    const {
      card,
      upgradePlan,
    } = this.props;

    if (this.isCardValid(card)) {
      upgradePlan();
    }
  }

  isCardValid(card) {
    const {
      name,
      number,
      expMonth,
      expYear,
      cvc,
    } = card;

    let nameHasError = false;
    let numberHasError = false;
    let expMonthHasError = false;
    let expYearHasError = false;
    let cvcHasError = false;

    if (isEmptyCard(card)) {
      nameHasError = true;
      numberHasError = true;
      expMonthHasError = true;
      expYearHasError = true;
      cvcHasError = true;
    }

    if (!name || name === '') nameHasError = true;
    if (!number || number === '') numberHasError = true;
    if (!expMonth || expMonth === '') expMonthHasError = true;
    if (!expYear || expYear === '') expYearHasError = true;
    if (!cvc || cvc === '') cvcHasError = true;

    this.setState({
      errors: {
        name: nameHasError,
        number: numberHasError,
        expMonth: expMonthHasError,
        expYear: expYearHasError,
        cvc: cvcHasError,
      },
    });

    return !nameHasError && !numberHasError && !expMonthHasError
           && !expYearHasError && !cvcHasError;
  }

  render() {
    const { errors } = this.state;
    const {
      plan,
      translations,
      cycle,
      validating,
      upgradePlan,
      storeValue,
      selectCycle,
      isNonprofit,
      hasExpiredProTrial,
      card,
      dismissible,
    } = this.props;

    return (
      <Modal
        wide
        action={{
          label: validating ? translations.validating : getButtonText({ plan, translations }),
          disabled: validating,
          callback: () => this.submitForm({ card, upgradePlan }),
        }}
        secondaryAction={{
          label: translations.close,
          callback: this.onSecondaryAction,
        }}
        dismissible={dismissible}
      >
        <div style={{ overflow: 'auto', height: 'auto' }}>
          <div style={{ width: '600px', padding: '0px 20px 25px' }}>
            {isPro(plan) && <PlanDescriptors {...translations.proDescriptors} />}
            {isPremium(plan) && <PlanDescriptors {...translations.premiumDescriptors} />}
            {isSmallBusiness(plan) && <PlanDescriptors {...translations.businessDescriptors} />}

            <Divider marginTop="" marginBottom="1.5rem" />

            <StripeCreditCardForm />
          </div>
        </div>
      </Modal>
    );
  }
}

SwitchPlanModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  card: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    cvc: PropTypes.string,
    addressZip: PropTypes.string,
  }),
  cycle: PropTypes.string.isRequired,
  plan: PropTypes.string,
  upgradePlan: PropTypes.func.isRequired,
  storeValue: PropTypes.func.isRequired,
  validating: PropTypes.bool.isRequired,
  selectCycle: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  cancelTrial: PropTypes.func.isRequired,
  clearCardInfo: PropTypes.func.isRequired,
  isNonprofit: PropTypes.bool.isRequired,
  hasExpiredProTrial: PropTypes.bool,
  dismissible: PropTypes.bool,
};

SwitchPlanModal.defaultProps = {
  hasExpiredProTrial: false,
  dismissible: false,
  card: {},
  plan: 'pro',
};

export default SwitchPlanModal;
