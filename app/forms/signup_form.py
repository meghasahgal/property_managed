from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# def duplicate_password(form, field):
#     repeat_password = field.data
#     print(field.data, "data")
#     print(repeat_password, "THIS IS THE REPEAT password in the BE form")
#     print(form.data)
#     # print(type(repeat_password))
#     # print(type(password))
#     password = form.data["password"]
#     if password != repeat_password:
#         raise ValidationError('Password and Repeat Password fields need to match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username required"), username_exists])
    email = StringField('email', validators=[DataRequired("Email required"), user_exists])
    password = StringField('password', validators=[DataRequired()])
    # password = PasswordField('password', validators=[DataRequired("Password required")])
    # repeat_password = StringField('repeat_password', validators=[duplicate_password])
    # repeat_password = PasswordField('repeat_password', validators=[EqualTo('password', 'Password mismatch')])
