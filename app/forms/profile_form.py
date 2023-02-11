from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired, NumberRange
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
    # print(user, "this is the user")
    if user:
        raise ValidationError('Email address is already in use.')

def check_category(form,field):
    category = form.data['property_type']
    if category.startswith('-'):
        raise ValidationError('Please choose a property type')


class ProfileForm(FlaskForm):
    id = IntegerField('user_id', validators=[DataRequired()])
    username=StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired("Email required")])
    pm_tagline = StringField('pm_tagline', validators=[DataRequired("Property Manager Tagline required")])
    profile_img=StringField('profile_img')
    # property_type=SelectField('property_type', choices=[('Residential', 'Residential'),('Commercial', 'Commercial'), ('Retail', 'Retail'), ('Industrial', 'Industrial')],validators=[DataRequired()])
    property_type=StringField('property_type', validators=[DataRequired(), check_category])
    pm_rate=IntegerField('pm_rate',validators=[DataRequired(), NumberRange(min=1,max=99,message="Please enter a whole number between 1 and 99")])
    phone_number=StringField('phone_number', validators=[DataRequired()])
    city=StringField('city', validators=[DataRequired()])
    state=StringField('state', validators=[DataRequired()])
    zipcode=StringField('zipcode', validators=[DataRequired(), Length(min=5,max=5,message="Please provide a valid zipcode")])
    is_pm=BooleanField('Are you a property manager?')
