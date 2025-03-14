"""Initial Model Integration

Revision ID: e5dbb8fb78ce
Revises: 
Create Date: 2025-02-24 06:16:01.012774

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'e5dbb8fb78ce'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_custom_categories_id', table_name='custom_categories')
    op.alter_column('dev_wins', 'description',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               nullable=False)
    op.alter_column('dev_wins', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.drop_index('ix_dev_wins_id', table_name='dev_wins')
    op.drop_constraint('dev_wins_user_id_fkey', 'dev_wins', type_='foreignkey')
    op.create_foreign_key(None, 'dev_wins', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.alter_column('oauth_accounts', 'expires_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_index('ix_oauth_accounts_id', table_name='oauth_accounts')
    op.drop_constraint('oauth_accounts_user_id_fkey', 'oauth_accounts', type_='foreignkey')
    op.create_foreign_key(None, 'oauth_accounts', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.add_column('subscribers', sa.Column('subscription_tier', sa.String(), nullable=True))
    op.alter_column('subscribers', 'expires_at',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               type_=sa.DateTime(),
               nullable=True)
    op.drop_index('ix_subscribers_id', table_name='subscribers')
    op.drop_column('subscribers', 'subscription')
    op.add_column('users', sa.Column('subscription_tier', sa.String(), nullable=True))
    op.alter_column('users', 'created_at',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               type_=sa.DateTime(),
               existing_nullable=False,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'))
    op.create_unique_constraint(None, 'users', ['password_hash'])
    op.drop_column('users', 'subscription')
    op.alter_column('wins', 'custom_category_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_index('ix_wins_id', table_name='wins')
    op.drop_constraint('wins_custom_category_id_fkey', 'wins', type_='foreignkey')
    op.create_foreign_key(None, 'wins', 'custom_categories', ['custom_category_id'], ['id'], ondelete='CASCADE')
    op.drop_column('wins', 'created_at')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wins', sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'wins', type_='foreignkey')
    op.create_foreign_key('wins_custom_category_id_fkey', 'wins', 'custom_categories', ['custom_category_id'], ['id'])
    op.create_index('ix_wins_id', 'wins', ['id'], unique=False)
    op.alter_column('wins', 'custom_category_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.add_column('users', sa.Column('subscription', sa.VARCHAR(length=50), server_default=sa.text("'free'::text"), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'users', type_='unique')
    op.alter_column('users', 'created_at',
               existing_type=sa.DateTime(),
               type_=postgresql.TIMESTAMP(timezone=True),
               existing_nullable=False,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'))
    op.drop_column('users', 'subscription_tier')
    op.add_column('subscribers', sa.Column('subscription', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.create_index('ix_subscribers_id', 'subscribers', ['id'], unique=False)
    op.alter_column('subscribers', 'expires_at',
               existing_type=sa.DateTime(),
               type_=postgresql.TIMESTAMP(timezone=True),
               nullable=False)
    op.drop_column('subscribers', 'subscription_tier')
    op.drop_constraint(None, 'oauth_accounts', type_='foreignkey')
    op.create_foreign_key('oauth_accounts_user_id_fkey', 'oauth_accounts', 'users', ['user_id'], ['id'])
    op.create_index('ix_oauth_accounts_id', 'oauth_accounts', ['id'], unique=False)
    op.alter_column('oauth_accounts', 'expires_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.drop_constraint(None, 'dev_wins', type_='foreignkey')
    op.create_foreign_key('dev_wins_user_id_fkey', 'dev_wins', 'users', ['user_id'], ['id'])
    op.create_index('ix_dev_wins_id', 'dev_wins', ['id'], unique=False)
    op.alter_column('dev_wins', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('dev_wins', 'description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               nullable=True)
    op.create_index('ix_custom_categories_id', 'custom_categories', ['id'], unique=False)
    # ### end Alembic commands ###
