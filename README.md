# P7
Project 7 Openclassrooms

Développez le back-end d'un site de notation de livres

This is the project 7 of Openclassrooms's web developper course.

The goal was to create a backend API server for a books notations website. The frontend is given with the project.

To run the project make sure to have npm and Node.js.

To run the project follow these steps:

- Clone the repository P7 and its submodule P7-Dev-Web-livres

```
git clone --recurse-submodules https://github.com/mminguez/P7.git 
```

- Type those commands in bash CLI

```
cd P7/P7-Dev-Web-livres/
npm i
npm run start
```

- Make sure to have created a MongoDB collection (https://www.mongodb.com/fr-fr/basics/create-database)
- Please get your MongoDB connection URI (https://www.mongodb.com/docs/manual/reference/connection-string/)
- Keep the previous terminal opened and open another terminal
- Export env variables like:
```
export JWT_SECRET="$Gm69MI2eUuPC41cW/Nv6UV4Iq52Cx5AqE6lHDeNqkw4="
export MONGO_URI="mongodb+srv://me:10101010@mydatabase.exemple.mongodb.net" // Your MongoDB URI (https://www.mongodb.com/docs/manual/reference/connection-string/)
```

- Then type:

```
cd P7/Backend/
npm i
npm run start
```

Then go to http://localhost:3000/ on your browser to see the website.

<br/>
<br/>
<br/>
<br/>

🇫🇷 Projet 7 Openclassrooms

Développez le back-end d'un site de notation de livres

Il s'agit du projet 7 du cours de développeur web d'Openclassrooms.

L'objectif était de créer un serveur API backend pour un site de notation de livres. Le frontend est fourni avec le projet.

Pour exécuter le projet, assurez-vous d'avoir npm et Node.js.

Pour exécuter le projet, suivez ces étapes:

- Clonez le dépôt P7 et son sous-module P7-Dev-Web-livres

```
git clone --recurse-submodules https://github.com/mminguez/P7.git 
```

- Tapez ces commandes dans la CLI bash

```
cd P7/P7-Dev-Web-livres/
npm i
npm run start
```
- Assurez vous d'avoir créé une base de donnée sur MongoDB (https://www.mongodb.com/fr-fr/basics/create-database)
- Munissez vous de votre URL de connexion à MongoDB (https://www.mongodb.com/docs/manual/reference/connection-string/)
- Gardez le terminal précédent ouvert et ouvrez un autre terminal:
- Exportez les variables dans l'environnement
```
export JWT_SECRET="$Gm69MI2eUuPC41cW/Nv6UV4Iq52Cx5AqE6lHDeNqkw4="
export MONGO_URI="mongodb+srv://me:10101010@mydatabase.exemple.mongodb.net" // Votre url MongoDB 
```

- Puis tapez :

```
cd P7/Backend/
npm i
npm run start
```

Ensuite, allez sur http://localhost:3000/ dans votre navigateur pour voir le site web.
