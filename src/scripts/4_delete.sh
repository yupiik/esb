#! /usr/bin/env bash

cd ../..
mvn bundlebee:delete@minikube $@
cd - &> /dev/null
