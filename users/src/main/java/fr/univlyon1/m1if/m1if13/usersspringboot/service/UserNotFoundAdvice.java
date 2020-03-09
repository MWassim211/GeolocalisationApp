package fr.univlyon1.m1if.m1if13.usersspringboot.service;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class UserNotFoundAdvice extends ResponseEntityExceptionHandler{
    
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({UserNotFoundException.class})
    String userNotFoundHandler(UserNotFoundException ex){
        System.out.println("UserNotFoundAdvice.userNotFoundHandler()");
        return ex.getMessage();
    }
}