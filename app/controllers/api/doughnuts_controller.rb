class Api::DoughnutsController < ApplicationController
  skip_before_action :authorized, only: [:index]
  before_action :verify_seller, except: [:index, :show]

  def index
    doughnuts = Doughnut.all
    render json: doughnuts
  end

  def show
    if doughnut
      render json: doughnut
    else
      render json: doughnut.errors, status: 404
    end
  end

  def create
    doughnut = Doughnut.new(doughnut_params)
    if doughnut.save
      render json: doughnut
    else
      render json: doughnut.errors, status: :unprocessable_entity
    end
  end

  def update
    if doughnut
      doughnut.update(doughnut_params)
      render json: doughnut
    else
      render json: doughnut.errors, status: 404
    end
  end

  def destroy
    doughnut&.destroy
    render json: { message: 'Doughnut deleted!' }
  end

  private
    def doughnut_params
      params.require(:doughnut).permit(:name, :price, :quantity, :description, :image_url)
    end

    def doughnut
      @doughnut ||= Doughnut.find(params[:id])
    end

    def verify_seller
      if @user.role != "seller"
        render json: { error: "Not a seller" }, status: :unauthorized
      end
    end
  
end
