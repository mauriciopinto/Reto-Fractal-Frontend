### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### About this project
This project uses the ReactJs, Material UI, react-router-dom and axios libraries and packages.

I have divided the workflow in two main branches:

#### Master branch
Contains the source code for the project up to the first 8 hours of the challenge. There are some bugs and some incomplete components in this version. What was accomplished was:

- A table for viewing created orders
- A form for creating/editing orders
- An appbar for navigating the app

#### Post-8h branch
This branch contains everything done in the remaining time of the challenge. This includes the extra steps (views and CRUD for products) and the correction of some bugs:

- CRUD working correctly
	- Corresponding stocks are reduced when ordering products
	- Price is shown when adding products and is shown with 2 decimals
	- Stock is shown when adding products
	- Added constraints for product amount based on stocks
- CRUD and views for products
- Added loaders for both views
- Order number is now assigned the order ID

#### Demo
I have deployed a live demo of the app in [this address](http://34.95.219.44:3000/), feel free to check it out. I am using low-cost GCP VMs for both backend and frontend services, and Cloud SQL for database storage.
