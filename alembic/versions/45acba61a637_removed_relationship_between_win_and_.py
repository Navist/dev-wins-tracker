"""Removed relationship between Win and PredfinedCategory. Adjusting predefined will be a seperate feature only available to admins. Win will be specific to user defined categories.

Revision ID: 45acba61a637
Revises: 870df2cd3e46
Create Date: 2025-02-26 06:22:58.949348

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '45acba61a637'
down_revision: Union[str, None] = '870df2cd3e46'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
