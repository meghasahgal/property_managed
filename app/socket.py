from flask_socketio import SocketIO, emit
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://managed.onrender.com",
        "https://managed.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

#we want to handle chat events, so we will use the label "chat". (On the front-end, we will need to make sure that we use the same value when we emit our events so that they get handled by this function).
#Unlike with a Flask route handler, we will not need to have an actual return statement—we send messages explicitly using emit or send functions.

# handle chat messages, broadcast=True will emit message to all connected users
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

#pipenv requirements
