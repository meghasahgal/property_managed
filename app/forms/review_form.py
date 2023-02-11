from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Review, User



class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    stars = IntegerField('rating', validators = [DataRequired("Please provide a whole number value from 1 to 5. This number is required."), NumberRange(min=1, max=5, message="Please provide a value from 1 to 5")])
    review_body = TextAreaField('your review',validators =[DataRequired()])
