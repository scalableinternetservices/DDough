class Order < ApplicationRecord
    belongs_to :user
    has_many :order_items, dependent: :delete_all, validate: true
    accepts_nested_attributes_for :order_items
end
