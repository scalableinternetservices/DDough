class Api::OrdersController < ApplicationController
  before_action :verify_permissions

  def index
    ### COMPARE FOR LOAD TESTING ###
    # orders_json = Order
    #   .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
    #   .joins(order_items: [:doughnut])
    #   .where(user: @user)
    # render json: orders_json
    if @user.role == "seller"
      @orders = Order.includes(order_items: [:doughnut])
    else
      @orders = Order.includes(order_items: [:doughnut]).where(user: @user)
    end
    render json: @orders, except: [:user_id],
      include: [:user => {:only => [:username]}, :order_items => {:only => [:quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity, :image_url]}]}]
  end

  def create
    if @user.role != "buyer"
      render json: { error: "Not a buyer" }, status: :unauthorized
      return
    end
    # order = Order.create(user: @user)
    order = Order.new(user: @user, order_items_attributes: [
      { doughnut_id: order_params[:doughnut_id], quantity: order_params[:quantity] }
    ])
    if order.save
      ### COMPARE FOR LOAD TESTING ###
      # orders_json = Order
      #   .select('orders.*, doughnuts.name, doughnuts.price, doughnuts.description, order_items.quantity')
      #   .joins(order_items: [:doughnut])
      #   .where(user: @user)
      # render json: orders_json, status: :created
      render json: order, except: [:user_id],
        include: [:order_items => {:only => [:quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity]}]}], status: :created
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
