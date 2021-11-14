class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :doughnut
  validates :quantity, presence: true
end
