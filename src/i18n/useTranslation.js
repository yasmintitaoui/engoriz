import { useCallback } from 'react'
import { useLanguageStore } from '../store/languageStore'
import { t as translateFn } from './translations'

export function useTranslation() {
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const t = useCallback(
    (path) => translateFn(language, path),
    [language]
  )

  return {
    language,
    setLanguage,
    t,
  }
}