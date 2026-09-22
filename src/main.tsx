import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { LocaleProvider } from "@/i18n"
import { capturePaymentAttribution } from "@/lib/paymentAttribution"
import "./consent"
import "./index.css"

capturePaymentAttribution()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
)
