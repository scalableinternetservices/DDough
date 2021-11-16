Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    resources :orders, only: [:index, :create, :show]
    resources :doughnuts, only: [:index, :show, :create, :update]
    resources :register, only: [:create]
    resources :login, only: [:create]
    resources :user, only: [:index]
  end
end
