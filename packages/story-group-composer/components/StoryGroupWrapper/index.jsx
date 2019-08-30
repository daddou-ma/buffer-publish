import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import Avatar from '@bufferapp/ui/Avatar';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/components';
import ArrowLeft from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import ArrowRight from '@bufferapp/ui/Icon/Icons/ArrowRight';
import clamp from 'lodash.clamp';
import { Button } from '@bufferapp/ui';

const cardWidth = 180;
const cardMargin = 4;
const lowerBounds = 0;
const upperBounds = 14;

const WrapperStyle = styled.div`
  background-color: white;
  border-radius: 3px;
  height: 100%;
  padding: 16px;
  right: 0;
  top: 0;
  width: 686px;
`;

const HeaderBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

const FooterBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

const AvatarNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;

const BodyContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: -16px;
  margin-right: -16px;
  max-width: 718px;
  overflow: hidden;
`;

const StyledArrow = styled.button`
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  left: ${props => props.prev ? 0 : 'initial'}
  right: ${props => props.prev ? 'initial' : 0}
  background-color: #E0E0E0;
  border: 1px solid #E0E0E0;
  height: 32px;
  width: 32px;
  margin: 16px;
  outline: none;
  border-radius: 2px;
`;

const CarouselContainer = styled.div`
  display: flex;
  padding-left: 16px;
  width: calc(${cardWidth + (cardMargin * 2)}px * 15);
  transform: ${props => `translateX(calc(-${cardWidth + (cardMargin * 2)}px * ${props.selectedItem}`}));
  transition: all 0.3s ease-out;
`;

const CarouselCard = styled.div`
  background-color: #F5F5F5;
  display: block;
  height: 320px;
  margin: ${cardMargin}px;
  width: ${cardWidth}px;
`;

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

/*
 * Wrapper to make sure to display add story view or add note view
 */

const NavArrow = ({
  prev = false,
  hide = false,
  incrementBy = 1,
  selectedItem = 0,
  setSelectedItem = null,
}) => {
  if (hide) return null;
  return (
    <StyledArrow
      prev={prev}
      onClick={() => {
        setSelectedItem(clamp(selectedItem + incrementBy, lowerBounds, upperBounds));
      }}
    >
      {prev ? <ArrowLeft /> : <ArrowRight />}
    </StyledArrow>
  );
}

const SliderCarousel = ({ initialSelectedItem = 0 }) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  return (
    <React.Fragment>
      <CarouselContainer selectedItem={selectedItem}>
        <CarouselCard>1</CarouselCard>
        <CarouselCard>2</CarouselCard>
        <CarouselCard>3</CarouselCard>
        <CarouselCard>4</CarouselCard>
        <CarouselCard>5</CarouselCard>
        <CarouselCard>6</CarouselCard>
        <CarouselCard>7</CarouselCard>
        <CarouselCard>8</CarouselCard>
        <CarouselCard>9</CarouselCard>
        <CarouselCard>10</CarouselCard>
        <CarouselCard>11</CarouselCard>
        <CarouselCard>12</CarouselCard>
        <CarouselCard>13</CarouselCard>
        <CarouselCard>14</CarouselCard>
        <CarouselCard>15</CarouselCard>
      </CarouselContainer>
      <NavArrow
        prev
        hide={selectedItem <= 0}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        incrementBy={-1}
      />
      <NavArrow
        hide={selectedItem >= 14}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        incrementBy={+1}
      />
    </React.Fragment>
  );
}

const StoryGroupWrapper = ({
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  selectedProfile,
  }) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);

  return (
    <WrapperStyle>
      {viewMode === ADD_STORY &&
      <React.Fragment>
        <HeaderBar>
          <AvatarContainer>
            <Avatar
              src={selectedProfile.avatar_https}
              fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
              alt={selectedProfile.handle}
              size="medium"
              type="social"
              network={selectedProfile.service}
            />
            <AvatarNameWrapper>
              <SensitiveData>
                <Text size="mini" color="outerSpace">
                  {selectedProfile.handle}
                </Text>
              </SensitiveData>
            </AvatarNameWrapper>
          </AvatarContainer>
        </HeaderBar>
        <BodyContainer>
          <SliderCarousel />
        </BodyContainer>
        <FooterBar>
          <Button label="Preview" />
          <Button label="Schedule Story" />
        </FooterBar>
      </React.Fragment>
      }
      {viewMode === ADD_NOTE &&
      <div>Add note view</div>
      }
    </WrapperStyle>
  );
};

StoryGroupWrapper.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
  selectedProfile: PropTypes.shape({
    id: PropTypes.string,
    avatarUrl: PropTypes.string,
    avatar_https: PropTypes.string,
    serviceUsername: PropTypes.string,
    serviceId: PropTypes.string,
    organizationId: PropTypes.string,
    username: PropTypes.string,
    service: PropTypes.string,
    handle: PropTypes.string,
  }).isRequired,
};

export default StoryGroupWrapper;
