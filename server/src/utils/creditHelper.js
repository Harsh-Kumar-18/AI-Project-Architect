// utils/creditHelper.js
//
// Your schema stores credit usage as:
//   creditHistory: [{ usedAt: Date }]
//
// Logic:
//   - Each entry in creditHistory represents 1 spent credit.
//   - If an entry's usedAt is >= 12 hours ago, that credit is restored.
//   - restoreExpiredCredits() must be called BEFORE reading aiCredits.
//   - deductCredit() spends 1 credit and appends a new history entry.

const CREDIT_RESTORE_MS = 12 * 60 * 60 * 1000; // 12 hours
const MAX_CREDITS = 10;

/**
 * Restores credits whose 12-hour window has elapsed.
 * Mutates user in-place and saves if anything changed.
 * @param {import('mongoose').Document} user
 */
export const restoreExpiredCredits = async (user) => {
  const now = Date.now();

  const expired  = user.creditHistory.filter(
    (entry) => now - new Date(entry.usedAt).getTime() >= CREDIT_RESTORE_MS
  );
  const remaining = user.creditHistory.filter(
    (entry) => now - new Date(entry.usedAt).getTime() < CREDIT_RESTORE_MS
  );

  if (expired.length === 0) return; // nothing to restore

  // Restore 1 credit per expired entry, capped at MAX_CREDITS
  const canRestore = MAX_CREDITS - user.aiCredits;
  const toRestore  = Math.min(expired.length, canRestore);

  if (toRestore > 0) {
    user.aiCredits += toRestore;
  }

  // Drop all expired entries (restored or surplus — both are stale)
  user.creditHistory = remaining;

  await user.save();
};

/**
 * Deducts 1 credit and records the timestamp.
 * Throws a 403-marked error if the user has no credits left.
 * @param {import('mongoose').Document} user
 */
export const deductCredit = async (user) => {
  if (user.aiCredits <= 0) {
    const err = new Error("No AI credits remaining.");
    err.statusCode = 403;
    throw err;
  }

  user.aiCredits -= 1;
  user.creditHistory.push({ usedAt: new Date() });
  await user.save();
};

/**
 * Returns the Date when the next credit will be restored,
 * or null if creditHistory is empty / all credits already full.
 * @param {import('mongoose').Document} user
 * @returns {Date|null}
 */
export const getNextRestoreTime = (user) => {
  if (!user.creditHistory || user.creditHistory.length === 0) return null;

  // Find the oldest usedAt still within the 12-hour window
  const pending = user.creditHistory
    .map((e) => new Date(e.usedAt).getTime())
    .filter((t) => Date.now() - t < CREDIT_RESTORE_MS);

  if (pending.length === 0) return null;

  const oldest = Math.min(...pending);
  return new Date(oldest + CREDIT_RESTORE_MS);
};
