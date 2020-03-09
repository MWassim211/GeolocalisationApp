package fr.univlyon1.m1if.m1if13.usersspringboot.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Login or Password is null")
public class UserCredentialsException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public UserCredentialsException() {
        super("Login and Password must be different than blank");
    }

}