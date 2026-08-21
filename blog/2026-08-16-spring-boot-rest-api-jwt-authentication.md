---
slug: spring-boot-rest-api-jwt-authentication
title: Spring Boot REST API JWT Authentication dengan PostgreSQL
authors: topekox
tags: [springboot, rest api, jwt]
---

Pada materi ini kita akan membuat aplikasi **REST API Authentication** menggunakan:

- Spring Boot
- Spring Security
- JSON Web Token (JWT)
- PostgreSQL
- Spring Data JPA
- Maven
- BCrypt
- Jakarta Validation

<!-- truncate -->

Aplikasi yang akan dibuat memiliki fitur:

- Registrasi pengguna
- Login pengguna
- Password hashing menggunakan BCrypt
- Generate JWT
- Validasi JWT
- Authentication menggunakan Spring Security
- Authorization berdasarkan role
- Endpoint public
- Endpoint yang membutuhkan authentication
- Endpoint khusus administrator
- PostgreSQL sebagai database
- Global exception handler
- Validasi request

---

## 1. Arsitektur Aplikasi

Secara sederhana, alur aplikasi yang akan kita buat adalah:

```text
                        CLIENT
                           |
                           |
                    POST /api/auth/login
                           |
                           v
                  +-------------------+
                  |  AuthController   |
                  +-------------------+
                           |
                           v
                  +-------------------+
                  |    AuthService    |
                  +-------------------+
                           |
                           v
                  +-------------------+
                  | UserRepository    |
                  +-------------------+
                           |
                           v
                    PostgreSQL
                           |
                           |
                    User ditemukan
                           |
                           v
                  Password Verification
                           |
                           v
                     JWT Service
                           |
                           v
                    Generate JWT
                           |
                           v
                       CLIENT
                           |
                     Bearer Token
                           |
                           v
                  JwtAuthenticationFilter
                           |
                           v
                    Validate JWT
                           |
                           v
                  SecurityContext
                           |
                           v
                      Controller
```

---

## 2. Apa Itu JWT?

**JWT (JSON Web Token)** adalah standar untuk membawa informasi atau klaim antar pihak dalam bentuk token yang dapat diverifikasi.

JWT biasanya digunakan untuk authentication pada REST API.

Contohnya setelah melakukan login:

```text
POST /api/auth/login
```

Server memberikan response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Client kemudian menggunakan token tersebut ketika mengakses endpoint yang membutuhkan authentication.

Contohnya:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## 3. Struktur JWT

JWT secara umum memiliki tiga bagian:

```text
HEADER.PAYLOAD.SIGNATURE
```

Contoh:

```text
eyJhbGciOiJIUzI1NiJ9
.
eyJzdWIiOiJhZG1pbiJ9
.
signature
```

Ketiga bagian tersebut adalah:

1. Header
2. Payload
3. Signature

---

## 4. Header JWT

Header biasanya berisi informasi algoritma dan tipe token.

Contohnya:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

`alg` menunjukkan algoritma yang digunakan untuk menandatangani token.

Pada contoh ini digunakan:

```text
HS256
```

---

## 5. Payload JWT

Payload berisi claims.

Contohnya:

```json
{
  "sub": "admin",
  "iat": 1750000000,
  "exp": 1750086400
}
```

Beberapa claim yang umum digunakan:

| Claim | Keterangan |
|---|---|
| `sub` | Subject atau identitas pengguna |
| `iat` | Issued At |
| `exp` | Expiration Time |
| `iss` | Issuer |
| `aud` | Audience |

Jangan menyimpan informasi rahasia seperti password di dalam payload JWT.

JWT dapat didecode oleh client.

---

## 6. Signature JWT

Signature digunakan untuk memastikan token tidak dimodifikasi.

Secara sederhana:

```text
Signature = Hash(
    Header + Payload + Secret Key
)
```

Jika payload diubah, signature tidak akan cocok dengan signature yang dihasilkan server.

---

## 7. Teknologi yang Digunakan

Project ini menggunakan:

| Teknologi | Fungsi |
|---|---|
| Java 21+ | Bahasa pemrograman |
| Spring Boot | Framework aplikasi |
| Spring Web | Membuat REST API |
| Spring Security | Authentication dan Authorization |
| Spring Data JPA | Database access |
| PostgreSQL | Database |
| JWT | Authentication token |
| BCrypt | Password hashing |
| Maven | Dependency management |
| Lombok | Mengurangi boilerplate code |
| Validation | Validasi request |

