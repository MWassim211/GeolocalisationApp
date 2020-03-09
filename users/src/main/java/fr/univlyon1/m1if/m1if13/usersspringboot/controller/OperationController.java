package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.HashSet;
import java.util.Map;
import java.util.Optional;

import com.auth0.jwt.interfaces.Claim;
//import com.google.common.net.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import fr.univlyon1.m1if.m1if13.usersspringboot.dao.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.helpers.AuthHelper;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.media.Content;

@OpenAPIDefinition(
            info = @Info(
                    title = "TP1 & TP2 Docs",
                    version = "1.0.0",
                    description = "Description de l'API: Api controller && Opearation Controller qui gere le coté ressources utilisateurs (login,logout,authenticate,users...)"
            ))
@CrossOrigin(origins = {"http://localhost:3000" , "http://localhost" , "http://192.168.75.26" , "https://192.168.75.26"})
@RestController
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

    @Operation(summary = "Procédure de login simple d'un utilisateur", 
    description = "Renvoie une ResponseEntity avec le JWT dans le header Authentication si le login s'est bien passé, et le code de statut appropriés",
    tags = {"Operation"},
    operationId = "login",
    responses = {
        @ApiResponse(responseCode = "200", description = "Succesfull operation" , content = {@Content()}),
        @ApiResponse(responseCode = "401", description = "Unauthorized user" , content = {@Content()}),
        @ApiResponse(responseCode = "404", description = "Unauthorized user" , content = {@Content()}),
        })
    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:3000" , "http://localhost" , "http://192.168.75.26" , "https://192.168.75.26"})
    public ResponseEntity<String> login(@RequestParam("login") @Parameter(description = "The username", required = true) String login, @RequestParam("password") @Parameter(description = "The user password", required = true) String password,@RequestHeader("Origin") @Parameter(description = "Origin of the request", required = true)String origin) {
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

    @Operation(summary = "Deconexion de l'utilisateur connecté", 
    description = "Met le status de l'utilisateur en déconnecté",
    tags = {"Operation"},
    operationId = "logout",
    responses = {
        @ApiResponse(responseCode = "204", description = "logout done succesfully" , content = {@Content()}),
        })
    @CrossOrigin(origins = {"http://localhost:3000" , "http://localhost" , "http://192.168.75.26" , "https://192.168.75.26"})
    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody @Parameter(description = "The token", required = true) String token){
        String logoutUser = AuthHelper.logoutUser(token);
        userDao.get(logoutUser).get().disconnect();
        return ResponseEntity.noContent().build();    
    }


    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param token Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */

    @Operation(summary = "validation de l'authentification d'un utilisateur", 
    description = "Verifie le token et l'utilisateur correspondant au token est bien connecté",
    tags = {"Operation"},
    operationId = "authenticate",
    responses = {
        @ApiResponse(responseCode = "204", description = "Authentication done successfuly" , content = {@Content()}),
        @ApiResponse(responseCode = "401", description = "Unauthorized user" , content = {@Content()}),
        @ApiResponse(responseCode = "401", description = "Bad request" , content = {@Content()}),
        })
    @GetMapping("/authenticate")
    @CrossOrigin(origins = {"http://localhost:3000" , "http://localhost" , "http://192.168.75.26" , "https://192.168.75.26"})
    public ResponseEntity<Void> authenticate(@RequestParam("token") String token, @RequestParam("origin") String origin) {
        Map<String, Claim> claims =  AuthHelper.verifyToken(token); 
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
