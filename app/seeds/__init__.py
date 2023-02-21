from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .messages import seed_messages, undo_messages
from .leads import seed_leads, undo_leads
from .chats import seed_chats, undo_chats

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_leads()
        undo_messages()
        undo_chats()
        undo_reviews()
        undo_users()
    seed_users()
    seed_reviews()
    seed_chats()
    seed_messages()
    seed_leads()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_reviews()
    undo_chats()
    undo_messages()
    undo_leads()
    # Add other undo functions here
