package fr.univlyon1.m1if.m1if13.usersspringboot.DAO;

import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import fr.univlyon1.m1if.m1if13.usersspringboot.DAO.Dao;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class UserDao implements Dao<User> {
    private ArrayList<User> users = new ArrayList<User>();

    @Override
    public Optional<User> get(String id){
        for (User user : users){
            if (user.getLogin().equals(id)){
                return Optional.of(user);
            }
        }
        return Optional.empty(); 
    }

    @Override
    public Set<String> getAll() {
        HashSet<String> allUsers = new HashSet<String>();
        for (User user : users) {
            allUsers.add(user.getLogin());
        }
        return allUsers;
    }

    @Override
    public void save(User user) {
        users.add(user);
    }

    @Override
    public void update(User user,String[] params){
        int index = users.indexOf(user);
        users.get(index).setLogin(params[0]);
        users.get(index).setPassword(params[1]);
    }

    @Override
    public void delete(User user) {
        users.remove(user);
    }
}