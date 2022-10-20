FROM centos:latest
RUN dnf update -y 
RUN apt-get install -y google-chrome-stable
RUN yum install google-chrome-stable -y
ENTRYPOINT ["google-chrome","--no-sandbox"]