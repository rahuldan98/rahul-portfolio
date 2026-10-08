# Rahul Dan — Portfolio (React + Vite + Docker + Kubernetes + Argo CD)

## 1. Edit your content
Open `src/data.js`. Replace every `TODO` (bio, projects, experience highlights), set skill levels.

## 2. Run locally (optional)
    npm install
    npm run dev          # http://localhost:5173
(`npm install` also creates package-lock.json - commit it.)

## 3. Build & run with Docker Desktop
    docker build -t rahul-portfolio:1.0.0 .
    docker run -d --name portfolio -p 8081:8080 rahul-portfolio:1.0.0
    # open http://localhost:8081   |   docker ps shows "healthy"

## 4. Push to Docker Hub
    docker login
    docker tag rahul-portfolio:1.0.0 YOUR_DOCKERHUB_USER/rahul-portfolio:1.0.0
    docker push YOUR_DOCKERHUB_USER/rahul-portfolio:1.0.0

## 5. Replace placeholders
- `YOUR_DOCKERHUB_USER` in `k8s/deployment.yaml` and `k8s/kustomization.yaml`
- `yourdomain.com` in `k8s/ingress.yaml`
- `repoURL` in `argocd/application.yaml`

## 6. Deploy with Argo CD
1. Push this whole project to your Git repo (GitHub), branch `main`.
2. Make sure Argo CD and an nginx ingress controller are installed in the cluster.
3. Apply the Application:

       kubectl apply -f argocd/application.yaml

   (If the repo is private, add it first in Argo CD: Settings > Repositories.)
4. Watch it sync:

       kubectl get applications -n argocd
       kubectl get all,ingress -n portfolio

## 7. Release a new version (GitOps flow)
    docker build -t YOUR_DOCKERHUB_USER/rahul-portfolio:1.0.1 .
    docker push YOUR_DOCKERHUB_USER/rahul-portfolio:1.0.1
    # edit newTag in k8s/kustomization.yaml -> "1.0.1", then:
    git commit -am "release 1.0.1" && git push
Argo CD syncs automatically. Roll back with `git revert` (or the Argo CD UI History > Rollback; with auto-sync on, disable it first).

## Optional
- TLS: install cert-manager, apply `k8s/optional/clusterissuer.yaml`.
- No ingress? Use `k8s/optional/service-loadbalancer.yaml`, or skip the cluster and use port-forward:
      kubectl port-forward svc/rahul-portfolio 8080:80 -n portfolio
- Docker Desktop's built-in Kubernetes works for testing; to use a local image without pushing,
  skip Docker Hub, set `imagePullPolicy: Never` and the local image name in the deployment.
- OpenShift: remove `runAsUser: 101` from deployment.yaml.
