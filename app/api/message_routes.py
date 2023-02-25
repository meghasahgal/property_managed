from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Chat, db
from app.forms import MessageForm
message_routes = Blueprint('messages', __name__)

# error handling function
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# # get all chat messages of all users
@message_routes.route('')
def messages():
    """
    Query for all messages and returns them in a list of message dictionaries
    """
    messages = Message.query.all()
    res = dict()
    for message in messages:
        current_message = message.to_dict()
        res[current_message['id']] = current_message
    return res

# # GET route to retrieve all messages of sender
@message_routes.route('/messages/<int:sender_id>', methods=['GET'])
def get_messages():
    privatemsgs = Message.query.filter((Message.sender_id == current_user.id))
    res = dict()
    for privatemsg in privatemsgs:
        current_msg = privatemsg.to_dict()
        res[current_msg['id']] = current_msg
    return res

# POST route to create a new message between two people
@message_routes.route('/messages', methods=['POST'])
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message()
        # print(review, "HERE IS THE MSG!!!")
        form.populate_obj(message)

        db.session.add(message)
        db.session.commit()
        return {message.id: message.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#     sender_id = request.json['sender_id']
#     receiver_id = request.json['receiver_id']
#     message_text = request.json['message_text']
#     # code to add new message to database
#     new_message = add_message(sender_id, receiver_id, message_text)
#     return jsonify(new_message)

# # DELETE route to delete a message by its id
@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)

    if message.sender_id != current_user.id:
        return {"error": "You are not authorized to delete this message"}, 401

    db.session.delete(message)
    db.session.commit()

    return {"message": "Successfully deleted message"}




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
