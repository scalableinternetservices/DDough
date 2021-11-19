class AddImageUrlToDoughnuts < ActiveRecord::Migration[6.1]
  def change
    add_column :doughnuts, :image_url, :string
  end
end
