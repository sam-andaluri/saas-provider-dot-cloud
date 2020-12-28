#!/bin/bash
aws secretsmanager get-secret-value --secret-id "react-auth0-dev" --query SecretString --output text | tr -d "{}\"" | tr ":" "=" | tr "," "\n" > .env
