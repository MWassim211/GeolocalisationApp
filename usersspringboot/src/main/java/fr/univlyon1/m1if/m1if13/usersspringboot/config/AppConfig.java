package fr.univlyon1.m1if.m1if13.usersspringboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import org.springframework.web.servlet.view.xml.MappingJackson2XmlView;
import org.springframework.http.MediaType;

import fr.univlyon1.m1if.m1if13.usersspringboot.dao.UserDao;

@Configuration
@EnableWebMvc
public class AppConfig  implements WebMvcConfigurer {
    
    @Bean // Methods decorated with a Bean produces a Bean to be managed by the spring container during configuration stage
    public UserDao UserDao() {
        return new UserDao();
    }

    
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
      configurer.defaultContentType(MediaType.APPLICATION_JSON);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.enableContentNegotiation(
            new MappingJackson2XmlView(),new MappingJackson2JsonView()
        );
    }   

    


      
}