class Doughnut < ApplicationRecord
    validates :name, presence: true
    validates :price, presence: true
    validates :quantity, presence: true
    validates :description, presence: true
    validates :image_url, presence: true
    has_many :order_items
    has_many :cart_items
end
