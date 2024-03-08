FROM postgres:16
COPY . ddocker-entrypoint-initdb.d/
ENV POSTGRES_PASSWORD=myPassword

ENTRYPOINT "/usr/local/bin/docker-entrypoint-initdb.sh"
CMD "postgres"
