# Firestore Rules Review

## Data and access patterns

- `vehicles/{vehicleId}`: public catalogue reads are intentional; authenticated admin custom claims are required for writes. Catalogue query orders by numeric `order`. Vehicle data contains `class`, `name`, `price`, `desc`, `features`, optional `colors`/`image`/`img`/`archived`, and `order`. `archived` is an optional boolean used to suppress bundled catalogue entries after admin removal.
- `vehicleRequests/{requestId}`: creation is limited to purchase, test-drive, service-booking, and trade-in schemas. Users read only their own records; admins read all records. The app deletes records only through the admin path and does not update request records.
- User request queries are either unfiltered for an admin claim or filtered with `userId == auth.uid` for a regular user.
- Request creation uses Firebase `serverTimestamp()` and copies UID/email from the signed-in Firebase user.

## Adversarial checks

- Public unauthenticated catalogue reads: allowed intentionally; the catalogue contains public inventory only.
- Unauthenticated request creation: denied by `isSignedIn()`.
- Spoofed user ID/email, invalid status/action, unknown keys, and client-controlled timestamps: denied by request validation.
- A signed-in user reading another user's request: denied by ownership comparison; the non-admin client query is scoped to its UID.
- Non-admin request update/delete and vehicle writes: denied.
- Admin claim required for inventory writes and all-request reads; email addresses are not authorization credentials.
- Request update: denied because no request-update workflow exists in the client.
- Vehicle archive state: only admins can set it, and it must be boolean; other vehicle fields continue to pass the same validator on every update.
- The UI delays setting `archived` for seven seconds; Undo cancels that pending write. Dismissing the toast only hides the notification and does not cancel the scheduled archive.

## Validation status

Application lint and production build are run in CI. Rules syntax and behavior must be checked with the Firebase Emulator Suite before deployment; no live Rules Playground or project deployment is performed by this workspace task. Re-check these assumptions whenever Firestore queries or request schemas change.
