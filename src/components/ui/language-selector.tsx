"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react" // For the globe icon

export function LanguageSelector() {
  const [language, setLanguage] = React.useState<string>("English")

  const languages = ["English", "German", "Italiano", "普通话"]

  const sortedLanguages = [
    language,
    ...languages.filter((lang) => lang !== language),
  ]

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="px-2 py-1 text-sm flex items-center gap-2">
          <Globe className="h-5 w-5 text-gray-500" />
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={language} className="text-gray-800">
            {language}
          </SelectItem>

          <div className="my-1 border-t border-gray-200"></div>

          {sortedLanguages.map((lang) => (
            lang !== language && (
              <SelectItem key={lang} value={lang} className="text-gray-800">
                {lang}
              </SelectItem>
            )
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}