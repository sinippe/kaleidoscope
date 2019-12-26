import React, { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  onChangeCount: (value: number) => void;
};

const OptionsMenu: React.FC<Props> = props => {
  const onChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeCount(+event.currentTarget.value);
  };

  return (
    <OptionsMenuContainer>
      <input type="text" onChange={onChangeCount} />
    </OptionsMenuContainer>
  );
};

const OptionsMenuContainer = styled.div`
  width: 80%;
  position: fixed;
  top: 0;
  right: 0;
`;

export default OptionsMenu;
