# Témalabor Backend

A backend alkalmazás a következő url-eken érhető el:
* https://temalabor2019.azurewebsites.net/api/ (proxy)
* https://temalabor2019-backend.azurewebsites.net/ (közvetlen)

A szolgáltatás Azure Web App-ként van host-olva, és ha ~20p-ig nem érkezik felé kérés automatikusan leáll. Ilyenkor a következő beérkező kérésre újraindul, de ez eltart 2-3 percig.

Az API leírás megtalálható a repo /docs könyvtárában

## A szolgáltatás kipróbálható a következő curl parancsokkal:

### Bejelentkezés
```
curl -c cookie.txt -L https://temalabor2019-backend.azurewebsites.net/auth/login -d 'email=admin&password=admin'
```
Ekkor a curl elmenti a kapott session cookie-t a cookie.txt file-ba

### Felhasználók lekérdezése
```
curl -b cookie.txt -L https://temalabor2019-backend.azurewebsites.net/users
```

### Kijelentkezés
```
curl -b cookie.txt -L https://temalabor2019-backend.azurewebsites.net/auth/logout -d ''
```
## Implementált végontok

* /auth
  * /auth/register
  * /auth/login
  * /auth/logout
* /user
  * /user
  * /user/{userId} (get, post, delete)
  * /user/{userId}/tickets
  * /users
* /line
  * /line
  * /line/{lineId} (get, post, delete)
  * /lines
* /vehicle
  * /vehicle
  * /vehicle/{vehicleId} (get, post, delete)
  * /vehicle/{vehicleId}/newid
  * /vehicles
* /ticket
  * /ticket
  * /ticket/{ticketId} (get, post, delete)
  * /ticket/{ticketId}/expiry
  * /tickets
  * /tickets/buy
  * /tickets/validate
  * /tickets/inspect
* /stats
  * /stats/sales
  * /stats/registrations

## Felhasználói jogosultságok

3 felhasználói típus van különböző jogosultságokkal:

* Felhasználó (user)
  * Saját adatok lekérdezése (/user endpoint)
* Ellenőr (inspector)
  * Minden felhasználó adatának lekérdezése (/user/{userId} endpoint)
* Adminisztrátor (admin)
  * Minden felhasználó adatának lekérdezése (/user/{userId} endpoint)
  * Összes felhasználó kilistázása (/users endpoint)
  * Új tetszőleges típusú felhasználó felvétele (/register endpoint)
  
'user' típusú felhasználót bejelentkezés nélkül bárki létrehozhat (/register endpoint)

## Jelenleg a rendszerbe 3 felhasználó van felvéve, ezek belépési adatai:
* user / user
* inspector / inspector
* admin / admin

## Futtatás lokális környezetben

Az alkalmazás alapértelmezetten a 3000-es portot használja

### Node JS

A futtatáshoz szükséges parancsok (a projekt gyökérkönyvtárában):

```
npm i

npm start
```

### Docker

Docker image letöltése Docker Hub-ról és futtatás:

```
docker run -p 3000:3000 bergdavi/temalabor-backend:latest
```
