"""Oppsie in User class

Revision ID: 2605c9edada9
Revises: e5dbb8fb78ce
Create Date: 2025-02-24 06:24:55.004099

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2605c9edada9'
down_revision: Union[str, None] = 'e5dbb8fb78ce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
