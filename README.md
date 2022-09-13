
# BSC Thesis App

## Abstract
The goal of this thesis is to design and develop a web application that will support the work of a studio cinema. The system is divided into two parts, server and client.

The server part is responsible for storing and processing data and requests coming from the client part. It uses client-server architecture and the following technologies: Node.js, Express, Sequalize and MariaDB.

The client part provides a web application that allows the user to browse the offer of the cinema, register a user account and buy tickets. Employees are provided with necessary tools to manage repertoire and incoming orders.

## General info
This repository contains information about front-end part of the application. You can view the back-end [here.](https://github.com/Manchini1337/CinemaBackend)

The application has been deployed, however, it takes advantage of free hosting services such as heroku. Please keep that in mind, because that might have impact on loading times or server/db responses. 

The Heroku app can take a minute to load if it has been inactive for a long time.

## Demo

You can test the app [here.](https://cinemanextjsfrontend.herokuapp.com/)

### Main functionalities 
- Create and manage an user account (not mandatory for ticket booking)
- Book tickets for movie screening

## Remaining functionalities

Some functionalities are not available to you due to security concerns. I simply do not want to have my database flooded, so I will briefly describe them below.

### PayPal payments

Application supports incoming payments thanks to PayPal sandbox API:

<p align="center">
<img src="https://i.imgur.com/4CvcFyQ.png">

<img src="https://i.imgur.com/YUloGqE.png">

<img src="https://i.imgur.com/kc2c872.png">

<img src="https://i.imgur.com/pUVYa5C.png">
</p>

### Admin and employee panel

Authorized users are provided various tools that help to manage the cinema.

- Admin form to grant and revoke permissions to the user accounts
- Employee form to manage incoming orders
- Employee form to add movies to the database
- Employee form to create movie screenings based on available movies

<p align="center">
<img src="https://i.imgur.com/Q9xpfc2.png" >

<img src="https://i.imgur.com/X8khyBo.png">

<img src="https://i.imgur.com/KqffWym.png">

<img src="https://i.imgur.com/81nIe82.png">
</p>