---

## 8. Membuat Project Spring Boot

Project dapat dibuat menggunakan Spring Initializr.

Dependency yang diperlukan:

```text
Spring Web
Spring Security
Spring Data JPA
PostgreSQL Driver
Validation
Lombok
```

Tambahkan dependency JWT secara manual pada `pom.xml`.

---

## 9. Struktur Project

Struktur project yang digunakan:

```text
springboot-jwt-postgres
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.springjwt
│   │   │       │
│   │   │       ├── config
│   │   │       │   ├── ApplicationConfig.java
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   ├── JwtService.java
│   │   │       │   └── SecurityConfig.java
│   │   │       │
│   │   │       ├── controller
│   │   │       │   ├── AuthController.java
│   │   │       │   └── UserController.java
│   │   │       │
│   │   │       ├── dto
│   │   │       │   ├── LoginRequest.java
│   │   │       │   ├── RegisterRequest.java
│   │   │       │   ├── JwtResponse.java
│   │   │       │   └── UserResponse.java
│   │   │       │
│   │   │       ├── entity
│   │   │       │   ├── User.java
│   │   │       │   └── Role.java
│   │   │       │
│   │   │       ├── repository
│   │   │       │   └── UserRepository.java
│   │   │       │
│   │   │       ├── service
│   │   │       │   ├── AuthService.java
│   │   │       │   └── CustomUserDetailsService.java
│   │   │       │
│   │   │       └── SpringbootJwtApplication.java
│   │   │
│   │   └── resources
│   │       └── application.yml
│   │
│   └── test
│
└── pom.xml
```

---

## 10. Konfigurasi Database PostgreSQL

Buat database:

```sql
CREATE DATABASE springjwt;
```

Kemudian konfigurasi database pada:

```text
src/main/resources/application.yml
```

Contoh:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/springjwt
    username: postgres
    password: postgres

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

jwt:
  secret: 1234567890123456789012345678901234567890123456789012345678901234
  expiration: 86400000
```

Untuk production, jangan menyimpan username, password database, dan JWT secret secara langsung di dalam source code.

Gunakan environment variable atau secret management.

---

## 11. Dependency JWT

Tambahkan dependency JWT pada `pom.xml`:

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.7</version>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.7</version>
    <scope>runtime</scope>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.7</version>
    <scope>runtime</scope>
</dependency>
```

---

## 12. Entity User

Buat entity `User`:

```java
package com.example.springjwt.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
```

---

## 13. Entity Role

Buat enum:

```java
package com.example.springjwt.entity;

public enum Role {

    USER,
    ADMIN
}
```

Role disimpan sebagai string pada database.

Contohnya:

```text
USER
ADMIN
```

Hal ini lebih mudah dibaca dibandingkan menyimpan ordinal:

```text
0
1
```

---

## 14. UserRepository

Buat repository:

```java
package com.example.springjwt.repository;

import com.example.springjwt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
```

Repository digunakan untuk berkomunikasi dengan database melalui Spring Data JPA.

---

## 15. DTO RegisterRequest

Jangan langsung menggunakan entity sebagai request API.

Buat DTO:

```java
package com.example.springjwt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 4, max = 50)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;
}
```

DTO membantu memisahkan struktur request API dari entity database.

---

## 16. DTO LoginRequest

Buat:

```java
package com.example.springjwt.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
```

---

## 17. DTO JwtResponse

Buat:

```java
package com.example.springjwt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

    private String token;
}
```

Response login akan menghasilkan:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## 18. DTO UserResponse

Buat DTO untuk response user:

```java
package com.example.springjwt.dto;

import com.example.springjwt.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String username;
    private String email;
    private Role role;
}
```

Password tidak dimasukkan ke dalam response.

---

## 19. CustomUserDetailsService

Spring Security membutuhkan `UserDetailsService` untuk mengambil informasi user dari database.

Buat:

```java
package com.example.springjwt.service;

import com.example.springjwt.entity.User;
import com.example.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User tidak ditemukan"
                        )
                );

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        )
                )
        );
    }
}
```

---

## 20. Password Encoder

Password tidak boleh disimpan dalam bentuk plaintext.

Contoh yang salah:

```text
admin123
```

Password harus di-hash menggunakan BCrypt.

Contohnya:

```text
$2a$10$....
```

Buat bean:

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

---

## 21. ApplicationConfig

