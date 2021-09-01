# chickenRun

Ceci est le compte rendu du test chicken run.

## Principe

Il s'agit d'une API en JavaScript faite avec NodeJS. Elle s'appuit sur une base de données MongoDB. Une interface à aussi été réalisée avec React mais elle n'est pas aboutie.
Dans cette API on retrouvera des poulets qui vivent tranquillement dans une ferme (la ferme est composée d'une cour et d'un poulailler). On peut selon les commandes voir la liste complète de tous les poulets, en voir un en partiulier, en ajouter, en supprimer, modifier certaines de leurs caractéristiques et voir des données statistiques sur eux.

## Comment s'en servir 

### Backend

Si vous ne comptez qu'évaluer la partie backend, vous n'aurez normalement besoin que de Postman afin d'envoyer des requêtes HTTP et de node pour écrire une commande dans votre terminal.

Pour lancer l'API, rendez vous dans le dossier chickenRun/backend et utilisez la commande `nodemon server`. Si vous n'avez pas nodemon, entrez `node server`.
Allez sur Postman et commencez avec la commande la plus simple, à savoir GET `http://localhost:3000/chicken`.
Cette commande nous affiche la liste de tous les poulets dans la ferme.


Voici la liste de toutes les commandes possibles ainsi que leurs explications:

#### GET

GET `http://localhost:3000/chicken` - Affiche la liste de tous les poulets dans la ferme.
GET `http://localhost:3000/coop` - Affiche tous les poulets dans le poulailler.
GET `http://localhost:3000/farmyard` - Affiche tous les poulets dans la cour de la ferme.
GET `http://localhost:3000/chicken/status` - Affiche des données statistiques sur les poulets (leur nombre, la moyenne des poids, la moyenne des pas faits).
GET `http://localhost:3000/coop/status` - Affiche des données statistiques sur les poulets dans le poulailler (leur nombre, les noms des poulets).
GET `http://localhost:3000/farmyard/status` - Affiche des données statistiques sur les poulets dans la cour (leur nombre, les noms des poulets).
GET `http://localhost:3000/chicken/:id` - Affiche un poulet en particulier / `:id` représente son id unique pour l'identifier.

#### POST

POST `http://localhost:3000/chicken` - Permet d'ajouter un nouveau poulet à la ferme. Il faut préciser les caractéritiques du poulets comme:
	-`name`, son nom (obligatoire sinon c'est une erreur)
	-`birthday`, sa date de naissance (optionnelle)
	-`weight`, son poids (obligatoire sinon c'est une erreur)
	-`steps`, le nombre de pas déjà effectués (mis à 0 par défaut si non précisé)
	-`isRunning`, si le poulet est en train de courir ou non (mis à false par défaut si non précisé)
	-`zone`, la zone dans laquelle se trouve le poulet (mise à défaut à 'coop' si 'farmyard' n'est pas précisé ou que la zone entréée n'existe pas)

Voici 3 exemples de fichiers JSON qui correpondent à un body correct pour la commande précédente:

{
    "name": "poupoule",
    "birthday": "2021-08-31",
    "weight": 3,
    "steps": 0,
    "isRunning": false,
    "zone": "coop"
}
(ici tout est précisé)

{
    "name": "poupoule",
    "weight": 3,
    "steps": 10,
    "zone": "farmyard"
}
(ici la valeur `birthday` ne vaudra rien et `isRunning` vaudra false par défaut)

{
    "name": "poupoule",
    "birthday": "2021-08-31",
    "weight": 3,
    "isRunning": true,
    "zone": "farmya"
}
(ici `steps` sera à 0 par défaut et `zone` sera 'coop' par défaut car 'farmya' n'est pas une zone valide)

Voici un exemple non valide de fichier JSON pour la commande précédente:
{
    "name": "poupoule",
    "steps": 0,
    "isRunning": true,
    "zone": "coop"
}
(ici il manque l'attribut `weight` qui est nécessaire pour rendre la commande valide)

#### DELETE

DELETE `http://localhost:3000/chicken/:id` - Retire de la ferme le poulet avec l'id `:id` correspondant.

#### PATCH

PATCH `http://localhost:3000/chicken/run/:id` - Incrémente de 1 la valeur `steps` du poulet avec l'id `:id` correspondant.
PATCH `http://localhost:3000/chicken/:id/goTo/:zone` - Déplace le poulet correpondant à l'id `:id` dans la zone `:zone`.
PATCH `http://localhost:3000/chicken/:id/goRun` - Modifie à true la valeur `isRunning` du poulet avec l'id `:id` correspondant.
PATCH `http://localhost:3000/chicken/:id/stop` - Modifie à false la valeur `isRunning` du poulet avec l'id `:id` correspondant.


### Frontend

Si vous souhaitez évaluer la partie frontend, malheureusement, celle-ci est loin d'être terminée.
Avec un peu plus de temps (et pour l'entraînement) elle le sera, mais pour l'instant il n'y a qu'une page d'accueil avec la liste de tous les poulets dans la ferme, la cour ou le poulailler.