/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import Zrmc from "../";

/**
 * material-icons
 * See:
 * https://material.io/develop/web/components/buttons/icon-buttons/
 *
 */

const MDC_ICON = "mdc-icon-button";

const Icon = ({
  name,
  componentName,
  color,
  label,
  fa,
  onClick,
  children,
  isButton,
  ...props
}) => {
  const classes = MDC_ICON;
  const p = Zrmc.sanitizeProps(props);
  if (color) {
    p.style = {};
    p.style.color = color;
  }
  if (label) {
    p["aria-label"] = label;
  }
  let ch = children;
  p.className = classes;
  if (fa) {
    ch = <i className={`fa fa-${fa}`} />;
  } else if (name) {
    ch = name;
    if (isButton) {
      p.className += " material-icons";
    } else {
      p.className = "material-icons";
    }
  }
  if (onClick) {
    p.role = "button";
    p.tabIndex = "0";
    p.onKeyUp = () => {};
    p.onClick = onClick;
  }
  const element = React.createElement(componentName, p, ch);
  return Zrmc.render(element, props);
};

Icon.defaultProps = {
  mdcElement: MDC_ICON,
  componentName: "i",
  color: null,
  label: null,
  fa: null,
  onClick: null,
  children: null,
  isButton: false,
};

Icon.propTypes = {
  mdcElement: PropTypes.string,
  componentName: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  fa: PropTypes.string,
  isButton: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default Icon;
