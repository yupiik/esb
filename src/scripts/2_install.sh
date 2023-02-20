#! /usr/bin/env bash

# load base image in minikube
minikube image load "io.yupiik.esbcloud/esbcloud-distribution:1.0.0-SNAPSHOT"
minikube image load "fpapon/activemq:5.17.3"
