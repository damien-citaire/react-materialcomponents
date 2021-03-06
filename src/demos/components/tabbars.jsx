/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { Tabbar, Tab } from "../../../src/libs";
import Property from "./property";

const Tabbars = () => (
  <section>
    <h1>Tabbar examples </h1>
    <div style={{ padding: "16px" }}>
      <Tabbar ripple derivedState>
        <Tab text="tab1" />
        <Tab text="tab2" />
        <Tab text="tab3" />
      </Tabbar>
    </div>
    <h2>Tabs Properties</h2>
    <Property name="Tab" />
  </section>
);

export default Tabbars;
