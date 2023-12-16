#### temporary - test purpose
docker compose -f local.docker-compose.yml --env-file dev.env up --build  


# How to generate service account for Google Storage in appropriate location:
1. gcloud iam service-accounts keys create /home/$USER/docker-to-storage/keyfile.json --iam-account docker-to-storage@foodie-407891.iam.gserviceaccount.com && sudo mv /home/$USER/docker-to-storage /home
