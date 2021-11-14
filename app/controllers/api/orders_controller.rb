class Api::OrdersController < ApplicationController
  def index
    orders = Order.where(user: @user)
    render json: orders, include: [:user => {:only => [:id, :username]}, :doughnut => {:only => [:id, :name, :price, :description]}], only: [:id, :created_at, :updated_at, :user, :doughnut]
  end

  def create
    order = Order.new
    order.user_id = @user.id
    order.doughnut_id = order_params[:doughnut_id]
    if order.save
      render json: order, include: [:user => {:only => [:id, :username]}, :doughnut => {:only => [:id, :name, :price, :description]}], only: [:id, :created_at, :updated_at, :user, :doughnut]
    else
      render json: { error: order.errors }
    end
  end

  private
  def order_params
    params.permit(:user_id, :doughnut_id)
  end
end
