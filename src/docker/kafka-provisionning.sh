#!/bin/bash
docker exec -e KAFKA_OPTS=  esbcloud-kafka kafka-configs --zookeeper esbcloud-zookeeper:2181 --alter --add-config 'SCRAM-SHA-512=[password=password],SCRAM-SHA-512=[password=password]' --entity-type users --entity-name admin
docker exec -e KAFKA_OPTS=  esbcloud-kafka kafka-topics --zookeeper esbcloud-zookeeper:2181 --create --topic dev.esbcloud.notification --partitions 1 --replication-factor 1
docker exec -e KAFKA_OPTS=  esbcloud-kafka kafka-topics --zookeeper esbcloud-zookeeper:2181 --describe --topic dev.esbcloud.notification
