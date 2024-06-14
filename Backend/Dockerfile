# Use Maven base image for the build stage
FROM maven:3.8.6-openjdk-11 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the project source
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Use a minimal base image for the runtime stage
FROM adoptopenjdk:11-jre-hotspot

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Expose the port that your application runs on
EXPOSE 8089

# Command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
