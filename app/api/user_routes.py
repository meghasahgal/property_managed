from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import User, Review,db
from app.forms import ReviewForm


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


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# User profiles can be retrieved
# GET api/users

# User can create their profile based on user id
# POST api/users

# Logged in user can edit their profile based on user id
# PUT api/users/:id

# Logged in user can delete their profile based on user id
# DELETE api/users/:id


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


# User can get all reviews on a property manager
# GET api/users/:id/reviews
@user_routes.route('/<int:id>/reviews', methods=['GET'])
def get_all_reviews(id):
    reviews = Review.query.filter_by(user_id=id).all()

    res = {review.id: review.to_dict() for review in reviews}
    return res
