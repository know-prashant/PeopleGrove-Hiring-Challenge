# Peoplegrove Full-Stack Engineer Hiring Challenge


This challenge is intended to be uploaded to your own Github/BitBucket/Gitlab account in order to form the submission for the challenge. Boilerplate code will give you a Sails server with a React app, so you don't have to spend time writing boilerplate code. Feel free to make any changes you wish - the existing code is purely intended to get you going faster.

## What's Included
In root directory you'll have code required for the application. `api` contains code for backend and `client` contains code for react application. Instruction to install / run these servers are described in section below.

Sails is configured to use [sails-disk](https://github.com/balderdashy/sails-disk). It is a local disk adapter for the Sails framework and Waterline ORM. This means you do not have to worry about configuring a database.

To get started we have added one Model, `User.js` and one controller method `UserController.signup`.

Currently, the backend is configured to run on `alter` mode. This will auto-migrate columns/fields, but attempt to keep my existing data. More on this [here](https://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate).

## Run Instruction
To setup the app, `cd` into the project root directory and run `yarn install`. Instructions to install `yarn` could be found [here](https://yarnpkg.com/en/docs/install).

To start app, `cd` into the project root directory and run `yarn start`.

## Requirement
Develop a web application which allows an user (anonymous / registered) to make a reservation, and other user is able login to review those reservations. Registered user would have their timezone saved. When some other user (registered / anonymous) lands on their profile, they should be able to reserve a slot. For simplicity, reservations should be of an hour. If a user has previously reserved an hour, no other users may reserve the same slot.

We have included some mockups in `designs` directory. It currently only contains mobile designs, but you should be able to extrapolate it for desktop designs.

### Different Views
#### New Slot Reservation View
![New Reservation](https://github.com/campuskudos/pg-fullstack-challenge/raw/master/designs/03.%20Book%20Slot-small.png)

This is when someone lands on some other user's profile. Something like `http://localhost:3000/user/abracadabra`
  - Select a day
  - Book a slot
#### My Profile View
![My Profile](https://github.com/campuskudos/pg-fullstack-challenge/raw/master/designs/04.%20My%20Schedules-small.png)

This is the view when someone lands on their own profile.
  - View Reservations
  - Edit my timezone
  - Delete already existing reservation

##### Important consideration
You must take care of the timezone of the different users. For example, if `User A` land on profile of `User X`. And assume `User A` is in `Asia/Kolkata` timezone and `User X` is in `America/New_York` timezone. All the booked slots for `User X` should be based on her timezone, 00:00 AM, 02:00 AM, ..... 11:00 PM (America/New_York timezone). You may assume that the timezone provided by the local system/browser is correct.

So for a given day `User A` would see slots like :

00:30 AM, 01:30 AM .... 11:30 PM

this is because of the different timezones.

## Challenge Scope
- There is already a UserRecord in database, *Nitin Hayaran*. We should be able to visit http://localhost:8000/nitinhayaran and see booking UI for the Day. (Mandatory)
- Server side API to book a slot. (Mandatory)
- Handling timezone difference. (Optional, Extra points if done)
- Login / Signup Functionality - (Optional - Nice to have)
- Ability to book slots for future days, that would mean adding calendar and designing API for multiple days (Optional - Nice to have)
- My Profile view - Page where I can see who booked slots with me. (Optional - Nice to have)

First two points must be finished for a valid submission. Otherwise we wont' be able to consider that.

## Documentation Links
+ [Sails - Get started](https://next.sailsjs.com/get-started)
+ [Sails - framework documentation](https://next.sailsjs.com/documentation/reference)
+ [Sails - Model Configuration](https://next.sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate)

## Submission Instructions
1. Complete the task and push on your own private repo. (Nice, atomic and iterative commits are welcome).
2. Make sure you use private repos on github / bitbucket / gitlab, and give us permission to view. Our username are
  - Github
    - [nitinhayaran](https://github.com/nitinhayaran)
    - [reillydavis](https://github.com/reillydavis)
    - [Nikesh](https://github.com/Nikesh)
  - Bitbucket
    - [peoplegrove](https://gitlab.com/peoplegrove)
  - GitLab
    - [peoplegrove](https://bitbucket.org/peoplegrove/)
3. Include instructions of how we can make it to work.
4. Be prepared to give an in-person demo of your work and answer questions.
5. We have given this boilerplate code for a quickstart. However, **you can use any other language / framework if you not too comfortable with either SailsJS or React**.

## Our Guidance
The challenge should not take any more than 6-8 hours. You do not need to complete the challenge in one go.

We are keen to see how much you think is enough, and how much would go into a Minimum Viable Product. As a guide, elegant and simple wins over feature rich every time.

Although the API might be returning relatively straightforward content, please try and write the API code as if you were building something more complex. We would like to gain an idea of how you would go about structuring API code.

Feel free to make any changes to the UI you see fit.

Using openly available tutorials is great. We're a startup, so no points are awarded for working hard, only getting the job done quickly and correctly.

If you have any questions, feel free to ask. Points are not deducted for questions. Part of the exercise is to see how we communicate and if we can be efficient.

This challenge will be a critical component of your final round interviews with more members of the engineering team. It's fine if you take shortcuts and make assumptions - just be prepared to explain those to us and what you would have done if you'd had more time.
