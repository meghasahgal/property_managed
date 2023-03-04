from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Lead, db
from app.forms import ReviewForm


lead_routes = Blueprint('leads', __name__)

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

# #get all leads
@lead_routes.route('')
# @login_required
def leads():
    """
    Query for all leads and returns them in a list of review dictionaries
    """
    leads = Lead.query.all()
    # return {'leads': [lead.to_dict() for lead in leads]}
    res = dict()
    for lead in leads:
        current_lead = lead.to_dict()
        res[current_lead['id']] = current_lead
    # print(res, "\n \n \n \n I got to retrieve all my leads")
    return res

    # return {'users': [user.to_dict() for user in users]}


# User can update a lead that they created
# # PUT api/leads/:id - works
# @lead_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_review(id):
#     lead = Lead.query.get(id)
#     # print(lead, "this is the lead in the BE route")
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
# DELETE api/leads/:id - works
@lead_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    lead = Lead.query.get(id)

    if lead.user_id != current_user.id:
        return {"error": "You are not authorized to delete this lead"}, 401

    db.session.delete(lead)
    db.session.commit()

    return {"message": "Successfully deleted review"}
