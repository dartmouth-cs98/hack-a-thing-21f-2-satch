# Hack Technology / Project Attempted


## What you built? 

I built on my existing react native app from the last hack-a-thing, adding in more complicated features and functions, as well as ejecting from expo.

Include some screenshots.
![](/images/Search.png)
![](/images/Upload.png)
![](/images/Choosing.png)
![](/images/Uploaded.png)

## Who Did What?

I worked on it all myself

## What you learned

The ejecting of my application out of expo caused me some trouble getting the environment going and making sure that the app still ran. When installing all the podfiles and dependancies I actually ended up needing to change the privacy restrictions of certain dot files in order to allow the installations to run which I had never really seen before. I eventually got the app properly ejected though. This second part was definitely more complicated than the beginning of this app. I feel good about being able to get firebase authentication going (it was pretty funny because my dad got an email that my gmail might be at risk when I signed into my unregistered app). The instructions were pretty vague for how we had to re-enable the youtube API once firebase had been integrated though which left me pretty confused. I was also able to use ternary operators and optional chaining in this portion of the assignment which is exciting that these are supported in react native. Over the course of this assignment I felt a lot more comfortable with React native and how things were being built out, aswell as the use of screens and the built in navigators etc. Easily the most annoying part of this project that I spent multiple hours debugging was the upload feature. I kept getting 403 and 401 errors when trying to upload my videos, which was strange because I was still able to fetch videos in the search tab, and my dashboards in google showed that I was far from hitting my quota for the day. I looked over all of my code multiple times and couldn't find anything that would be wrong, and eventually figured out that it was nothing to do with my code at all, and that even though I had a google a ccount that I was able to be logged into youtugbe with it didn't mean I could upload videos, and deeded to create a "channel" in order to actually upload videos, which was not self evident at all but thankfully I figured it out and was able to upload videos (see pictures of channel above).

## Authors

Satch Baker '22

## Acknowledgments

I used the advanced React Native tutorial from CS52
https://cs52.me/assignments/sa/react-native-part-2/
