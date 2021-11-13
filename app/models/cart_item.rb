class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :doughnut
  validates :quantity, presence: true
end
