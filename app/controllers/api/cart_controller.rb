class Api::CartController < ApplicationController
  before_action :get_cart

  def index
    ### COMPARE FOR LOAD TESTING ###
    # items = CartItem
    #   .select('cart_items.*, doughnuts.name, doughnuts.price, doughnuts.description')
    #   .joins(:cart, :doughnut)
    #   .where(cart_id: @cart.id)
    # render json: items
    @cart = Cart.includes(cart_items: [:doughnut]).where(user_id: @user.id)
    render json: @cart, except: [:user_id],
      include: [:user => {:only => [:username]}, :cart_items => {:only => [:id, :quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity, :image_url]}]}]
  end

  def create
    @item = CartItem.where(cart_id: @cart.id, doughnut_id: item_params[:doughnut_id])

    if @item.blank?
      @item = CartItem.new
      @item.doughnut_id = item_params[:doughnut_id]
      @item.quantity = item_params[:quantity]
      @item.cart_id = @cart.id
    else
      @item = @item.first
      @item.quantity += item_params[:quantity]
    end

    if @item.save
      ### COMPARE FOR LOAD TESTING ###
      # items = CartItem
      #   .select('cart_items.*, doughnuts.name, doughnuts.price, doughnuts.description')
      #   .joins(:cart, :doughnut)
      #   .where(cart_id: @cart.id)
      # render json: items, status: :created
      @cart = Cart.includes(cart_items: [:doughnut]).where(id: @cart.id)
      render json: @cart, except: [:user_id],
        include: [:user => {:only => [:username]}, :cart_items => {:only => [:id, :quantity, :doughnut], :include => [:doughnut => {:only => [:name, :price, :description, :quantity, :image_url]}]}], status: :created
    else
      render json: { error: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @cart_item = CartItem.find_by(id: params[:id])
    if !@cart_item
      head 204
    elsif @cart_item.cart_id == @cart.id
      @cart_item.destroy
      head 204
    else
      head :unauthorized
    end
  end

  def checkout
    cart_items = CartItem.where(cart_id: @cart.id)
    if !cart_items.empty?
      cart_items_json = cart_items.as_json(only: [:quantity, :doughnut_id])
      order = Order.new(user: @user, order_items_attributes: cart_items_json)
      if order.save
        @cart.delete
        render json: { message: 'cart successfully checked out'}
      else
        render json: { message: "Items have not been checked out", error: order.errors}, status: :conflict
      end
    else
      render json: { error: 'cart is empty'}, status: :conflict
    end
  end

  private
  def get_cart
    if @user.id != params[:user_id].to_i
      render json: { message: 'unauthorized' }, status: :unauthorized
    elsif @user.role != "buyer"
      render json: { error: "Not a buyer" }, status: :unauthorized
    else
      @cart = Cart.find_by(user_id: @user.id)
      if !@cart
        @cart = Cart.create(user_id: @user.id)
      end
    end
  end

  def item_params
    params.permit(:doughnut_id, :quantity)
  end
end
