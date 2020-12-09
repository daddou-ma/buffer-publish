import styled from 'styled-components';
import { grayDarker } from '@bufferapp/ui/style/colors';
import { fontSize, fontFamily } from '@bufferapp/ui/style/fonts';
import { Editable } from 'slate-react';

const Editor = styled(Editable)`
  color: ${grayDarker};
  padding: 8px 60px 8px 8px;
  position: relative;
  line-height: 24px;
  font-size: ${fontSize};
  font-family: ${fontFamily};
`;

export default Editor;
