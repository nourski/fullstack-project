Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#login'

      resources :favorite_images, only: %i[index create destroy]
      resources :images, only: [:index]
      resources :users, only: [:create]
    end
  end
end
