all: docker

.PHONY: all

docker:
	docker build -t saas-provider-dot-cloud:latest .
	docker tag saas-provider-dot-cloud:latest sandaluri/saas-provider-front-end:latest
	docker push sandaluri/saas-provider-front-end:latest
	
