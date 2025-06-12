up:
	docker compose pull
	docker compose build
	COMPOSE_PROFILES=dev docker compose up -d

stop:
	COMPOSE_PROFILES=dev docker compose stop

down:
	COMPOSE_PROFILES=dev docker compose down

aidbox:
	docker compose up --build -d aidbox
