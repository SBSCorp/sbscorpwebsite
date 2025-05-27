
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CookieSettings() {
  const [analyticalCookies, setAnalyticalCookies] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Cookies: The choice is yours</h2>
        <p className="text-muted-foreground mb-4">
          We use cookies to make our site work well for you and so we can continually improve it. The cookies that are necessary to keep the site functioning are always on. We use analytics and marketing cookies to help us understand what content is of most interest and to personalise your user experience.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Necessary Cookies</h3>
          <p className="text-sm text-muted-foreground">
            These cookies are necessary for the website to operate. Our website cannot function without these cookies and they can only be disabled by changing your browser preferences.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Analytical/Performance Cookies</h3>
            <p className="text-sm text-muted-foreground">
              These cookies allow us to measure and report on website activity by tracking page visits, visitor locations and how visitors move around.
            </p>
          </div>
          <Switch checked={analyticalCookies} onCheckedChange={setAnalyticalCookies} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="default" onClick={() => setAnalyticalCookies(true)}>
          I accept all cookies
        </Button>
        <Button variant="outline" onClick={() => setAnalyticalCookies(false)}>
          Reject all non-essential cookies
        </Button>
        <Button variant="outline">
          Save my cookie choices and close
        </Button>
      </div>
    </div>
  )
}
