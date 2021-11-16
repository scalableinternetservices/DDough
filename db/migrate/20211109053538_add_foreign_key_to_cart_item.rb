class AddForeignKeyToCartItem < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :cart_items, :carts
  end
end
