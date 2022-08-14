docker-build:
	docker build -t browser .

docker-push:
	( \
	docker build --platform=linux/amd64 -t przemekk1385/browser:latest . ;\
	docker push przemekk1385/browser:latest ;\
	)

docker-push-arm64:
	( \
	docker build -t przemekk1385/browser:latest-amr64_v8 . ;\
	docker push przemekk1385/browser:latest-amr64_v8 ;\
	)

docker-run:
	docker run -p 3000:3000 -d browser
