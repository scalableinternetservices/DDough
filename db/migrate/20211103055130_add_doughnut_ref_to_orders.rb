class AddDoughnutRefToOrders < ActiveRecord::Migration[6.1]
  def change
    add_reference :orders, :doughnut, null: false, foreign_key: true
  end
end
