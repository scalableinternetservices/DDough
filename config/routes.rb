Rails.application.routes.draw do
  root "doughnuts#index"
  namespace :api do
    resources :orders, only: [:index, :create, :show]
    resources :doughnuts
    resources :register, only: [:create]
    resources :login, only: [:create]
  end
end
