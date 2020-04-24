class ApplicationController < ActionController::API
  include ActionView::Rendering
  include ActionController::MimeResponds

  rescue_from StandardError, with: :render_500

  def render_500(exception)
    render 'errors/500', locals: { exception: exception }, status: :internal_server_error
  end
end
