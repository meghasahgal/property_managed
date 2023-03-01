from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, Chat, User, db
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
#api/chats - works
@chat_routes.route('', methods=['GET'])
def get_chats():
    chats = Chat.query.filter((Chat.user1_id == current_user.id or Chat.user2_id == current_user.id))
    print("/n/n/n/", chats)
    return {'chats': [chat.to_dict() for chat in chats]}

#Post a new chat by current user, works up until the creation of the chat, user 2 is the logged in current user, user 1 is the PM
# @chat_routes.route('', methods=['POST'] )
# @login_required
# def create_chat():
#     user1_id = Chat.query.get(request.json['user1_id'])
#     print(user1_id, "user1")
#     print(user1_id, "THIS IS USER ONE")
#     user2_id = current_user.id
#     print(user2_id, "THIS IS USER TWO")
#     chat = Chat.query.filter(
#         Chat.user1_id == current_user.id or Chat.user2_id == current_user.id
#     ).first()
#     print(chat, "THIS IS THE CHAT")

#     if chat is None:
#         # Create a new chat if one doesn't exist yet
#         chat = Chat(user1_id=user1_id, user2_id=user2_id)
#         db.session.add(chat)
#         db.session.commit()
#     return {chat.id: chat.to_dict()}


#Delete a chat between 2 users
#api/chats/:id - works
@chat_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_chat(id):
    chat = Chat.query.get(id)
    # print("/n/n/n/ HERE IS THE CHAAT", chat)
    # print(current_user.id, "current user")
    # print(chat.user1_id, "user1 id")
    # print(chat.user2_id, "user2 id")

    if chat.user1_id != current_user.id and chat.user2_id != current_user.id:
        return {"error": "You are not authorized to delete this message"}, 401

    db.session.delete(chat)
    db.session.commit()

    return {"message": "Successfully deleted chat"}
