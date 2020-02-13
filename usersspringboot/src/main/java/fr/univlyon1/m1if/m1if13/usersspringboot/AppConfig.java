package fr.univlyon1.m1if.m1if13.usersspringboot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import fr.univlyon1.m1if.m1if13.usersspringboot.DAO.UserDao;

@Configuration
public class AppConfig {
    @Bean
    public UserDao UserDaoService() {
        return new UserDao();
    }
}