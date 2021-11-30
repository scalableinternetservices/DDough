class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :doughnut
  validates :doughnut, presence: true
  validates :quantity, presence: true
  validate :quantity_smaller_than_stock

  private
  def quantity_smaller_than_stock
    return if (doughnut == nil)
    doughnut.with_lock do
      if quantity > doughnut.quantity
        errors.add(:quantity, "Order item quantity cannot be greater than item stock")
      else
        doughnut.update({ "quantity": doughnut.quantity - quantity })
      end
    end
  end
end
