from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review, User

class ReviewForm(FlaskForm):
    stars = IntegerField('rating', validators = [DataRequired()])
    review_body = TextAreaField('your review',validators =[DataRequired()])
