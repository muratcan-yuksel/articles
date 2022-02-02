## main account
git config --global user.name "muratcan-yuksel"
git config --global user.email "muratcanyukselpro@gmail.com"

## work account
git config --global user.name "muratcandijitalgaraj"
git config --global user.email "muratcan@dijitalgaraj.com"

# shared
git config --global init.defaultBranch main
git config --global color.ui auto

git config --get user.name
git config --get user.email

### create ssh key

ls ~/.ssh/id_rsa.pub

## main account
ssh-keygen -t rsa -C muratcanyukselpro@gmail.com

cat ~/.ssh/id_rsa.pub

## work account
ssh-keygen -t rsa -C muratcan@dijitalgaraj.com