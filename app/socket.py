from flask_socketio import SocketIO, emit, join_room, leave_room
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


@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('message', 'You have joined the room', room=room)

# @socketio.on('join')
# def handle_join(data):
#     room = data['room']
#     join_room(room)
#     emit('message', {'message': f'User {request.sid} joined room {room}'}, room=room)

# @socketio.on('leave')
# def handle_leave(data):
#     room = data['room']
#     leave_room(room)
#     emit('message', {'message': f'User {request.sid} left room {room}'}, room=room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    emit('message', 'You have left the room', room=room)

@socketio.on('message')
def on_message(data):
    room = data['room']
    message = data['message']
    emit('message', message, room=room)


@socketio.on('private_message')
def handle_private_message(data):
    print('received private message: ' + data['message'])
    recipient_sid = data['recipient_sid']
    emit('private_message', data, room=recipient_sid)