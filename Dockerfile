FROM node:8 as build-stage

WORKDIR /code/custos_portal/custos_portal/static/common
COPY ./custos_portal/custos_portal/static/common/package.json /code/custos_portal/custos_portal/static/common/package.json
COPY ./custos_portal/custos_portal/static/common/package-lock.json /code/custos_portal/custos_portal/static/common/package-lock.json
RUN npm install
COPY ./custos_portal/custos_portal/static/common /code/custos_portal/custos_portal/static/common
RUN npm run build



FROM python:3.6.5 as server-stage

EXPOSE 8000

WORKDIR /code
COPY requirements.txt  /code/requirements.txt
RUN pip install -r requirements.txt

COPY ./custos_portal/custos_portal/settings_local.py ./custos_portal/custos_portal/settings_local.py
COPY . ./
WORKDIR /code/custos_portal/custos_portal/static/common
COPY --from=build-stage /code/custos_portal/custos_portal/static/common .

#ENTRYPOINT ["/code/scripts/start-server.sh"]
CMD ["/code/scripts/start-server.sh"]
#ENTRYPOINT ["cd", "custos_portal"]
#ENTRYPOINT ["echo", "pwd"]
#ENTRYPOINT ["cd", "custos_portal", "&&", "python", "manage.py", "migrate"]
#ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]