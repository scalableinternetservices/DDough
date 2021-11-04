class RegisterController < ApplicationController
  skip_before_action :verify_authenticity_token, :authorized, only: [:create]

  def create
    if User.exists?(username: user_params[:username])
      render json: { error: 'Username taken'}, status: 409
      return
    end
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token({ user_id: @user.id })
      time = Time.now + 2.hours.to_i
      render json: { user: UserSerializer.new(@user), jwt: @token, exp: time }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :role)
  end
end
