export function getStorage(type = 'local') {
  const storage =
    type === 'session' ? globalThis.sessionStorage : globalThis.localStorage

  try {
    if (!storage) return null
    return storage
  } catch {
    return null
  }
}

export function safeGetItem(key, type = 'local') {
  try {
    const storage = getStorage(type)
    if (!storage) return null
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function safeSetItem(key, value, type = 'local') {
  try {
    const storage = getStorage(type)
    if (!storage) return false
    storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function safeRemoveItem(key, type = 'local') {
  try {
    const storage = getStorage(type)
    if (!storage) return false
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function safeParseJson(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback

  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}
