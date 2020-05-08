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

 TP3 & TP4 :

 pour lancer le client : npm run serve dans app/client ==> localhost:3000
 pour lancer le serveur : node index.js dans app/server ==> localhost:3376

 deroulement d'une partie : 

 1 - set le perimetre et la cible coté serveur, (ttl si besoin, fixer à 59 par default).
 2- coté client : envoyer ma position au serveur
                  choisir solo ou multi partie
3 - repaseer coté serveur et lancer l'applicon (button coup d'envoi)
4- revenir coté client : la partie sera lancé dans un intervale de 4 secondes depuis le moment du clique sur le coup d'envoie depuis le serveur, 

4- partie fini ? cliquer sur nouvelle partie et rafaire le meme processus qu'avant.
