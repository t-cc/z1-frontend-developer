import React from 'react';
import IdBgDefault from '../../assets/ID_bg.svg';
import { StyledImg } from './styles';

interface Props {
  image?: string
}

export const IdImage:React.FC<Props> = ({image=IdBgDefault}) => {
  return (
    <>
      <StyledImg src={image} />
    </>
  )
}