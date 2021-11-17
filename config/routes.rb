Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    resources :doughnuts, only: [:index, :show, :create, :update]
    resources :login, only: [:create]
    resources :user do
      post '/cart/checkout', to: 'cart#checkout'
      resources :cart
      resources :orders, only: [:index, :create]
    end
  end
end
