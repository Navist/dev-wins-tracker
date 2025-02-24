from app.database import SessionLocal
from app.models import User, CustomCategory, DevWin
from sqlalchemy.exc import IntegrityError


db = SessionLocal()



try:
    sample_user = User(username="test_user", email="winning@winner.com", password_hash="sdoifjhodsifghdhsfoiug")
    db.add(sample_user)
    db.commit()
    db.refresh(sample_user)

    print(f"User Created: {sample_user.id} - {sample_user.username}")

    categories = [
        CustomCategory(user_id=sample_user.id, name="Backend Development"),
        CustomCategory(user_id=sample_user.id, name="Frontend Development"),
        CustomCategory(user_id=sample_user.id, name="Database Optimization")
    ]
    db.add_all(categories)
    print(f"✅ Added {len(categories)} custom categories!")


    dev_wins = [
        DevWin(user_id=sample_user.id, title="Added First Card", description="Created our Database and added the first set of cards to our categories"),
        DevWin(user_id=sample_user.id, title="More Winning", description="Learned that we can add multiple entries in a single pass using a list and db.add_all()"),
        DevWin(user_id=sample_user.id, title="Created a User", description="Created our first user and tested with test_db by creating our user object first and calling it for use in our other tables as well.")
    ]

    db.add_all(dev_wins)
    db.commit()
    print(f"✅ Added {len(dev_wins)} development wins!")

except IntegrityError as e:
    db.rollback()
    print(f"⚠️ IntegrityError: {e.orig}")

finally:
    db.close()    