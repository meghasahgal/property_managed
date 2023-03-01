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


# # get all messages of all users - works ok
#/api/messages
@message_routes.route('')
@login_required
def messages():
    """
    Query for all messages and returns them in a list of message dictionaries
    """
    messages = Message.query.all()
    # print(messages, "THESE ARE THE MESSAGES")
    res = dict()
    for message in messages:
        current_message = message.to_dict()
        res[current_message['id']] = current_message
    return res


# POST route for sender to create a new message - works
#api/messages
@message_routes.route('', methods=['POST'])
@login_required
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message()
        # print(message, "HERE IS THE MSG!!!")
        form.populate_obj(message)

        db.session.add(message)
        db.session.commit()
        return {message.id: message.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# # DELETE route to delete a message by its id - works
#api/messages/:id
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
