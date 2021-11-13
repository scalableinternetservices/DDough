class AddUserToCarts < ActiveRecord::Migration[6.1]
  def change
    add_reference :carts, :user
  end
end
