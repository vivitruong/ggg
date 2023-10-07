from app.models import db, Playlist, environment, SCHEMA

def seed_playlists():
    playlist1 = Playlist(
        name='Lofi',
        description='Lofi for study night',
        user_id=1
    )
    playlist2 = Playlist(
        name='Top98 Most Played',
        description='Rock out to the greatest hits of all time.',
        user_id=1
    )

    playlist3 = Playlist(
        name='Chill Vibes',
        description='Relax and unwind with these soothing tracks.',
        user_id=2
    )

    playlist4 = Playlist(
        name='90s Pop Hits',
        description='Take a trip down memory lane with these catchy 90s pop songs.',
        user_id=2
    )

    playlist5 = Playlist(
        name='Indie Folk Favorites',
        description='Discover the indie folk scene with these handpicked gems.',
        user_id=1
    )

    playlist6 = Playlist(
        name='EDM Party Mix',
        description='Get the party started with this electrifying EDM playlist.',
        user_id=1
    )
    playlist7 = Playlist(
        name='Country Music',
        description='Ok today I feel like I might want to listen to Country Music.',
        user_id=1
    )
    playlist8 = Playlist(
        name='2000s ThrowBack',
        description='Get the throwback vibes today to escape this current reality.',
        user_id=1
    )
    playlist9 = Playlist(
        name='Viet"s Songs',
        description='Never forget where ya from!!',
        user_id=1
    )
    playlist10 = Playlist(
        name='Late Night Drive',
        description='You cannot drive while listening to this ok! Be safe driving',
        user_id=1
    )
    playlist11 = Playlist(
        name='Heavy Metal',
        description='Oh yeah! Lets go and have fun listening to this playlist, you rock',
        user_id=1
    )
    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    db.session.add(playlist7)
    db.session.add(playlist8)
    db.session.add(playlist9)
    db.session.add(playlist10)
    db.session.add(playlist11)


    db.session.commit()

def undo_playlists():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
            db.session.execute("DELETE FROM playlists")

    db.session.commit()
