import React, { useEffect, useState } from "react";

const asyncComponent = (importComponent) => {
  return (props) => {
    const [comp, setComp] = useState(null);
    useEffect(() => {
      importComponent().then((cmp) => {
        setComp(cmp.default);
      });
    }, []);

    const Comp = comp;
    return Comp ? <Comp {...props} /> : null;
  };
};

export default asyncComponent;
