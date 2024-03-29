from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm import validates
class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(225), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='playlists')
    playlist_songs = db.relationship('Playlist_Song', back_populates='playlist', cascade='all, delete-orphan')

    #add validation before saving to database
    @validates('name')
    def validate_name(self, key, value):
        if len(value) <= 225:
            return value
        else:
            raise ValueError('Name length exceeds the max limit 225 characters')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'playlist_songs': [playlist_song.to_dict() for playlist_song in self.playlist_songs]
        }
