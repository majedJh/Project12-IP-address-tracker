# Frontend Mentor - IP address tracker solution

created: 24/7/2025

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.
*Note*: I may run out of requests because the number of requests is limted due to only using the free subscripition

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location


### Screenshot

![](./Project%20screenshots/Screenshot%202025-07-24%20232738.png)

![](./Project%20screenshots/Screenshot%202025-07-24%20232800.png)

### Links

- Solution URL: [https://github.com/majedJh/Project12-IP-address-tracker]

## My process

### Built with

- HTML5
- CSS
- Used my small self-built CSS library
- JS 
- JS Regex
- JS Fetch API
- Leaflet JS library
- Open streetmap API
- Ipify API
- IP Geolocation API (Geo Ipify API)

### What I learned

First time using an external API, and this went absolutely good. I learnt how to use leaflet JS library by reading the documentation tp create thr map container, marker and zoom control,I also used the Ipify API to get the user's current IP adress, IP Geolocation API to get the IP full data, then the openstreetmap API to get the map data.I also handeled all cases where the IP address (ipv4 or ipv6) doesn't exist, the format is wrong or the entered data isn't valid.

### Continued development

I'd like to implement some super professional error messages to the DOM after the fetching error

### Useful resources

- [ELzero web school Youtube](https://www.youtube.com/@ElzeroWebSchool)
- [MDN Web Documents](https://developer.mozilla.org/en-US/)
- [IP Geolocation API (Geo Ipify API)](https://geo.ipify.org/)
- [Ipify API](https://ipinfo.io/)
- [Leaflet JS](https://leafletjs.com/)

## Author

- Frontend Mentor - https://www.frontendmentor.io/profile/majedJh
- Github - https://www.frontendmentor.io/profile/majedJh
