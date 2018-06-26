#!/bin/bash
sam package --template-file generatore.yml --s3-bucket giallo-deployment --output-template-file generatore_o.yaml
