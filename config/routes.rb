Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    resources :cart
    resources :orders, only: [:index, :create, :show]
    resources :doughnuts
    resources :register, only: [:create]
    resources :login, only: [:create]
    resources :user
  end
end
