Rails.application.routes.draw do
  root "doughnuts#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :doughnuts
  resources :register, only: [:create]
  resources :login, only: [:create]
end
