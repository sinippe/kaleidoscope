import React from "react";
import styled from "styled-components";

type ImageContainerProps = {
  width: number;
  rotation: number;
};

type ImageProps = {
  top: number;
  left: number;
};

type Props = ImageContainerProps &
  ImageProps & {
    image: string;
  };

const KaleidoscopePart: React.FC<Props> = props => {
  return (
    <ImageContainer width={props.width} rotation={props.rotation}>
      <Image top={props.top} left={props.left} src={props.image} alt="" />
    </ImageContainer>
  );
};

//TODO: proper calculation of clip-path
const ImageContainer = styled.div`
  position: relative;
  width: ${(props: ImageContainerProps) => props.width}px;
  height: ${(props: ImageContainerProps) => props.width}px;
  transform: rotate(${(props: ImageContainerProps) => props.rotation}deg)
    translate(
      ${(props: ImageContainerProps) => -props.width / 2}px,
      ${(props: ImageContainerProps) => -props.width / 2}px
    );
  clip-path: polygon(100% 0, 0 0, 100% 100%);
`;

const Image = styled.img`
  position: absolute;
  top: ${(props: ImageProps) => props.top}%;
  left: ${(props: ImageProps) => props.left}%;
`;

export default KaleidoscopePart;
