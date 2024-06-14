# Use an official Maven image with OpenJDK 17 for the build stage
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file and download dependencies
COPY pom.xml .

# Download dependencies without packaging the application
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application (without running tests)
RUN mvn package -DskipTests

# Use an official OpenJDK runtime image for the runtime stage
FROM eclipse-temurin:17-jre

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/target/Backend-0.0.1-SNAPSHOT.jar app.jar

# Specify the command to run the application
CMD ["java", "-jar", "app.jar"]
