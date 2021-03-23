class FavoriteImage < ApplicationRecord
  belongs_to :user

  validates :external_id, presence: true, uniqueness: { scope: :user_id }
  validates :url, presence: true
  validates :keyword, presence: true
end
