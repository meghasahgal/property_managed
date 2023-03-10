
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Hire, db


hire_routes = Blueprint('hires', __name__)

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

# #get all hires - works ok
# @hire_routes.route('', methods=['GET'])
# # @login_required
# def hires():
#     """
#     Query for all hires and returns them in a list of review dictionaries
#     """
#     hires = Hire.query.all()
#     # return {'hires': [hire.to_dict() for hire in hires]}
#     res = dict()
#     for hire in hires:
#         current_hire = lead.to_dict()
#         res[current_hire['id']] = current_hire
#     # print(res, "\n \n \n \n I got to retrieve all my hires")
#     return res

    # return {'users': [user.to_dict() for user in users]}

#Current user can retrieve their hires - works ok
@hire_routes.route('',methods=['GET'])
# @login_required
def hires():
    """
    Query for all hires and returns them in a list of review dictionaries
    """
    hires = Hire.query.filter(Hire.user1_id == current_user.id).all()
    # return {'hires': [lead.to_dict() for lead in hires]}
    res = dict()
    for hire in hires:
        current_hire = hire.to_dict()
        res[current_hire['id']] = current_hire
    # print(res, "\n \n \n \n I got to retrieve all my hires")
    return res

# User can update a hire that they created
# # PUT api/hires/:id - works
# @hire_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_review(id):
#     hire = Hire.query.get(id)
#     # print(hire, "this is the lead in the BE route")
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
# DELETE api/hires/:id - works
@hire_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_hire(id):
    hire = Hire.query.get(id)
    # print(hire, "THIS IS THE HIRE!!")
    # print(id, "THIS IS THE ID")
    # print(hire.user1_id, "user1id")
    # print(current_user.id, "current user id")

    # if hire.user1_id != current_user.id:
    #     return {"error": "You are not authorized to delete this hire"}, 401

    db.session.delete(hire)
    db.session.commit()

    return {"message": "Successfully deleted hire"}
