#!/usr/bin/env bash
set -e

sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
#sudo chkconfig docker on
sudo systemctl enable --now docker
sudo yum install -y git


sudo curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

git clone https://github.com/raquel-sauras/TFM-Area4-RaquelSauras.git
cd TFM-Area4-RaquelSauras
cd web
docker build . -t web
