from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import User, Review,Hire,db
from app.forms import ReviewForm, ProfileForm


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



    # if form.data["id"] != current_user.id:
    #     # print(form.data['user_id'], "userID")
    #     # print(current_user.id, "current user")
    #     return {'error': "You are not authorized to edit this profile"}, 401

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

    res = {review.id: review.to_dict() for review in reviews}
    return res

# POST - Current user creates a hire/hire with the property manager
#api/users/:id/leads
@user_routes.route('/<int:id>/hires', methods=['POST'])
@login_required
def create_hire(id):
    #pm id    print(id, "this is the id")
    #client id
    user2_id = id
    print(id, "THIS IS THE ID IN THE BE")
    user1_id = current_user.id
    # print(user1_id, "user 1 id")
    # print(user_id, "client id")
    #filter for the hires that the current user has for the current PM (identified by the params in the route)
    # hire = Hire.query.filter(
    #      Hire.user1_id == current_user.id and Hire.user2_id == id
    # ).first()

    # if hire is None:
    #     # Create a newhire if one doesn't exist yet
    hire = Hire(user1_id=user1_id, user2_id=user2_id, quantity=1, price=12.99)
    db.session.add(hire)
    db.session.commit()
    return {hire.id: hire.to_dict()}
    # return {"error": "You are not authorized to create this hire"}, 401
