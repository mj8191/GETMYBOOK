FROM openjdk:17-jdk-slim
RUN mkdir /app
COPY target/apigateway.jar /app/apigateway.jar
ENTRYPOINT ["java","-jar","/apigateway.jar"]