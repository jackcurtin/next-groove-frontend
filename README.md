# Next Groove

Next Groove is an app that allows users to catalog their album collection and receive
recommendations on what should be played next. With streaming services constantly feeding
us algorithmic playlists based on our listening patterns, this app aims to do the same
within the confines of a user's collection.

### How it works...

The database is publicly available for any and all to browse at their leisure, however, user
profiles are required to maintain a collection and receive recommendations, as well as offer
contributions to the database. Once a profile has been created, users can add albums to their
collection through the browse page. If a user already has a specific record, the "add to collection"
button should be disabled as to avoid users from adding multiple copies to their collection.

Each album has an aggregate Tone and Mood rating, which is based on individual ratings each
user can submit for any album in their collection. Once an album has been added to one's collection,
they can submit a rating through the button on their collection listing. Tone and Mood each have two
sub-categories that determine what the album sounds like. Tone consists of "production" (the clarity 
of the recording) and "arrangement" (how much instrumentation is present), while Mood consists of "tempo"
and "emotion" (both of which are self-explanatory). These values are on a scale of -5 to 5, but in no way
dictate the quality of the album. 

It's best thought of as each Tone/Mood rating respectively as a pair of x and y coordinates on a graph. The 
recommendation is determined by which album's tone and mood ratings sit the closest on that graph to the 
current one. If the album with the closest tone rating differs from the one with the closest mood rating, 
the inverse value of each one is then crossed with the current selection. Whichever album has the closer inverse
value is selected as the match, though if the difference between these values is equal, the tie goes to the 
album that initially had the closest mood rating. Starting a session by clicking the "select" button within
the album's listing in the user's collection will display the record recommendation.

