Rails.application.routes.draw do
  root "doughnut#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/doughnuts", to: "doughnuts#index"
end
