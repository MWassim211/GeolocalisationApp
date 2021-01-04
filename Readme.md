M1IF13-2020
Ce dépôt contient les implementation des TP1 & TP2 de l'UE Web avancé et mobile pour 2019-2020.

Description de l'application
Dans ces TPS , on a réaliser un serveur de gestion des utilisateurs et des tokens de connexion.

TP1 & TP2

 - lien vers le fichier yaml sur le dépot contenant la documentation OpenApi générée :
    https://forge.univ-lyon1.fr/p1808195/mif13-tp1/-/blob/master/users-api.yaml

 - lien vers le Swagger généré par Spring : 
    http://192.168.75.26:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config

 - le répertoire users contient le code de la partie Spring Boot.

 - le répertoire simple-client contient le client.

TP3 : 

 - le code de partie 3 (api/admin) se trouve dans le répertoire app/server
 - l'api est accessible via le lien https://192.168.75.26/api/, elle contient les ressources applicatives de l'application.
 - l'interface d'administration est accesible via le lien : https://192.168.75.26/admin/

   Manipulation de l'interface d'administration :
   ----------------------------------------------
   - une menu de navigation permettant de naviguer sur les options proposées.
      Create user : permets de créer un utilisateur, (serveur tomcat)
      Show Users :  affiche la liste de utilisateur.
      Update user ; permet de modifier le login d'un user.
      Home : affiche la map plus quelques formulaire : 
         -le premier formulaire sert à définir le périmètre du jeu (1KM par défault). en cliquant sur définir un périmetre puis une cliquant sur la map, cette position sera le centre du périmètre.
         - le deuxieme formulaire sert à définir la cible, en cliquant sur définir cible,puis en cliquant n'importe ou sur la map, cette position sera la position de la cible.
         - le troisieme formulaire sert à définir/modifier le ttl, par default est à une minute(valeur entée en secondes).

TP4 :

pour lancer le client : npm run serve dans app/client ==> localhost:3000
pour lancer le serveur : node index.js dans app/server ==> localhost:3376


Deroulement d'une partie : 

      1 - set le perimetre et la cible coté serveur, (ttl si besoin, fixer à 60 secondes par default).
      2- coté client : envoyer ma position au serveur
                        choisir solo ou multi partie.
      3 - repaser coté serveur et lancer l'application (button coup d'envoi)
      4- revenir coté client : la partie sera lancé dans un intervale de 4 secondes depuis le moment du clique sur le coup       d'envoie depuis le serveur, 
      5- à vous de jouer.
      6- partie fini ? cliquer sur nouvelle partie et rafaire le meme processus qu'avant.

TP 6 : 
   installation webmanifest : 
      - Sur votre Téléphone, ouvrez chrome, tapez l'adresse : 192.168.75.26, en haut à doite 3 petits bouton s'affichent, clicker sur ajouter ecran d'acceuil , pour avoir un raccourci d'accès à l'application.
      - clickez sur ce raccourci dans l'acceuil puis connectez vous et lancer la partie comme indiqué dans le processus en haut.