### Technology Used
##### Planning
- Flowchart Maker (https://app.diagrams.net/)
- Pivotal Tracker (https://www.pivotaltracker.com/n/projects/2498821)
- Mockflow (https://mockflow.com/app/#Wireframe)
##### Back-end
- Java SpringBoot
- Maven
##### Front-end
- Angular
- Angular Material (https://material.angular.io/)
##### Deployment
- Heroku


### Future Development

There is a lot of room for this app to grow. On top of smoothing out the various kinks in
the front-end, I would like to add the following functionality that I did not have time for
within this first sprint.

##### Last Played Date
Tracking the last time each record was selected for a session. This could help the app offer albums
that have less frequently been visited in your collection and avoid recommending the same albums over
and over again,

##### Continuous Session
In the same vein, I would like to add a button on the session page within the "Up Next" card that allows
the user to seamlessly move from one record to the next. This would require the app to keep a list of
albums that have already been selected in this session, as to avoid getting stuck in a loop of the same few albums.

##### Different Recommendation Paths
Within the session view, the user will have the ability to steer the recommendation system in a direction they
are interested in taking the session if they desire. Want something faster but more somber? The app will recommend
an album that has a higher tempo rating but lower emotion rating of the user's selection.

##### Fully Utilizing Angular Material for the UI
Not just for aesthetic purposes, but there are also a lot of useful tools with Angular Material that would
lend well to the functionality of this app, as demonstrated with the rating sliders. Again, I ran out of time 
before I could implement more than what is currently present, but I would like to continue migrating much of 
the HTML components over to their Material counterparts.

## API Endpoints
| http method |Endpoint |Functionality| Access|  Header |   Body    |  
| ------ | ------ | ------ | ------ | ------ | ------ |
|POST| /auth/register  |  Create user | Public  | - |  "email", "password" |
|POST| /auth/login |  User login to generate JWT Token | Public  | - |  "email" , "password" |
|POST| /auth/createProfile  |  Create user Profile based on UserToken | Private  |Authorization : Bearer {{JWTToken}}| "name"  |
|GET| /albums/browse  |  List all albums | Public  | - | - |
|GET|  /albums/browse/{id}  |  Returns a single album from ID | Public  | - | - |
|POST| /albums/add  |Creates a new album in database  | Private | Authorization : Bearer {{JWTToken}} |  "title", "artist",  "genre", "coverArtURL", "fsValue", "udValue", "hiLoValue", "mdValue" |
|POST| /albums/addToCollection/{id}  |  adds album to user's collection in profile  | Private  | Authorization : Bearer {{JWTToken}} | - |
|GET| /genres | List all the authors |public |  - | - |
|GET| /genres/{id}  |  Returns a single genre from ID |Public |-| - |
|POST| /genres/add |Creates a new genre | Private |Authorization : Bearer {{JWTToken}} | "name" |
|GET| /profile  |  Returns entire user profile object determined by JWT token | Private  | Authorization : Bearer {{JWTToken}} | - |
|GET| /profile/collection  |  Returns user's album collection through profile determined by JWT token | Private  | Authorization : Bearer {{JWTToken}} | - |
|GET| /profile/collection/{id}  |  Returns one album from user's collection through profile determined by JWT token | Private  | Authorization : Bearer {{JWTToken}} | - |
|DELETE| /profile/collection/{id}| Removes album from user's collection using supplied id |Private | Authorization : Bearer {{JWTToken}} | -|
|PUT| /profile/collection/{id}/rate  |  Saves a rating of album to database | Private  | Authorization : Bearer {{JWTToken}} | "fsValue", "udValue", "hiLoValue", "mdValue |

### User Stories

##### As a user, I should be able to...

...create and log in to my account. [x]

...build a personalized catalog of my albums based on entries in the database. [x]

...search through all entries in the database. [x]

...create entries for albums that do not exist in the database. [x]

...select an album I am currently playing.  [x]

...get a recommendation for the next album to play based on the selected album's tone and mood [x]

...rate the "tone" and "mood" of individual albums in my collection. [x]

...track the last played date of each album to determine favorites or forgotten gems. [ ]

...based on whether I was something similar, different, or randomly generated from my collection. [ ]

...favorite up to 5 albums from my collection. [ ]

...connect my collection to my Discogs account. [ ]

...use an album in my collection to find other unowned albums with similar "tone" and "mood". [ ]

### Project Journal

##### 5/13/21
- Getting started on the app, setting up the users and authentication was an important first step, since users will need to maintain their own profiles that will 
  hold their collection. I am glad that I spent more time than usual on the planning phase. I made a fairly detailed wireframe for the front end, which is a ways 
  off, but it is helping me visualize data as I create it in the backend. 
  
##### 5/14/21
- I had initially planned to have a one-to-many relationship between Tone/Mood and album. It seemed more efficient to have albums with the same rating to point 
  towards the same place. Suresh pointed out in our standup today that if the Tone/Mood rating changes (as I am potentially planning to do through), this would 
  make the system inefficient. Because of this, I switched the relationship to a one-to-one.
- I had expected the remove from collection to be slightly tricky, since it is a much more complex delete method than simply deleting something from the JPA 
  repository. I'm pretty stuck on where to go with it. 
  
##### 5/15/21
- Posted an issue on the GA Github about my issues with creating the deleteMethod. Initially I had planned to move onto other things and ask about this with Suresh 
  on Monday. However, I realized that I would encounter similar problems when coding out the "select album to play" method that is crucial for this app. Luckily, 
  Alvin posted a solution that I was able to get to work for me.
  
##### 5/16/21
- Today I really zeroed in on populating the database with genres and albums from a JSON file. After some digging online, I found a video that really helped me 
  understand the simplicity of the task (https://www.youtube.com/watch?time_continue=1348&v=rGdKmF2UzSc&feature=emb_logo). However, I did come across some issues 
  when dealing with case sensitivity causing multiple entries for the same album with different capitalization. I had hoped to use the JPA "ignore case" keyword, 
  but it was causing issues with my file reader, so instead I have decided to keep all data in the database in the upper case and to press on.
  
##### 5/17/21
- Trying to decide whether the recommendation logic should happen on the front end or backend. Once that is determined/written, I can move onto to angular and 
  getting the front end set up.
- After consulting with Suresh, we decided I needed to restructure my tables so that the User Profile class would manage the tone and mood ratings for each 
  album in their collection.
- There's a good amount of messy, duplicate code I have written today to ensure things are working. Ideally, I will have time to go back and clean it up, but for 
  now it will have to do.
- Turns out I should not have named the "album" class "album" seeing that there is already a class in Java called "album." This caused some bigtime compiling issues 
  during my Springboot deployment to Heroku. After (a lot of) refactoring the class name to "album," I was able to get the thing deployed. With that, the backend is 
  done, and I will start with the Angular app tomorrow morning.
  
##### 5/18/21
- User authentication on the front end has given me much more grief than I had expected. Creating and logging in a user works just find, creating a profile gives a CORS 
  error. I'm moving onto basic site formatting for now.
- The public browse and search functions work well enough. I would like to add a parameter to the search that sorts/filters items out by individual ratings. However, I 
  still need to make the main product where the user logs in, starts a collection, selects a album they are playing, and gets a recommendation for the next one.
  
##### 5/19/21
- Had to deal with the pains of Heroku database maintenance. After resetting and rebuilding my Spring database, I'm back in business.
- Found a stackoverflow article that really helped with comparing the rating value of albums - https://stackoverflow.com/questions/55083624/finding-closest-x-y-coordinates ...
  Essentially, my matching algorithm calculates the difference between the selection's mood and tone rating respectively and every album in the user's collection. If the record's 
  mood match differs from its tone match, the difference for the inverse property is calculated, and the smaller difference is declared the next groove.
  
##### 5/20/21
- Wrapped up what I had started last night with users submitting ratings. Also added a basic menu for creating an album entry, but wasn't able to work out the kinks of dropdown 
  menus/sliders. I'll try and circle back if I have time, but overall today is about giving the website a pretty intense facelift overall, as well as debugging.
- Overall, the styling with Angular Material went well, but the button module would not import for some reason. The site looks fine for the presentation. I had to remove a few 
  things that were buggy and that I don't currently have the time to work out. At this point (5pm), I'm going to focus on deployment and documentation.
