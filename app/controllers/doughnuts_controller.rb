class DoughnutsController < ApplicationController
  def index
    @doughnuts = Doughnut.all
  end

  def show
    @doughnut = Doughnut.find(params[:id])
  end

  def new
    @doughnut = Doughnut.new
  end

  def create
    @doughnut = Doughnut.new(doughnut_params)

    if @doughnut.save
      redirect_to @doughnut
    else
      render :new
    end
  end

  def destroy
    @doughnut = Doughnut.find(params[:id])
    @doughnut.destroy

    redirect_to doughnut_path
  end

  private
    def doughnut_params
      params.require(:doughnut).permit(:name, :price, :quantity, :description)
    end
  
end