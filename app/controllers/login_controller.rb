class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token, :authorized, only: [:create]

  def create
    puts user_login_params
    @user = User.find_by(username: user_login_params[:username])
    #User#authenticate comes from BCrypt
    if @user && @user.authenticate(user_login_params[:password])
      @token = encode_token({ user_id: @user.id })
      time = Time.now + 2.hours.to_i
      render json: { user: UserSerializer.new(@user), jwt: @token, exp: time }, status: :accepted
    else
      render json: { message: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private
  def user_login_params
    params.require(:user).permit(:username, :password)
  end
end
