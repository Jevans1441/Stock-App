#!/usr/bin/env bash

set -e
set -x

pytest --cov-config=app/tests/.coveragerc  --cov=app  app/tests "${@}"
