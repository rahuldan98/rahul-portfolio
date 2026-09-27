# 🚀 Rahul Dan — Cloud & DevOps Portfolio

A modern, cloud-native personal portfolio website built and deployed using **Docker, Kubernetes, GitHub Actions, Docker Hub, and Argo CD GitOps**.

The project demonstrates an end-to-end CI/CD and GitOps workflow where a simple `git push` automatically builds a new Docker image, updates the Kubernetes deployment, and allows Argo CD to synchronize the latest version to Kubernetes.

---

## 🌐 Portfolio

**Rahul Dan**
Cloud & DevOps Engineer | Kubernetes | AWS | Cloud Native | GitOps

* 🔗 LinkedIn: https://www.linkedin.com/in/rahuldan98/
* 🔗 GitHub: https://github.com/rahuldan98
* 📧 Email: [rahuldan98@gmail.com](mailto:rahuldan98@gmail.com)

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       Developer     │
                    │      Rahul Dan      │
                    └──────────┬──────────┘
                               │
                               │ git push
                               ▼
                    ┌─────────────────────┐
                    │       GitHub        │
                    │   Source Repository │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   GitHub Actions    │
                    │                     │
                    │  Build Docker Image │
                    │  Push Image         │
                    │  Update K8s YAML    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │     Docker Hub      │
                    │                     │
                    │ rahul-portfolio     │
                    │ <commit-sha>        │
                    └─────────────────────┘
                               │
                               │
                    ┌──────────▼──────────┐
                    │       GitHub        │
                    │   Updated Manifest  │
                    │     k8s/            │
                    └──────────┬──────────┘
                               │
                               │ GitOps
                               ▼
                    ┌─────────────────────┐
                    │       Argo CD       │
                    │                     │
                    │ Detect Git Changes  │
                    │ Sync Application    │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │       Kubernetes Cluster       │
              │                                │
              │  ┌──────────────────────────┐  │
              │  │   Portfolio Deployment   │  │
              │  │                          │  │
              │  │      NGINX Container     │  │
              │  └────────────┬─────────────┘  │
              │               │                │
              │        NodePort Service        │
              └───────────────┼────────────────┘
                              │
                              ▼
                       🌐 Portfolio
```

---

# 🛠️ Technology Stack

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| HTML5          | Website structure          |
| CSS3           | Website styling            |
| JavaScript     | Website interactions       |
| NGINX          | Web server                 |
| Docker         | Containerization           |
| Docker Hub     | Container image registry   |
| Kubernetes     | Container orchestration    |
| GitHub         | Source code management     |
| GitHub Actions | CI/CD automation           |
| Argo CD        | GitOps continuous delivery |
| YAML           | Kubernetes configuration   |
| Git            | Version control            |

---

# 📁 Project Structure

```text
rahul-portfolio/
│
├── .github/
│   └── workflows/
│       └── docker-build.yml
│
├── k8s/
│   └── deployment.yaml
│
├── index.html
├── style.css
├── script.js
├── Dockerfile
│
└── README.md
```

---

# 🔄 CI/CD & GitOps Workflow

The project follows a GitOps-based deployment model.

## 1. Developer changes the website

For example:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## 2. GitHub Actions starts automatically

The workflow is triggered whenever code is pushed to the `main` branch.

```yaml
on:
  push:
    branches:
      - main
```

---

## 3. Docker image is built

GitHub Actions builds the website using the Dockerfile.

```text
Dockerfile
    ↓
Docker Build
    ↓
Docker Image
```

---

## 4. Image is pushed to Docker Hub

The workflow pushes two tags:

```text
rahuldan98/rahul-portfolio:<commit-sha>
rahuldan98/rahul-portfolio:latest
```

The commit SHA provides a unique version for every deployment.

Example:

```text
rahuldan98/rahul-portfolio:a81f92c
```

This makes deployments traceable and helps with rollback.

---

## 5. Kubernetes manifest is updated

GitHub Actions updates:

```text
k8s/deployment.yaml
```

with the new image version.

Example:

```yaml
image: rahuldan98/rahul-portfolio:a81f92c
```

The workflow then commits the updated Kubernetes manifest back to GitHub.

---

## 6. Argo CD detects the Git change

Argo CD continuously monitors the Git repository.

When the Kubernetes manifest changes:

```text
Git Repository
      ↓
Argo CD
      ↓
Detect Difference
      ↓
Sync
```

---

## 7. Kubernetes deploys the new version

Argo CD updates the Kubernetes Deployment.

The old Pods are replaced with Pods running the new image.

```bash
kubectl get pods -n rahul-portfolio
```

---

# 🐳 Docker

The application uses NGINX as the web server.

### Dockerfile

```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# ☸️ Kubernetes

