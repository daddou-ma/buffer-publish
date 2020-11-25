import styled from 'styled-components';
import {
  blue,
  blueLighter,
  grayDarker,
  grayDark,
  gray,
  grayLight,
} from '@bufferapp/ui/style/colors';

const Wrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const PickerWrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1000;
  .emoji-mart {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    z-index: 2;
    margin-top: 4px;
    color: ${grayDarker};
    border-color: ${gray};
  }
  .emoji-mart-anchor,
  .emoji-mart-no-results {
    color: ${grayDark};
  }
  .emoji-mart-skin-swatches {
    border-color: ${gray};
  }
  .emoji-mart-bar {
    border-color: ${grayLight};
  }
  .emoji-mart-title-label {
    font-size: 14px;
    color: ${grayDark};
    font-weight: 400;
  }
  .emoji-mart-category {
    font-size: 14px;
  }
  .emoji-mart-preview {
    height: 55px;
  }
  .emoji-mart-preview-emoticons {
    display: none;
  }
  .emoji-mart-preview-data {
    left: 50px;
  }
  .emoji-mart-preview-name,
  .emoji-mart-preview-shortnames {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .emoji-mart-search input {
    font-family: 'Roboto', sans-serif;
    margin: 6px 0;
    border-color: ${gray};
    color: ${grayDarker};
  }
  .emoji-mart-search input:focus {
    border: 1px solid ${blue};
    box-shadow: 0px 0px 0px 3px
      ${blueLighter};
    outline: none;
    transition-property: border-width, border-color, box-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }
  .emoji-mart-preview-emoji {
    .emoji-mart-emoji {
      span {
        height: 24px !important;
        width: 24px !important;
      }
    }
  }
}
`;

const NoResultsFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export { Wrapper, PickerWrapper, NoResultsFound };
