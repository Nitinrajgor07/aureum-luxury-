# Aureum Backend — Spring Boot REST API

Java 21 + Spring Boot 3 + JPA + MySQL

## Setup Steps

### 1. MySQL mein database banao
MySQL Workbench open karo aur `src/main/resources/data.sql` run karo.

### 2. Password update karo
`src/main/resources/application.properties` mein apna MySQL password daalo:
```
spring.datasource.password=TERA_PASSWORD
```

### 3. Backend run karo (VS Code terminal mein)
```bash
cd backend
./mvnw spring-boot:run
```

Server start hoga: http://localhost:8080

## API Endpoints

| Method | URL | Kya karta hai |
|--------|-----|---------------|
| GET | /api/products | Saare products |
| GET | /api/products?category=Suits | Category filter |
| GET | /api/products/featured | Featured products |
| GET | /api/products/{id} | Ek product by ID |
| POST | /api/products | Naya product add |
| DELETE | /api/products/{id} | Product delete |

## Test karo (browser mein)
http://localhost:8080/api/products
