class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def authenticate_user
    render json: { error: 'Unauthorized request.' }, status: :unauthorized unless authenticated_user
  end

  def authenticated_user
    @authenticated_user ||= user_id_from_token ? User.find(user_id_from_token) : nil
  end

  private

  def encoded_token
    @encoded_token ||= request&.headers&.[]('Authorization')&.split(' ')&.[](1)
  end

  def decoded_token
    @decoded_token ||= encoded_token ? JWT.decode(encoded_token, ENV['JWT_SECRET_KEY']) : nil
  end

  def user_id_from_token
    @user_id_from_token ||= decoded_token&.[](0)&.[]('user_id')
  end
end
