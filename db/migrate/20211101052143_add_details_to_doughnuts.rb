class AddDetailsToDoughnuts < ActiveRecord::Migration[6.1]
  def change
    add_column :doughnuts, :quantity, :float
  end
end