Buat file:

```text
ApplicationConfig.java
```

Contoh:

```java
package com.example.springjwt.config;

import com.example.springjwt.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final CustomUserDetailsService userDetailsService;

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }
}
```

---

## 22. JwtService

`JwtService` bertanggung jawab untuk membuat dan memvalidasi JWT.

```java
package com.example.springjwt.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver
    ) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return resolver.apply(claims);
    }

    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        ).before(new Date());
    }
}
```

---

## 23. JWT Authentication Filter

Filter bertugas mengambil token dari request.

Token biasanya dikirim melalui:

```http
Authorization: Bearer <token>
```

Buat:

```java
package com.example.springjwt.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        final String jwt =
                authHeader.substring(7);

        final String username;

        try {

            username = jwtService.extractUsername(jwt);

        } catch (Exception e) {

            filterChain.doFilter(request, response);
            return;
        }

        if (username != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(username);

            if (jwtService.isTokenValid(
                    jwt,
                    userDetails
            )) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

---

## 24. SecurityConfig

Konfigurasi Spring Security:

```java
package com.example.springjwt.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authenticationProvider(
                authenticationProvider
            )

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()

                .anyRequest()
                .authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
```

---

## 25. Mengapa Session Stateless?

REST API menggunakan JWT biasanya dibuat stateless.

Artinya server tidak menyimpan session login seperti aplikasi berbasis session tradisional.

Client membawa token pada setiap request.

Contohnya:

```http
GET /api/users/profile
Authorization: Bearer eyJhbGciOi...
```

Server memvalidasi token tersebut.

---

## 26. AuthService

Service untuk register dan login:

```java
package com.example.springjwt.service;

import com.example.springjwt.config.JwtService;
import com.example.springjwt.dto.JwtResponse;
import com.example.springjwt.dto.LoginRequest;
import com.example.springjwt.dto.RegisterRequest;
import com.example.springjwt.entity.Role;
import com.example.springjwt.entity.User;
import com.example.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        if (userRepository.existsByUsername(
                request.getUsername()
        )) {
            throw new RuntimeException(
                    "Username sudah digunakan"
            );
        }

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {
            throw new RuntimeException(
                    "Email sudah digunakan"
            );
        }

        User user = User.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    public JwtResponse login(
            LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );

        String token =
                jwtService.generateToken(userDetails);

        return new JwtResponse(token);
    }
}
```

---

## 27. AuthController

Buat controller:

```java
package com.example.springjwt.controller;

import com.example.springjwt.dto.JwtResponse;
import com.example.springjwt.dto.LoginRequest;
import com.example.springjwt.dto.RegisterRequest;
import com.example.springjwt.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        authService.register(request);

        return ResponseEntity.ok(
                "Register berhasil"
        );
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}
```

---

## 28. Endpoint Register

Endpoint:

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Administrator",
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "admin12345"
}
```

Response:

```text
Register berhasil
```

Database akan menyimpan password dalam bentuk hash BCrypt.

Contohnya:

```text
$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Bukan:

```text
admin12345
```

---

## 29. Endpoint Login

Endpoint:

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "admin12345"
}
```

Server akan:

```text
Username
    |
    v
Database
    |
    v
User ditemukan
    |
    v
Password Verification
    |
    v
AuthenticationManager
    |
    v
Generate JWT
    |
    v
Response
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## 30. UserController

Buat controller untuk endpoint user:

```java
package com.example.springjwt.controller;

import com.example.springjwt.dto.UserResponse;
import com.example.springjwt.entity.User;
import com.example.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public UserResponse profile(
            Authentication authentication
    ) {

        User user = userRepository
                .findByUsername(
                        authentication.getName()
                )
                .orElseThrow();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @GetMapping
    public List<UserResponse> users() {

        return userRepository.findAll()
                .stream()
                .map(user ->
                        UserResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build()
                )
                .toList();
    }
}
```

---

## 31. Endpoint Profile

Endpoint:

```http
GET /api/users/profile
```

Endpoint ini membutuhkan JWT.

Request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

Response:

```json
{
  "id": 1,
  "name": "Administrator",
  "username": "admin",
  "email": "admin@gmail.com",
  "role": "USER"
}
```

Password tidak pernah dikembalikan.

---

## 32. Authorization Berdasarkan Role

Authentication dan authorization adalah dua hal yang berbeda.

### Authentication

Menjawab:

```text
Siapa pengguna ini?
```

Contohnya:

```text
admin
```

### Authorization

Menjawab:

```text
Apa yang boleh dilakukan pengguna ini?
```

Contohnya:

```text
ADMIN
USER
```

---

## 33. Endpoint Khusus ADMIN

Kita dapat menggunakan:

```java
@PreAuthorize("hasRole('ADMIN')")
```

Contohnya:

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin")
public String admin() {

    return "Halaman administrator";
}
```

