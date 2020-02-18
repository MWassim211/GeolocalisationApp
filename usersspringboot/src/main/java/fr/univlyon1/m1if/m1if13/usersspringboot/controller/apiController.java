package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fr.univlyon1.m1if.m1if13.usersspringboot.dao.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;

@RestController
public class apiController {
   
    @Autowired
    UserDao userDao;
    
    @GetMapping(path = "/users", produces = {MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Set<String> users() {
        return userDao.getAll();     
    }

    @GetMapping(path = "/users",produces = {MediaType.TEXT_HTML, MediaType.APPLICATION_JSON})
    public ModelAndView usersView() {
        ModelAndView model = new ModelAndView("index");
        model.addObject("users", userDao.getAll());
        return model;
    }

    @PostMapping("/users")
    @Consumes({"application/json, application/x-www-form-urlencoded"})
    public void users(@RequestParam("login") String login, @RequestParam("password") String password) {
        userDao.save(new User(login,password));
    }

    @PutMapping("/user/{login}")
    public ResponseEntity<Void> putUser(@PathVariable String login){
        if (userDao.get(login).isPresent()) {
            userDao.get(login).get().setLogin(login);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();   
        }
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