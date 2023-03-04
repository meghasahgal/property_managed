from flask_socketio import SocketIO, emit, join_room, leave_room, send
from flask import Flask, render_template, request, session, redirect
from flask_login import current_user
import os
from .models import Message, db

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

#event listener when client connects to the server
@socketio.on("connect")
def connect():
    current_user.is_online = True
    current_user.sid = request.sid
    print(request.sid, "THIS IS THE REQUEST SID")
    db.session.commit()
    for room in current_user.rooms:
        join_room(str(room.id))
    emit("connect", {"sid": request.sid}, include_self=False)
#event listener when client disconnects from the server
@socketio.on("disconnected")
def disconnect():
    current_user.is_online = False
    current_user.sid = None
    db.session.commit()
    for room in current_user.rooms:
        leave_room(str(room.id))
    emit("disconnected", {"sid": request.sid}, include_self=False)

#join a chat/room
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['chat_id']
    join_room(room)
    send(username + ' has entered the room.', to=room)
#leave a chat/room
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['chat_id']
    leave_room(room)
    send(username + ' has left the room.', to=room)

@socketio.on('message')
def handle_message(data):
    """User types a message and it's added to the db"""
    db.session.add(Message(sender_id=data['sender_id'], chat_id=data['chat_id'], message=data['message_body']))
    emit('message',{'message':data['message_body'],'sid':request.sid},room=data['chat_id'])

@socketio.on("disconnect")
def disconnected():
    """User disconnects from the server"""
    socketio.server.leave_room(request.sid, request.args.get('room'))
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

# @socketio.on('join')
# def on_join(data):
#     room = data['room']
#     join_room(room)
#     emit('message', 'You have joined the room', room=room)

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

# @socketio.on('leave')
# def on_leave(data):
#     room = data['room']
#     leave_room(room)
#     emit('message', 'You have left the room', room=room)

@socketio.on('message')
def on_message(data):
    room = data['room']
    message = data['message']
    emit('message', message, room=room)


@socketio.on('private_message')
def handle_private_message(data):
    print('received private message: ' + data['message'])
    recipient_sid = data['recipient_sid']
    print(recipient_sid, "this is the recipient sid")
    emit('private_message', data, room=recipient_sid)
users =[]
@socketio.on('username', namespace='/private')
def receive_username(username):
    users.append({username: request.sid})
    print(users)
