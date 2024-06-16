# PROCREATE

## TIPS

- gcloud builds submit --config=cloudbuild.yaml --project procreate-426616 .

- gcloud artifacts repositories create procreate --repository-format docker --project procreate-426616 --location us-central1

- gcloud config set project procreate-426616

- gcloud builds submit --config=cloudbuild.yaml --project procreate-426616 .

- gcloud run services replace service.yaml --region us-east1

- touch gcr-service-policy.yaml

- gcloud run services set-iam-policy procreate-service gcr-service-policy.yaml --region us-east1
