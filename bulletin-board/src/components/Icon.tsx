import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp as AwesomeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesLeft,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  iconStyle: IconStyle;
  icon: string;
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement> | any) => void | any;
}

interface IconStyle {
  color?: string;
  size?: string;
}

const iconList = {
  home: faHome,
  back: faAnglesLeft,
  profile: faUser,
};

const Icon: React.FC<IconProps> = ({ icon, iconStyle, onClickHandler }) => {
  return (
    <IconWrapper
      iconStyle={iconStyle}
      onClick={e => {
        onClickHandler(e);
      }}
    >
      <FontAwesomeIcon
        icon={iconList[icon as keyof typeof iconList] as AwesomeProp}
      />
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.div<{ iconStyle: IconStyle }>`
  width: auto;
  padding: 5px;
  color: ${({ theme, iconStyle }) =>
    iconStyle.color ? theme.colors[iconStyle.color] : theme.colors.skyblue};
  font-size: ${({ iconStyle }) =>
    iconStyle.size ? `${iconStyle.size}px` : '16px'};
  cursor: pointer;
`;
