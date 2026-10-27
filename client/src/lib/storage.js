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

export function safeGetAnyItem(keys, types = ['local', 'session']) {
  const keyList = Array.isArray(keys) ? keys : [keys]

  for (const type of types) {
    for (const key of keyList) {
      const value = safeGetItem(key, type)
      if (value) return value
    }
  }

  return null
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

export function safeSetAnyItem(key, value, types = ['local', 'session']) {
  let saved = false

  for (const type of types) {
    if (safeSetItem(key, value, type)) {
      saved = true
    }
  }

  return saved
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

export function safeRemoveAnyItem(key, types = ['local', 'session']) {
  let removed = false

  for (const type of types) {
    if (safeRemoveItem(key, type)) {
      removed = true
    }
  }

  return removed
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
