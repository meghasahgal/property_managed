from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm


review_routes = Blueprint('reviews', __name__)

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

# #get all reviews
@review_routes.route('')
# @login_required
def reviews():
    """
    Query for all reviews and returns them in a list of review dictionaries
    """
    reviews = Review.query.all()
    # return {'reviews': [review.to_dict() for review in reviews]}
    res = dict()
    for review in reviews:
        current_review = review.to_dict()
        res[current_review['id']] = current_review
    return res

    # return {'users': [user.to_dict() for user in users]}


# User can update a review that they created
# PUT api/reviews/:id - works
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    review = Review.query.get(id)
    form = ReviewForm()

    if form.data["reviewer_id"] != current_user.id:
        return {'error': "You are not authorized to edit this review"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        return {review.id: review.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# User can delete a review that they posted
# DELETE api/reviews/:id - works
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review.reviewer_id != current_user.id:
        return {"error": "You are not authorized to delete this review"}, 401

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted review"}
