# Domain Mention Twitter Bot

Search domain name mentions across twitter.

## Setup

Add `.env` file (these credentials are not real, but preserve the actual format):

```sh
TWITTER_CONSUMER_KEY=ppr4YnaPS33lryG3bSY3quRzJ
TWITTER_CONSUMER_SECRET=ugKldX6jde3FxIObZpewSHtFkd347OHf1Hp5rcf31m34Vk64rl
TWITTER_ACCESS_TOKEN=1713520596-ynQ7kKGcnZKAlodMLLWUhUNa4pS274OYsSO235o
TWITTER_ACCESS_TOKEN_SECRET=4fhlkQnSpUrQq7ZpcT3OBD0gSyNkMS8oprHyFAdVpwoeY

FIREBASE_API_KEY=AIucwoCtT1cN7VndpSF2jQgGpM3o-cplZvOOjnM
FIREBASE_AUTH_DOMAIN=example.firebaseapp.com
FIREBASE_DATABASE_URL=https://example.firebaseio.com
FIREBASE_PROJECT_ID=example
FIREBASE_STORAGE_BUCKET=example.appspot.com
FIREBASE_MESSAGING_SENDER_ID=345687693302
FIREBASE_APP_ID=1:384557623309:web:acf821f7321f636390d938
FIREBASE_MEASUREMENT_ID=G-WE339SORBL

DOMAIN_NAME=example.com
RECURSION_DEPTH_LIMIT=5
```

Generate [Firebase Admin SDK credentials](https://console.firebase.google.com/u/0/project/iamskok/settings/serviceaccounts/adminsdk) and copy in `./firebase-adminsdk.json`.

## Terraform

- `DO_TOKEN` - Digital Ocean person access token. Can be found in [personal access token section](https://cloud.digitalocean.com/account/api/tokens).
- `DO_SSH_KEY_NAME` - Digital Ocean SSH key name. Can be found in [SSH keys section](https://cloud.digitalocean.com/account/security).
- `DO_SSH_USER` - Digital Ocean SSH username. Defaults to `root`.
- `SSH_PRIVATE_KEY_PATH` - Path to SSH private key on the host machine. E.g `$HOME/.ssh/id_rsa`.

```sh
terraform apply \
  -var "do_token=${DO_TOKEN}" \
  -var "do_ssh_user=${DO_SSH_USER}" \
  -var "do_ssh_key_name=${DO_SSH_KEY_NAME}" \
  -var "ssh_private_key=${SSH_PRIVATE_KEY_PATH}"
```

## Docker Host Configuration

Install ansible playbooks:

```sh
ansible-galaxy install gantsign.oh-my-zsh \
  geerlingguy.docker
```

*Ansible playbook gets executed by Terraform's `local-exec` provisioner*

Manual run of docker host playbook:

```sh
ansible-playbook -i <ip-address>, provision.yml -u root
```

## Github Action Secrets

* `DOCKERHUB_TOKEN` (generate [your token](https://hub.docker.com/settings/security))
* `DOCKERHUB_USERNAME`
* `HOST` (becomes available after running terraform script)
* `KEY` (private SSH key)
* `PORT` (by default it's `22`)
* `USERNAME` (by default Digital Ocean sets it to `root`)
* All environment variables from `.env` file.

## DB export

1. Use `FIREBASE_STORAGE_BUCKET` variable in `gcloud firestore export`
2. Get firebase service account credentials - https://console.firebase.google.com/u/0/project/{FIREBASE_PROJECT_ID}/settings/serviceaccounts/adminsdk
3. Install `firestore-export` package to convert DB in `json`.

```sh
gcloud firestore export gs://example.appspot.com
npm install -g node-firestore-import-export
firestore-export --accountCredentials firebase-adminsdk.json --backupFile myDatabase.json
```

Alternatively navigate to [Google Cloud Storage](https://console.cloud.google.com/storage/).

## Useful links

- [Could not load the default credentials](https://stackoverflow.com/a/42059661/3614631)
