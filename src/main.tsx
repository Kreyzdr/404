import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { LocaleProvider } from "@/i18n"
import { capturePaymentAttribution } from "@/lib/paymentAttribution"
import "./index.css"

capturePaymentAttribution()

// The prebuilt shells carry the landing copy as markup for crawlers that never
// run this bundle. Once React takes over it renders its own localized copy, so
// the static one is dropped to keep a single outline in the document.
document.getElementById("seo-outline")?.remove()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
)
