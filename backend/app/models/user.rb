class User < ApplicationRecord
  has_secure_password
  has_many :favorite_images

  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
end
