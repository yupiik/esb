#! /usr/bin/env bash

cd ../..
mvn bundlebee:apply@minikube $@
cd - &> /dev/null