User biasa tidak dapat mengakses endpoint tersebut.

---

## 34. Mengaktifkan Method Security

Pada `SecurityConfig`:

```java
@EnableMethodSecurity
```

Contoh lengkap:

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
}
```

Dengan demikian annotation seperti:

```java
@PreAuthorize("hasRole('ADMIN')")
```

dapat digunakan.

---

## 35. Role ADMIN

Saat register, kita sebaiknya tidak membiarkan client menentukan role.

Contoh yang tidak disarankan:

```json
{
  "name": "User",
  "username": "user",
  "email": "user@gmail.com",
  "password": "password123",
  "role": "ADMIN"
}
```

Hal ini berbahaya karena user dapat membuat dirinya sendiri menjadi administrator.

Lebih aman menentukan role secara server-side:

```java
.role(Role.USER)
```

Jika ingin membuat administrator, lakukan melalui proses administratif khusus.

---

## 36. Testing dengan Postman

Urutan testing:

```text
1. Register
2. Login
3. Copy JWT
4. Akses profile
5. Akses endpoint protected
6. Test role authorization
```

---

## 37. Test Register

Request:

```http
POST http://localhost:8080/api/auth/register
```

Header:

```http
Content-Type: application/json
```

Body:

```json
{
  "name": "Ucup",
  "username": "ucup",
  "email": "ucup@gmail.com",
  "password": "password123"
}
```

---

## 38. Test Login

Request:

```http
POST http://localhost:8080/api/auth/login
```

Body:

```json
{
  "username": "ucup",
  "password": "password123"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Copy nilai `token`.

---

## 39. Test Profile

Request:

```http
GET http://localhost:8080/api/users/profile
```

Tambahkan header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

Jika token valid, server memberikan response user.

---

## 40. Apa yang Terjadi Ketika Token Tidak Dikirim?

Misalnya:

```http
GET /api/users/profile
```

tanpa:

```http
Authorization: Bearer <token>
```

Maka request tidak memiliki authentication.

Spring Security akan menolak request tersebut.

---

## 41. Apa yang Terjadi Jika Token Expired?

JWT memiliki expiration time.

Contohnya:

```yaml
jwt:
  expiration: 86400000
```

Nilai tersebut adalah:

```text
86.400.000 ms
```

atau:

```text
24 jam
```

Setelah token expired, client harus melakukan authentication kembali atau menggunakan mekanisme refresh token jika sistem menggunakan refresh token.

---

## 42. Access Token dan Refresh Token

Untuk aplikasi yang lebih serius, authentication dapat menggunakan dua jenis token:

```text
Access Token
      |
      |-- Umur pendek
      |
      +----> digunakan untuk API


Refresh Token
      |
      |-- Umur lebih panjang
      |
      +----> digunakan mendapatkan Access Token baru
```

Contohnya:

```text
Access Token  = 15 menit
Refresh Token = 7 hari
```

Pendekatan ini lebih baik daripada menggunakan access token yang memiliki masa berlaku sangat panjang.

---

## 43. Keamanan Password

Password tidak boleh disimpan seperti:

```text
password123
```

Gunakan:

```java
passwordEncoder.encode(password)
```

Saat login, Spring Security akan membandingkan password menggunakan:

```java
passwordEncoder.matches(
    rawPassword,
    encodedPassword
)
```

---

## 44. Hashing Bukan Encryption

Penting memahami perbedaannya.

### Hashing

Hashing bersifat satu arah.

```text
Password
    |
    v
Hash
```

Hash tidak seharusnya dapat dikembalikan menjadi password asli.

Contoh:

```text
BCrypt
Argon2
PBKDF2
```

### Encryption

Encryption bersifat dua arah.

```text
Plaintext
    |
    v
Encryption
    |
    v
Ciphertext
    |
    v
Decryption
    |
    v
Plaintext
```

Untuk penyimpanan password, gunakan password hashing seperti BCrypt atau Argon2, bukan encryption biasa.

---

## 45. Jangan Menyimpan JWT Secret di Git

Contoh yang tidak baik:

```yaml
jwt:
  secret: my-secret-production-123456
```

Kemudian file tersebut di-upload ke GitHub.

Lebih baik:

```yaml
jwt:
  secret: ${JWT_SECRET}
```

Kemudian environment variable:

```text
JWT_SECRET=your-long-random-secret
```

Untuk production, gunakan secret manager atau mekanisme secret management yang sesuai dengan infrastructure yang digunakan.

---

## 46. Endpoint API

Setelah selesai, aplikasi memiliki endpoint:

| Method | Endpoint | Authentication | Keterangan |
|---|---|---|---|
| POST | `/api/auth/register` | Tidak | Registrasi |
| POST | `/api/auth/login` | Tidak | Login |
| GET | `/api/users/profile` | Ya | Profile |
| GET | `/api/users` | Ya | Daftar user |
| GET | `/api/users/admin` | ADMIN | Endpoint administrator |

---

## 47. Alur Register

```text
Client
   |
   | POST /api/auth/register
   |
   v
AuthController
   |
   v
AuthService
   |
   +--> Validasi username
   |
   +--> Validasi email
   |
   +--> Hash password
   |
   v
UserRepository
   |
   v
PostgreSQL
```

---

## 48. Alur Login

```text
Client
   |
   | username + password
   v
AuthController
   |
   v
AuthService
   |
   v
AuthenticationManager
   |
   v
UserDetailsService
   |
   v
PostgreSQL
   |
   v
Password Verification
   |
   v
JwtService
   |
   v
JWT
   |
   v
Client
```

---

## 49. Alur Request dengan JWT

```text
Client
   |
   | Authorization: Bearer JWT
   v
JwtAuthenticationFilter
   |
   v
Extract JWT
   |
   v
Validate Signature
   |
   v
Check Expiration
   |
   v
Load User
   |
   v
SecurityContext
   |
   v
Controller
```

---

## 50. Stateless Authentication

Dengan JWT, server tidak perlu menyimpan session authentication untuk setiap client.

Contohnya:

```text
Client A
   |
   +---- JWT A
   |
   v
API Server


Client B
   |
   +---- JWT B
   |
   v
API Server
```

Setiap request membawa credential dalam bentuk token.

---

## 51. Keuntungan JWT

Beberapa keuntungan penggunaan JWT:

- Cocok untuk REST API
- Stateless
- Mudah digunakan oleh frontend
- Cocok untuk mobile application
- Dapat digunakan lintas service
- Tidak membutuhkan session server tradisional
- Mudah diintegrasikan dengan Spring Security

---

## 52. Kekurangan JWT

JWT juga memiliki beberapa kekurangan.

### Token sulit dicabut

Jika JWT masih valid, token dapat digunakan sampai expiration.

Karena itu sistem production sering menggunakan:

```text
Short-lived Access Token
+
Refresh Token
```

### Ukuran token

JWT dapat lebih besar dibanding session ID.

### Secret harus dijaga

Jika secret key bocor, attacker dapat membuat token yang valid untuk algoritma symmetric signing yang digunakan.

---

## 53. JWT Tidak Sama dengan Encryption

Hal yang sangat penting:

```text
JWT != Encryption
```

Payload JWT umumnya dapat dibaca oleh pihak yang memiliki token.

Jadi jangan menyimpan:

```json
{
  "password": "password123"
}
```

di dalam JWT.

JWT sebaiknya hanya menyimpan informasi yang diperlukan.

Contohnya:

```json
{
  "sub": "ucup",
  "role": "USER",
  "iat": 1750000000,
  "exp": 1750086400
}
```

---

## 54. Error Handling

Aplikasi REST API sebaiknya memiliki response error yang konsisten.

Contohnya:

```json
{
  "status": 400,
  "message": "Username sudah digunakan",
  "timestamp": "2026-08-16T19:00:00"
}
```

Daripada mengembalikan:

```text
java.lang.RuntimeException
```

secara langsung.

---

## 55. Global Exception Handler

Buat:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(
            RuntimeException exception
    ) {

        return ResponseEntity
                .badRequest()
                .body(
                    Map.of(
                        "message",
                        exception.getMessage()
                    )
                );
    }
}
```

Untuk aplikasi production, exception handler sebaiknya dibuat lebih spesifik untuk masing-masing kategori error.

---

## 56. Validasi Request

Gunakan:

```java
@Valid
```

Contohnya:

```java
@PostMapping("/register")
public ResponseEntity<?> register(
        @Valid @RequestBody RegisterRequest request
) {
    ...
}
```

Kemudian DTO:

```java
@NotBlank
private String username;
```

dan:

```java
@Size(min = 8)
private String password;
```

Dengan demikian input yang tidak valid dapat ditolak sebelum diproses lebih lanjut.

---

## 57. Pengujian dengan cURL

Register:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ucup",
    "username": "ucup",
    "email": "ucup@gmail.com",
    "password": "password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ucup",
    "password": "password123"
  }'
```