The application runs inside a Kubernetes namespace:

```text
rahul-portfolio
```

The Deployment runs multiple replicas for availability.

```yaml
replicas: 2
```

The application is exposed using a Kubernetes `NodePort` Service.

Example:

```text
Service
    ↓
NodePort
    ↓
localhost:30934
```

Access locally:

```text
http://localhost:30934
```

---

# 🔁 GitOps with Argo CD

Argo CD is used as the continuous delivery component.

The desired Kubernetes state is stored in Git.

```text
Git
 │
 │ Desired State
 ▼
Argo CD
 │
 │ Reconciliation
 ▼
Kubernetes
```

This means Kubernetes configuration is version-controlled and changes can be tracked through Git.

---

# 🤖 GitHub Actions

The CI workflow is located at:

```text
.github/workflows/docker-build.yml
```

The pipeline performs:

```text
Checkout
   ↓
Docker Hub Login
   ↓
Docker Build
   ↓
Docker Push
   ↓
Update Kubernetes Manifest
   ↓
Commit Manifest
```

---

# 🔐 GitHub Secrets

Docker Hub credentials are stored securely as GitHub repository secrets.

Required secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Sensitive credentials are never stored directly in the source code.

---

# 📦 Docker Image Versioning

Instead of relying only on `latest`, this project uses Git commit SHA tags.

Example:

```text
rahuldan98/rahul-portfolio:abc123
rahuldan98/rahul-portfolio:def456
rahuldan98/rahul-portfolio:789xyz
```

This provides:

* Version traceability
* Reproducible deployments
* Easier troubleshooting
* Easier rollback
* Clear connection between Git commit and container image

---

# 🔙 Deployment Rollback

Because every deployment uses a unique image tag, previous versions can be identified and restored.

Example:

```text
Current:
rahul-portfolio:def456

Previous:
rahul-portfolio:abc123
```

The Kubernetes manifest can be changed back to the previous image version and Argo CD can synchronize it.

---

# 🧪 Useful Commands

### Check Pods

```bash
kubectl get pods -n rahul-portfolio
```

### Check Deployment

```bash
kubectl get deployment -n rahul-portfolio
```

### Check Service

```bash
kubectl get svc -n rahul-portfolio
```

### Check Argo CD application

```bash
kubectl get applications -n argocd
```

### Check application resources

```bash
kubectl get all -n rahul-portfolio
```

### Check Pod logs

```bash
kubectl logs -n rahul-portfolio <pod-name>
```

---

# 🚀 Deployment Flow

After the initial setup, deploying a website change is simple:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Everything else is automated:

```text
Git Push
   ↓
GitHub Actions
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Kubernetes Manifest Update
   ↓
GitHub
   ↓
Argo CD
   ↓
Kubernetes
   ↓
New Portfolio Version
```

---

# 🎯 What This Project Demonstrates

This project demonstrates practical experience with:

* Kubernetes application deployment
* Docker containerization
* GitHub Actions CI/CD
* Docker image lifecycle
* Docker Hub
* Kubernetes Deployments
* Kubernetes Services
* NodePort
* GitOps
* Argo CD
* Git-based desired state
* Automated deployments
* Container image versioning
* Kubernetes troubleshooting
* CI/CD automation
* Infrastructure and application delivery

---

# 📈 Future Improvements

Potential improvements for the project:

* [ ] NGINX Ingress
* [ ] Custom domain
* [ ] HTTPS with Let's Encrypt
* [ ] Prometheus monitoring
* [ ] Grafana dashboard
* [ ] Loki log aggregation
* [ ] Argo Rollouts
* [ ] Blue/Green deployment
* [ ] Canary deployment
* [ ] Argo CD Image Updater
* [ ] Security scanning with Trivy
* [ ] SBOM generation
* [ ] Terraform infrastructure
* [ ] Production AWS EKS deployment
* [ ] CloudFront + Route 53
* [ ] Automated security scanning in CI

---

# 👨‍💻 About

**Rahul Dan**

Cloud & DevOps Engineer specializing in:

```text
Kubernetes
AWS
Cloud Native
GitOps
Docker
CI/CD
Infrastructure Automation
```

### Connect with me

**LinkedIn:**
https://www.linkedin.com/in/rahuldan98/

**GitHub:**
https://github.com/rahuldan98

**Email:**
[rahuldan98@gmail.com](mailto:rahuldan98@gmail.com)

---

## ⭐ If you find this project useful

Feel free to explore the repository, learn from the implementation, and connect with me on LinkedIn.
