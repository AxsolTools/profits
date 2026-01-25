## Remotion Promo Studio (standalone)

This folder contains **promo/ad compositions** for Proof. It is **not** wired into the website UI.

### Preview locally (no renders)

From the repo root:

```bash
pnpm remotion:studio
```

Then pick a composition:
- `Proof_X_Square` (1080x1080)
- `Proof_Vertical_Short` (1080x1920)
- `Proof_Landscape_Spot` (1920x1080)

### Assets

All promo assets live in `public/remotion-assets/` so Remotion can load them via `staticFile()`.

