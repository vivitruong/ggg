from app.models import db, Like, environment, SCHEMA

def seed_likes():
    like1 = Like(
        user_id=1, song_id=2
    )

    like2 = Like(
        user_id=2, song_id=3
    )
    like3 = Like(
        user_id=3, song_id=1
    )
    like4= Like(
        user_id=2, song_id=1
    )
    like5 = Like(
        user_id=1, song_id=3
    )
    like6 = Like(
        user_id=1, song_id=4
    )

    db.session.add_all([like1, like2, like3, like4, like5, like6])
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
