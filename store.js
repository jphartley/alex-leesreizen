// Saved data: answers per journey plus shared settings, in this browser only.
// Version 1 (the single Taiwan journey) is only ever read, never changed, so it stays as a backup.
export const storageKey = 'alex-leesavontuur-v2';
export const legacyKey = 'alex-thee-avontuur-v1';
const isObject = value => !!value && typeof value === 'object' && !Array.isArray(value);

export function emptyData() {
  return { version: 2, settings: { calm: false, large: false }, journeys: {} };
}

// Taiwan had three written questions in v1; the third (index 2) was dropped, so only 0 and 1 carry over.
export function migrateV1(v1) {
  const answers = {}, written = {};
  if (isObject(v1?.answers)) for (const [key, value] of Object.entries(v1.answers)) {
    if (/^[0-6]$/.test(key) && Number.isInteger(value) && value >= 0 && value <= 3) answers[key] = value;
  }
  if (isObject(v1?.written)) for (const key of ['0', '1']) if (typeof v1.written[key] === 'string') written[key] = v1.written[key];
  return { version: 2, settings: { calm: !!v1?.calm, large: !!v1?.large }, journeys: { taiwan: { answers, written } } };
}

export function normalise(data) {
  const result = emptyData();
  result.settings = { calm: !!data?.settings?.calm, large: !!data?.settings?.large };
  if (isObject(data?.journeys)) for (const [slug, entry] of Object.entries(data.journeys)) {
    result.journeys[slug] = { answers: isObject(entry?.answers) ? entry.answers : {}, written: isObject(entry?.written) ? entry.written : {} };
  }
  return result;
}

// Returns the saved data, migrating from v1 (and saving the result) the first time.
export function load(storage) {
  const read = key => { try { return JSON.parse(storage.getItem(key)); } catch { return null; } };
  const current = read(storageKey);
  if (current) return normalise(current);
  const legacy = read(legacyKey);
  if (!legacy) return emptyData();
  const migrated = migrateV1(legacy);
  save(storage, migrated);
  return migrated;
}

export function save(storage, data) {
  try { storage.setItem(storageKey, JSON.stringify(data)); } catch {}
}
