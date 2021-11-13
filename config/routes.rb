Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    resources :orders, only: [:index, :create, :show]
    resources :doughnuts
    resources :login, only: [:create]
    resources :user do
      resources :cart
    end
  end
end
