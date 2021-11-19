class Doughnut < ApplicationRecord
    validates :name, presence: true
    validates :price, presence: true
    validates :quantity, numericality: { greater_than_or_equal_to: 1 }, :on => :create
    validates :description, presence: true
    validates :image_url, presence: true
    has_many :order_items
    has_many :cart_items
end
