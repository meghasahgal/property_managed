from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import User

#Custom Validators
def username_exists(form, field):
    # Checks if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def user_exists(form, field):
    # Checks if email exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class ProfileForm(FlaskForm):
    username=StringField('username', validators=[DataRequired(),username_exists])
    email = StringField('email', validators=[DataRequired(),user_exists])
    pm_tagline = StringField('pm_tagline', validators=[DataRequired()])
    profile_img=StringField('profile_img', validators=[URL(require_tld=True,message="Please provide a valid url")])
    property_type=SelectField('property_type', choices=[('Residential', 'Residential'),('Commercial', 'Commercial'), ('Retail', 'Retail'), ('Industrial', 'Industrial')],validators=[DataRequired()])
    pm_rate=IntegerField('pm_rate',validators=[DataRequired()])
    phone_number=StringField('phone_number', validators=[DataRequired()])
    city=StringField('city', validators=[DataRequired()])
    state=StringField('state', validators=[DataRequired()])
    zipcode=StringField('zipcode', validators=[DataRequired(), Length(min=5,max=5,message="Please provide a valid zipcode")])
