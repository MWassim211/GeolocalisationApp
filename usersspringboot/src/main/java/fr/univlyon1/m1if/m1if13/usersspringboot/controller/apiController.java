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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.media.Content;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class apiController {

    @Autowired
    UserDao userDao;

    
    @ApiOperation(value = "Creates new project", response = User.class)
    @ApiResponses({ @ApiResponse(code = 200, message = "OK")})
    @GetMapping(path = "/users", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Set<String> users() {
        return userDao.getAll();
    }

    @GetMapping(path = "/users", produces = { MediaType.TEXT_HTML })
    public ModelAndView usersView() {
        ModelAndView model = new ModelAndView("index");
        model.addObject("users", userDao.getAll());
        return model;
    }

    @GetMapping(path = "/users/{login}", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public User getUser(@PathVariable String login) throws UserNotFoundException {
        if (userDao.get(login).isPresent()) {
            return userDao.get(login).get();
        } else {
            throw new UserNotFoundException(login);
        }
    }

    

    @PostMapping(path = "/users", consumes = { MediaType.APPLICATION_FORM_URLENCODED })
    public ResponseEntity<Void> users(@RequestParam("login") String login, @RequestParam("password") String password) throws UserCredentialsException {
        if (!login.equals("") && !password.equals("")){
            userDao.save(new User(login, password));
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else {
            throw new UserCredentialsException();
        }
    }
    

    @PostMapping(path = "/users", consumes = { MediaType.APPLICATION_JSON })
    public ResponseEntity<Void> usersJson(@RequestBody String json) {
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

    @PutMapping(path = "/user/{loginn}", consumes = {MediaType.APPLICATION_FORM_URLENCODED})
    public ResponseEntity<Void> putUser(@RequestParam String login, @RequestParam String password, @PathVariable String loginn)
            throws UserNotFoundException {
        String[] params = new String [2];
        params[0] = login;
        params[1] = password;
        if (userDao.get(loginn).isPresent()) {
            userDao.update(userDao.get(loginn).get(), params);
            return ResponseEntity.ok().build();
        }else {
            if (!login.equals("") && !password.equals("")){
                userDao.save(new User(login, password));
                return new ResponseEntity<>(HttpStatus.CREATED);
            }else {
                throw new UserNotFoundException(login);
            }  
        }
    }

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
        }
        userDao.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @DeleteMapping("/user/{login}")
    public ResponseEntity<Void> deleteUser(@PathVariable String login){
        if (userDao.get(login).isPresent()) {
            userDao.delete(userDao.get(login).get());
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();   
        }
    }


}