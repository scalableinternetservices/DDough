class Doughnut < ApplicationRecord
    validates :name, presence: true
    validates :price, presence: true
    validates :quantity, presence: true
    validates :description, presence: true
    has_many :orders
    has_many :cart_items
end
