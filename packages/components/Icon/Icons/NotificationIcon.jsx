import React from 'react';
import Icon from '../../Icon';

const NotificationIcon = ({ color, size }) => (
  <Icon color={color} size={size}>
    <path d="M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z M8,15 C11.8659932,15 15,11.8659932 15,8 C15,4.13400675 11.8659932,1 8,1 C4.13400675,1 1,4.13400675 1,8 C1,11.8659932 4.13400675,15 8,15 Z" />
    <path d="M8,12 C7.5581722,12 7.2,11.6418278 7.2,11.2 C7.2,10.7581722 7.5581722,10.4 8,10.4 C8.44182776,10.4 8.8,10.7581722 8.8,11.2 C8.8,11.6418278 8.44182776,12 8,12 Z M7.37183622,4 L8.62816376,4 L8.62816376,4 C8.71652936,4 8.78816376,4.07163444 8.78816376,4.16 C8.78816376,4.16380346 8.78802816,4.16760573 8.7877572,4.17139953 L8.41061432,9.45139952 L8.41061432,9.45139952 C8.40463368,9.5351284 8.33496312,9.6 8.25102096,9.6 L7.74897907,9.6 L7.74897907,9.6 C7.66503689,9.6 7.59536631,9.5351284 7.58938568,9.45139952 L7.21224282,4.17139953 L7.21224282,4.17139953 C7.20594704,4.08325853 7.27229569,4.00670239 7.36043669,4.00040661 C7.36423049,4.00013562 7.36803274,4 7.37183622,4 L7.37183622,4 Z" />
  </Icon>
);

NotificationIcon.propTypes = {
  ...Icon.propTypes,
};

export default NotificationIcon;
