import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp as AwesomeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesLeft,
  faHome,
  faUser,
  faSignOut,
  faSignIn,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  iconStyle: IconStyle;
  icon: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement> | any) => void | any;
}

interface IconStyle {
  color?: string;
  size?: string;
  disable?: boolean;
}

const iconList = {
  home: faHome,
  back: faAnglesLeft,
  signin: faSignIn,
  signout: faSignOut,
  user: faUser,
  trash: faTrashCan,
};

const Icon: React.FC<IconProps> = ({ icon, iconStyle, onClickHandler }) => {
  return (
    <IconWrapper
      $iconStyle={iconStyle}
      onClick={e => {
        if (onClickHandler) {
          onClickHandler(e);
        }
      }}
    >
      <FontAwesomeIcon
        icon={iconList[icon as keyof typeof iconList] as AwesomeProp}
      />
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.div<{ $iconStyle: IconStyle }>`
  width: auto;
  padding: 5px;

  color: ${({ theme, $iconStyle }) =>
    $iconStyle.color ? theme.colors[$iconStyle.color] : theme.colors.skyblue};
  opacity: 0.7;

  font-size: ${({ $iconStyle }) =>
    $iconStyle.size ? `${$iconStyle.size}px` : '16px'};

  cursor: ${({ $iconStyle }) => ($iconStyle.disable ? 'default' : 'pointer')};

  &:hover {
    opacity: 1;
  }
`;
