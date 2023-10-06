# TypeScript API

## Pre-requisites
1. Nodejs - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
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

4. Create **docker-compose.yml** in **Home** directory with the following contents:
``` YAML
services:
    prometheus:
        image: prom/prometheus
        deploy:
            replicas: 1
        ports:
            - 9090:9090
        volumes:
            - "/tmp/prometheus.yml:/etc/prometheus/prometheus.yml"
    grafana:
        image: grafana/grafana
        depends_on:
            - prometheus
        ports:
            - 3000:3000
        volumes:
            - ./grafana/provisioning/:/etc/grafana/provisioning/
        restart: always
```

5. Create **grafana** directory with **provisioning** sub-directory:
``` shell
mkdir grafana
mkdir grafana/provisionin
```

6. Create **dashboards** and **datasources** sub-directories of **provisioning** directory:
``` shell
mkdir grafana/provisioning/dashboards
mkdir grafana/provisioning/datasources
```

7. Create **dashboard.yml** in the **dashboards** directory:
``` YAML
apiVersion: 1

providers:
- name: 'Prometheus'
  orgId: 1
  folder: ''
  type: file
  disableDeletion: false
  editable: true
  options:
    path: /etc/grafana/provisioning/dashboards
```

8. Create **dashboard.yml** in the **dashboards** directory:
``` YAML
# config file version
apiVersion: 1

# list of datasources that should be deleted from the database
deleteDatasources:
  - name: Prometheus
    orgId: 1

# list of datasources to insert/update depending
# whats available in the database
datasources:
  # <string, required> name of the datasource. Required
- name: Prometheus
  # <string, required> datasource type. Required
  type: prometheus
  # <string, required> access mode. direct or proxy. Required
  access: proxy
  # <int> org id. will default to orgId 1 if not specified
  orgId: 1
  # <string> url
  url: http://3.79.233.61:9090
  # <string> database password, if used
  password:
  # <string> database user, if used
  user:
  # <string> database name, if used
  database:
  # <bool> enable/disable basic auth
  basicAuth: true
  # <string> basic auth username
  basicAuthUser: admin
  # <string> basic auth password
  basicAuthPassword: admin
  # <bool> enable/disable with credentials headers
  withCredentials:
  # <bool> mark as default datasource. Max one per org
  isDefault: true
  # <map> fields that will be converted to json and stored in json_data
  jsonData:
     graphiteVersion: "1.1"
     tlsAuth: false
     tlsAuthWithCACert: false
  # <string> json object of data that will be encrypted.
  secureJsonData:
    tlsCACert: "..."
    tlsClientCert: "..."
    tlsClientKey: "..."
  version: 1
  # <bool> allow users to edit datasources from the UI.
  editable: true
```