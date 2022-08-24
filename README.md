# Images-proccessor-api
This project for Udacity EgFwd Fullstack Nanodegree project 

You can use the API directly or through my [React Frontend project](https://github.com/mBahrawy/image-proccessor-frontend).


## How to run Image processor API project:
First, open terminal inside project directory, and run these commands

- First, run `npm i` for installing needed dependencies.
- Then type `npm start` for running development environment (through port will be 4000).
- Or type `npm run start:build` for building and serving a production version (through port will be 8000).
- For running test, type `npm run test`


## How to use Image processor API:

### 1. For creating placeholder image, go to route `/create`
this will create a default image, for customizing image add some query params:
```
  width=3000
  height=3000
  background=00ff00
  text=DummyText
  color=aaaaaa
```

For example: `http://localhost:4000?width=3000&height=3000&background=00ff00&text=DummyText&color=aaaaaa`.
A frontend screen will be created soon to create a placeholder image thought an interface.

Also please note that a caching process happen, if image was already created previously with same properties, It will be loaded instead of creating new one.


### 2. For edit an existing image, go to route `/edit`
**You must send an image to this request body (field name is "image"), and the file it must be an image format.**

To edit an image, send formData with any of the following argument, none of them is required but they will be validated if exists.

```
body : {
  image: [image file, required, must be an image format],
  width: [number, not required],
  height: [number, not required],
  extension: ["png" | "jpg" | "gif" | "webp" | "jpeg", not required],
  ... more options will be added soon
}
```
If you need more help, see network respond error feedback, these will all the needed validation 
Or you can use the frontend app for easier using and better visualized errors validation.

## Using .env files
There are 2 .env files, they are: `.env.development` and `.env.production`.
  1. `.env.development` is used for devlopment version of api, It can be used by command `npm start`
      It contains:
      ```
      NODE_ENV=development --> Mode flag
      APP_BACKEND_URL=http://localhost --> Backend url for development
      APP_BACKEND_PORT=4000 --> Development port
      ```

  2. `.env.production` is used for production/test version of api, It can be used by command `npm start:build`
      It contains:
      ```
      NODE_ENV=production --> Mode flag
      APP_BACKEND_URL=http://localhost --> Backend url for production
      APP_BACKEND_PORT=5000 --> Development port
      ```
      


## Running tests
Type command `npm run test` to run the implemented tests into the api, It will test through the production version.
The tests will use port 5000 because it uses the production version.

## If you want to use the Frontend

  - Got to the Frontend react app repo: https://github.com/mBahrawy/image-proccessor-frontend
  - Clone locally
  - Run `npm i` then `npm start`
  - Go to http://localhost:3000/edit , upload and edit your image
  - Go to the backend app directory, run it in dev mode `npm start` 

Note: the build Version of the backend will not work, use development version.
There is no screen for creating image placeholder for now, will be created soon.
