from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Chat, Message, User



class MessageForm(FlaskForm):
    chat_id = IntegerField('chat_id', validators=[DataRequired()])
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    message_body = StringField('message_body', validators=[DataRequired()])
