import React from 'react';
import styled from 'styled-components';

interface AvatarIconProps {
  name: string;
  colorCode: string;
  size: string;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ name, colorCode, size }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=${colorCode}&bold=true&color=ffffff&size=512`;
  return <Avatar src={avatarUrl} size={size} />;
};

export default AvatarIcon;

const Avatar = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;
