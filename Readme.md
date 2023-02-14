# Getting Started 

The code block is set up with [Meilisearch](https://www.meilisearch.com/) as search engine, while Laravel is used for backend and React as frontend. Use the following steps to set up the project on local env.

#### Step 1 : Setting up Meilisearch
First start with [Installing Meilisearch](https://docs.meilisearch.com/learn/getting_started/installation.html#local-installation). Once it is installed, put it to current directory or ensure it's in your path environment if you used a package manager.

if it's not already installed, the easiest way to get started is to run 
```
# Install Meilisearch
curl -L https://install.meilisearch.com | sh
```

Now we need to use a [master key](https://docs.meilisearch.com/learn/getting_started/quick_start.html#securing-meilisearch) to secure our Meilisearch instance. For this demo, we'll use the following value as master key
```
i3cosX1ec9cn2JaZ_9Nwkn9v5CR20OrjPdx5AcUVJYo
```

Now we need to run 
``` 
./meilisearch --master-key="i3cosX1ec9cn2JaZ_9Nwkn9v5CR20OrjPdx5AcUVJYo" 
```
This will start out Meilisearch Instance. We need it running for when we'll be seeding data later.

Once the search instance is running, we can move to setting up backend.

#### Step 2 : Setting up Laravel Backend

cd into the backend directory. Now run :
```
#inside /backend directory
#PHP 8.2
php composer.phar install
cp .env.example .env
php artisan key:generate
```

Now it is time to update our .env Variables. Adjust the following variables are (if needed). 

```
#Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=packt
DB_USERNAME=user
DB_PASSWORD=password

# meilisearch
MEILISEARCH_URL="http://localhost:7700"
MEILISEARCH_MASTER_PASSWORD="i3cosX1ec9cn2JaZ_9Nwkn9v5CR20OrjPdx5AcUVJYo"
```
Note : Update the MEILISEARCH_MASTER_PASSWORD (make sure it is same as the master password you used before). Also make sure you can access MeiliSearch Dashboard over the "MEILISEARCH_URL".

Once these are configured, we can run migrations and seeders.

```
#PHP 8.2
php artisan migrate
php artisan db:seed
php artisan cache:clear
```

Note: The "db:seed" command may take a few seconds as it will be pushing about 500 records to DB.

Now we are ready to start the frontend.

#### Step 3 : Configure Frontend
Now cd into "frontend" Directory. and run these commands

```
#Node LTS (v18)
npm install
cp .env.development.example .env.development
```

Now check if any env variable needs updating. Update if necessary

Now we can access frontend by running 
```
npm run dev
```
