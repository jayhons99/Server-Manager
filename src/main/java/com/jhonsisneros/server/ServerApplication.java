package com.jhonsisneros.server;

import com.jhonsisneros.server.enumeration.Status;
import com.jhonsisneros.server.model.Server;
import com.jhonsisneros.server.repository.ServerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepository serverRepository) {
		return args -> {
			serverRepository.save(new Server(
					null,
					"192.168.1.160",
					"Ubuntu",
					"16 GB",
					"PC",
					"http://localhost:8080/server/image/server1.png",
					Status.SERVER_UP)
			);
			serverRepository.save(new Server(
					null,
					"192.168.1.58",
					"Kali",
					"8 GB",
					"Dell Tower",
					"http://localhost:8080/server/image/server1.png",
					Status.SERVER_DOWN)
			);
			serverRepository.save(new Server(
					null,
					"192.168.1.32",
					"Fedora",
					"12 GB",
					"Web Server",
					"http://localhost:8080/server/image/server1.png",
					Status.SERVER_DOWN)
			);
			serverRepository.save(new Server(
					null,
					"192.168.1.121",
					"MS 2008",
					"32 GB",
					"Mail Server",
					"http://localhost:8080/server/image/server1.png",
					Status.SERVER_UP)
			);
		};
	}
}
