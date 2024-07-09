FROM openjdk:17-jdk-slim
RUN mkdir /app
COPY target/order.jar /app/order.jar
ENTRYPOINT ["java","-jar","/order.jar"]