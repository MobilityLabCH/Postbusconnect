# PostBus Connect

Plateforme API-first pour créer des **courses additionnelles** CarPostal, les **réserver** et les **promouvoir** via des partenaires (hôtels, offices du tourisme, TO).

## Fonctionnalités v1
- Endpoints REST: `POST /trips`, `GET /availability`, `POST /bookings`, webhooks.
- Auth B2B par **token partenaire** (JWT) (stub v1).
- Widget embarquable pour tunnel de réservation hôtel.
- OpenAPI 3.1 (`openapi.yaml`).
- CI GitHub Actions (lint + tests).
- Stockage **in-memory** pour la démo (remplaçable par DB).

## Démarrage rapide

```bash
# API
cd server
cp ../.env.example .env
npm i
npm run dev   # http://localhost:4000

# Widget (build)
cd ../widget
npm i
npm run build
# Servez dist/ via l'API (déjà mappé) ou un CDN
```

Variables (voir `.env.example`):
- `PORT=4000`
- `JWT_SECRET=change-me`
- `PUBLIC_BASE_URL=http://localhost:4000`

## Exemples d’usage

### Créer une course
```bash
curl -X POST http://localhost:4000/trips  -H "Authorization: Bearer PARTNER_TOKEN"  -H "Content-Type: application/json"  -d '{
   "partner_id":"hotel_123",
   "route":{"from_stop_id":"8507483","to_stop_id":"8574174"},
   "date":"2025-12-28","departure_time":"08:30",
   "capacity":42,
   "vehicle_preferences":{"electric":true,"low_floor":true},
   "pricing_model":{"type":"flat","amount_chf":280},
   "visibility":{"public":false}
 }'
```

### Réserver (B2B ou B2C)
```bash
curl -X POST http://localhost:4000/bookings  -H "Authorization: Bearer PARTNER_TOKEN"  -H "Content-Type: application/json"  -d '{
   "trip_id":"TRIP_xxx",
   "passengers":[{"first_name":"Anna","last_name":"M."}],
   "source":"hotel",
   "magic_pass_id": null
 }'
```

### Deep-link hôtel (page de confirmation)
```
https://postbus.example/trips/offer?trip_id=TRIP_xxx&date=2025-12-28&adults=2&partner=hotel_123&sig=...
```

### Widget embarqué (confirmation + email J-2)
```html
<div id="postbus-widget" data-partner="hotel_123"></div>
<script async src="https://postbus.example/widget/postbus-widget.min.js"></script>
<script>
  PostBusWidget.init({
    container: '#postbus-widget',
    fromStop: '8507483', toStop: '8574174',
    checkinDate: '2025-12-28',
    adults: 2,
    deepLinkBase: 'https://postbus.example'
  });
</script>
```

## Webhooks
- `booking.created`, `booking.cancelled`, `trip.status_changed`
Configurer votre URL dans le back-office (à venir).

## Sécurité
- JWT Partenaires (scopes: `trips:create`, `availability:read`, `bookings:create`).
- Rate limiting de base.
- Journaux d’audit (console v1).

## Roadmap
- DB (PostgreSQL + Prisma).
- OAuth2/OIDC partenaires.
- GTFS/GTFS-RT réels.
- Intégration Magic Pass (selon accords partenaires).
