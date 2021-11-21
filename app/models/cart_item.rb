class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :doughnut
  validates :quantity, presence: true
  validate :quantity_smaller_than_stock

  private
  def quantity_smaller_than_stock
    errors.add(:quantity, "Cart item quantity cannot be greater than item stock") if quantity > doughnut.quantity
  end
end
