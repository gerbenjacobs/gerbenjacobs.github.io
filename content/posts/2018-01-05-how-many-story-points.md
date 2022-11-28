---
layout: post
title:  How many points would you give this story?
description: I finished what I thought would be a small story the other day. A blogpost about the dangers of pokering story points.
date: 2018-01-05 18:00:00
headerImage: img/flickr-theonewithout-norway-laguna.png
tags: ["tech"]
toc: true
---

It’s time for a mental exercise. You are going to give story points to a user story, that I actually completed. 
Then I’m going to tell you what I had to do and which issues I ran into.

## Background

We have a page that lists birthdays for people on the current day, but excluding the current year. In the descending order it then shows their age.

This is nice, but if you want to find out whose birthday is on a specific date, you might have to wait a year for it to come around.

_The site is  multilingual and we are using PHP._

## The story

Add a form to the page that lets you select another (full) date or a specific day by adding "All years" to the year field. 
Have the form post to a different route than the actual birthday page.

So? How much story points would you give this? Is it a small, medium or large task?
Try to think of the things you have to do.

Good, now let’s find out what I had to do..

## What I needed to do..
- Add a new route for the form handling
- Create the HTML for the form
    - Fill 3 `<select>` dropdowns with day, month and year
    - Add a separate `<option>` for "All years"
    - Add logic to put "selected" on the current (or selected) date
- Add new routes for the date specific birthday page (for SEO and share-ability reasons)
    - One for a complete date "/birthdays/{date}"
    - One for a specific day "/birthdays/{month}/{day}"
- Validate the incoming request
    - Do we have "full date" option, if so is it not empty?
    - Do we have "date only"? Then we must have "month" and "day" parameters
    - We have neither? Then use the original logic
- Validate the date
    - "Full date": try to parse the string as a date
    - "Date only": see if month is range 1 to 12 and day in range 1 to 31
- Update the model/repository
    - The function now needs to take in a date and a boolean whether we want "full date" or "date only"
    - If we’re using "date only" we can reuse the current query; show all birthdays on this day/month but skip the current year
    - For "full date" we need to write a new query -- side quest: what is the most efficient way to search on date in MySQL
- Other small changes
    - Change the title of the page to show which specific date is used, unless it’s the old logic (SEO)
    - Send the actual picked date along to the view
    - Change all new text to translatable strings and translate them
    - Use automatic month translation in the form by setting the correct `LC_TIME` locale

During this process a couple of complications showed up.
- Because of the automatic setting of the current date, the "All years" option is never chosen -- but I’m okay with that
- The date validation does not handle days gracefully i.e. february 31st is possible to select. 
I tried to use Carbon to parse the date, but when you entered 50 as day, it would just roll over to the next month -- not what I want
- I was having a weird bug where my query worked, but the date on the page was the next day. 
Turned out that Carbon and the underlying DateTime operations are done on the object. 
To fix it I ‘clone’ the date in my query function as not to mess with the input date. I can’t remember ever having to do this in PHP before..
- To prevent regression and keep it feeling the same, I had to add logic for when the selected date was equal to the current date -- 
that meant I would redirect back to the normal birthday endpoint and not show the date in the title
- setlocale() and friends also kept me running in circles for a while. I started programming on my Macbook, 
but then moved to my Windows PC and also had to check the Linux server that the site actually runs on. 
Turns out there’s no simple OS-agnostic way to get the correct locale if you only have a country code -- 
in the end I just created a small custom array to map codes to locales

## No small task  
Did you pick a low amount of story points? So did I!

If you read the story you think all you have to do is add a form and change the query for fetching birthdays a bit. 
But then you have to add user interface, user experience, security, validation and ideally have tests too. 
Then, if you care about SEO and multilingualism, you have to add that too!

So it appears that the theory "estimating (or _pokering_) for points is hard" also holds true in practice
and that whatever you pick in the beginning, you better double it!
