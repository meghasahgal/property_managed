from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Review, User

def check_rating(form,field):
    stars = form.data['stars']
    if len(str(stars)) > 1:
        raise ValidationError('Provide a whole value for the stars from 1 to 5')


class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    stars = IntegerField('rating', validators = [DataRequired(), check_rating])
    review_body = TextAreaField('your review',validators =[DataRequired()])
