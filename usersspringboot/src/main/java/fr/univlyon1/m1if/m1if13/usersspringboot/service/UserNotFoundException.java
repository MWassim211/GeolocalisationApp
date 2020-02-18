package fr.univlyon1.m1if.m1if13.usersspringboot.service;


public class UserNotFoundException extends RuntimeException {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public UserNotFoundException(String id) {
        super("Could not find User " + id);
        System.out.println("le super");
    }
}