class DoughnutsController < ApplicationController
  def index
    @doughnuts = Doughnut.all
  end

  def show
    @doughnut = Doughnut.find(params[:id])
  end
  
end
