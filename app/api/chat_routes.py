from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Chat, db
# from app.forms import
chat_routes = Blueprint('chats', __name__)

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


#Get all chats of current user
@chat_routes.route('/', methods=['GET'])
def get_chats():
    chats = Chat.query.filter((Chat.user1_id == current_user.id or Chat.user2_id == current_user.id))
    return {'chats': [chat.to_dict() for chat in chats]}


#Create a new chat between two users if one doesn't exist already
@chat_routes.route('/messages/<int:user1_id>/<int:user2_id>', methods=['GET', 'POST'])
@login_required
def chat(user1_id, user2_id):
    chat = Chat.query.filter(
        (Chat.user1_id == user1_id and Chat.user2_id == user2_id) |
        (Chat.user1_id == user2_id and Chat.user2_id == user1_id)
    ).first()

    if chat is None:
        # Create a new chat if one doesn't exist yet
        chat = Chat(user1_id=user1_id, user2_id=user2_id)
        db.session.add(chat)
        db.session.commit()

    if request.method == 'POST':
        # Add a new message to the chat
        content = request.form['content']
        message = Message(chat_id=chat.id, sender_id=current_user.id, content=content)
        db.session.add(message)
        db.session.commit()

#delete a chat between 2 users
@chat_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_chat(id):
    chat = Chat.query.get(id)

    if chat.user_id1 != current_user.id or chat.user_id2 != current_user.id:
        return {"error": "You are not authorized to delete this message"}, 401

    db.session.delete(chat)
    db.session.commit()

    return {"message": "Successfully deleted chat"}
