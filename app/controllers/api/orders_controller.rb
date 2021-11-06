class Api::OrdersController < ApplicationController
  def index
    orders = Order.all
    render json: orders
  end

  def create
    order = Order.create(order_params)
    if order.id
      render json: order
    else
      render json: { error: order.errors }
    end
  end

  def show
    @order ||= Order.find_by_id(params[:id])
    if @order
      render json: @order
    else
      render json: { error: 'Order does not exist'}, status: 404
    end
  end

  private
  def order_params
    params.permit(:user_id, :doughnut_id)
  end
end
