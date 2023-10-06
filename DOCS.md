# TypeScript API

## Pre-requisites
1. Nodejs
2. CentOS Stream 9 - Use WSL or another Virtualizaton
3. As a temporary alternative, you can check it out at 

## Setup
1. In WSL (or a VM) install Prometheus and Grafana

2. To install Prometheus execute the following commands:
``` shell
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable --now docker
sudo usermod -aG docker <user>
```

3. Create the **prometheus.yml** in **/tmp** with the following content:
``` YAML
global:
  scrape_interval:     15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prototype'
    static_configs:
      - targets: ['192.168.99.100:9101']
      - targets: ['192.168.99.100:9102']
      - targets: ['192.168.99.100:9103']
```

4.