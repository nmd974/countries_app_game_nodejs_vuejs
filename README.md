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

Mettre la variable d'environnement "VUE_APP_BASE_URL" et la valeur
Puis exécutez les commandes suivantes
```
cd .\frontend\
npm i
npm run serve
```
## Remerciements
[GraphQL api][https://countries.trevorblades.com/]

Windows ne traite pas les drapeaux en emoji, pour cela j'ai utilisé ce site pour récupérer les images des drapeaux :
[Drapeaux pays][https://flagpedia.net]

[Countdown][https://github.com/philipjkim/vue2-flip-countdown]

[GIF fun yes/no][https://yesno.wtf]

## Tâches
- [x] Mise en place du serveur
- [x] Mise en place du front
- [x] Rajouter un quizz
- [] Rajouter le resultat du quizz (% réussite, les bonnes réponses qu'il fallait donner)
- [] Gestion de compte utilisateurs
- [] Sauvegarder les resultats d'un utilisateur en bdd