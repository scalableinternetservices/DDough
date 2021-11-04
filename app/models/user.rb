class User < ApplicationRecord
    enum role: [:buyer, :seller]
    validates :username, presence: true
    validates :password, presence: true
    validates :role, presence: true
end
