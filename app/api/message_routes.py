from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Chat, db
# from app.forms import
message_routes = Blueprint('messages', __name__)

# # get all chats of user

# # GET route to retrieve all messages between two people
# @app.route('/messages/<sender_id>/<receiver_id>', methods=['GET'])
# def get_messages(sender_id, receiver_id):
#     # code to retrieve messages from database
#     messages = retrieve_messages(sender_id, receiver_id)
#     return jsonify(messages)

# # POST route to create a new message between two people
# @app.route('/messages', methods=['POST'])
# def create_message():
#     sender_id = request.json['sender_id']
#     receiver_id = request.json['receiver_id']
#     message_text = request.json['message_text']
#     # code to add new message to database
#     new_message = add_message(sender_id, receiver_id, message_text)
#     return jsonify(new_message)

# # DELETE route to delete a message by its id
# @app.route('/messages/<message_id>', methods=['DELETE'])
# def delete_message(message_id):
#     # code to delete message from database
#     delete_message(message_id)
#     return '', 204
# @message_routes.route('/messages/<int:user1_id>/<int:user2_id>', methods=['GET', 'POST'])
# @login_required
# def chat(user1_id, user2_id):
#     chat = Chat.query.filter(
#         (Chat.user1_id == user1_id and Chat.user2_id == user2_id) |
#         (Chat.user1_id == user2_id and Chat.user2_id == user1_id)
#     ).first()

#     if chat is None:
#         # Create a new chat if one doesn't exist yet
#         chat = Chat(user1_id=user1_id, user2_id=user2_id)
#         db.session.add(chat)
#         db.session.commit()

#     if request.method == 'POST':
#         # Add a new message to the chat
#         content = request.form['content']
#         message = Message(chat_id=chat.id, sender_id=current_user.id, content=content)
#         db.session.add(message)
#         db.session.commit()

#     # Retrieve all messages associated with the chat
#     messages = chat.messages.order_by(Message.timestamp.asc()).all()



# export default App;
# Implement private messaging: To create a private chat, you'll need to implement a system for two users to connect to each other. You can use Flask-SocketIO's join_room and leave_room functions to control which rooms a user is in. Here's an example of how to handle private messaging on the server:
# less
# @socketio.on('join')
# def on_join(data):
#     room = data['room']
#     join_room(room)
#     emit('message', 'You have joined the room', room=room)

# @socketio.on('leave')
# def on_leave(data):
#     room = data['room']
#     leave_room(room)
#     emit('message', 'You have left the room', room=room)

# @socketio.on('message')
# def on_message(data):
#     room = data['room']
#     message = data['message']
#     emit('message', message, room=room)
