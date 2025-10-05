FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app


COPY pom.xml .
RUN mvn dependency:go-offline -B


COPY src ./src
RUN mvn clean package -DskipTests


FROM eclipse-temurin:17.0.11_9-jre-alpine AS runtime
WORKDIR /app

# Update Alpine packages to fix vulnerabilities
RUN apk update && apk upgrade --available


COPY --from=builder /app/target/*.jar app.jar


RUN addgroup -S spring && adduser -S spring -G spring
USER spring


EXPOSE 8080


ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"


ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]