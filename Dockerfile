FROM ghcr.io/crunchydata/pg_featureserv:latest

# DATABASE_URL is injected at runtime via Render environment variable
ENV DATABASE_URL=""

EXPOSE 9000

CMD ["/app/pg_featureserv"]
