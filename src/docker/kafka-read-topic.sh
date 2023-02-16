#!/bin/bash
docker exec -e KAFKA_OPTS= esbcloud-kafka kafka-console-consumer --bootstrap-server esbcloud-kafka:9092 --from-beginning --topic dev.esbcloud.notification --property print.key=true --property print.headers=true --property print.timestamp=true
