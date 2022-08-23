# Images-proccessor-api
This project for Udacity EgFwd Fullstack Nanodegree project 

You can use the API directly or through my [React Frontend project](https://github.com/mBahrawy/image-proccessor-frontend).


## How to run Image proccessor API project:
First, open terminal inside project directory, and run these commands

- First, run `npm i` for installing needed dependancies.
- Then type `npm start` for running development environment (through port will be 4000).
- Or type `npm run start:build` for building and serving a production version (through port will be 8000).
- For running test, type `npm run test`


## How to use Image proccessor API:

1. ### For creating placeholder image, go to route `/create`
this will create a default image, for custmoizing image add some query params:

  - width=3000
  - height=3000
  - background=00ff00
  - text=DummyText
  - color=aaaaaa

for example: `http://localhost:4000?width=3000&height=3000&background=00ff00&text=DummyText&color=aaaaaa`.
A frontend screen will be created soon to create a placholder image thought an interface.

Also please note that a caching proccess happen, if image was already created previously with same properties, It will be loaded instead of creating new one.


2. ### For edit an exsisting image, go to route `/edit`
**You must send an image to this request body (field name is "image"), and the file it must be an image formate.**

To edit an image, send formData with any of the follown agrumant, non of them is required but they will be validated if exisits.

```
body : {
  image: [image file, required, must be an image formate],
  width: [number, not required],
  height: [number, not required],
  extension: ["png" | "jpg" | "gif" | "webp" | "jpeg", not required],
  ... more options will be added soon
}
```
If you need more help, see etwork respond error feedback, these will all the needed validation 
or you can use the frontend app for easier using and better visualized errors validation.


## If you want to use the Frontend

  - Got to the Frontend react app repo: https://github.com/mBahrawy/image-proccessor-frontend
  - Clone locallay
  - Run `npmi` then `npm start`
  - Go to http://localhost:3000/edit , upload and edit your image
  - Go to the backend app directory, run it in dev mode `npm start` 

Note: the build Version of the backend will not work, use development version.
There is no screen for creating image placeholder for now, will be created soon.
