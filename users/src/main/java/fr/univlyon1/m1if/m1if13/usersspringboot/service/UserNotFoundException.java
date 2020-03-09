package fr.univlyon1.m1if.m1if13.usersspringboot.service;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User Not Found")
public class UserNotFoundException extends Exception {
    
    private static final long serialVersionUID = 1L;

    public UserNotFoundException(String id) {
        super("Could not find User " + id);
    }
}


