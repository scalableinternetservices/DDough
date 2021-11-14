class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.integer :quantity
      t.references :order, null: false, foreign_key: true
      t.references :doughnut, null: false, foreign_key: true

      t.timestamps
    end
  end
end
