# Dev Wins Tracker

A web application designed to help developers track their small wins, boosting confidence and motivation. Users can log their progress, categorize achievements, and review their growth over time.

## Features
- **User Authentication**: Sign in using GitHub, Google, or traditional email/password.
- **Log Development Wins**: Track small achievements such as bug fixes, learning new concepts, and project milestones.
- **Custom Categories**: Users can define up to a limited number of custom categories for their development wins.
- **Dashboard Overview**: View past accomplishments in a structured timeline.
- **Progress Insights**: Weekly/monthly summaries highlighting development progress.
- **Future Enhancements**:
  - Auto-logging milestones from GitHub activity.
  - Optional Discord bot integration.
  - Subscription model for expanded features.

## Tech Stack
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Frontend**: (TBD - Potentially React or another framework)
- **Authentication**: OAuth (GitHub, Google) + traditional email/password

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python 3.10+
- PostgreSQL
- Git
- Virtual environment (venv)

### Clone the Repository
```sh
git clone https://github.com/your-username/dev-wins-tracker.git
cd dev-wins-tracker
```

### Setup Virtual Environment & Install Dependencies
```sh
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### Database Setup
1. Start PostgreSQL and create a new database:
   ```sql
   CREATE DATABASE dev_wins_tracker;
   ```
2. Configure database connection in `.env` file:
   ```sh
   DATABASE_URL=postgresql://username:password@localhost/dev_wins_tracker
   ```
3. Apply database migrations:
   ```sh
   alembic upgrade head
   ```

### Running the Application
```sh
uvicorn app.main:app --reload
```
Application will be available at: `http://127.0.0.1:8000`

## Development Workflow
1. Work on new features in a separate branch:
   ```sh
   git checkout dev
   git checkout -b feature/new-feature
   ```
2. Commit and push changes:
   ```sh
   git add .
   git commit -m "Added new feature"
   git push origin feature/new-feature
   ```
3. Create a pull request (PR) to merge into `dev`.
4. Once tested and approved, merge `dev` into `main` for a stable release.

## License
TBD

## Contributors
- [Your Name](https://github.com/your-username)

