import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { LocaleProvider } from "@/i18n"
import { trackLandingVisit } from "@/lib/landingAnalytics"
import { getMarketingAttribution } from "@/lib/marketingAttribution"
import "./consent"
import "./index.css"

getMarketingAttribution()
trackLandingVisit()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
)
