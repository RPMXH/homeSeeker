# ./backend/Dockerfile
# --- Production Focused (Multi-Stage Build with Java 21) ---

# Stage 1: Build the application using Maven and JDK 21
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean -T 1C package -DskipTests -Dmaven.test.skip -Dmaven.javadoc.skip=true

# Stage 2: Create the final, minimal image using a JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]