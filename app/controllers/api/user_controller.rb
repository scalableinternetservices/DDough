class Api::UserController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    render json: { user: UserSerializer.new(@user) }
  end

  def create
    # if User.exists?(username: user_params[:username])
    #   render json: { error: 'Username taken'}, status: 409
    #   return
    # end
    @user = User.new(user_params)
    if @user.save
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
