class DoughnutController < ApplicationController
  def index
    @doughnuts = Doughnut.all
  end
end
