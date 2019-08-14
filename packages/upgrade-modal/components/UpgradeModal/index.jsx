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

import InputText from '../InputText';
import PlanCycleSelect from '../PlanCycleSelect';
import Select from '../Select';

const listStyle = {
  padding: '0 1rem',
};

const listStyleLeft = {
  ...listStyle,
  marginRight: '1.2rem',
};

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

const currentYear = new Date().getFullYear();
const creditCardSvg = `<svg width="31" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M0 0h31v21H0z"/><rect width="31" height="21" rx="3" fill="%232D98C8"/><path fill="%23343E47" d="M0 3h31v3H0z"/><path fill="%23fff" d="M6 9h20v4H6z"/><path fill="%23FD232B" d="M20 10h5v2h-5z"/></svg>`;
const creditCardBackground = `right 6px center no-repeat url('data:image/svg+xml;utf8,${creditCardSvg}')`;

const isEmptyCard = card => Object.keys(card).length === 0 && card.constructor === Object;

class UpgradeModal extends React.Component {
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
          label: validating ? translations.validating : translations.upgradeCta,
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
            <div style={{ textAlign: 'center' }}>
              <Text type="h2">
                {hasExpiredProTrial
                  ? translations.proTrialistUpgradeHeader
                  : translations.proUpgradeHeader }
              </Text>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                <Text type="h3">{translations.freePlan}</Text>
                <ul style={listStyleLeft}>
                  <ListItem text={translations.freeConnect} />
                  <ListItem text={translations.freeSchedule} />
                  <ListItem text={translations.freePostHistory} />
                </ul>
              </div>
              <div style={{ flex: '1' }}>
                <Text type="h3">
                  {translations.proPlan}
                  <span role="img" aria-label="pro">  ✅</span>
                </Text>
                <ul style={listStyle}>
                  <ListItem text={translations.proConnect} />
                  <ListItem text={translations.proSchedule} />
                  <ListItem text={translations.proIGFirstComment} />
                  <ListItem text={translations.proCalendarView} />
                  <ListItem text={translations.proReviewHistory} />
                </ul>
              </div>
            </div>

            <Divider marginTop="" marginBottom="1.5rem" />

            <PlanCycleSelect
              plan={plan}
              translations={translations}
              cycle={cycle}
              selectCycle={selectCycle}
              isNonprofit={isNonprofit}
            />

            <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem' }}>
              <Text type="h3">
                {translations.enterPaymentDetails} <LockedIcon />
              </Text>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, paddingRight: '25px' }}>
                <InputText id="name" label={translations.nameOnCard} store={storeValue} hasError={errors.name} />
              </div>
              <div style={{ flex: 1 }}>
                <InputText id="number" label={translations.cardNumber} store={storeValue} hasError={errors.number} />
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <div style={{ flex: 1, paddingRight: '25px' }}>
                <Select id="expMonth" label={translations.expirationMonth} store={storeValue} hasError={errors.expMonth}>
                  <option />
                  <option value="01">1 - Jan</option>
                  <option value="02">2 - Feb</option>
                  <option value="03">3 - Mar</option>
                  <option value="04">4 - Apr</option>
                  <option value="05">5 - May</option>
                  <option value="06">6 - Jun</option>
                  <option value="07">7 - Jul</option>
                  <option value="08">8 - Aug</option>
                  <option value="09">9 - Sep</option>
                  <option value="10">10 - Oct</option>
                  <option value="11">11 - Nov</option>
                  <option value="12">12 - Dec</option>
                </Select>
              </div>

              <div style={{ flex: 1, paddingRight: '25px' }}>
                <Select id="expYear" label={translations.expirationYear} store={storeValue} hasError={errors.expYear}>
                  <option />
                  {[...Array(26).keys()].map(i => (
                    <option
                      key={currentYear + i}
                      value={currentYear + i}
                    >
                      {currentYear + i}
                    </option>
                  ))}
                </Select>
              </div>

              <div style={{ flex: 1, paddingRight: '25px', position: 'relative' }}>
                <InputText
                  id="cvc"
                  label={translations.securityCode}
                  backgroundStyle={creditCardBackground}
                  store={storeValue}
                  hasError={errors.cvc}
                />
              </div>

              <div style={{ flex: 1 }}>
                <InputText
                  id="addressZip"
                  label={translations.zipCode}
                  note={translations.zipLeaveBlank}
                  store={storeValue}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

UpgradeModal.propTypes = {
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

UpgradeModal.defaultProps = {
  hasExpiredProTrial: false,
  dismissible: false,
  card: {},
};

export default UpgradeModal;
