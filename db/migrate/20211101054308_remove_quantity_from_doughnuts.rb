class RemoveQuantityFromDoughnuts < ActiveRecord::Migration[6.1]
  def change
    remove_column :doughnuts, :quantity, :float
  end
end
