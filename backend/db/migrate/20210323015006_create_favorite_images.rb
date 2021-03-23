class CreateFavoriteImages < ActiveRecord::Migration[6.0]
  def change
    create_table :favorite_images do |t|
      t.belongs_to :user

      t.string :external_id, null: false
      t.string :url, null: false
      t.string :keyword, null: false
    end
  end
end
