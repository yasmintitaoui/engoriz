import { useMemo, useState } from 'react'
import { useTranslation } from '../../i18n/useTranslation'

const cities = [
  'Agadir','Ahfir','Ain Aouda','Ait Melloul','Al Hoceima','Asilah','Azemmour','Azilal',
  'Ben Ahmed','Beni Mellal','Berkane','Berrechid','Bouarfa','Boujdour','Boulemane',
  'Casablanca','Chefchaouen',
  'Dakhla','Demnate',
  'El Jadida','El Hajeb','Erfoud','Errachidia','Essaouira',
  'Fes','Fnideq','Fquih Ben Salah',
  'Guelmim','Guercif',
  'Ifrane','Imzouren',
  'Kalaat Mgouna','Kasba Tadla','Kenitra','Khemisset','Khenifra','Khouribga','Ksar El Kebir',
  'Laayoune','Larache',
  'Marrakesh','Martil','Meknes','Midelt','Mohammedia','Moulay Idriss Zerhoun',
  'Nador',
  'Ouarzazate','Oued Zem','Ouezzane','Oujda',
  'Rabat',
  'Safi','Salé','Sefrou','Settat','Sidi Ifni','Sidi Kacem','Sidi Slimane',
  'Tan-Tan','Tangier','Taourirt','Taroudant','Taza','Temara','Tetouan','Tiflet','Tinghir','Tiznit',
  'Youssoufia',
  'Zagora',
]

export default function CitySelect({ value, onChange, className }) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')
  const [customMode, setCustomMode] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return cities

    return cities.filter((city) =>
      city.toLowerCase().startsWith(q) ||
      city.toLowerCase().includes(q)
    )
  }, [query])

  const selectCity = (city) => {
    setQuery(city)
    setCustomMode(false)
    onChange(city)
    setOpen(false)
  }

  const selectOther = () => {
    setCustomMode(true)
    setQuery('')
    onChange('')
    setOpen(false)
  }

  return (
    <div className="relative">
      <input
        required
        value={query}
        placeholder={
          customMode
            ? t('checkout.enterCity')
            : t('checkout.typeCity')
        }
        onFocus={() => {
          if (!customMode) {
            setOpen(true)
          }
        }}
        onChange={(e) => {
          const nextValue = e.target.value

          setQuery(nextValue)

          if (customMode) {
            onChange(nextValue)
          } else {
            onChange('')
            setOpen(true)
          }
        }}
        className={className}
      />

      {customMode && (
        <button
          type="button"
          onClick={() => {
            setCustomMode(false)
            setQuery('')
            onChange('')
            setOpen(true)
          }}
          className="mt-2 text-[11px] uppercase tracking-[0.22em] text-neutral-400 underline underline-offset-4 transition hover:text-black"
        >
          {t('checkout.chooseFromList')}
        </button>
      )}

      {open && !customMode && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {results.length > 0 && (
            <>
              {results.map((city) => (
                <button
                  key={city}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectCity(city)}
                  className="block w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
                >
                  {city}
                </button>
              ))}
            </>
          )}

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={selectOther}
            className="block w-full border-t border-neutral-200 px-4 py-3 text-left text-sm font-medium text-black transition hover:bg-neutral-50"
          >
            {t('checkout.otherCity')}
          </button>
        </div>
      )}
    </div>
  )
}