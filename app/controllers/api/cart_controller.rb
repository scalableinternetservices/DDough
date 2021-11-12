class Api::CartController < ApplicationController
  before_action :get_cart

  def index
    items = CartItem
      .select('cart_items.*, doughnuts.name, doughnuts.price, doughnuts.description')
      .joins(:cart, :doughnut)
      .where(cart_id: @cart.id)
    render json: items
  end

  def create
    @item = CartItem.new
    @item.doughnut_id = item_params[:doughnut_id]
    @item.quantity = item_params[:quantity]
    @item.cart_id = @cart.id

    if @item.save
      items = CartItem
        .select('cart_items.*, doughnuts.name, doughnuts.price, doughnuts.description')
        .joins(:cart, :doughnut)
        .where(cart_id: @cart.id)
      render json: items, status: :created
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

  private
  def get_cart
    if @user.id != params[:user_id].to_i
      render json: { message: 'unauthorized' }, status: :unauthorized
    else
      @cart = Cart.find_by(user_id: @user.id)
      if !@cart
        @cart = Cart.create(user_id: @user.id)
      end
    end
  end

  private
  def item_params
    params.permit(:doughnut_id, :quantity)
  end
end
