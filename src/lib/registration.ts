/** Registration closes June 14, 2026 at 00:00 (Astana, UTC+5) */
export const REGISTRATION_DEADLINE = new Date("2026-06-14T00:00:00+05:00");

export const REGISTRATION_DEADLINE_LABEL = "14 июня в 00:00";

export function isRegistrationOpen(now = Date.now()): boolean {
  return now < REGISTRATION_DEADLINE.getTime();
}
