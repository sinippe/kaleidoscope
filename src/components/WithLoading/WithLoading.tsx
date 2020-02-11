import React, { useState } from "react";
import { ProgressBar, Overlay, Classes } from "@blueprintjs/core";
import styled from "styled-components";

export type WithLoadingProps = {
  loadingStart: () => void;
  loadingComplete: () => void;
};

const withLoading = <P extends WithLoadingProps>(
  Component: React.FC<P>
): React.FC<Omit<P, keyof WithLoadingProps>> => props => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let displayTimeout: number;

  const loadingStart = () => {
    clearTimeout(displayTimeout);
    displayTimeout = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  };

  const loadingComplete = () => {
    clearTimeout(displayTimeout);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={isLoading}>
        <ProgressBarContainer>
          <ProgressBar intent="primary" />
        </ProgressBarContainer>
      </Overlay>
      <Component {...{ loadingStart, loadingComplete }} {...(props as P)} />;
    </React.Fragment>
  );
};

const ProgressBarContainer = styled.div`
  left: calc(50vw - 150px);
  top: 50vh;
  margin: 0;
  width: 300px;
`;

export default withLoading;
