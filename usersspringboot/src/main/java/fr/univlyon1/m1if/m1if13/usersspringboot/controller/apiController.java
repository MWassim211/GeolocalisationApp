package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fr.univlyon1.m1if.m1if13.usersspringboot.dao.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import fr.univlyon1.m1if.m1if13.usersspringboot.service.UserCredentialsException;
import fr.univlyon1.m1if.m1if13.usersspringboot.service.UserNotFoundException;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.*;
import io.swagger.v3.oas.annotations.callbacks.*;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.parameters.*;


@OpenAPIDefinition(
            info = @Info(
                    title = "TP1 & TP2",
                    version = "0.0",
                    description = "Api operations"
            ))
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class apiController {

    @Autowired
    UserDao userDao;


    @GetMapping(path = "/users", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Operation(summary = "Rècupérer la liste des utilisateurs", 
                description = "Renvoie les logins des utilisateurs",
                tags = {"groupes"},
                operationId = "users",
                responses = {
                    @ApiResponse(responseCode = "200", description = "Succesfull operation" , content = {@Content(mediaType = "application/json"), @Content(mediaType = "application/xml"),@Content(mediaType = "text/html")}),
                    })
    public Set<String> users() {
        return userDao.getAll();
    }

    @GetMapping(path = "/users", produces = { MediaType.TEXT_HTML })
    public ModelAndView usersView() {
        ModelAndView model = new ModelAndView("index");
        model.addObject("users", userDao.getAll());
        return model;
    }

    @Operation(summary = "Créer un utilisateur", 
                description = "Créer un nouveau utilisateur dans la liste des utilisateurs",
                tags = {"groupes"},
                operationId = "Users",
                responses = {
                    @ApiResponse(responseCode = "201", description = "Utilisateur créer"),
                    @ApiResponse(responseCode = "400", description = "Format de donnée non respecter")
                    })
    @PostMapping(path = "/users", consumes = { MediaType.APPLICATION_FORM_URLENCODED })
    public ResponseEntity<Void> users(@RequestParam("login") @Parameter(description = "The user name that needs to be created", required = true) String login, @RequestParam("password")  @Parameter(description = "The user password", required = true) String password) throws UserCredentialsException {
        if (!login.equals("") && !password.equals("")){
            userDao.save(new User(login, password));
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else {
            throw new UserCredentialsException();
        }
    }


    @PostMapping(path = "/users", consumes = { MediaType.APPLICATION_JSON })
    @Operation(summary = "Créer un utilisateur", 
                description = "Créer un nouveau utilisateur dans la liste des utilisateurs",
                tags = {"groupes"},
                operationId = "UsersJson",
                responses = {
                    @ApiResponse(responseCode = "201", description = "Utilisateur créer"),
                    @ApiResponse(responseCode = "400", description = "Format de donnée non respecter")
                    })
    public ResponseEntity<Void> usersJson(@RequestBody(required = true) String json) {
        User user = new User();
        ObjectMapper mapper = new ObjectMapper();
        try {
            user = mapper.readValue(json, User.class);
            userDao.save(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (JsonMappingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    
    @GetMapping(path = "/users/{login}", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Operation(summary = "Retrouver un utilisateur", 
                description = "Renvoie une representation d'un User",
                tags = {"groupes"},
                operationId = "getUsers",
                responses = {
                    @ApiResponse(responseCode = "200", description = "Succesfull operation" , content = {@Content(mediaType = "application/json"), @Content(mediaType = "application/xml")}),
                    @ApiResponse(responseCode = "404", description = "Utilisateur non trouver")
                    })
    public User getUser(@Parameter(description = "Nom du l'utilisateur", required = true) @PathVariable String login) throws UserNotFoundException {
        if (userDao.get(login).isPresent()) {
            return userDao.get(login).get();
        } else {
            throw new UserNotFoundException(login);
        }
    }

    

    

    @Operation(summary = "Mettre à jour ou crée un utilisateur", 
                description = "Mets à jour l'utilisateur dont le nom est en parametre s'il existe déja ou le créer sinon",
                tags = {"groupes"},
                operationId = "PutUser",
                responses = {
                    @ApiResponse(responseCode = "204", description = "Utilisateur correctement créer ou modifier"),
                    @ApiResponse(responseCode = "400", description = "Pas de parametre accceptable dans la requete  ")
                    })
    @PutMapping(path = "/user/{loginn}", consumes = {MediaType.APPLICATION_FORM_URLENCODED})
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public ResponseEntity<Void> putUser(@RequestParam String login, @RequestParam String password, @PathVariable String loginn)
            throws UserNotFoundException, UserCredentialsException {
        String[] params = new String [2];
        params[0] = login;
        params[1] = password;
        if (userDao.get(loginn).isPresent()) {
            userDao.update(userDao.get(loginn).get(), params);
            return ResponseEntity.noContent().build();
        }else {
            if (!login.equals("") && !password.equals("")){
                userDao.save(new User(login, password));
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }else {
                throw new UserCredentialsException();
            }  
        }
    }


    /*@Operation(summary = "Mettre à jour ou crée un utilisateur", 
                description = "Mets à jour l'utilisateur dont le nom est en parametre s'il existe déja ou le créer sinon",
                tags = {"groupes"},
                operationId = "PutUser",
                responses = {
                    @ApiResponse(responseCode = "204", description = "Utilisateur correctement créer ou modifier"),
                    @ApiResponse(responseCode = "400", description = "Pas de parametre acceptable dans la requete")
                    })
    @PutMapping(path = "/user/{login}", consumes = {MediaType.APPLICATION_JSON})
    public ResponseEntity<Void> putUserJson(@PathVariable String login ,@RequestBody String json) {
        User user = new User();
        ObjectMapper mapper = new ObjectMapper();
        try {
            user = mapper.readValue(json, User.class);
        }catch (JsonMappingException e ){
            e.printStackTrace();    
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (JsonProcessingException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);   
        }
        if (userDao.get(login).isPresent()){
            userDao.delete(userDao.get(login).get());
            userDao.save(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {

            userDao.save(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }*/

  
    @Operation(summary = "Supprimer un utilisateur", 
                description = "Supprimer l'utilisateur dont le nom est en parametre ",
                tags = {"groupes"},
                operationId = "DeleteUser",
                responses = {
                    @ApiResponse(responseCode = "204", description = "Utilisateur correctement créer ou modifier"),
                    @ApiResponse(responseCode = "404", description = "Utilisateur non trouver")
                    })
    @DeleteMapping("/user/{login}")
    public ResponseEntity<Void> deleteUser(@PathVariable String login){
        if (userDao.get(login).isPresent()) {
            userDao.delete(userDao.get(login).get());
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();   
        }
    }

}