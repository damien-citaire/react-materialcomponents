/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import Zrmc from "../";

/**
 * mdc-tab-bar
 * See:
 * https://material.io/components/web/catalog/tabs/
 * http://material-components-web.appspot.com/tabs.html
 *
 */

const MDC_TABBAR = "mdc-tab-bar";

export default class Tabbar extends Component {
  constructor(props) {
    super(props);
    const { activeTab } = props;
    this.state = { activeTab };
    this.ref = null;
    this.activeRef = null;
    this.indicatorRef = null;
  }

  componentDidMount() {
    this.updateIndicator();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeTab } = nextProps;
    if (activeTab !== prevState.activeTab && !nextProps.derivedState) {
      return { activeTab };
    }
    return null;
  }

  componentDidUpdate() {
    this.updateIndicator();
  }

  handleTabSelect = (text, tabId) => {
    if (this.state.activeTab !== tabId) {
      if (this.props.onChange) {
        this.props.onChange(text, tabId);
      }
      this.setState({ activeTab: tabId });
    }
  };

  updateIndicator() {
    if (this.activeRef && this.activeRef.ref && this.ref && this.indicatorRef) {
      const r = this.ref.getBoundingClientRect();
      const rect = this.activeRef.ref.getBoundingClientRect();
      const width = this.ref.clientWidth;
      const tabWidth = rect.width;
      const tabLeft = rect.left - r.left;
      const scaledWidth = tabWidth / width;
      let style = `transform: translateX(${tabLeft}px) scale(${scaledWidth}, 1); visibility: visible;`;
      if (this.props.activeColor) {
        style += ` background-color:${this.props.activeColor}`;
      }
      this.indicatorRef.style = style;
    }
  }

  render() {
    const {
      children,
      onChange,
      color,
      activeColor,
      ripple,
      ...props
    } = this.props;
    let classes = MDC_TABBAR;
    let text = false;
    let icon = false;
    const { activeTab } = this.state;
    // Check icon / text from children Tabs
    Children.forEach(children, (child) => {
      if (child.props && child.props.text) {
        text = true;
      }
      if (child.props && child.props.icon) {
        icon = true;
      }
    });
    if (text && icon) {
      classes += " mdc-tab--with-icon-and-text";
    } else if (icon) {
      classes += " mdc-tab-bar--icon-tab-bar";
    }
    // let style;
    /* if (activeColor) {
      style = { backgroundColor: activeColor };
    } */
    const element = (
      <div
        className={classes}
        ref={(c) => {
          this.ref = c;
        }}
      >
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
            <div className="mdc-tab-scroller__scroll-content">
              {Children.map(children, (child, tabId) =>
                React.cloneElement(child, {
                  tabId,
                  active: tabId === activeTab,
                  ripple,
                  color: tabId === activeTab ? activeColor : color,
                  ref: (c) => {
                    if (tabId === activeTab) {
                      this.activeRef = c;
                    }
                  },
                  onTabSelect: this.handleTabSelect,
                }),
              )}
            </div>
          </div>
        </div>
      </div>
    );
    return Zrmc.render(element, props);
  }
}

Tabbar.defaultProps = {
  mdcElement: MDC_TABBAR,
  children: null,
  activeTab: 0,
  onChange: null,
  color: null,
  activeColor: null,
  ripple: false,
};

Tabbar.propTypes = {
  mdcElement: PropTypes.string,
  children: PropTypes.node,
  activeTab: PropTypes.number,
  onChange: PropTypes.func,
  color: PropTypes.string,
  activeColor: PropTypes.string,
  ripple: PropTypes.bool,
};
