class User < ApplicationRecord
  has_secure_password
  enum role: [:buyer, :seller]
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :role, presence: true
  has_one :cart
end
