# NextGroove

NextGroove is an app that allows users to catalog their album collection and receive
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

