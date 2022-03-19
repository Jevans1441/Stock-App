"""inital

Revision ID: ffdbe15441a8
Revises: 
Create Date: 2022-03-12 23:55:17.206052

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffdbe15441a8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(' CREATE SCHEMA stock_app')
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    schema='stock_app'
    )
    op.create_index(op.f('ix_stock_app_users_id'), 'users', ['id'], unique=False, schema='stock_app')
    op.create_index(op.f('ix_stock_app_users_username'), 'users', ['username'], unique=True, schema='stock_app')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_stock_app_users_username'), table_name='users', schema='stock_app')
    op.drop_index(op.f('ix_stock_app_users_id'), table_name='users', schema='stock_app')
    op.drop_table('users', schema='stock_app')
    # ### end Alembic commands ###
