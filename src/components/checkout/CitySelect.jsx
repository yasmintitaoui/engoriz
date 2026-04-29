import { useMemo, useState } from 'react'

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
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cities

    return cities.filter((city) =>
      city.toLowerCase().startsWith(q) ||
      city.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="relative">
      <input
        required
        value={query}
        placeholder="Type your city"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value)
          onChange('')
          setOpen(true)
        }}
        className={className}
      />

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-neutral-400">
              City not found
            </p>
          ) : (
            results.map((city) => (
              <button
                key={city}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQuery(city)
                  onChange(city)
                  setOpen(false)
                }}
                className="block w-full px-4 py-3 text-left text-sm transition hover:bg-neutral-50"
              >
                {city}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}