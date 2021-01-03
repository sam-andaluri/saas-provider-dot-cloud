# Saas Provider and Tenant Onboarding

## Overview

This is an example SaaS provider application. SaaS Provider UI shows different tiers of service that users can purchase. Once a subscription is made, the tenant application would be available at tenant1.saas-tenant.cloud. This example application demonstrates a self-onboarding experience on sign up. The resources are all created in a custom namespace in a EKS cluster.

## CI/CD and GitOps flow

### Trigger : When a change is made to repo

1. CodePipeline triggers a CodeBuild to build a docker image of the UI.
2. Github action triggers and applies kubernetes manifests to the EKS cluster.

### Trigger : When a new tenant signs up

0. All tenants share same deployment and service specs. Based on tenant's tier e.g. free, pro or enterprise, a kustomization is applied on the base specs to set specific resources. 
1. Front-end makes an API call to an API end point to create a tenant.
2. API server uses Github API to make a copy of a templated repo as described above.
3. API server copies the base deployment and service specs.
4. API server generates an ArgoCD Application spec.
5. API server generates a Github action and adds all the above files to repo, commits the change.
6. Github action starts on push, applies ArgoCD application
7. ArgoCD takes kustomized tiered specs and syncs them to Cluster.


