import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisibleStyle = { display: visible ? "none" : "" };
  const showWhenVisibleStyle = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisibleStyle}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisibleStyle} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
