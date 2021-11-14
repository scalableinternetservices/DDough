class Api::OrdersController < ApplicationController
  before_action :verify_permissions

  def index
    orders_json = Order
      .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
      .joins(order_items: [:doughnut])
      .where(user: @user)
    render json: orders_json
  end

  def create
    order = Order.create(user: @user)
    order_item = OrderItem.new
    order_item.order_id = order.id
    order_item.doughnut_id = order_params[:doughnut_id]
    order_item.quantity = order_params[:quantity]
    if order_item.save
      orders_json = Order
        .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
        .joins(order_items: [:doughnut])
        .where(user: @user)
      render json: orders_json, status: :created
    else
      render json: { error: order.errors }, status: :unprocessable_entity
    end
  end

  private
  def order_params
    params.permit(:doughnut_id, :quantity)
  end

  private
  def verify_permissions
    if @user.id != params[:user_id].to_i
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end
end
