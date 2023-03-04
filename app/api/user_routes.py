from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, Review,Chat,Message,Lead,db
from app.forms import ReviewForm, ProfileForm, MessageForm


user_routes = Blueprint('users', __name__)

#errors
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET all users
# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}

# GET user by ID
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    # return user.to_dict()
    return {user.id: user.to_dict()}
    # (user, "user HerE")


# User property manager profiles can be retrieved
# GET api/users - ok

@user_routes.route('')

def users():
    """
    Query for all users that are Property Managers and returns them in a list of user dictionaries
    """
    users = User.query.filter(User.is_pm == True).all()

    res = dict()
    for user in users:
        current_user = user.to_dict()
        res[current_user['id']] = current_user
    return res

    # return {'users': [user.to_dict() for user in users]}


# User can create their profile based on user id - works
# POST api/users/:id
@user_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_profile(id):
    form = ProfileForm()
    # print(form, "form")
    # (id, "id in user route")

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        # print(user, "user")
        form.populate_obj(user)
        # print(form.data, "data")
        db.session.add(user)
        db.session.commit()
        return {user.id: user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




# Logged in user can edit their profile based on user id - works
# PUT api/users/:id/profile
@user_routes.route('/<int:id>', methods=['PUT','PATCH'])
@login_required
def edit_profile(id):
    user= User.query.get(id)

    form = ProfileForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)

        db.session.commit()
        return {user.id: user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Logged in user can delete their profile based on user id
# DELETE api/users/:id/profile
@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    user = User.query.get(id)
    if user.id != current_user.id:
        return {"error": "You are not authorized to delete this profile"}, 401

    db.session.delete(user)
    db.session.commit()

    return {"message": "Successfully deleted profile"}

# User can post a review on a property manager
# POST api/users/:id/reviews
@user_routes.route('/<int:id>/reviews', methods=['POST'])
def post_review(id):
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review()
        # print(review, "HERE IS THE REVIEW!!!")
        form.populate_obj(review)

        db.session.add(review)
        db.session.commit()
        return {review.id: review.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# User can get all reviews on a property manager - works ok
# GET api/users/:id/reviews
@user_routes.route('/<int:id>/reviews', methods=['GET'])
def get_all_reviews(id):
    reviews = Review.query.filter_by(user_id=id).all()
    # print(reviews, "\n \n \n*****here are the reviews of the property manager")
    res = {review.id: review.to_dict() for review in reviews}
    # print("\n\n\n\n\n\n\n\n\n\n hello", res)
    return res

#Create a new chat between two users if one doesn't exist already
# POST - Current user (user2) creates a chat with the property manager (user1) - works ok
#api/users/:id/chats
@user_routes.route('/<int:id>/chats', methods=['POST'])
@login_required
def create_chat(user1_id):
    user1_id = id
    # print(user1_id, "user 1 id")
    user2_id = current_user.id
    # print(user2_id, "user 2 id")
    chat = Chat.query.filter(
        Chat.user1_id == current_user.id or Chat.user2_id == current_user.id
    ).first()

    if chat is None:
        # Create a new chat if one doesn't exist yet
        chat = Chat(user1_id=id, user2_id=user2_id)
        db.session.add(chat)
        db.session.commit()
    return {chat.id: chat.to_dict()}


# # GET route to retrieve all messages of current user - works
# api/users/:id/messages
@user_routes.route('/<int:sender_id>/messages', methods=['GET'])
def get_messages(sender_id):
    print(sender_id, "/n/n/n/nTHIS IS THE SENDER ID")
    privatemsgs = Message.query.filter((Message.sender_id == current_user.id))
    res = dict()
    for privatemsg in privatemsgs:
        current_msg = privatemsg.to_dict()
        res[current_msg['id']] = current_msg
    return res


# POST - Current user creates a lead/hire with the property manager
#api/users/:id/leads
@user_routes.route('/<int:id>/leads', methods=['POST'])
@login_required
def create_lead(id):
    user1_id = id
    user_id = current_user.id
    # print(user1_id, "user 1 id")
    # print(user_id, "client id")
    #filter for the leads that the current user has for the current PM (identified by the params in the route)
    lead = Lead.query.filter(
         Lead.user_id == current_user.id and Lead.user_1 == id
    ).first()

    if chat is None:
        # Create a new chat if one doesn't exist yet
        chat = Chat(user1_id=id, user2_id=user2_id)
        db.session.add(chat)
        db.session.commit()
    return {chat.id: chat.to_dict()}
