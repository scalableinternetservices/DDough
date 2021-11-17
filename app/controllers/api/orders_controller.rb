class Api::OrdersController < ApplicationController
  before_action :verify_permissions

  def index
    ### COMPARE FOR LOAD TESTING ###
    # orders_json = Order
    #   .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
    #   .joins(order_items: [:doughnut])
    #   .where(user: @user)
    # render json: orders_json
    orders = Order.includes(order_items: [:doughnut]).where(user: @user)
    render json: orders, except: [:user_id],
      include: [:user => {:only => [:username]}, :order_items => {:only => [:quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity]}]}]
  end

  def create
    order = Order.create(user: @user)
    order_item = OrderItem.new
    order_item.order_id = order.id
    order_item.doughnut_id = order_params[:doughnut_id]
    order_item.quantity = order_params[:quantity]
    if order_item.save
      ### COMPARE FOR LOAD TESTING ###
      # orders_json = Order
      #   .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
      #   .joins(order_items: [:doughnut])
      #   .where(user: @user)
      # render json: orders_json, status: :created
      render json: order, except: [:user_id],
        include: [:order_items => {:only => [:quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity]}]}], status: :created
    else
      order.delete
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
