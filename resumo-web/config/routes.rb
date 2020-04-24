Rails.application.routes.draw do
  resources :candidates, only: :create
end