Profile:

```bash
curl http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 58. Pengembangan dengan Docker

Aplikasi ini juga dapat dikembangkan menggunakan Docker.

Arsitekturnya:

```text
                    Docker Compose
                         |
             +-----------+-----------+
             |                       |
             v                       v
      Spring Boot API          PostgreSQL
       Container                Container
             |                       |
             +-----------+-----------+
                         |
                      Network
```

Contoh service:

```yaml
services:

  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: springjwt
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

---

## 59. Rekomendasi untuk Production

Untuk aplikasi production, beberapa hal perlu diperhatikan.

### Gunakan HTTPS

Jangan mengirim JWT melalui koneksi HTTP biasa.

Gunakan:

```text
HTTPS
```

sehingga token tidak mudah disadap ketika berada dalam perjalanan.

### Gunakan Secret yang kuat

Jangan menggunakan:

```text
secret123
```

Gunakan random secret dengan panjang yang memadai.

### Jangan menyimpan password plaintext

Selalu gunakan password hashing.

### Jangan menyimpan JWT secret di repository

Gunakan environment variable atau secret manager.

### Gunakan Access Token dengan lifetime pendek

Contohnya:

```text
15 menit
```

dan gunakan refresh token jika diperlukan.

### Jangan memasukkan data sensitif ke JWT

