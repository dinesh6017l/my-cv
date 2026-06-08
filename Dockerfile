FROM golang:1.21-alpine AS builder
RUN apk add --no-cache git
RUN git clone https://github.com/CrunchyData/pg_featureserv.git /src
WORKDIR /src
RUN go build -o pg_featureserv .

FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /src/pg_featureserv /app/pg_featureserv
ENV DATABASE_URL=""
EXPOSE 9000
ENTRYPOINT ["/app/pg_featureserv"]
