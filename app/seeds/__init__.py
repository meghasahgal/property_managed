from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .messages import seed_messages, undo_messages
from .hires import seed_hires, undo_hires
from .loves import seed_loves, undo_loves

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
        undo_loves()
        undo_hires()
        undo_messages()
        undo_reviews()
        undo_users()
    seed_users()
    seed_reviews()
    seed_messages()
    seed_hires()
    seed_loves()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_reviews()
    undo_messages()
    undo_hires()
    undo_loves()
    # Add other undo functions here