JWT bukan tempat untuk menyimpan password atau data rahasia.

---

## 60. Arsitektur Akhir

Secara keseluruhan aplikasi dapat digambarkan:

```text
                         CLIENT
                            |
                            |
                    REST API Request
                            |
                            v
                 +----------------------+
                 |   Spring Security    |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 | JWT Authentication   |
                 |       Filter         |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 |   SecurityContext    |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 |     Controller       |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 |       Service        |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 |      Repository      |
                 +----------------------+
                            |
                            v
                 +----------------------+
                 |     PostgreSQL       |
                 +----------------------+
```

---

## 61. Ringkasan

Pada materi ini kita telah membuat REST API menggunakan Spring Boot dengan authentication berbasis JWT.

Komponen utama yang digunakan:

```text
Spring Boot
    |
    +-- Spring Web
    |
    +-- Spring Security
    |
    +-- Spring Data JPA
    |
    +-- JWT
    |
    +-- BCrypt
    |
    +-- PostgreSQL
```

Alur authentication:

```text
REGISTER
   |
   v
Password
   |
   v
BCrypt Hash
   |
   v
PostgreSQL
```

Kemudian:

```text
LOGIN
   |
   v
Username + Password
   |
   v
AuthenticationManager
   |
   v
Password Verification
   |
   v
JWT Generation
   |
   v
Client
```

Ketika mengakses API:

```text
Client
   |
   | Bearer JWT
   v
JWT Filter
   |
   v
Validate JWT
   |
   v
SecurityContext
   |
   v
Protected API
```

---

## 62. Pengembangan Selanjutnya

Setelah memahami authentication JWT dasar, aplikasi dapat dikembangkan menjadi sistem yang lebih lengkap dengan fitur:

- Refresh Token
- Logout dan token revocation
- Role-Based Access Control
- Permission-Based Access Control
- Swagger/OpenAPI
- Flyway
- Database migration
- Audit log
- Pagination
- Sorting
- Filtering
- Global exception handling
- Unit testing
- Integration testing
- Testcontainers
- Docker
- Docker Compose
- HTTPS
- Rate limiting
- CORS configuration
- Security headers
- OAuth2
- OpenID Connect

Dengan mempelajari tahapan tersebut, kita tidak hanya memahami cara membuat login menggunakan JWT, tetapi juga memahami bagaimana membangun **REST API Spring Boot yang memiliki authentication, authorization, database persistence, dan security architecture yang lebih siap untuk dikembangkan ke lingkungan production**.
