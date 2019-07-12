import React from 'react';
import PropTypes from 'prop-types';

import {
  Popover,
  Card,
  Divider,
} from '@bufferapp/components';

import {
  Button,
  Text,
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
};

const buttonStyle = {
  textAlign: 'center',
  margin: '2rem 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const ListItem = ({ text }) =>
  <li style={listItemStyle}>
    <Text type="p">
      {text}
    </Text>
  </li>;

ListItem.propTypes = { text: PropTypes.string.isRequired };

const currentYear = new Date().getFullYear();
const creditCardSvg = `<svg width="31" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M0 0h31v21H0z"/><rect width="31" height="21" rx="3" fill="%232D98C8"/><path fill="%23343E47" d="M0 3h31v3H0z"/><path fill="%23fff" d="M6 9h20v4H6z"/><path fill="%23FD232B" d="M20 10h5v2h-5z"/></svg>`;
const creditCardBackground = `right 6px center no-repeat url('data:image/svg+xml;utf8,${creditCardSvg}')`;

const UpgradeModal = ({
  translations,
  cycle,
  validating,
  upgradePlan,
  storeValue,
  selectCycle,
  hideModal,
  isNonprofit,
  hasExpiredProTrial,
  cancelTrial,
}) => (<div style={{ position: 'fixed', zIndex: '3000' }}>
  <Popover onOverlayClick={hideModal}>
    <div style={{ maxHeight: '100vh', overflow: 'auto' }}>
      <Card>
        <div style={{ maxWidth: '100vw', overflow: 'auto' }}>
          <div style={{ width: '550px', padding: '0 25px' }}>
            <div style={{ textAlign: 'center' }}>
              <Text type="h2">
                {hasExpiredProTrial
                  ? translations.proTrialistUpgradeHeader
                  : translations.proUpgradeHeader }
              </Text>
            </div>
            <div>
              {hasExpiredProTrial &&
                <div style={{ textAlign: 'center' }}>
                  <Text>{translations.proTrialistSubCopy}</Text>
                </div>
              }
              {!hasExpiredProTrial &&
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '1' }}>
                    <ul style={listStyleLeft}>
                      <ListItem text={translations.proPlanSocialAccounts} />
                      <ListItem text={translations.proPlanIGFirstComment} />
                      <ListItem text={translations.proPlanAnalytics} />
                    </ul>
                  </div>
                  <div style={{ flex: '1' }}>
                    <ul style={listStyle}>
                      <ListItem text={translations.proPlanIGVideoCover} />
                      <ListItem text={translations.proPlanCalendar} />
                      <ListItem text={translations.proPlanBitly} />
                    </ul>
                  </div>
                </div>
              }
            </div>

            <Divider marginTop="" marginBottom="1.5rem" />

            <PlanCycleSelect
              translations={translations}
              cycle={cycle}
              selectCycle={selectCycle}
              isNonprofit={isNonprofit}
            />

            <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem' }}>
              <Text type="h3">{translations.enterPaymentDetails} <LockedIcon /></Text>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, paddingRight: '25px' }}>
                <InputText id="name" label={translations.nameOnCard} store={storeValue} />
              </div>
              <div style={{ flex: 1 }}>
                <InputText id="number" label={translations.cardNumber} store={storeValue} />
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <div style={{ flex: 1, paddingRight: '25px' }}>
                <Select id="expMonth" label={translations.expirationMonth} store={storeValue}>
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
                <Select id="expYear" label={translations.expirationYear} store={storeValue}>
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
                />
              </div>

              <div style={{ flex: 1 }}>
                <InputText id="addressZip" label={translations.zipCode} note={translations.zipLeaveBlank} store={storeValue} />
              </div>
            </div>

            <div style={buttonStyle}>
              <Button
                type="primary"
                size="large"
                label={validating ? translations.validating : translations.upgradeCta}
                disabled={validating}
                onClick={upgradePlan}
              />
              <Button
                type="link"
                size="large"
                label={
                  hasExpiredProTrial
                  ? translations.proTrialistStayOnFreeCta
                  : translations.stayOnFreeCta
                }
                onClick={hasExpiredProTrial ? cancelTrial : hideModal}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </Popover>
</div>);

UpgradeModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cycle: PropTypes.string.isRequired,
  upgradePlan: PropTypes.func.isRequired,
  storeValue: PropTypes.func.isRequired,
  validating: PropTypes.bool.isRequired,
  selectCycle: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  cancelTrial: PropTypes.func.isRequired,
  isNonprofit: PropTypes.bool.isRequired,
  hasExpiredProTrial: PropTypes.bool,
};

UpgradeModal.defaultProps = {
  hasExpiredProTrial: false,
};

export default UpgradeModal;
