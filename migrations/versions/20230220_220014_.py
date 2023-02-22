"""empty message

Revision ID: c99678a3d36a
Revises: 1c542b8140c2
Create Date: 2023-02-20 22:00:14.822214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c99678a3d36a'
down_revision = '1c542b8140c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user1_id', sa.Integer(), nullable=False),
    sa.Column('user2_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user1_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user2_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.add_column('messages', sa.Column('chat_id', sa.Integer(), nullable=True))
    op.add_column('leads', sa.Column('is_serious', sa.Boolean(), nullable=False))

    # op.alter_column('messages', 'sender_id',
    #            existing_type=sa.INTEGER(),
    #            nullable=True)
    # op.execute(
    #     'messages'.update()
    #     .where(table_name.c.column_name is None)
    #     .values(column_name="some_value")
    # )
    # op.alter_column('messages', 'message_body',
    #            existing_type=sa.VARCHAR(length=255),
    #            nullable=True)
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'chats', ['chat_id'], ['id'])
    op.drop_column('messages', 'recipient_id')


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('recipient_id', sa.INTEGER(), nullable=True))
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'users', ['recipient_id'], ['id'])
    op.alter_column('messages', 'message_body',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    op.alter_column('messages', 'sender_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('messages', 'chat_id')
    op.drop_table('chats')
    op.drop_column('leads','is_serious')

    # ### end Alembic commands ###
