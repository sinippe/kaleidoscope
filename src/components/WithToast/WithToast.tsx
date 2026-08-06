import React, { useRef } from "react";
import { OverlayToaster, OverlayToasterProps, ToastProps } from "@blueprintjs/core";

export type WithToastProps = {
  addToast: (props: ToastProps) => void;
};

const withToast = <P extends WithToastProps>(
  Component: React.FC<P>,
  props: OverlayToasterProps
): React.FC<Omit<P, keyof WithToastProps>> => props => {
  const toaster = useRef<OverlayToaster>(null);

  const addToast = (props: ToastProps) => {
    if (toaster.current) {
      toaster.current.show(props);
    }
  };

  return (
    <React.Fragment>
      <OverlayToaster {...props} ref={toaster} />
      <Component {...(props as P)} addToast={addToast} />;
    </React.Fragment>
  );
};

export default withToast;
