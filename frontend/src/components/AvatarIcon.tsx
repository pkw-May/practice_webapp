import React from 'react';
import styled from 'styled-components';

interface AvatarIconProps {
  name: string;
  size: string;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ name, size }) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=${randomColor}&bold=true&color=ffffff&size=512`;
  return <Avatar src={avatarUrl} size={size} />;
};

export default AvatarIcon;

const Avatar = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;
