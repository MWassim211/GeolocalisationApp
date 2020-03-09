package main.java.fr.univlyon1.m1if.m1if13.usersspringboot.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class ApiDocConfig  {
    @Bean
    public GroupedOpenApi userOpenApi() {
	String packagesToscan[] = {"fr.univlyon1.m1if.m1if13.usersspringboot.controller"};
	return GroupedOpenApi.builder().setGroup("users").packagesToScan(packagesToscan)
            .build();
            
            SwaggerConfiguration oasConfig = new SwaggerConfiguration()
            .openAPI(oas)
            .prettyPrint(true)
            .filterClass("fully.qualified.SecurityFilter")
            .resourcePackages(Stream.of("my.resources.package")
                    .collect(Collectors.toSet()));
}
}