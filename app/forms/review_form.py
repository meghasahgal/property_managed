from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review, User

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    stars = IntegerField('rating', validators = [DataRequired()])
    review_body = TextAreaField('your review',validators =[DataRequired()])
