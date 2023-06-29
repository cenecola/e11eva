from flask import Flask, render_template, request, redirect, session
from pymongo import MongoClient

app = Flask(__name__, template_folder='templates')
app.secret_key = 'segredo'

# auth = False

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['demoday']
collection = db['users']

# Define the route for the login/registration page
@app.route('/')
def login():
    return render_template('login.html')

# Define the route for handling form submission
@app.route('/authenticate', methods=['POST'])
def authenticate():
    # global auth

    username = request.form['username']
    password = request.form['password']
    
    # Perform authentication logic here (e.g., check against database)
    user = collection.find_one({"username": username})
    if user and user["password"] == password:
        # Redirect to the article page if authenticated
        # auth = True
        session['auth'] = True
        return redirect('/courses')
    else:
        return "Incorrect username or password"

# Define the route for handling registration
@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    
    # Perform registration logic here (e.g., insert into database)
    existing_user = collection.find_one({"username": username})
    if existing_user:
        return "Username already exists"  # Return an error message for duplicate usernames
    
    collection.insert_one({"username": username, "password": password})  # Insert the new user
    
    # Redirect to the article page after successful registration
    return redirect('/courses')

# Define the route for the article page
@app.route('/courses')
def courses():
    auth = session.get('auth')  # Retrieve the 'auth' variable from session
    if auth:
        return render_template('courses.html')
    else:
        return redirect('/unauthorized')
   
@app.route('/contents')
def contents():
    auth = session.get('auth')  # Retrieve the 'auth' variable from session
    if auth:
        return render_template('contents.html')
    else:
        return redirect('/unauthorized')

@app.route('/unauthorized')
def unauthorized():
    return render_template('unauthorized.html')

if __name__ == '__main__':
    app.run(debug=True)
