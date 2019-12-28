import React, { useRef } from "react";
import { IToastProps, Toaster, IToasterProps } from "@blueprintjs/core";

export type WithToastProps = {
  addToast: (props: IToastProps) => void;
};

const withToast = <P extends WithToastProps>(
  Component: React.FC<P>,
  toasterProps: IToasterProps
): React.FC<Omit<P, keyof WithToastProps>> => props => {
  const toaster = useRef<Toaster>(null);

  const addToast = (props: IToastProps) => {
    if (toaster.current) {
      toaster.current.show(props);
    }
  };

  return (
    <React.Fragment>
      <Toaster {...toasterProps} ref={toaster}></Toaster>
      <Component addToast={addToast} {...(props as P)} />;
    </React.Fragment>
  );
};

export default withToast;
