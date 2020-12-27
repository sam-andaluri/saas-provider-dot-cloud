
kubectl create ns flux
export GHUSER="sam-andaluri"
fluxctl install \
--git-user=${GHUSER} \
--git-email=${GHUSER}@users.noreply.github.com \
--git-url=git@github.com:${GHUSER}/saas-provider-dot-cloud.git \
--git-path=kubernetes \
--namespace=flux | kubectl apply -f -

aws eks describe-cluster --name saas-eks --query "cluster.identity.oidc.issuer" --output text --region us-east-2 
note value after id/

aws iam list-open-id-connect-providers | grep <value from above>

if no output
eksctl utils associate-iam-oidc-provider --cluster saas-eks --region us-east-2 --approve

curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.1.0/docs/install/iam_policy.json

aws iam create-policy \
    --policy-name saas-provider-AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json

note down policy arn "arn:aws:iam::427398298435:policy/saas-provider-AWSLoadBalancerControllerIAMPolicy"


  eksctl create iamserviceaccount \
  --cluster=saas-eks \
  --region=us-east-2 \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::427398298435:policy/saas-provider-AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve
                
eksctl create iamserviceaccount \
--cluster=saas-eks \
--region=us-east-2 \
--namespace=kube-system \
--name=aws-load-balancer-controller \
--attach-policy-arn=arn:aws:iam::427398298435:policy/AWSLoadBalancerControllerIAMPolicy \
--approve

kubectl get deployment -n kube-system alb-ingress-controller
not installed

kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"

helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller \
  --set clusterName=saas-eks \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  -n kube-system

follow this if load balancer is not running

https://github.com/kubernetes-sigs/aws-load-balancer-controller/issues/924

export REGION=us-east-2
export NODE_ROLE_NAME=saas-eks-node-role
export ALB_POLICY_NAME=alb-ingress-controller
export ALB_POLICY_ARN=$(aws iam create-policy --region=$REGION --policy-name $ALB_POLICY_NAME --policy-document "https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/master/docs/examples/iam-policy.json" --query "Policy.Arn" | sed 's/"//g')
aws iam attach-role-policy --region=$REGION --role-name=$NODE_ROLE_NAME --policy-arn=$ALB_POLICY_ARN

https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html



4378  kubectl apply -f https://app.getambassador.io/initializer/yaml/dbf50169-e22f-4c4e-8245-c314fec8fe9b/crds && \\nkubectl wait --for condition=established --timeout=90s crd -lproduct=aes\nkubectl wait --for condition=established --timeout=90s crd -lproduct=aes-prometheus\n
 4379  kubectl wait --for condition=established --timeout=90s crd -lproduct=aes
 4380  kubectl wait --for condition=established --timeout=90s crd -lproduct=aes-prometheus
 4381  kubectl apply -f https://app.getambassador.io/initializer/yaml/dbf50169-e22f-4c4e-8245-c314fec8fe9b/install && \\nkubectl wait -n ambassador deploy -lproduct=aes --for condition=available --timeout=90s\nkubectl wait -n argocd deploy -lapp.kubernetes.io/name=argocd-server --for condition=available --timeout=180s\nkubectl wait -n monitoring deploy -lapp=opentelemetry --for condition=available --timeout=90s
 4382  kubectl get service -n ambassador ambassador \\n    -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'\n
 4383  kubectl apply -f https://app.getambassador.io/initializer/yaml/dbf50169-e22f-4c4e-8245-c314fec8fe9b/configure\n
 4384  kubectl get host -w -n ambassador saas-provider.cloud
 4385  kubectl rollout restart -n ambassador deployment/ambassador