import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Authcontent";
import { AuthProvider2 } from "./AuthContent2";
import { AuthProvider3 } from "./AuthContent3";
import { AuthProvider4 } from "./AuthContent4";
import { TokenProvider } from "./TokenDetails";
import { Calculator } from "./calculator";

import App from "./App";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthProvider2>
          <AuthProvider3>
            <AuthProvider4>
              <Calculator>
                <TokenProvider>
                  <App />
                </TokenProvider>
              </Calculator>
            </AuthProvider4>
          </AuthProvider3>
        </AuthProvider2>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
