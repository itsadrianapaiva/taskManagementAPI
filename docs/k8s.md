# Kubernetes Deployment Guide

This project provides sample Kubernetes manifests to deploy the Task Management API, MySQL, and Redis to a Kubernetes cluster.
These files are located in the `/k8s` directory.

---

## **Kubernetes Manifests Included:**

| File                     | Purpose                          |
| ------------------------ | -------------------------------- |
| `mysql-deployment.yaml`  | MySQL Deployment + Service       |
| `redis-deployment.yaml`  | Redis Deployment + Service       |
| `api-deployment.yaml`    | Node.js API Deployment + Service |
| `worker-deployment.yaml` | Worker Deployment (BullMQ)       |

---

## **How to Apply Manifests:**

1️. Make sure your Docker images are pushed to Docker Hub.
Update `image:` fields in the YAML with your Docker Hub username.

```yaml
# Example in api-deployment.yaml
image: your-dockerhub-username/task-management-api:latest
```

2️. Run:

```bash
kubectl apply -f ./k8s/mysql-deployment.yaml
kubectl apply -f ./k8s/redis-deployment.yaml
kubectl apply -f ./k8s/api-deployment.yaml
kubectl apply -f ./k8s/worker-deployment.yaml
```

---

## **Accessing the API**

> Depending on your Kubernetes setup (minikube, local k3d, cloud), you may need to expose the API service with a `LoadBalancer` or use `kubectl port-forward`.

Example (local port-forward):

```bash
kubectl port-forward service/api-service 3000:3000
```

Then access at `http://localhost:3000`

---

## **Environment Variables:**

These services rely on `env` variables already defined inside the manifests:

- MySQL: user, password, database
- API: DB connection, Redis host, JWT secret
- Redis: defaults work without changes

---

## **Notes:**

- This setup is minimal for demonstration only.
- For production: secrets management (Kubernetes Secrets), readiness probes, monitoring, persistence volumes should be considered.

---

# Example File Tree for Kubernetes

```
/k8s
  ├── api-deployment.yaml
  ├── mysql-deployment.yaml
  ├── redis-deployment.yaml
  ├── worker-deployment.yaml
/docs
  ├── k8s.md
```
