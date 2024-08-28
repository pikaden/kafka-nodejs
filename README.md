# Kafka nodejs

A standard connect to kafka using kafkajs and nodejs

## Requirements
- Node 20.10.0
- Kafka 3.8.0
- Windows 10

## Deployment

To deploy this project run

1. Start zookeeper
```bash
  .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

2. Start kafka
```bash
  .\bin\windows\kafka-server-start.bat .\config\server.properties
```

3. Go back to project
```bash
  npm start
```

## Test with Postman
[image 1](./img/image.png)


## Appendix

This link should help you setup kafka

[kafka setup](https://www.youtube.com/watch?v=BwYFuhVhshI)
