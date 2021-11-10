class Api::UserController < ApplicationController
  def index
    @user = current_user
    if @user
      render json: @user
    else
      render json: { message: 'Please log in' }, status: :unauthorized
    end
  end
end