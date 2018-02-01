/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import Rmdc from "../";

/*
mdc-card__title
See
https://material.io/components/web/catalog/cards/

*/
const CardTitle = ({
  children, className, large, ...props
}) => {
  let classes = "mdc-card__title";
  if (large) {
    classes += " mdc-card__title--large";
  }
  if (className) {
    classes += ` ${className}`;
  }
  return Rmdc.render(<h1 className={classes}>{children}</h1>, props);
};

CardTitle.defaultProps = {
  children: null,
  className: null,

  large: false,
};

CardTitle.propTypes = {
// React component props
  children: PropTypes.node,
  className: PropTypes.string,

  large: PropTypes.bool,
};

export default CardTitle;
