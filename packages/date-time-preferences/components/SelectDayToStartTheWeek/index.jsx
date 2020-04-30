import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Select } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { Row } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const DayToStartTheWeek = ({ input, translate }) => (
  <Select
    value={input.value}
    color="outerSpace"
    options={[
      {
        value: 'Sunday',
        name: translate('preferences.general.sunday'),
      },
      {
        value: 'Monday',
        name: translate('preferences.general.monday'),
      },
    ]}
    onChange={input.onChange}
  />
);

DayToStartTheWeek.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  translate: PropTypes.func.isRequired,
};

const SelectDayToStartTheWeek = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <div>
        <Text type="h3">{t('preferences.general.dayToStartWeek')}</Text>
      </div>
      <div>
        <form style={{ minWidth: '185px' }}>
          <Field
            component={DayToStartTheWeek}
            name="dayToStartTheWeek"
            translate={t}
          />
        </form>
      </div>
    </Row>
  );
};

export default reduxForm({
  form: 'day-to-start-the-week',
})(SelectDayToStartTheWeek);
