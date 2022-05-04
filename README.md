# countries_app_game_nodejs_vuejs
Cette application avait pour but de récupérer des données d'une api en GraphQL avec NodeJs.
Récupérer les données de notre serveur NodeJs pour les afficher avec VueJs.
J'ai ajouté un petit jeu à l'intérieur de l'application, le jeu consiste à répondre à des questions.
## Installation

```
npm i 
```
## Lancement de l'application
Par défaut l'application se lancera sur le port 3100.
```
npm run dev
```
## Packages& plugins utilisés

Backend : 
- express
- path
- nodemon
- axios

Frontend :
- Vuetify
- VueRouter
- axios
- vue2-flip-countdown

## Modification du frontend
Créer deux fichiers :
- .env
- .env.production

- Mettre la variable d'environnement "VUE_APP_BASE_URL" et la valeur
- Puis exécutez les commandes suivantes
```
cd .\frontend\
npm i
npm run serve
```
Vous pouvez lancer séparemment les 2 applications mais attention au port :
- Frontend : 8080 (rajouter dans .env VUE_APP_BASE_URL_API avec le port 3100)
- Backend : 3100

Vous pouvez sinon faire :
```
npm run build --mode production
```
- Copier coller le dossier "dist" dans le dossier public de NODEJS
```
npm run dev
```

## Mise en production
Faire le build de l'application VUE JS
```
npm run build --mode production
```
Copier coller le dossier "dist" dans le dossier public de NODEJS

## Remerciements
- GraphQL api : [https://countries.trevorblades.com/]
- Countdown : [https://github.com/philipjkim/vue2-flip-countdown]
- GIF fun yes/no : [https://yesno.wtf]
- Windows ne traite pas les drapeaux en emoji, pour cela j'ai utilisé ce site pour récupérer les images des drapeaux [https://flagpedia.net]


## Tâches
- [x] Mise en place du serveur
- [x] Mise en place du front
- [x] Rajouter un quizz
- [] Rajouter le resultat du quizz (% réussite, les bonnes réponses qu'il fallait donner)
- [] Gestion de compte utilisateurs
- [] Sauvegarder les resultats d'un utilisateur en bdd