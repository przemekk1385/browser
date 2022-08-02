docker-build:
	docker build -t browser .

docker-run:
	docker run -p 3000:3000 -d browser
