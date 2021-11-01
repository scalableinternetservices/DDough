Rails.application.routes.draw do
  root "doughnuts#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/doughnuts", to: "doughnuts#index"
  get "/doughnuts/:id", to: "doughnuts#show"
end
