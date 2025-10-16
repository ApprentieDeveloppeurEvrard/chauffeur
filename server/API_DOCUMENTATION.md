# API Documentation - Chauffeurs Platform

## Démarrage du serveur

```bash
cd server
npm install
npm run dev
```

Le serveur démarrera sur `http://localhost:4000`

## Endpoints d'authentification

### POST /api/auth/register
Créer un nouveau compte utilisateur

**Corps de la requête :**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "role": "client", // "client", "driver", ou "admin"
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "0123456789",
  
  // Champs supplémentaires pour les chauffeurs (role: "driver")
  "licenseType": "B",
  "licenseNumber": "123456789",
  "licenseDate": "2018-03-15",
  "experience": "3-5",
  "vehicleType": "berline",
  "vehicleBrand": "Peugeot",
  "vehicleModel": "508",
  "vehicleYear": 2020,
  "vehicleSeats": 5,
  "workZone": "Paris et banlieue",
  "specialties": ["transport_personnel", "vtc"]
}
```

**Réponse (201) :**
```json
{
  "message": "Compte créé avec succès",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "role": "client",
    "firstName": "Jean",
    "lastName": "Dupont",
    "phone": "0123456789"
  },
  "token": "jwt_token_here"
}
```

### POST /api/auth/login
Se connecter

**Corps de la requête :**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Réponse (200) :**
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "role": "client",
    "firstName": "Jean",
    "lastName": "Dupont",
    "phone": "0123456789"
  },
  "token": "jwt_token_here"
}
```

### GET /api/auth/me
Obtenir le profil de l'utilisateur connecté

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Réponse (200) :**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "role": "driver",
    "firstName": "Jean",
    "lastName": "Dupont",
    "phone": "0123456789",
    "driverProfile": {
      // Profil chauffeur si role = "driver"
    }
  }
}
```

### PUT /api/auth/me
Mettre à jour le profil utilisateur

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Corps de la requête :**
```json
{
  "firstName": "Jean",
  "lastName": "Martin",
  "phone": "0987654321"
}
```

## Endpoints des chauffeurs

### GET /api/drivers/profile
Obtenir le profil détaillé du chauffeur connecté

**Headers :**
```
Authorization: Bearer jwt_token_here
```

### PUT /api/drivers/profile
Mettre à jour le profil du chauffeur

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Corps de la requête :**
```json
{
  "licenseType": "B+7h",
  "experience": "5-10",
  "vehicleType": "suv",
  "isAvailable": true,
  "specialties": ["transport_personnel", "longue_distance"]
}
```

### PUT /api/drivers/location
Mettre à jour la localisation du chauffeur

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Corps de la requête :**
```json
{
  "latitude": 48.8566,
  "longitude": 2.3522
}
```

### GET /api/drivers/nearby
Trouver des chauffeurs à proximité

**Paramètres de requête :**
- `latitude` (requis): Latitude de recherche
- `longitude` (requis): Longitude de recherche
- `radius` (optionnel): Rayon de recherche en mètres (défaut: 10000)
- `vehicleType` (optionnel): Type de véhicule

**Exemple :**
```
GET /api/drivers/nearby?latitude=48.8566&longitude=2.3522&radius=5000&vehicleType=berline
```

### GET /api/drivers
Obtenir tous les chauffeurs (admin)

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Paramètres de requête :**
- `status`: Filtrer par statut (pending, approved, rejected, suspended)
- `isAvailable`: Filtrer par disponibilité (true/false)
- `vehicleType`: Filtrer par type de véhicule
- `experience`: Filtrer par expérience
- `page`: Numéro de page (défaut: 1)
- `limit`: Nombre d'éléments par page (défaut: 10)
- `search`: Recherche textuelle

### PUT /api/drivers/:driverId/status
Mettre à jour le statut d'un chauffeur (admin)

**Headers :**
```
Authorization: Bearer jwt_token_here
```

**Corps de la requête :**
```json
{
  "status": "approved", // "approved", "rejected", "suspended"
  "reason": "Profil validé avec succès"
}
```

## Exemples d'utilisation avec curl

### Créer un compte client
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@example.com",
    "password": "password123",
    "role": "client",
    "firstName": "Marie",
    "lastName": "Dubois",
    "phone": "0123456789"
  }'
```

### Créer un compte chauffeur
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "chauffeur@example.com",
    "password": "password123",
    "role": "driver",
    "firstName": "Pierre",
    "lastName": "Martin",
    "phone": "0987654321",
    "licenseType": "B",
    "licenseDate": "2018-03-15",
    "experience": "3-5",
    "vehicleType": "berline",
    "vehicleBrand": "Peugeot",
    "vehicleModel": "508",
    "vehicleYear": 2020,
    "vehicleSeats": 5,
    "workZone": "Paris",
    "specialties": ["transport_personnel", "vtc"]
  }'
```

### Se connecter
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "chauffeur@example.com",
    "password": "password123"
  }'
```

### Obtenir son profil (avec le token reçu)
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Codes d'erreur

- `400`: Données invalides
- `401`: Non authentifié ou token invalide
- `403`: Non autorisé
- `404`: Ressource non trouvée
- `409`: Conflit (ex: email déjà utilisé)
- `500`: Erreur serveur

## Base de données

L'application utilise MongoDB. Les collections principales sont :
- `users`: Informations de base des utilisateurs
- `drivers`: Profils détaillés des chauffeurs
- `vehicles`: Informations sur les véhicules
- `rides`: Historique des courses

Le serveur se connecte automatiquement à `mongodb://localhost:27017/chauffeurs`.
