
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Love, db


love_routes = Blueprint('loves', __name__)

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

# #get all loves - works ok
# @love_routes.route('', methods=['GET'])
# # @login_required
# def loves():
#     """
#     Query for all loves and returns them in a list of review dictionaries
#     """
#     loves = Love.query.all()
#     # return {'loves': [love.to_dict() for love in loves]}
#     res = dict()
#     for love in loves:
#         current_love = lead.to_dict()
#         res[current_love['id']] = current_love
#     # print(res, "\n \n \n \n I got to retrieve all my loves")
#     return res

    # return {'users': [user.to_dict() for user in users]}

#Current user can retrieve their loves - works ok
@love_routes.route('',methods=['GET'])
# @login_required
def loves():
    """
    Query for all loves and returns them in a list of review dictionaries
    """
    loves = Love.query.filter(Love.user1_id == current_user.id).all()
    # return {'loves': [lead.to_dict() for lead in loves]}
    res = dict()
    for love in loves:
        current_love = love.to_dict()
        res[current_love['id']] = current_love
    # print(res, "\n \n \n \n I got to retrieve all my loves")
    return res

# User can update a love that they created
# # PUT api/loves/:id - works
# @love_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_review(id):
#     love = Love.query.get(id)
#     # print(love, "this is the lead in the BE route")
#     form = ReviewForm()

#     if form.data["user_id"] != current_user.id:
#         return {'error': "You are not authorized to edit this lead"}, 401

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         form.populate_obj(lead)
#         db.session.commit()
#         return {lead.id: lead.to_dict()}
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# User can delete a lead that they posted
# DELETE api/loves/:id - works
@love_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_love(id):
    # print(id, "this is the id in the api")
    love = Love.query.get(id)
    # print(love, "THIS IS THE LOVE!!")
    # print(id, "THIS IS THE ID")
    # print(love.user1_id, "user1id")
    # print(current_user.id, "current user id")

    # if love.user1_id != current_user.id:
    #     return {"error": "You are not authorized to delete this love"}, 401

    db.session.delete(love)
    db.session.commit()

    return {"message": "Successfully deleted love"}
