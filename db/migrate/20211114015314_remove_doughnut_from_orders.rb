class RemoveDoughnutFromOrders < ActiveRecord::Migration[6.1]
  def change
    remove_reference :orders, :doughnut, index: true, foreign_key: true
  end
end
