
![](https://s3.amazonaws.com/davis-project/dynatrace-davis-logo.png)

Welcome to the DAVIS project. You'll find comprehensive guides and documentation to help you start working with DAVIS as quickly as possible, as well as support if you get stuck. Let's jump right in!

We had fun building DAVIS and now it is your turn to enjoy the magic of DAVIS powered by the artificial intelligence of Dynatrace.

####Let's get started! - Prerequisites

You will need a Mongo Database installed with a fully qualified domain name (FQDN). This can be local to your DAVIS instance or remote. You will want the database of conversations and exchanges with DAVIS to persist when upgrading to a new version of DAVIS. [Check out this guide to get MongoDB setup on an AWS EC2 and Route53.](https://github.com/ruxit/davis-server/blob/master/setup/Mongo.md)

#####Initialize DAVIS

1. Start a new project folder.
2. ````npm init ```` and use the auto initiation guide. Give your project a unique name.
3. *(Optional)* Version 1.0.0
4. *(Optional)* Description
5. **(Required)** Use default index.js. You will be creating this file later.
6. **(Required)** Define the git respository. Right now since project is only available through private GitHub Repo you need access to the Dynatrace Innovation lab (https://[username]@github.com/ruxit/davis-server.git#master).

Before you initialize DAVIS you need to conifgure a few custom parameters for your environments. Make a copy of **/demo/config.sample.js**. Please use the following sections as guidiance and direction on how to get your DAVIS instance up and running in only a few minutes.

**Table of Contents**

- [Accessing DAVIS](https://github.com/ruxit/davis-server#default-davis-port--3000)
- [NGINX Proxy](https://github.com/ruxit/davis-server#optional-nginx-proxy)
- [Mongo DSN](https://github.com/ruxit/davis-server#mongo-db-dsn-entry)
- [Watson Setup](https://github.com/ruxit/davis-server#watson-setup-more)
- [Slack Setup](https://github.com/ruxit/davis-server#slack-setup-more)
- [Defining Users](https://github.com/ruxit/davis-server#users)

---
####Default DAVIS Port : 3000
---

*3000 is the default port that DAVIS will be available on. Set this to a desired port (Default Node.js is 3000). DAVIS needs to be a secure endpoint so you will need to determine how you would like to do this. We prefer an Elastic Load balancer that can handle both a listening port, redirection, and HTTPS. We have chosen AWS's Elastic Beanstalk service to host DAVIS where ELB is a native and out of the box configuration.*

````
const config = {
    port: process.env.PORT || 3000,
    ip: process.env.IP || '0.0.0.0',
````
---
####(Optional) NGINX Proxy
---

*You can install a NGINX reverse proxy and a self signed certificate for advanced routing. For example, you could have more than one DAVIS instance on the same server*

---
####Mongo DB DSN Entry
---

*Once you have your Mongo Database configured and either have a IP or FQDN available replace the <mongodb_database_dsn> parameter with the one you obtained.*

````
database: {
        dsn: '<davis.foo.com>'
    },
````

---
####Watson Setup [More..](https://github.com/ruxit/davis-server/blob/master/setup/Watson.md)
---

*You will need to obtain a Bluemix Username, Password, and token to be able to interact with the IBM Watson service that is powering the Speech To Text in the Web UI version of DAVIS. Navigate to [IBM Bluemix] (https://console.ng.bluemix.net/) and create a free IBM Bluemix acccount.* Click [here](https://github.com/ruxit/davis-server/blob/master/setup/Watson.md) for futher instructions.

---
####Slack Setup [More...](https://github.com/ruxit/davis-server/blob/master/setup/slack.md)
---

DAVIS isn't just voice. It's an Ecosytem. Follow the steps below to integrate DAVIS with your **#SLACK** account. We packed alot of cool features into our Slack configuration, but if you don't have an account set the **enabled** field to *false*. Once configured use a @davis to bring Dynatrace Platform intelligence to your preferred channel. Click [here](https://github.com/ruxit/davis-server/blob/master/setup/slack.md) for futher instructions.

---
####Users**
---


---
####Alexa Tokens**
---

---
####Time Zones (Echo Only)**
---

---
####Token + Tenant**
---

---
####Wit Token**
---

---
####Aliases and their definitions.**
---


---
####TODO: npm install and save TODO: start davis**
---
