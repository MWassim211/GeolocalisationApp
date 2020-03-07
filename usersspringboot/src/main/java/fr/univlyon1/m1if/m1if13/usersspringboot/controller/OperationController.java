package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

import com.auth0.jwt.interfaces.Claim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import fr.univlyon1.m1if.m1if13.usersspringboot.dao.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.helpers.AuthHelper;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import io.swagger.v3.oas.annotations.Operation;


@Controller
public class OperationController {

    @Autowired
    UserDao userDao;

    /**
     * Procédure de login "simple" d'un utilisateur
     * 
     * @param login    Le login de l'utilisateur. L'utilisateur doit avoir été créé
     *                 préalablement et son login doit être présent dans le DAO.
     * @param password Le password à vérifier.
     * @return Une ResponseEntity avec le JWT dans le header "Authentication" si le
     *         login s'est bien passé, et le code de statut approprié (204, 401 ou
     *         404).
     */

  
    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:3000" , "http://localhost" , "http://192.168.75.26" , "https://192.168.75.26"})
    public ResponseEntity<String> login(@RequestParam("login") String login, @RequestParam("password") String password,@RequestHeader("Origin") String origin) {
        HashSet<String> allUsers = (HashSet<String>) userDao.getAll();
        if (allUsers.contains(login)) {
            Optional<User> opUser = userDao.get(login);
            User user = opUser.get();
            try {
                user.authenticate(password);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Authentication", AuthHelper.createToken(login,origin));
                headers.add("Access-Control-Expose-Headers","Authentication");
                return new ResponseEntity<>(headers, HttpStatus.OK);
            }catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Réalise la déconnexion
     */

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestParam("token") String token){
        String logoutUser = AuthHelper.logoutUser(token);
        System.out.println("user : " + logoutUser);
        userDao.get(logoutUser).get().disconnect();
        return ResponseEntity.noContent().build();    
    }

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param token Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */

    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("token") String token, @RequestParam("origin") String origin) {
        HashMap<String, Claim> claims = (HashMap<String, Claim>) AuthHelper.verifyToken(token); 
        String userlogin = claims.get("login").asString();
        if (!userDao.get(userlogin).isPresent()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } 
        User userAuth = userDao.get(userlogin).get();
        if(claims.get("Origin").asString().equals(origin) && userAuth.isConnected()){
            return ResponseEntity.noContent().build();
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    
}
