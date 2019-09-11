# About Pomodoro
For this project, I created Pomodoro timer. Pomodoro is meant to create productivity by breaking down one task for intervals (usually 25 minutes).
Once the user signs up and signs in, they can start creating the timer with task name, minutes, and seconds. The user has an option to update their timer as needed. They can start the timer by clicking start button and once the timer ends, the user can reset the timer and start it again. The user can also remove the timer. When the user signs out, their timer will be saved so they can retrieve it again when they sign in again later.

- <a href=https://github.com/sookim-Boston/fullstack-backend>Repo for Pomodoro's Ruby on Rails API</a>
- <a href=https://github.com/sookim-Boston/fullstack-frontend>Repo for Pomodoro's frontend </a>
- <a href=https://pomodoro-fullstack.herokuapp.com>Deployed backend Heroku</a>
- <a href=https://sookim-boston.github.io/fullstack-frontend/>Pomodoro!</a>

### Technologies used
- HTML
- SASS
- javascript
- jQuery
- Ajax
- CSS

### Development Process
1. Created a wirefram and user stories to set up goals for the project
2. Connected user-based API events on the front end to API using AJAX/jQuery
     - Sign up: POST request
     - Sign in: POST request
     - Sign out: DELETE request
     - Change Password: PATCH request
3. Connected API events on the front end to API using AJAX/jQuery
    - show timers: GET request
    - create timer: POST request
    - update timer: PATCH request
    - destory timer: DELETE request
4. Created JavaScript timer logic using setInterval and clearInterval and created jQuery to use event handler for Start and Reset

### Challenges & Problem-Solving
1. Timer logic: I created a timer using if statement inside of setInterval. setInterval will always run every 1 second when minutes+seconds are not equal to 0.
2. Reset button: I stored setInterval as store.interval and call that function whenever the user clicks reset button and reset the timer to the beginning.
3. Start button: In order to prevent start button to run multiple times if the user clicks the button after the timer starts, I disabled the button once the timer runs and enable it again when the user resets the timer.

### Unsolved Problems
Things that I am planning to work on:
1. Creating pause button
2. Styling
3. Keeping track of number of times the timer has been used

### Wireframes and User stories
As a user, I should be able to sign up
As a user, I should be able to sign in
As a user, I should be able to sign out
As a user, I should be able to change my PW
As a user, I should be able to create a pomodoro timer
As a user, I should be able to name my pomodoro timer
As a user, I should be able to change name and length of my timer
As a user, I should be able to delete my timer

Wireframes

<img src=https://i.imgur.com/e2LROMm.jpg>
