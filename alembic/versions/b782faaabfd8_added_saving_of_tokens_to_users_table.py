"""Added saving of tokens to users table

Revision ID: b782faaabfd8
Revises: 2605c9edada9
Create Date: 2025-02-25 00:23:32.359391

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b782faaabfd8'
down_revision: Union[str, None] = '2605c9edada9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
