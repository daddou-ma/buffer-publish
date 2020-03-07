import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Input, Button, Link } from '@bufferapp/ui';
import { SimpleColorPicker } from '@bufferapp/publish-shared-components';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { View } from '@bufferapp/ui/Icon';
import {
  gray,
  grayLight,
  grayLighter,
  grayDark,
  blue,
  white,
  purple,
  pink,
  pinkLighter,
  orange,
  yellow,
  green,
  teal,
  blueDark,
} from '@bufferapp/ui/style/colors';

/* Styles */
const Wrapper = styled.div`
  background-color: ${grayLighter};
  height: 100%;
  text-align: center;
`;

const Content = styled.div`
  width: 362px;
  margin: 53px 0 0 283px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${white};
  border: 1px solid ${gray};
  box-sizing: border-box;
  border-radius: ${borderRadius};
  width: 100%;
  padding: 0 16px;
  text-align: left;
`;

const NoticeCard = styled(Card)`
  flex-direction: row;
  border: 1px solid ${grayLight};
  background: none;
  margin: 16px 0 24px;
  padding: 24px 16px;
`;

const Notice = styled.div`
  flex: 1;
  align-items: baseline;
`;

const NoticeText = styled(Text)`
  margin: 0 0 0 8px;
  color: ${grayDark};
`;

/* List of colors for the color picker */
const colors = [
  { color: purple, colorName: 'purple' },
  { color: pink, colorName: 'pink' },
  { color: pinkLighter, colorName: 'pink lighter' },
  { color: orange, colorName: 'orange' },
  { color: yellow, colorName: 'yellow' },
  { color: green, colorName: 'green' },
  { color: teal, colorName: 'teal' },
  { color: blueDark, colorName: 'blue dark' },
];

/* Component */
const CampaignForm = ({
  translations,
  onCreateOrUpdateCampaignClick,
  onCancelClick,
  isSaving,
  inEditMode,
  campaignDetails,
}) => {
  // State
  const {
    id: campaignId = null,
    globalOrganizationId: orgId = null,
    name: defaultName = '',
    color: defaultColor = purple,
  } = campaignDetails ?? {};
  const [campaignName, setName] = useState(defaultName);
  const [colorSelected, setColor] = useState(defaultColor);
  const [isSubmitButtonDisabled, disableSubmit] = useState(true);

  // State modifiers
  const disableCampaignSubmitButton = ({ name, color }) => {
    const isSaveButtonDisabled = !name.trim() || !color.trim();
    disableSubmit(isSaveButtonDisabled);
  };

  const setCampaignName = event => {
    const { value } = event.target;
    disableCampaignSubmitButton({ name: value, color: colorSelected });
    setName(value);
  };

  const setCampaignColor = event => {
    const { value } = event.target;
    disableCampaignSubmitButton({ name: campaignName, color: value });
    setColor(value);
  };

  return (
    <Wrapper>
      <Content>
        <Text type="h1">
          {inEditMode ? translations.editTitle : translations.createTitle}
        </Text>
        <Card>
          <Text type="h3">{translations.subtitle}</Text>
          <Input
            type="input"
            value={campaignName}
            onChange={setCampaignName}
            required
            name={translations.name}
            label={translations.name}
            placeholder={translations.placeholder}
            aria-required="true"
          />
          <Text htmlFor="colorPicker" type="label">
            {translations.color}
          </Text>
          <SimpleColorPicker
            id="colorPicker"
            colors={colors}
            colorSelected={colorSelected}
            onColorClick={setCampaignColor}
          />
        </Card>
        <NoticeCard>
          <View color={grayDark} />
          <Notice>
            <NoticeText type="p" color={grayDark}>
              <b>{translations.notice1}</b>
              {translations.notice2}
              {/* FAQ link has to be replaced */}
              <Link href="https://faq.buffer.com/" newTab>
                {translations.notice3}
              </Link>
              {translations.notice4}
            </NoticeText>
          </Notice>
        </NoticeCard>
        <Button
          type="primary"
          size="large"
          label={translations.saveCampaign}
          onClick={() =>
            onCreateOrUpdateCampaignClick({
              campaignId,
              colorSelected,
              campaignName,
              defaultName,
              defaultColor,
              orgId,
            })
          }
          disabled={isSubmitButtonDisabled || isSaving}
          fullWidth
        />
        <Button
          type="text"
          size="large"
          label={translations.cancel}
          onClick={onCancelClick}
          fullWidth
        />
      </Content>
    </Wrapper>
  );
};

CampaignForm.propTypes = {
  translations: PropTypes.shape({
    editTitle: PropTypes.string.isRequired,
    createTitle: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    notice1: PropTypes.string.isRequired,
    notice2: PropTypes.string.isRequired,
    notice3: PropTypes.string.isRequired,
    notice4: PropTypes.string.isRequired,
    saveCampaign: PropTypes.string.isRequired,
    updateCampaign: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
  }).isRequired,
  onCreateOrUpdateCampaignClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  inEditMode: PropTypes.bool,
  campaignDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  }),
};

CampaignForm.defaultProps = {
  inEditMode: false,
  campaignDetails: {},
};

export default CampaignForm;
