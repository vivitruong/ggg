"""empty message

Revision ID: be92a8ca5887
Revises: ffdc0a98111c
Create Date: 2023-09-13 14:05:37.520541

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be92a8ca5887'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('artist', sa.String(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('file_path', sa.String(), nullable=True),
    sa.Column('cover_photo', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # op.create_table('comments',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('comment', sa.String(length=1000), nullable=True),
    # sa.Column('song_id', sa.Integer(), nullable=False),
    # sa.Column('user_id', sa.Integer(), nullable=False),
    # sa.Column('created_at', sa.DateTime(), nullable=True),
    # sa.Column('updated_at', sa.DateTime(), nullable=True),
    # sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    # sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('likes',
    # sa.Column('users', sa.Integer(), nullable=False),
    # sa.Column('songs', sa.Integer(), nullable=False),
    # sa.ForeignKeyConstraint(['songs'], ['songs.id'], ),
    # sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    # sa.PrimaryKeyConstraint('users', 'songs')
    # )
    op.create_table('playlist_songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # with op.batch_alter_table('users', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('first_name', sa.String(length=50), nullable=False))
    #     batch_op.add_column(sa.Column('last_name', sa.String(length=50), nullable=False))
    #     batch_op.add_column(sa.Column('bio', sa.String(length=2000), nullable=True))
    #     batch_op.add_column(sa.Column('image_url', sa.String(length=1000), nullable=True))
    #     batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
    #     batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))
    #     batch_op.create_unique_constraint(None, ['image_url'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        # batch_op.drop_constraint(None, type_='unique')
        # batch_op.drop_column('updated_at')
        # batch_op.drop_column('created_at')
        batch_op.drop_column('image_url')
        batch_op.drop_column('bio')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.drop_table('playlist_songs')
    # op.drop_table('likes')
    # op.drop_table('comments')
    op.drop_table('songs')
    op.drop_table('playlists')
    # ### end Alembic commands ###
