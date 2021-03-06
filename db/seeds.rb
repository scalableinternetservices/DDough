# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
10.times do |i|
  User.create(username: "seller#{i}", password: "pw", role: "seller")
end

1000.times do |i|
  Doughnut.create(name: "donut#{i}", price: 10.99, description: "description#{i}", quantity: 1000000, image_url: "https://url#{i}")
end

10000.times do |i|
  user = User.create(username: "buyer#{i}", password: "pw", role: "buyer")
  2.times do |j|
    Order.create(user: user, order_items_attributes: [
      { doughnut_id: j, quantity: 1 },
      { doughnut_id: j+1, quantity: 1 }
    ])
  end
end