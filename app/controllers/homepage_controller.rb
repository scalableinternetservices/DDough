class HomepageController < ApplicationController
  skip_before_action :verify_authenticity_token, :authorized
  def index
  end
end
